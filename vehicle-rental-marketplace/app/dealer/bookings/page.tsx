import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/lib/constants"
import { formatCurrency, formatDate, getWhatsAppLink } from "@/lib/utils"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const bookings = [
  {
    _id: "b1",
    customer_name: "Ahmed Khan",
    customer_phone: "+923001234567",
    vehicle_title: "Toyota Corolla 2023",
    booking_type: "wedding" as const,
    start_date: new Date("2024-02-01"),
    end_date: new Date("2024-02-03"),
    duration_days: 3,
    total_price: 24000,
    status: "requested" as const,
    payment_status: "pending" as const,
    created_at: new Date("2024-01-25"),
  },
  {
    _id: "b2",
    customer_name: "Sara Ali",
    customer_phone: "+923009876543",
    vehicle_title: "Honda Civic 2024",
    booking_type: "corporate" as const,
    start_date: new Date("2024-01-28"),
    end_date: new Date("2024-01-30"),
    duration_days: 3,
    total_price: 36000,
    status: "confirmed" as const,
    payment_status: "advance_paid" as const,
    created_at: new Date("2024-01-20"),
  },
]

export default function DealerBookingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground">Manage customer bookings for your vehicles</p>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{booking.vehicle_title}</CardTitle>
                  <CardDescription>
                    Customer: {booking.customer_name} • {booking.customer_phone}
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
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Booking Type</p>
                  <p className="font-medium capitalize">{booking.booking_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {formatDate(booking.start_date)} - {formatDate(booking.end_date)} ({booking.duration_days} days)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold">{formatCurrency(booking.total_price)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Requested On</p>
                  <p className="font-medium">{formatDate(booking.created_at)}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm">
                  <Link
                    href={getWhatsAppLink(
                      booking.customer_phone,
                      `Hello ${booking.customer_name}, regarding your ${booking.booking_type} booking for ${booking.vehicle_title}...`,
                    )}
                    target="_blank"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Customer
                  </Link>
                </Button>
                {booking.status === "requested" && (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
