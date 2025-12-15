import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Shield, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

// Mock featured vehicles
const featuredVehicles = [
  {
    _id: "v1",
    title: "Toyota Corolla 2023",
    category: "sedan",
    price_per_day: 8000,
    photos: ["/toyota-corolla-2023.jpg"],
    is_verified: true,
  },
  {
    _id: "v2",
    title: "Honda Civic 2024",
    category: "sedan",
    price_per_day: 12000,
    photos: ["/honda-civic-wedding-car.jpg"],
    is_verified: true,
  },
]

export default function HomePage() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Rent Verified Vehicles with Professional Drivers in Karachi
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Perfect for weddings, corporate events, airport transfers, and trips. All vehicles are verified with
              experienced drivers.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/vehicles">Browse Vehicles</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Become a Dealer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Karachi Rides?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Verified Vehicles & Drivers</CardTitle>
                <CardDescription>
                  All vehicles and drivers are thoroughly verified by our admin team for your safety
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Manual Approval Process</CardTitle>
                <CardDescription>
                  Every booking is manually confirmed by admin to ensure quality and reliability
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageCircle className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>WhatsApp Support</CardTitle>
                <CardDescription>Direct communication with dealers and instant support via WhatsApp</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Vehicles</h2>
            <Button variant="outline" asChild>
              <Link href="/vehicles">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <Card key={vehicle._id} className="overflow-hidden">
                <div className="relative h-48 w-full bg-muted">
                  <Image
                    src={vehicle.photos[0] || "/placeholder.svg"}
                    alt={vehicle.title}
                    fill
                    className="object-cover"
                  />
                  {vehicle.is_verified && (
                    <Badge className="absolute right-2 top-2 bg-success text-success-foreground">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{vehicle.title}</CardTitle>
                  <CardDescription className="capitalize">{vehicle.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-xl font-bold">{formatCurrency(vehicle.price_per_day)}/day</p>
                    </div>
                    <Button asChild>
                      <Link href={`/vehicles/${vehicle._id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Karachi Rides. All rights reserved.</p>
          <p className="mt-2">Serving Karachi with trusted vehicle rental services</p>
        </div>
      </footer>
    </div>
  )
}
