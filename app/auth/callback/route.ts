import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");
  const type = requestUrl.searchParams.get("type");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

  if (code) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      // Use environment variable to get base URL, fallback to requestUrl.origin
      return NextResponse.redirect(`${baseUrl}/auth/error`);
    }

    // Check if this is a password recovery flow
    if (type === "recovery" || next === "reset-password") {
      return NextResponse.redirect(`${baseUrl}/auth/reset-password`);
    }

    // Check if there's a specific next URL to redirect to
    if (next) {
      const redirectUrl = `${baseUrl}${next}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Use environment variable to get base URL, fallback to requestUrl.origin
  return NextResponse.redirect(`${baseUrl}/dashboard`);
}
