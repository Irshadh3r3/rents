import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DealerSidebar } from "@/components/dealer-sidebar"

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard allowedRoles={["dealer"]}>
      <div className="flex min-h-screen">
        <DealerSidebar />
        <main className="flex-1 bg-muted/30">{children}</main>
      </div>
    </AuthGuard>
  )
}
