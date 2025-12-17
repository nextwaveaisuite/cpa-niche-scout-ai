import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST() {
  try {
    // 🔑 STRIPE SETUP — PASTE YOUR VALUES BELOW
    const stripe = new Stripe(
      "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",
      {
        apiVersion: "2023-10-16",
      }
    );

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1Sccn5LwgVcdXSUH3WBX4gSp",
          quantity: 1,
        },
      ],
      success_url:
        "https://cpanichescoutai.nextwaveaisuite.com/dashboard?upgraded=1",
      cancel_url:
        "https://cpanichescoutai.nextwaveaisuite.com/dashboard?cancelled=1",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
