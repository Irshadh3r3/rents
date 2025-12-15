"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/user-nav"
import { LayoutDashboard, Car, Calendar, User } from "lucide-react"

const navItems = [
  { href: "/dealer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dealer/vehicles", label: "My Vehicles", icon: Car },
  { href: "/dealer/bookings", label: "Bookings", icon: Calendar },
  { href: "/dealer/profile", label: "Profile", icon: User },
]

export function DealerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/dealer" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Karachi Rides</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/dealer" && pathname?.startsWith(item.href))

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
            <p className="text-sm font-medium">Dealer Portal</p>
            <p className="text-xs text-muted-foreground">Manage your fleet</p>
          </div>
          <UserNav />
        </div>
      </div>
    </aside>
  )
}
