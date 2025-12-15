"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/lib/constants"
import { formatCurrency, formatDate } from "@/lib/utils"
import { CheckCircle, Calendar, Car } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock data
const bookings = [
  {
    _id: "b1",
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
]

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams?.get("booking") === "success") {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [searchParams])

  return (
    <AuthGuard allowedRoles={["customer"]}>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Karachi Rides</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/vehicles">Browse Vehicles</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {showSuccess && (
            <Alert className="mb-6 border-success bg-success/10 text-success">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Booking request submitted successfully! Admin will review and confirm your booking.
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <p className="text-muted-foreground">Track your vehicle rental bookings</p>
          </div>

          {bookings.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Bookings Yet</CardTitle>
                <CardDescription>You haven't made any booking requests yet</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/vehicles">Browse Vehicles</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{booking.vehicle_title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(booking.start_date)} - {formatDate(booking.end_date)} ({booking.duration_days}{" "}
                          days)
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={BOOKING_STATUS[booking.status].color}>
                          {BOOKING_STATUS[booking.status].label}
                        </Badge>
                        <Badge className={PAYMENT_STATUS[booking.payment_status].color}>
                          {PAYMENT_STATUS[booking.payment_status].label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Type</p>
                        <p className="font-medium capitalize">{booking.booking_type}</p>
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
                    {booking.status === "requested" && (
                      <Alert className="mt-4">
                        <AlertDescription>
                          Your booking request is being reviewed by admin. You'll receive a WhatsApp notification once
                          confirmed.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  )
}
