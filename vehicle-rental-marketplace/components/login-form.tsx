"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthService, formatPhoneNumber, isValidPakistanPhone } from "@/lib/auth"
import { Phone, Lock } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (!isValidPakistanPhone(phone)) {
      setError("Please enter a valid Pakistan phone number (03xx-xxxxxxx)")
      return
    }

    setLoading(true)
    const formattedPhone = formatPhoneNumber(phone)
    const result = await AuthService.sendOTP(formattedPhone)

    setLoading(false)

    if (result.success) {
      setMessage("OTP sent to your phone!")
      setStep("otp")
    } else {
      setError(result.message)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP")
      return
    }

    setLoading(true)
    const formattedPhone = formatPhoneNumber(phone)
    const result = await AuthService.verifyOTP(formattedPhone, otp)

    setLoading(false)

    if (result.success && result.user) {
      // Redirect based on role
      switch (result.user.role) {
        case "admin":
          router.push("/admin")
          break
        case "dealer":
          router.push("/dealer")
          break
        case "customer":
          router.push("/dashboard")
          break
        default:
          router.push("/")
      }
    } else {
      setError(result.message || "Invalid OTP. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to Karachi Rides</CardTitle>
        <CardDescription>
          {step === "phone" ? "Enter your phone number to receive an OTP" : "Enter the OTP sent to your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {message && (
          <Alert className="mb-4 border-success bg-success/10 text-success">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {step === "phone" ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03xx-xxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-muted-foreground">Enter your Pakistan mobile number</p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="pl-10 text-center text-lg tracking-widest"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setStep("phone")
                  setOtp("")
                  setError("")
                  setMessage("")
                }}
                disabled={loading}
              >
                Change Number
              </Button>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Login"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
