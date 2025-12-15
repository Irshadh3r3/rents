import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingActions } from "@/components/booking-actions"
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/lib/constants"
import { formatCurrency, formatDate } from "@/lib/utils"

// Mock data
const bookings = [
  {
    _id: "b1",
    customer_name: "Ahmed Khan",
    customer_phone: "+923001234567",
    vehicle_title: "Toyota Corolla 2023",
    dealer_name: "Premium Cars Karachi",
    booking_type: "wedding" as const,
    start_date: new Date("2024-02-01"),
    end_date: new Date("2024-02-03"),
    duration_days: 3,
    total_price: 24000,
    status: "requested" as const,
    payment_status: "pending" as const,
    admin_notes: "",
    created_at: new Date("2024-01-25"),
  },
]

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground">Manage and confirm booking requests</p>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{booking.vehicle_title}</CardTitle>
                  <CardDescription>
                    {booking.customer_name} • {booking.customer_phone}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={BOOKING_STATUS[booking.status].color}>{BOOKING_STATUS[booking.status].label}</Badge>
                  <Badge className={PAYMENT_STATUS[booking.payment_status].color}>
                    {PAYMENT_STATUS[booking.payment_status].label}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Dealer</p>
                  <p className="font-medium">{booking.dealer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{booking.booking_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {formatDate(booking.start_date)} - {formatDate(booking.end_date)} ({booking.duration_days} days)
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-lg font-bold">{formatCurrency(booking.total_price)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Requested</p>
                  <p className="font-medium">{formatDate(booking.created_at)}</p>
                </div>
              </div>
              <div className="mt-4">
                <BookingActions bookingId={booking._id} currentStatus={booking.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
