import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    // 🔑 STRIPE CONFIG — USE ENV VARS ONLY
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // MUST be price_xxx
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("STRIPE CHECKOUT ERROR:", err.message);
    return NextResponse.json(
      { error: "Stripe checkout failed", details: err.message },
      { status: 500 }
    );
  }
}
