import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./middleware/auth";
import { PROTECTED_ROUTES } from "@config/constants";

/**
 * Middleware function to check if the request path matches any protected routes and perform authentication check.
 *
 * @param {NextRequest} req - The request object
 * @return {NextResponse} The next response object
 */
export function middleware(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();

  // Check if the request path matches any of the protected routes
  if (PROTECTED_ROUTES.some((route) => url.pathname.startsWith(route))) {
    // Perform authentication check
    const authResult = verifyAuth(req);
    if (authResult !== NextResponse.next()) {
      return authResult;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
