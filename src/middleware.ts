import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth middleware placeholder.
 * When authentication is added, protect /admin routes here and attach session to requests.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
