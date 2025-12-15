"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VEHICLE_CATEGORIES } from "@/lib/constants"
import { API_BASE_URL } from "@/lib/constants"
import { AuthService } from "@/lib/auth"

export default function NewVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      price_per_day: Number(formData.get("price_per_day")),
      description: formData.get("description"),
      photos: [], // In real app, handle file uploads
    }

    try {
      const response = await fetch(`${API_BASE_URL}/vehicles`, {
        method: "POST",
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/dealer/vehicles")
      } else {
        setError("Failed to add vehicle. Please try again.")
      }
    } catch (err) {
      setError("Failed to add vehicle. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Vehicle</h1>
        <p className="text-muted-foreground">List a new vehicle for rent</p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>Enter the details of your vehicle. Admin will verify before listing.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Vehicle Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Toyota Corolla 2023 - Luxury Sedan"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_per_day">Price Per Day (PKR)</Label>
              <Input
                id="price_per_day"
                name="price_per_day"
                type="number"
                min="0"
                step="100"
                placeholder="8000"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your vehicle, its features, and condition..."
                rows={4}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Photos</Label>
              <Input type="file" multiple accept="image/*" disabled={loading} />
              <p className="text-xs text-muted-foreground">Upload up to 5 photos of your vehicle</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Vehicle"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
