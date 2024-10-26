import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token && !request.nextUrl.pathname.startsWith("/")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !request.nextUrl.pathname.startsWith("/en/login")) {
    return Response.redirect(new URL("/en/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/",
    "/(vi|en)/:path*",
  ],
};

export default createMiddleware(routing);
