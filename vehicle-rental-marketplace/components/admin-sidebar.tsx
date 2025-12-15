"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/user-nav"
import { LayoutDashboard, Users, Car, Calendar, AlertCircle, Settings } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dealers", label: "Dealers", icon: Users },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/disputes", label: "Disputes", icon: AlertCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Karachi Rides</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Admin Panel</p>
            <p className="text-xs text-muted-foreground">Full Control</p>
          </div>
          <UserNav />
        </div>
      </div>
    </aside>
  )
}
