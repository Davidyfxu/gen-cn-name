import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const protectedRoutes = [
  "/dashboard",
  "/generate",
  "/api/user",
  "/api/generate-name",
  "/api/payment/create-checkout", // 只保护创建支付的API
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = await createServerSupabaseClient();
  // Get user directly - more reliable than getSession in middleware
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Redirect to home if trying to access protected route without auth
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
