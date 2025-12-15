"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Ban, Edit } from "lucide-react"
import { API_BASE_URL } from "@/lib/constants"
import { AuthService } from "@/lib/auth"
import type { DealerStatus } from "@/lib/types"

interface DealerActionsProps {
  dealerId: string
  currentStatus: DealerStatus
}

export function DealerActions({ dealerId, currentStatus }: DealerActionsProps) {
  const [loading, setLoading] = useState(false)
  const [commissionRate, setCommissionRate] = useState("10")
  const [openEdit, setOpenEdit] = useState(false)

  const updateDealerStatus = async (status: DealerStatus) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dealers/${dealerId}/${status}`, {
        method: "PUT",
        headers: AuthService.getAuthHeaders(),
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to update dealer status:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateCommission = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dealers/${dealerId}`, {
        method: "PUT",
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify({ commission_rate: Number.parseFloat(commissionRate) }),
      })

      if (response.ok) {
        setOpenEdit(false)
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to update commission:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {currentStatus === "pending" && (
        <Button onClick={() => updateDealerStatus("approved")} disabled={loading} size="sm">
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
      )}
      {currentStatus === "approved" && (
        <Button onClick={() => updateDealerStatus("suspended")} variant="destructive" disabled={loading} size="sm">
          <Ban className="mr-2 h-4 w-4" />
          Suspend
        </Button>
      )}
      {currentStatus === "suspended" && (
        <Button onClick={() => updateDealerStatus("approved")} variant="outline" disabled={loading} size="sm">
          <Check className="mr-2 h-4 w-4" />
          Reactivate
        </Button>
      )}

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Dealer</DialogTitle>
            <DialogDescription>Update dealer settings and commission rate</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button onClick={updateCommission} disabled={loading}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
