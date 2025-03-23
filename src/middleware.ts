import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/utils/auth';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { schema } from '@/db/schema';

export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl;
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    const isAuthPage = ['/login', '/register'].includes(pathname);
    const isLandingPage = pathname === '/';
    const isDashboardPage = pathname.startsWith('/dashboard');
    const isOnboardingPage = pathname === '/dashboard/onboarding';

    if (userId) {
        if (isAuthPage || isLandingPage) {
            const user = await db.select().from(schema.user).where(eq(schema.user.id, userId)).then(res => res[0]);
            return NextResponse.redirect(new URL(user?.onboardingComplete ? '/dashboard' : '/dashboard/onboarding', origin));
        }
        if (isDashboardPage && !isOnboardingPage) {
            const user = await db.select().from(schema.user).where(eq(schema.user.id, userId)).then(res => res[0]);
            if (!user?.onboardingComplete) return NextResponse.redirect(new URL('/dashboard/onboarding', origin));
        }
        if (isOnboardingPage) {
            const user = await db.select().from(schema.user).where(eq(schema.user.id, userId)).then(res => res[0]);
            if (user?.onboardingComplete) return NextResponse.redirect(new URL('/dashboard', origin));
        }
    } else if (isDashboardPage) {
        return NextResponse.redirect(new URL('/login', origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/login', '/register'],
};
