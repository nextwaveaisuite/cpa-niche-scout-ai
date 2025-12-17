import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("❌ STRIPE ERROR RAW:", err);

    return NextResponse.json(
      {
        error: "Stripe checkout failed",
        stripeMessage: err.message,
        stripeType: err.type,
        stripeCode: err.code,
      },
      { status: 500 }
    );
  }
}
