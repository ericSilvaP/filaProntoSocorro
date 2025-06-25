import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const role = request.cookies.get('userRole')?.value

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url)) // volta pro login
  }

  return NextResponse.next()
}

// Define onde o middleware deve rodar
export const config = {
  matcher: ["/:path*"],
}
