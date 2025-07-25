import { NextRequest, NextResponse } from "next/server";
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

    // Get user data, generations, and payments in parallel
    const [userDataResult, generationsResult, paymentsResult] =
      await Promise.all([
        supabase.from("users").select("*").eq("id", userId).single(),
        supabase
          .from("name_generations")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("payments")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
      ]);

    const { data: userData, error: userDataError } = userDataResult;
    const { data: generations, error: generationsError } = generationsResult;
    const { data: payments, error: paymentsError } = paymentsResult;

    if (userDataError) {
      console.error("User fetch error:", userDataError);
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }

    if (generationsError) {
      console.error("Generations fetch error:", generationsError);
      return NextResponse.json(
        { error: "Failed to fetch generations" },
        { status: 500 }
      );
    }

    if (paymentsError) {
      console.error("Payments fetch error:", paymentsError);
      return NextResponse.json(
        { error: "Failed to fetch payments" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      credits: userData.credits,
      generations: generations || [],
      payments: payments || [],
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
