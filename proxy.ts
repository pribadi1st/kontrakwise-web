import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('bearer_token')?.value

  // If user is logged in and trying to access login or landing page
  if (token && (pathname === '/login' || pathname === '/')) {
    return NextResponse.redirect(new URL('/documents', request.url))
  }

  // If user is not logged in and trying to access protected routes
  if (!token && pathname.startsWith('/documents')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
