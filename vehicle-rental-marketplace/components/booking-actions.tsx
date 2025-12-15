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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, CheckCheck } from "lucide-react"
import { API_BASE_URL } from "@/lib/constants"
import { AuthService } from "@/lib/auth"
import type { BookingStatus } from "@/lib/types"

interface BookingActionsProps {
  bookingId: string
  currentStatus: BookingStatus
}

export function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const [loading, setLoading] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [openNotes, setOpenNotes] = useState(false)

  const updateBookingStatus = async (status: BookingStatus) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}/${status}`, {
        method: "PUT",
        headers: AuthService.getAuthHeaders(),
        body: JSON.stringify({ admin_notes: adminNotes }),
      })

      if (response.ok) {
        setOpenNotes(false)
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to update booking:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      {currentStatus === "requested" && (
        <>
          <Dialog open={openNotes} onOpenChange={setOpenNotes}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Check className="mr-2 h-4 w-4" />
                Confirm Booking
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Booking</DialogTitle>
                <DialogDescription>Add any notes before confirming this booking</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Admin Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any special instructions or notes..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNotes(false)}>
                  Cancel
                </Button>
                <Button onClick={() => updateBookingStatus("confirmed")} disabled={loading}>
                  Confirm & Notify
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={() => updateBookingStatus("cancelled")} variant="destructive" size="sm" disabled={loading}>
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </>
      )}
      {currentStatus === "confirmed" && (
        <Button onClick={() => updateBookingStatus("completed")} variant="outline" size="sm" disabled={loading}>
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark Complete
        </Button>
      )}
    </div>
  )
}
