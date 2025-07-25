import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.info("webhook payload", payload, typeof payload);
    // Verify webhook signature (if Creem.io provides one)
    // const signature = req.headers.get('x-creem-signature');

    const { eventType, object } = payload;
    console.log("payload valid var", eventType, object);
    const id = object.id;
    const userId = object?.metadata?.user_id;

    if (eventType === "checkout.completed") {
      console.log(userId, id, "checkout completed");
      const supabase = await createServerSupabaseClient();

      // Find the payment record
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .select("*")
        .eq("creem_payment_id", id)
        .single();
      console.log("1111", payment);

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
      console.log("222222");
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
      console.log("333333", user);
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

      console.log(
        `Successfully added ${payment.credits_purchased} credits to user ${userId}`
      );
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
