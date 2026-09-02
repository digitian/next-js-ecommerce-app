import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hasSession = request.cookies.has('session')

  // 1. Protected routes: redirect unauthenticated users to login with callbackUrl
  const isProtectedRoute = pathname.startsWith('/account')
  if (isProtectedRoute && !hasSession) {
    const callbackUrl = encodeURIComponent(`${pathname}${search}`)
    const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Auth routes: redirect authenticated users away from login/register
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password')
  if (isAuthRoute && hasSession) {
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }

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

