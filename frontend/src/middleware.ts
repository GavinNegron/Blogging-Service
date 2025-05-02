import { NextResponse, NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { fetchUserBlog } from '@/services/BlogService'
import { getCookieHeaderFromServer } from './utils/misc/getCookieHeader'
import api from './utils/api/axios.config'
import { getSubDomain } from './utils/misc/geSubDomain'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublicAsset = PUBLIC_FILE.test(pathname) || pathname.includes('_next')

  // Skip rewriting for public assets
  if (isPublicAsset) return

  // Handle subdomain rewrite
  const host = req.headers.get('host')
  const subdomain = getSubDomain(host)
  if (subdomain && !pathname.startsWith('/blogs/')) {
    const url = req.nextUrl.clone()
    url.pathname = `/blogs/${subdomain}${pathname}`
    return NextResponse.rewrite(url)
  }

  // Session check
  const cookieHeader = await getCookieHeaderFromServer()
  const session = await api.get('/api/auth/get-session', {
    headers: { cookie: cookieHeader }
  }).catch(() => null)

  const userId = session?.data?.user?.id

  if (!userId) {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return
  }

  const user = await fetchUserBlog(userId)

  // Redirect to onboarding if user is not complete
  if ((!user || !user.onboardingComplete) &&
      pathname.startsWith('/dashboard') &&
      pathname !== '/dashboard/onboarding') {
    return NextResponse.redirect(new URL('/dashboard/onboarding', req.url))
  }

  // Redirect away from onboarding if already complete
  if (user?.onboardingComplete && pathname === '/dashboard/onboarding') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Authenticated user visiting auth pages
  if (getSessionCookie(req) && ['/login', '/register', '/'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return
}

export const config = {
  matcher: ['/:path*']
}
