import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { fetchUserBlog } from '@/services/BlogService'
import { getCookieHeaderFromServer } from './utils/getCookieHeader'
import api from './utils/axios.config'

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null
  if (!host && typeof window !== 'undefined') {
    host = window.location.host
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0]
    if (candidate && !candidate.includes('localhost')) {
      subdomain = candidate
    }
  }
  return subdomain
}

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const cookieHeader = await getCookieHeaderFromServer()

  const session = await api.get('/api/auth/get-session', {
    headers: {
      cookie: cookieHeader,
    },
  })

  const userId = session.data?.user?.id

  const user = await fetchUserBlog(userId)

  const path = req.nextUrl.pathname

  if (
    user?.onboardingComplete &&
    path.startsWith('/dashboard/onboarding')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (
    !user?.onboardingComplete &&
    path.startsWith('/dashboard') &&
    path !== '/dashboard/onboarding'
  ) {
    return NextResponse.redirect(new URL('/dashboard/onboarding', req.url))
  }

  const url = req.nextUrl.clone()
  const { pathname } = url

  if (PUBLIC_FILE.test(pathname) || pathname.includes('_next')) {
    return
  }

  const host = req.headers.get('host')
  const subdomain = getValidSubdomain(host)
  if (subdomain) {
    url.pathname = `/blogs/${subdomain}${url.pathname}`
  }

  const cookies = getSessionCookie(req)

  if (cookies) {
    if (pathname === '/login' || pathname === '/register' || pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  if (!cookies && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register', '/dashboard/onboarding/:path*'],
}