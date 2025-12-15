"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Ban, Eye } from "lucide-react"
import { API_BASE_URL } from "@/lib/constants"
import { AuthService } from "@/lib/auth"

interface VehicleActionsProps {
  vehicleId: string
  isVerified: boolean
  isActive: boolean
}

export function VehicleActions({ vehicleId, isVerified, isActive }: VehicleActionsProps) {
  const [loading, setLoading] = useState(false)

  const verifyVehicle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/admin/vehicles/${vehicleId}/verify`, {
        method: "PUT",
        headers: AuthService.getAuthHeaders(),
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to verify vehicle:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/admin/vehicles/${vehicleId}`, {
        method: "PUT",
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify({ is_active: !isActive }),
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to toggle vehicle status:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      {!isVerified && (
        <Button onClick={verifyVehicle} disabled={loading} size="sm">
          <Check className="mr-2 h-4 w-4" />
          Verify Vehicle
        </Button>
      )}
      <Button onClick={toggleActive} variant={isActive ? "destructive" : "outline"} disabled={loading} size="sm">
        <Ban className="mr-2 h-4 w-4" />
        {isActive ? "Disable" : "Enable"}
      </Button>
      <Button variant="outline" size="sm">
        <Eye className="mr-2 h-4 w-4" />
        View Details
      </Button>
    </div>
  )
}
