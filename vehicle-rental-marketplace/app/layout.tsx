import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Karachi Rides - Vehicle Rental with Driver",
  description:
    "Rent verified vehicles with professional drivers in Karachi for weddings, trips, airport transfers, and corporate events",
  generator: "v0.app",
  manifest: "/manifest.json",
  keywords: ["Karachi vehicle rental", "car rental Karachi", "wedding cars", "driver service", "Pakistan car hire"],
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-512.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#064E3B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
