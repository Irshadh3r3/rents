import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/vehicles"]
  const isPublicPath = publicPaths.some((p) => path.startsWith(p))

  // If accessing protected route without token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing login with token, redirect to appropriate dashboard
  if (path === "/login" && token) {
    // In a real app, decode token to get role
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon-.*\\.png|manifest.json).*)"],
}
