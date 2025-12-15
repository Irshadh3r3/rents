"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AuthService } from "@/lib/auth"
import { DEALER_STATUS } from "@/lib/constants"

export default function DealerProfilePage() {
  const [user, setUser] = useState(AuthService.getUser())

  // Mock dealer data - in real app, fetch from API
  const dealer = {
    business_name: "Premium Cars Karachi",
    cnic: "42101-2345678-9",
    address: "Clifton Block 2, Karachi",
    status: "approved" as const,
    commission_rate: 8,
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your business profile</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <p className="mt-1 font-medium">{user?.name}</p>
            </div>
            <div>
              <Label>Phone Number</Label>
              <p className="mt-1 font-medium">{user?.phone}</p>
            </div>
            <div>
              <Label>Account Status</Label>
              <div className="mt-1">
                <Badge className={DEALER_STATUS[dealer.status].color}>{DEALER_STATUS[dealer.status].label}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Your business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business_name">Business Name</Label>
              <Input id="business_name" defaultValue={dealer.business_name} />
            </div>
            <div>
              <Label htmlFor="cnic">CNIC</Label>
              <Input id="cnic" defaultValue={dealer.cnic} disabled />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue={dealer.address} rows={3} />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Details</CardTitle>
          <CardDescription>Platform commission on your bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Commission Rate</p>
                <p className="text-2xl font-bold">{dealer.commission_rate}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">You Keep</p>
                <p className="text-2xl font-bold">{100 - dealer.commission_rate}%</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              For every booking, you keep {100 - dealer.commission_rate}% and Karachi Rides takes{" "}
              {dealer.commission_rate}% as platform fee.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
