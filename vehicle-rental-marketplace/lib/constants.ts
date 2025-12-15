// Vehicle Categories
export const VEHICLE_CATEGORIES = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "hiace", label: "Hiace" },
  { value: "coaster", label: "Coaster" },
] as const

// Booking Types
export const BOOKING_TYPES = [
  { value: "wedding", label: "Wedding" },
  { value: "trip", label: "Trip/Tour" },
  { value: "airport", label: "Airport Transfer" },
  { value: "corporate", label: "Corporate Event" },
] as const

// Booking Status
export const BOOKING_STATUS = {
  requested: { label: "Requested", color: "bg-warning text-warning-foreground" },
  confirmed: { label: "Confirmed", color: "bg-success text-success-foreground" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", color: "bg-destructive text-destructive-foreground" },
} as const

// Payment Status
export const PAYMENT_STATUS = {
  pending: { label: "Pending", color: "bg-warning text-warning-foreground" },
  advance_paid: { label: "Advance Paid", color: "bg-accent text-accent-foreground" },
  paid: { label: "Paid", color: "bg-success text-success-foreground" },
} as const

// Dealer Status
export const DEALER_STATUS = {
  pending: { label: "Pending Approval", color: "bg-warning text-warning-foreground" },
  approved: { label: "Approved", color: "bg-success text-success-foreground" },
  suspended: { label: "Suspended", color: "bg-destructive text-destructive-foreground" },
} as const

// WhatsApp Config
export const WHATSAPP_BUSINESS_NUMBER = "+923001234567" // Replace with actual number
export const WHATSAPP_BASE_URL = "https://wa.me"

// Cities
export const CITIES = ["Karachi"] as const

// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
