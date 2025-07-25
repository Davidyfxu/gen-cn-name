import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Get the current user - more reliable than getSession
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.log("User authentication failed:", userError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // Get user data from our custom users table
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userDataError) {
      console.error("User fetch error:", userDataError);
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }

    // Get user's name generations
    const { data: generations, error: generationsError } = await supabase
      .from("name_generations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (generationsError) {
      console.error("Generations fetch error:", generationsError);
      return NextResponse.json(
        { error: "Failed to fetch generations" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      credits: userData.credits,
      generations: generations || [],
      user: {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        created_at: userData.created_at,
      },
    });
  } catch (error) {
    console.error("User data fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
