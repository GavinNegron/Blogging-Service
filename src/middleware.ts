import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const session = getSessionCookie(request);
    const pathname = request.nextUrl.pathname;

    if (session && (pathname === "/login" || pathname === "/register" || pathname === "/")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!session && pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login", "/register", "/"],
};