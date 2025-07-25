import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import * as crypto from "crypto";

function verifyCreemSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return computedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    // Get raw request body for signature verification
    const rawBody = await req.text();

    // Verify webhook signature
    const signature = req.headers.get("creem-signature");
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CREEM_WEBHOOK_SECRET environment variable is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (!signature) {
      console.error("Missing creem-signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    if (!verifyCreemSignature(rawBody, signature, webhookSecret)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse JSON after signature verification
    const payload = JSON.parse(rawBody);
    const { eventType, object } = payload;
    const id = object.id;
    const userId = object?.metadata?.user_id;

    if (eventType === "checkout.completed") {
      const supabase = await createServerSupabaseClient();

      // Find the payment record
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .select("*")
        .eq("creem_payment_id", id)
        .single();

      if (paymentError || !payment) {
        console.error("Payment record not found:", id);
        return NextResponse.json(
          { error: "Payment not found" },
          { status: 404 }
        );
      }

      // Update payment status
      const { error: updatePaymentError } = await supabase
        .from("payments")
        .update({ status: "completed" })
        .eq("creem_payment_id", id);
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
        return NextResponse.json({ error: "User not found" }, { status: 404 });
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
    } else if (eventType === "checkout.failed") {
      const supabase = await createServerSupabaseClient();

      // Update payment status to failed
      const { error: updateError } = await supabase
        .from("payments")
        .update({ status: "failed" })
        .eq("creem_payment_id", id);

      if (updateError) {
        console.error("Failed to update failed payment status:", updateError);
      }
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
