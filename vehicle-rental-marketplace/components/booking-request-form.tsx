"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "lucide-react"
import { BOOKING_TYPES } from "@/lib/constants"
import { calculateDuration, formatCurrency } from "@/lib/utils"
import { AuthService } from "@/lib/auth"
import { API_BASE_URL } from "@/lib/constants"

interface BookingRequestFormProps {
  vehicleId: string
  vehicleTitle: string
  pricePerDay: number
}

export function BookingRequestForm({ vehicleId, vehicleTitle, pricePerDay }: BookingRequestFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)

  const calculateTotal = (start: string, end: string) => {
    if (start && end) {
      const duration = calculateDuration(new Date(start), new Date(end))
      setTotalPrice(duration * pricePerDay)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    // Check if user is logged in
    if (!AuthService.isAuthenticated()) {
      router.push("/login")
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      vehicle_id: vehicleId,
      booking_type: formData.get("booking_type"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/request`, {
        method: "POST",
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/dashboard?booking=success")
      } else {
        setError("Failed to submit booking request. Please try again.")
      }
    } catch (err) {
      setError("Failed to submit booking request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Request Booking</CardTitle>
        <CardDescription>Fill in your booking details</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking_type">Booking Type</Label>
            <Select name="booking_type" required disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="start_date"
                name="start_date"
                type="date"
                className="pl-10"
                min={new Date().toISOString().split("T")[0]}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  calculateTotal(e.target.value, endDate)
                }}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date">End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="end_date"
                name="end_date"
                type="date"
                className="pl-10"
                min={startDate || new Date().toISOString().split("T")[0]}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  calculateTotal(startDate, e.target.value)
                }}
                required
                disabled={loading}
              />
            </div>
          </div>

          {totalPrice > 0 && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Total</span>
                <span className="text-2xl font-bold">{formatCurrency(totalPrice)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {calculateDuration(new Date(startDate), new Date(endDate))} days × {formatCurrency(pricePerDay)}/day
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Request Booking"}
          </Button>

          <p className="text-xs text-muted-foreground">
            Admin will review and confirm your booking request. You'll be notified via WhatsApp.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
