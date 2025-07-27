import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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

    // Calculate pricing (amounts in cents for Stripe)
    const pricing = {
      1: 500, // $5.00
      5: 2000, // $20.00 (Save $5)
      10: 3500, // $35.00 (Save $15)
    };

    const amountInCents = pricing[credits as keyof typeof pricing];
    const amountInDollars = amountInCents / 100;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} Chinese Name Generation Credit${credits > 1 ? "s" : ""}`,
              description: `Generate ${credits} unique Chinese name${credits > 1 ? "s" : ""} with meanings`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancelled`,
      customer_email: user.email!,
      metadata: {
        user_id: user.id,
        credits: credits.toString(),
        amount: amountInDollars.toString(),
      },
    });

    // Save payment record as pending (使用原有的creem_payment_id字段存储Stripe session ID)
    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: user.id,
      amount: amountInDollars,
      credits_purchased: credits,
      creem_payment_id: session.id, // 继续使用原字段名，但存储Stripe session ID
      status: "pending",
    });

    if (paymentError) {
      console.error("Failed to save payment record:", paymentError);
      return NextResponse.json(
        { error: "Failed to save payment record" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkout_url: session.url,
      checkout_id: session.id,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
