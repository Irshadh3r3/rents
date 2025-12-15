"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import type { UserRole } from "@/lib/types"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function AuthGuard({ children, allowedRoles, redirectTo = "/login" }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = AuthService.getUser()

    if (!user) {
      router.push(redirectTo)
      return
    }

    // Check if user role is allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized")
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router, allowedRoles, redirectTo])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
