import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Shield, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { BookingRequestForm } from "@/components/booking-request-form"

// Mock data - in real app, fetch based on id
const vehicle = {
  _id: "v1",
  title: "Toyota Corolla 2023 - Luxury Sedan",
  category: "sedan" as const,
  city: "Karachi",
  price_per_day: 8000,
  description: "Well-maintained luxury sedan perfect for weddings and corporate events. Features include:",
  features: ["Professional Driver Included", "Air Conditioning", "Clean & Well-Maintained", "Fuel Included"],
  photos: ["/toyota-corolla-2023.jpg"],
  is_verified: true,
  dealer_name: "Premium Cars Karachi",
  dealer_phone: "+923002345678",
}

export default function VehicleDetailsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Karachi Rides</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/vehicles">Browse Vehicles</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/vehicles">← Back to Vehicles</Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Vehicle Details */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative h-96 w-full bg-muted">
                <Image
                  src={vehicle.photos[0] || "/placeholder.svg"}
                  alt={vehicle.title}
                  fill
                  className="object-cover"
                />
                {vehicle.is_verified && (
                  <Badge className="absolute right-4 top-4 bg-success text-success-foreground">
                    <Shield className="mr-1 h-4 w-4" />
                    Verified by Admin
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{vehicle.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {vehicle.city}
                        </span>
                        <span className="capitalize">{vehicle.category}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-3xl font-bold">{formatCurrency(vehicle.price_per_day)}</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Description</h3>
                    <p className="text-muted-foreground">{vehicle.description}</p>
                  </div>

                  <div>
                    <h3 className="mb-3 font-semibold">Features Included</h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h3 className="mb-2 font-semibold">About the Dealer</h3>
                    <p className="text-sm">
                      <span className="font-medium">{vehicle.dealer_name}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Verified dealer on Karachi Rides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <BookingRequestForm
              vehicleId={vehicle._id}
              vehicleTitle={vehicle.title}
              pricePerDay={vehicle.price_per_day}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
