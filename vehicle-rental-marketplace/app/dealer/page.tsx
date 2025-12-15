import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Calendar, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function DealerDashboardPage() {
  // Mock stats - in real app, fetch from API
  const stats = [
    {
      title: "Total Vehicles",
      value: "12",
      description: "8 active, 4 pending",
      icon: Car,
    },
    {
      title: "Active Bookings",
      value: "5",
      description: "3 confirmed, 2 requested",
      icon: Calendar,
    },
    {
      title: "This Month Revenue",
      value: "PKR 240K",
      description: "+15% from last month",
      icon: TrendingUp,
    },
    {
      title: "Pending Actions",
      value: "3",
      description: "Respond to requests",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
        </div>
        <Button asChild>
          <Link href="/dealer/vehicles/new">Add New Vehicle</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking requests for your vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Wedding Booking</p>
                  <p className="text-sm text-muted-foreground">Toyota Corolla • Feb 1-3, 2024</p>
                </div>
                <span className="rounded-full bg-warning px-2 py-1 text-xs font-medium text-warning-foreground">
                  Requested
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Corporate Event</p>
                  <p className="text-sm text-muted-foreground">Honda Civic • Jan 28-30, 2024</p>
                </div>
                <span className="rounded-full bg-success px-2 py-1 text-xs font-medium text-success-foreground">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Airport Transfer</p>
                  <p className="text-sm text-muted-foreground">Toyota Corolla • Jan 25, 2024</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  Completed
                </span>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
              <Link href="/dealer/bookings">View All Bookings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Performance</CardTitle>
            <CardDescription>Your most popular vehicles this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Toyota Corolla 2023</p>
                  <p className="text-sm text-muted-foreground">8 bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">PKR 96K</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Honda Civic 2024</p>
                  <p className="text-sm text-muted-foreground">5 bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">PKR 60K</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Hiace 2022</p>
                  <p className="text-sm text-muted-foreground">3 bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">PKR 45K</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
