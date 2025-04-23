import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/sign-in*", "/sign-up*"]);

// Define routes that should redirect to chat when authenticated
const homeRoutes = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // If user is signed in and on home page, redirect to chat
  if (userId && homeRoutes(req)) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  // If user is signed in and clicks logo (navigates to /), redirect to chat
  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  // For all other routes, protect them unless they're public
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

// See https://clerk.com/docs/references/nextjs/auth-middleware for more info
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
}