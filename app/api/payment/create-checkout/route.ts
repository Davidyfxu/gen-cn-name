import { NextRequest, NextResponse } from "next/server";
import { creemCheckout } from "@/app/api";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
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

    const { credits } = await req.json();

    // Validate credits amount
    const validCredits = [1, 5, 10];
    if (!validCredits.includes(credits)) {
      return NextResponse.json(
        { error: "Invalid credit amount" },
        { status: 400 }
      );
    }

    const userId = user.id;

    // Get user from database
    const { data: dbUser, error: dbUserError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (dbUserError || !dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate pricing
    const pricing = {
      1: 5.0,
      5: 20.0, // $5 discount
      10: 35.0, // $15 discount
    };

    const amount = pricing[credits as keyof typeof pricing];
    // Create checkout with Creem.io
    const creemData = await creemCheckout({
      product_id: process.env.CREEM_PRODUCT_ID!,
      customer: {
        email: user.email,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      metadata: {
        user_id: user.id,
        credits: credits,
        amount: amount,
      },
    });
    // Save payment record as pending
    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: user.id,
      amount: amount,
      credits_purchased: credits,
      creem_payment_id: creemData.id,
      status: "pending",
    });

    if (paymentError) {
      console.error("Failed to save payment record:", paymentError);
    }

    return NextResponse.json({
      checkout_url: creemData.checkout_url,
      checkout_id: creemData.id,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
