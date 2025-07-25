import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

  if (code) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      // 使用环境变量获取基础 URL，回退到 requestUrl.origin
      return NextResponse.redirect(`${baseUrl}/auth/error`);
    }
  }

  // 使用环境变量获取基础 URL，回退到 requestUrl.origin
  return NextResponse.redirect(`${baseUrl}/dashboard`);
}
