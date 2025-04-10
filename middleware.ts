import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const path = request.nextUrl.pathname;

  if (path.startsWith("/settings") && !sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    (path.startsWith("/sign-in") || path.startsWith("/sign-up")) &&
    sessionCookie
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/settings", "/sign-in", "/sign-up"],
};
