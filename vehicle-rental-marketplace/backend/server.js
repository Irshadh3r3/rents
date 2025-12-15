import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
let db
const mongoClient = new MongoClient(process.env.MONGODB_URI)

async function connectDB() {
  try {
    await mongoClient.connect()
    db = mongoClient.db("karachi-rides")
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

// Role-based authorization middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" })
    }
    next()
  }
}

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Send OTP
app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number required" })
    }

    // In production, integrate with Firebase or SMS service
    // For demo, we'll generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP in database with expiry (5 minutes)
    await db.collection("otps").insertOne({
      phone,
      otp,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 5 * 60 * 1000),
      verified: false,
    })

    console.log(`[v0] OTP for ${phone}: ${otp}`) // For testing

    res.json({ success: true, message: "OTP sent successfully" })
  } catch (error) {
    console.error("Send OTP error:", error)
    res.status(500).json({ success: false, message: "Failed to send OTP" })
  }
})

// Verify OTP and Login
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: "Phone and OTP required" })
    }

    // Find valid OTP
    const otpRecord = await db.collection("otps").findOne({
      phone,
      otp,
      verified: false,
      expires_at: { $gt: new Date() },
    })

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" })
    }

    // Mark OTP as verified
    await db.collection("otps").updateOne({ _id: otpRecord._id }, { $set: { verified: true } })

    // Find or create user
    let user = await db.collection("users").findOne({ phone })

    if (!user) {
      // Create new customer user
      const newUser = {
        name: "User", // Can be updated later
        phone,
        role: "customer",
        is_verified: true,
        created_at: new Date(),
      }
      const result = await db.collection("users").insertOne(newUser)
      user = { _id: result.insertedId, ...newUser }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    )

    res.json({
      success: true,
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        phone: user.phone,
        role: user.role,
        is_verified: user.is_verified,
      },
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    res.status(500).json({ success: false, message: "Failed to verify OTP" })
  }
})

// ============================================
// DEALER ROUTES
// ============================================

// Register as dealer
app.post("/api/dealers/register", authenticateToken, async (req, res) => {
  try {
    const { business_name, cnic, address } = req.body

    if (!business_name || !cnic || !address) {
      return res.status(400).json({ success: false, message: "All fields required" })
    }

    // Check if already registered as dealer
    const existingDealer = await db.collection("dealers").findOne({
      user_id: new ObjectId(req.user.userId),
    })

    if (existingDealer) {
      return res.status(400).json({ success: false, message: "Already registered as dealer" })
    }

    const dealer = {
      user_id: new ObjectId(req.user.userId),
      business_name,
      cnic,
      address,
      status: "pending",
      commission_rate: 10,
      created_at: new Date(),
    }

    await db.collection("dealers").insertOne(dealer)

    // Update user role to dealer
    await db.collection("users").updateOne({ _id: new ObjectId(req.user.userId) }, { $set: { role: "dealer" } })

    res.json({ success: true, message: "Dealer registration submitted for approval" })
  } catch (error) {
    console.error("Dealer registration error:", error)
    res.status(500).json({ success: false, message: "Failed to register dealer" })
  }
})

// Get dealer profile
app.get("/api/dealers/my-profile", authenticateToken, authorizeRoles("dealer"), async (req, res) => {
  try {
    const dealer = await db.collection("dealers").findOne({
      user_id: new ObjectId(req.user.userId),
    })

    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" })
    }

    res.json({ success: true, data: dealer })
  } catch (error) {
    console.error("Get dealer profile error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch profile" })
  }
})

// ============================================
// VEHICLE ROUTES
// ============================================

// Add vehicle (dealer only)
app.post("/api/vehicles", authenticateToken, authorizeRoles("dealer"), async (req, res) => {
  try {
    const { title, category, price_per_day, description, photos } = req.body

    if (!title || !category || !price_per_day) {
      return res.status(400).json({ success: false, message: "Required fields missing" })
    }

    const dealer = await db.collection("dealers").findOne({
      user_id: new ObjectId(req.user.userId),
      status: "approved",
    })

    if (!dealer) {
      return res.status(403).json({ success: false, message: "Dealer not approved" })
    }

    const vehicle = {
      dealer_id: dealer._id,
      title,
      category,
      city: "Karachi",
      price_per_day: Number(price_per_day),
      with_driver: true,
      description: description || "",
      photos: photos || [],
      is_verified: false,
      is_active: true,
      created_at: new Date(),
    }

    const result = await db.collection("vehicles").insertOne(vehicle)

    res.json({ success: true, data: { _id: result.insertedId, ...vehicle } })
  } catch (error) {
    console.error("Add vehicle error:", error)
    res.status(500).json({ success: false, message: "Failed to add vehicle" })
  }
})

// Get dealer's vehicles
app.get("/api/vehicles/my", authenticateToken, authorizeRoles("dealer"), async (req, res) => {
  try {
    const dealer = await db.collection("dealers").findOne({
      user_id: new ObjectId(req.user.userId),
    })

    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" })
    }

    const vehicles = await db.collection("vehicles").find({ dealer_id: dealer._id }).sort({ created_at: -1 }).toArray()

    res.json({ success: true, data: vehicles })
  } catch (error) {
    console.error("Get vehicles error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch vehicles" })
  }
})

// Get public vehicles (no auth required)
app.get("/api/vehicles", async (req, res) => {
  try {
    const { city, category } = req.query

    const filter = {
      is_verified: true,
      is_active: true,
      city: "Karachi",
    }

    if (category && category !== "all") {
      filter.category = category
    }

    const vehicles = await db.collection("vehicles").find(filter).sort({ created_at: -1 }).toArray()

    res.json({ success: true, data: vehicles })
  } catch (error) {
    console.error("Get public vehicles error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch vehicles" })
  }
})

// Update vehicle
app.put("/api/vehicles/:id", authenticateToken, authorizeRoles("dealer"), async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const dealer = await db.collection("dealers").findOne({
      user_id: new ObjectId(req.user.userId),
    })

    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" })
    }

    // Verify vehicle belongs to dealer
    const vehicle = await db.collection("vehicles").findOne({
      _id: new ObjectId(id),
      dealer_id: dealer._id,
    })

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" })
    }

    delete updates._id
    delete updates.dealer_id

    await db.collection("vehicles").updateOne({ _id: new ObjectId(id) }, { $set: updates })

    res.json({ success: true, message: "Vehicle updated successfully" })
  } catch (error) {
    console.error("Update vehicle error:", error)
    res.status(500).json({ success: false, message: "Failed to update vehicle" })
  }
})

// ============================================
// BOOKING ROUTES
// ============================================

// Request booking (customer)
app.post("/api/bookings/request", authenticateToken, authorizeRoles("customer"), async (req, res) => {
  try {
    const { vehicle_id, booking_type, start_date, end_date } = req.body

    if (!vehicle_id || !booking_type || !start_date || !end_date) {
      return res.status(400).json({ success: false, message: "All fields required" })
    }

    const vehicle = await db.collection("vehicles").findOne({
      _id: new ObjectId(vehicle_id),
      is_verified: true,
      is_active: true,
    })

    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not available" })
    }

    const startDate = new Date(start_date)
    const endDate = new Date(end_date)
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    const totalPrice = duration * vehicle.price_per_day

    const booking = {
      customer_id: new ObjectId(req.user.userId),
      vehicle_id: vehicle._id,
      dealer_id: vehicle.dealer_id,
      booking_type,
      start_date: startDate,
      end_date: endDate,
      duration_days: duration,
      total_price: totalPrice,
      status: "requested",
      payment_status: "pending",
      created_at: new Date(),
    }

    const result = await db.collection("bookings").insertOne(booking)

    // In production: Send WhatsApp notification to admin

    res.json({ success: true, data: { _id: result.insertedId, ...booking } })
  } catch (error) {
    console.error("Request booking error:", error)
    res.status(500).json({ success: false, message: "Failed to request booking" })
  }
})

// Get user's bookings
app.get("/api/bookings/my", authenticateToken, async (req, res) => {
  try {
    const filter = {}

    if (req.user.role === "customer") {
      filter.customer_id = new ObjectId(req.user.userId)
    } else if (req.user.role === "dealer") {
      const dealer = await db.collection("dealers").findOne({
        user_id: new ObjectId(req.user.userId),
      })
      if (dealer) {
        filter.dealer_id = dealer._id
      }
    }

    const bookings = await db.collection("bookings").find(filter).sort({ created_at: -1 }).toArray()

    res.json({ success: true, data: bookings })
  } catch (error) {
    console.error("Get bookings error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch bookings" })
  }
})

// ============================================
// ADMIN ROUTES
// ============================================

// Get all dealers
app.get("/api/admin/dealers", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const dealers = await db.collection("dealers").find({}).sort({ created_at: -1 }).toArray()

    res.json({ success: true, data: dealers })
  } catch (error) {
    console.error("Get dealers error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch dealers" })
  }
})

// Approve dealer
app.put("/api/admin/dealers/:id/approve", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params

    await db.collection("dealers").updateOne({ _id: new ObjectId(id) }, { $set: { status: "approved" } })

    res.json({ success: true, message: "Dealer approved successfully" })
  } catch (error) {
    console.error("Approve dealer error:", error)
    res.status(500).json({ success: false, message: "Failed to approve dealer" })
  }
})

// Suspend dealer
app.put("/api/admin/dealers/:id/suspend", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params

    await db.collection("dealers").updateOne({ _id: new ObjectId(id) }, { $set: { status: "suspended" } })

    res.json({ success: true, message: "Dealer suspended successfully" })
  } catch (error) {
    console.error("Suspend dealer error:", error)
    res.status(500).json({ success: false, message: "Failed to suspend dealer" })
  }
})

// Verify vehicle
app.put("/api/admin/vehicles/:id/verify", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params

    await db.collection("vehicles").updateOne({ _id: new ObjectId(id) }, { $set: { is_verified: true } })

    res.json({ success: true, message: "Vehicle verified successfully" })
  } catch (error) {
    console.error("Verify vehicle error:", error)
    res.status(500).json({ success: false, message: "Failed to verify vehicle" })
  }
})

// Get all bookings
app.get("/api/admin/bookings", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const bookings = await db.collection("bookings").find({}).sort({ created_at: -1 }).toArray()

    res.json({ success: true, data: bookings })
  } catch (error) {
    console.error("Get bookings error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch bookings" })
  }
})

// Confirm booking
app.put("/api/admin/bookings/:id/confirm", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params
    const { admin_notes } = req.body

    await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "confirmed",
          admin_notes: admin_notes || "",
        },
      },
    )

    // In production: Send WhatsApp notification to customer and dealer

    res.json({ success: true, message: "Booking confirmed successfully" })
  } catch (error) {
    console.error("Confirm booking error:", error)
    res.status(500).json({ success: false, message: "Failed to confirm booking" })
  }
})

// Cancel booking
app.put("/api/admin/bookings/:id/cancel", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params

    await db.collection("bookings").updateOne({ _id: new ObjectId(id) }, { $set: { status: "cancelled" } })

    // In production: Send WhatsApp notification

    res.json({ success: true, message: "Booking cancelled successfully" })
  } catch (error) {
    console.error("Cancel booking error:", error)
    res.status(500).json({ success: false, message: "Failed to cancel booking" })
  }
})

// Complete booking
app.put("/api/admin/bookings/:id/complete", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params

    await db.collection("bookings").updateOne({ _id: new ObjectId(id) }, { $set: { status: "completed" } })

    res.json({ success: true, message: "Booking marked as complete" })
  } catch (error) {
    console.error("Complete booking error:", error)
    res.status(500).json({ success: false, message: "Failed to complete booking" })
  }
})

// ============================================
// DISPUTE ROUTES
// ============================================

// Create dispute
app.post("/api/disputes", authenticateToken, async (req, res) => {
  try {
    const { booking_id, issue_type, description } = req.body

    if (!booking_id || !issue_type || !description) {
      return res.status(400).json({ success: false, message: "All fields required" })
    }

    const dispute = {
      booking_id: new ObjectId(booking_id),
      issue_type,
      description,
      created_at: new Date(),
    }

    const result = await db.collection("disputes").insertOne(dispute)

    res.json({ success: true, data: { _id: result.insertedId, ...dispute } })
  } catch (error) {
    console.error("Create dispute error:", error)
    res.status(500).json({ success: false, message: "Failed to create dispute" })
  }
})

// Get all disputes (admin)
app.get("/api/admin/disputes", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const disputes = await db.collection("disputes").find({}).sort({ created_at: -1 }).toArray()

    res.json({ success: true, data: disputes })
  } catch (error) {
    console.error("Get disputes error:", error)
    res.status(500).json({ success: false, message: "Failed to fetch disputes" })
  }
})

// Resolve dispute
app.put("/api/admin/disputes/:id/resolve", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params
    const { resolution } = req.body

    await db.collection("disputes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          resolution,
          resolved_by: new ObjectId(req.user.userId),
          resolved_at: new Date(),
        },
      },
    )

    res.json({ success: true, message: "Dispute resolved successfully" })
  } catch (error) {
    console.error("Resolve dispute error:", error)
    res.status(500).json({ success: false, message: "Failed to resolve dispute" })
  }
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Karachi Rides API is running" })
})

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
