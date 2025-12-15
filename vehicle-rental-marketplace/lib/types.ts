// User Types
export type UserRole = "admin" | "dealer" | "customer"

export interface User {
  _id: string
  name: string
  phone: string
  role: UserRole
  is_verified: boolean
  created_at: Date
}

// Dealer Types
export type DealerStatus = "pending" | "approved" | "suspended"

export interface Dealer {
  _id: string
  user_id: string
  business_name: string
  cnic: string
  address: string
  status: DealerStatus
  commission_rate: number
  created_at: Date
}

// Vehicle Types
export type VehicleCategory = "sedan" | "suv" | "hiace" | "coaster"

export interface Vehicle {
  _id: string
  dealer_id: string
  title: string
  category: VehicleCategory
  city: "Karachi"
  price_per_day: number
  with_driver: true
  description: string
  photos: string[]
  is_verified: boolean
  is_active: boolean
  created_at: Date
}

// Driver Types
export interface Driver {
  _id: string
  dealer_id: string
  name: string
  phone: string
  license_number: string
  assigned_vehicle_id?: string
  is_verified: boolean
}

// Booking Types
export type BookingType = "wedding" | "trip" | "airport" | "corporate"
export type BookingStatus = "requested" | "confirmed" | "completed" | "cancelled"
export type PaymentStatus = "pending" | "advance_paid" | "paid"

export interface Booking {
  _id: string
  customer_id: string
  vehicle_id: string
  dealer_id: string
  booking_type: BookingType
  start_date: Date
  end_date: Date
  duration_days: number
  total_price: number
  status: BookingStatus
  payment_status: PaymentStatus
  admin_notes?: string
  created_at: Date
}

// Payment Types
export type PaymentMethod = "cash" | "jazzcash" | "easypaisa"
export type PaymentStatusType = "pending" | "completed" | "failed"

export interface Payment {
  _id: string
  booking_id: string
  amount: number
  method: PaymentMethod
  status: PaymentStatusType
  created_at: Date
}

// Dispute Types
export interface Dispute {
  _id: string
  booking_id: string
  issue_type: string
  description: string
  resolution?: string
  resolved_by?: string
  created_at: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// OTP Types
export interface OTPRequest {
  phone: string
}

export interface OTPVerification {
  phone: string
  otp: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}
