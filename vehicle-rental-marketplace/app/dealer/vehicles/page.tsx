import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

// Mock data
const vehicles = [
  {
    _id: "v1",
    title: "Toyota Corolla 2023 - Luxury Sedan",
    category: "sedan",
    price_per_day: 8000,
    description: "Well-maintained luxury sedan perfect for weddings and corporate events",
    photos: ["/toyota-corolla-2023.jpg"],
    is_verified: true,
    is_active: true,
  },
  {
    _id: "v2",
    title: "Honda Civic 2024 - Premium Wedding Car",
    category: "sedan",
    price_per_day: 12000,
    description: "Decorated wedding car with professional driver",
    photos: ["/honda-civic-wedding-car.jpg"],
    is_verified: false,
    is_active: true,
  },
]

export default function DealerVehiclesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Vehicles</h1>
          <p className="text-muted-foreground">Manage your vehicle fleet</p>
        </div>
        <Button asChild>
          <Link href="/dealer/vehicles/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle._id} className="overflow-hidden">
            <div className="relative h-48 w-full bg-muted">
              <Image
                src={vehicle.photos[0] || "/placeholder.svg?height=200&width=400"}
                alt={vehicle.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="line-clamp-1 text-lg">{vehicle.title}</CardTitle>
                <div className="flex shrink-0 gap-1">
                  <Badge variant={vehicle.is_verified ? "default" : "secondary"} className="text-xs">
                    {vehicle.is_verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{vehicle.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price per day</p>
                  <p className="text-lg font-bold">{formatCurrency(vehicle.price_per_day)}</p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {vehicle.category}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                <Link href={`/dealer/vehicles/${vehicle._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/dealer/vehicles/${vehicle._id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
