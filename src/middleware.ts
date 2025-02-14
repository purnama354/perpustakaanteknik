import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value
  const authPath = request.nextUrl.pathname.startsWith("/admin/auth")
  const adminPath = request.nextUrl.pathname.startsWith("/admin")

  // Always allow access to admin auth pages (login/register)
  if (authPath) {
    return NextResponse.next()
  }

  // Protect admin routes - redirect to login if not authenticated
  if (adminPath && role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // if (adminPath && role !== "admin") {
  //   return NextResponse.redirect(new URL("/admin/auth/login", request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
