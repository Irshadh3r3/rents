import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VehicleActions } from "@/components/vehicle-actions"
import { formatCurrency } from "@/lib/utils"

// Mock data - in real app, fetch from API
const vehicles = [
  {
    _id: "v1",
    dealer_id: "2",
    dealer_name: "Premium Cars Karachi",
    title: "Toyota Corolla 2023 - Luxury Sedan",
    category: "sedan" as const,
    city: "Karachi" as const,
    price_per_day: 8000,
    with_driver: true,
    description: "Well-maintained luxury sedan perfect for weddings and corporate events",
    photos: ["/toyota-corolla-2023.jpg"],
    is_verified: false,
    is_active: true,
    created_at: new Date("2024-01-20"),
  },
  {
    _id: "v2",
    dealer_id: "3",
    dealer_name: "Royal Wedding Cars",
    title: "Honda Civic 2024 - Premium Wedding Car",
    category: "sedan" as const,
    city: "Karachi" as const,
    price_per_day: 12000,
    with_driver: true,
    description: "Decorated wedding car with professional driver",
    photos: ["/honda-civic-wedding-car.jpg"],
    is_verified: true,
    is_active: true,
    created_at: new Date("2024-01-18"),
  },
]

export default function AdminVehiclesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicles</h1>
          <p className="text-muted-foreground">Verify and manage vehicle listings</p>
        </div>
      </div>

      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{vehicle.title}</CardTitle>
                  <CardDescription>By {vehicle.dealer_name}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={vehicle.is_verified ? "default" : "secondary"}>
                    {vehicle.is_verified ? "Verified" : "Pending"}
                  </Badge>
                  <Badge variant={vehicle.is_active ? "default" : "secondary"}>
                    {vehicle.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">{vehicle.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price per Day</p>
                    <p className="font-medium">{formatCurrency(vehicle.price_per_day)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Listed</p>
                    <p className="font-medium">{new Date(vehicle.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{vehicle.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <VehicleActions vehicleId={vehicle._id} isVerified={vehicle.is_verified} isActive={vehicle.is_active} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
