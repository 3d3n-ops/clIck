import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Always allow access to the home page and auth pages
  if (pathname === "/" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 