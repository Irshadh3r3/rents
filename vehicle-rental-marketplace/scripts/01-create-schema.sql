-- Users Collection Schema (MongoDB)
-- This file documents the schema structure for reference
-- Actual collections will be created by the backend API

/*
Users Collection:
{
  _id: ObjectId,
  name: String (required),
  phone: String (required, unique, indexed),
  role: String (enum: ['admin', 'dealer', 'customer']),
  is_verified: Boolean (default: false),
  created_at: Date
}

Dealers Collection:
{
  _id: ObjectId,
  user_id: ObjectId (ref: Users),
  business_name: String (required),
  cnic: String (required),
  address: String (required),
  status: String (enum: ['pending', 'approved', 'suspended']),
  commission_rate: Number (default: 10),
  created_at: Date
}

Vehicles Collection:
{
  _id: ObjectId,
  dealer_id: ObjectId (ref: Dealers),
  title: String (required),
  category: String (enum: ['sedan', 'suv', 'hiace', 'coaster']),
  city: String (default: 'Karachi'),
  price_per_day: Number (required),
  with_driver: Boolean (default: true),
  description: String,
  photos: [String],
  is_verified: Boolean (default: false),
  is_active: Boolean (default: true),
  created_at: Date
}

Drivers Collection:
{
  _id: ObjectId,
  dealer_id: ObjectId (ref: Dealers),
  name: String (required),
  phone: String (required),
  license_number: String (required),
  assigned_vehicle_id: ObjectId (ref: Vehicles),
  is_verified: Boolean (default: false)
}

Bookings Collection:
{
  _id: ObjectId,
  customer_id: ObjectId (ref: Users),
  vehicle_id: ObjectId (ref: Vehicles),
  dealer_id: ObjectId (ref: Dealers),
  booking_type: String (enum: ['wedding', 'trip', 'airport', 'corporate']),
  start_date: Date (required),
  end_date: Date (required),
  duration_days: Number,
  total_price: Number,
  status: String (enum: ['requested', 'confirmed', 'completed', 'cancelled']),
  payment_status: String (enum: ['pending', 'advance_paid', 'paid']),
  admin_notes: String,
  created_at: Date
}

Payments Collection:
{
  _id: ObjectId,
  booking_id: ObjectId (ref: Bookings),
  amount: Number (required),
  method: String (enum: ['cash', 'jazzcash', 'easypaisa']),
  status: String (enum: ['pending', 'completed', 'failed']),
  created_at: Date
}

Disputes Collection:
{
  _id: ObjectId,
  booking_id: ObjectId (ref: Bookings),
  issue_type: String (required),
  description: String (required),
  resolution: String,
  resolved_by: ObjectId (ref: Users),
  created_at: Date
}

Indexes:
- Users: phone (unique)
- Vehicles: dealer_id, category, city, is_verified, is_active
- Bookings: customer_id, dealer_id, vehicle_id, status
- Drivers: dealer_id
*/
