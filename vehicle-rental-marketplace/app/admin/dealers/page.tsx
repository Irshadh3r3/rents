import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DealerActions } from "@/components/dealer-actions"
import { DEALER_STATUS } from "@/lib/constants"

// Mock data - in real app, fetch from API
const dealers = [
  {
    _id: "1",
    business_name: "Elite Rent A Car",
    user_id: "u1",
    cnic: "42101-1234567-8",
    address: "DHA Phase 5, Karachi",
    status: "pending" as const,
    commission_rate: 10,
    created_at: new Date("2024-01-15"),
    phone: "+923001234567",
    vehicles_count: 0,
  },
  {
    _id: "2",
    business_name: "Premium Cars Karachi",
    user_id: "u2",
    cnic: "42101-2345678-9",
    address: "Clifton Block 2, Karachi",
    status: "approved" as const,
    commission_rate: 8,
    created_at: new Date("2024-01-10"),
    phone: "+923002345678",
    vehicles_count: 12,
  },
  {
    _id: "3",
    business_name: "Royal Wedding Cars",
    user_id: "u3",
    cnic: "42101-3456789-0",
    address: "Gulshan-e-Iqbal, Karachi",
    status: "approved" as const,
    commission_rate: 10,
    created_at: new Date("2024-01-05"),
    phone: "+923003456789",
    vehicles_count: 8,
  },
]

export default function AdminDealersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dealers</h1>
          <p className="text-muted-foreground">Manage dealer accounts and approvals</p>
        </div>
        <Button>Export Report</Button>
      </div>

      <div className="grid gap-4">
        {dealers.map((dealer) => (
          <Card key={dealer._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{dealer.business_name}</CardTitle>
                  <CardDescription>
                    CNIC: {dealer.cnic} • Phone: {dealer.phone}
                  </CardDescription>
                </div>
                <Badge className={DEALER_STATUS[dealer.status].color}>{DEALER_STATUS[dealer.status].label}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{dealer.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commission Rate</p>
                  <p className="font-medium">{dealer.commission_rate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicles</p>
                  <p className="font-medium">{dealer.vehicles_count} active</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">{new Date(dealer.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <DealerActions dealerId={dealer._id} currentStatus={dealer.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
