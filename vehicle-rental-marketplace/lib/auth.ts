import { API_BASE_URL } from "./constants"
import type { AuthResponse, OTPRequest, OTPVerification, User } from "./types"

// Client-side auth utilities
export class AuthService {
  private static TOKEN_KEY = "auth_token"
  private static USER_KEY = "auth_user"

  // Send OTP to phone number
  static async sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone } as OTPRequest),
      })

      const data = await response.json()
      return data
    } catch (error) {
      return { success: false, message: "Failed to send OTP. Please try again." }
    }
  }

  // Verify OTP and login
  static async verifyOTP(phone: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp } as OTPVerification),
      })

      const data: AuthResponse = await response.json()

      if (data.success && data.token && data.user) {
        // Store token and user in localStorage
        this.setToken(data.token)
        this.setUser(data.user)
      }

      return data
    } catch (error) {
      return { success: false, message: "Failed to verify OTP. Please try again." }
    }
  }

  // Store token
  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token)
      // Also set as cookie for middleware
      document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
    }
  }

  // Get token
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }

  // Store user
  static setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  // Get user
  static getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(this.USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  // Logout
  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
      document.cookie = "auth_token=; path=/; max-age=0"
      window.location.href = "/login"
    }
  }

  // Check if authenticated
  static isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Get auth headers for API calls
  static getAuthHeaders(): HeadersInit {
    const token = this.getToken()
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }
}

// Format phone number for Pakistan
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "")

  // Add +92 if not present
  if (cleaned.startsWith("92")) {
    return `+${cleaned}`
  } else if (cleaned.startsWith("0")) {
    return `+92${cleaned.slice(1)}`
  } else {
    return `+92${cleaned}`
  }
}

// Validate Pakistan phone number
export function isValidPakistanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "")
  // Pakistan numbers: +92 followed by 10 digits (3xx-xxxxxxx)
  return /^(92|0)?3\d{9}$/.test(cleaned)
}
