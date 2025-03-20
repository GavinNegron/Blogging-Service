import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/utils/auth';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { schema } from '@/db/schema';

export async function middleware(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    const isAuthPage = ['/login', '/register'].includes(req.nextUrl.pathname);
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
    const isOnboardingPage = req.nextUrl.pathname === '/dashboard/onboarding';

    if (session?.user?.id && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!session?.user?.id && isDashboardPage) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (session?.user?.id && isDashboardPage) {
        const user = await db
            .select()
            .from(schema.user)
            .where(eq(schema.user.id, session.user.id))
            .then((res) => res[0]);

        if (!user?.onboardingComplete && !isOnboardingPage) {
            return NextResponse.redirect(new URL('/dashboard/onboarding', req.url));
        }

        if (user?.onboardingComplete && isOnboardingPage) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};