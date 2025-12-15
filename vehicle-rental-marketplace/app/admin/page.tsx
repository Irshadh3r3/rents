import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, Calendar, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  // In a real app, fetch these stats from API
  const stats = [
    {
      title: "Total Dealers",
      value: "24",
      description: "3 pending approval",
      icon: Users,
      trend: "+2 this week",
    },
    {
      title: "Active Vehicles",
      value: "156",
      description: "12 pending verification",
      icon: Car,
      trend: "+8 this month",
    },
    {
      title: "Bookings",
      value: "89",
      description: "15 awaiting confirmation",
      icon: Calendar,
      trend: "+23% from last month",
    },
    {
      title: "Revenue",
      value: "PKR 2.4M",
      description: "This month",
      icon: TrendingUp,
      trend: "+18% from last month",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your marketplace</p>
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
                <p className="mt-1 text-xs text-success">{stat.trend}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Dealer Approvals</p>
                  <p className="text-sm text-muted-foreground">3 dealers waiting for approval</p>
                </div>
                <span className="rounded-full bg-warning px-2 py-1 text-xs font-medium text-warning-foreground">3</span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Vehicle Verification</p>
                  <p className="text-sm text-muted-foreground">12 vehicles need verification</p>
                </div>
                <span className="rounded-full bg-warning px-2 py-1 text-xs font-medium text-warning-foreground">
                  12
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Requests</p>
                  <p className="text-sm text-muted-foreground">15 bookings awaiting confirmation</p>
                </div>
                <span className="rounded-full bg-warning px-2 py-1 text-xs font-medium text-warning-foreground">
                  15
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <Calendar className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New booking request</p>
                  <p className="text-xs text-muted-foreground">Wedding booking for Toyota Corolla</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New dealer registration</p>
                  <p className="text-xs text-muted-foreground">Elite Rent A Car</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                  <Car className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Vehicle added</p>
                  <p className="text-xs text-muted-foreground">Honda Civic 2023 - Pending verification</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
