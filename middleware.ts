import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Ensure default localization cookies are set if missing
  if (!request.cookies.has('language')) {
    response.cookies.set('language', 'en')
  }
  if (!request.cookies.has('currency')) {
    response.cookies.set('currency', 'USD')
  }

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
