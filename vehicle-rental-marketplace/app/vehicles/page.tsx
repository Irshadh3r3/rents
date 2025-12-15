"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { VEHICLE_CATEGORIES } from "@/lib/constants"

// Mock data
const vehicles = [
  {
    _id: "v1",
    title: "Toyota Corolla 2023 - Luxury Sedan",
    category: "sedan" as const,
    price_per_day: 8000,
    description: "Well-maintained luxury sedan perfect for weddings and corporate events",
    photos: ["/toyota-corolla-2023.jpg"],
    is_verified: true,
    dealer_name: "Premium Cars Karachi",
  },
  {
    _id: "v2",
    title: "Honda Civic 2024 - Premium Wedding Car",
    category: "sedan" as const,
    price_per_day: 12000,
    description: "Decorated wedding car with professional driver",
    photos: ["/honda-civic-wedding-car.jpg"],
    is_verified: true,
    dealer_name: "Royal Wedding Cars",
  },
]

export default function VehiclesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredVehicles =
    selectedCategory === "all" ? vehicles : vehicles.filter((v) => v.category === selectedCategory)

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Available Vehicles</h1>
          <p className="text-muted-foreground">Browse our verified vehicles with professional drivers</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Category:</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {VEHICLE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{filteredVehicles.length} vehicles found</div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
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
                <CardTitle className="line-clamp-1 text-lg">{vehicle.title}</CardTitle>
                <CardDescription className="line-clamp-2">{vehicle.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">By {vehicle.dealer_name}</span>
                  <Badge variant="outline" className="capitalize">
                    {vehicle.category}
                  </Badge>
                </div>
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
      </main>
    </div>
  )
}
