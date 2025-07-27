import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    // Get raw request body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("Missing stripe-signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    if (!STRIPE_WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET environment variable is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify webhook signature and construct event
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const sessionId = session.id;
        const userId = session.metadata?.user_id;

        if (!userId) {
          console.error("No user_id in checkout session metadata:", sessionId);
          return NextResponse.json(
            { error: "Missing user_id in metadata" },
            { status: 400 }
          );
        }

        const supabase = await createServerSupabaseClient();

        // Find the payment record (继续使用creem_payment_id字段)
        const { data: payment, error: paymentError } = await supabase
          .from("payments")
          .select("*")
          .eq("creem_payment_id", sessionId)
          .single();

        if (paymentError || !payment) {
          console.error("Payment record not found:", sessionId);
          return NextResponse.json(
            { error: "Payment not found" },
            { status: 404 }
          );
        }

        // Update payment status to completed
        const { error: updatePaymentError } = await supabase
          .from("payments")
          .update({ status: "completed" })
          .eq("creem_payment_id", sessionId);

        if (updatePaymentError) {
          console.error("Failed to update payment status:", updatePaymentError);
          return NextResponse.json(
            { error: "Failed to update payment" },
            { status: 500 }
          );
        }

        // Add credits to user account
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (userError || !user) {
          console.error("User not found for payment:", userId);
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        const { error: creditUpdateError } = await supabase
          .from("users")
          .update({
            credits: (user.credits || 0) + (payment.credits_purchased || 0),
          })
          .eq("id", userId);

        if (creditUpdateError) {
          console.error("Failed to update user credits:", creditUpdateError);
          return NextResponse.json(
            { error: "Failed to update credits" },
            { status: 500 }
          );
        }

        console.log(
          `Payment successful for user ${userId}, added ${payment.credits_purchased} credits`
        );
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object;
        const expiredSessionId = expiredSession.id;

        const supabaseForExpired = await createServerSupabaseClient();

        // Update payment status to failed
        const { error: updateExpiredError } = await supabaseForExpired
          .from("payments")
          .update({ status: "failed" })
          .eq("creem_payment_id", expiredSessionId);

        if (updateExpiredError) {
          console.error(
            "Failed to update expired payment status:",
            updateExpiredError
          );
        }

        console.log(`Payment session expired: ${expiredSessionId}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
