# Karachi Rides Backend API

Express.js backend for the Karachi Rides vehicle rental marketplace.

## Installation

\`\`\`bash
cd backend
npm install
\`\`\`

## Environment Setup

Create a `.env` file in the backend directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/karachi-rides
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
\`\`\`

## Running the Server

Development mode:
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm start
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP and login

### Dealers
- `POST /api/dealers/register` - Register as dealer (authenticated)
- `GET /api/dealers/my-profile` - Get dealer profile (dealer only)

### Vehicles
- `POST /api/vehicles` - Add vehicle (dealer only)
- `GET /api/vehicles/my` - Get dealer's vehicles (dealer only)
- `GET /api/vehicles` - Get public verified vehicles
- `PUT /api/vehicles/:id` - Update vehicle (dealer only)

### Bookings
- `POST /api/bookings/request` - Request booking (customer only)
- `GET /api/bookings/my` - Get user's bookings (authenticated)

### Admin
- `GET /api/admin/dealers` - Get all dealers
- `PUT /api/admin/dealers/:id/approve` - Approve dealer
- `PUT /api/admin/dealers/:id/suspend` - Suspend dealer
- `PUT /api/admin/vehicles/:id/verify` - Verify vehicle
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id/confirm` - Confirm booking
- `PUT /api/admin/bookings/:id/cancel` - Cancel booking
- `PUT /api/admin/bookings/:id/complete` - Complete booking

### Disputes
- `POST /api/disputes` - Create dispute (authenticated)
- `GET /api/admin/disputes` - Get all disputes (admin only)
- `PUT /api/admin/disputes/:id/resolve` - Resolve dispute (admin only)

## Authentication

All protected routes require JWT token in Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Role-Based Access

- **Admin**: Full access to all routes
- **Dealer**: Vehicle and booking management
- **Customer**: Booking requests and viewing

## Database Collections

- `users` - User accounts
- `dealers` - Dealer business information
- `vehicles` - Vehicle listings
- `drivers` - Driver information
- `bookings` - Booking records
- `payments` - Payment transactions
- `disputes` - Dispute records
- `otps` - OTP verification records

## Security

- JWT token authentication
- Role-based authorization
- Input validation
- MongoDB ObjectId validation
- CORS enabled for frontend

## Deployment

### Railway/Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy

### VPS (Ubuntu)
\`\`\`bash
# Install Node.js and MongoDB
# Clone repository
# Install dependencies
npm install
# Use PM2 for process management
pm2 start server.js --name karachi-rides-api
