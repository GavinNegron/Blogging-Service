import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const cookies = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    if (cookies) {
        if (pathname === "/login" || pathname === "/register" || pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    if (!cookies && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};