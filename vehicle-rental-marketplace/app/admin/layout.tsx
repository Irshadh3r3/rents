import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-muted/30">{children}</main>
      </div>
    </AuthGuard>
  )
}
