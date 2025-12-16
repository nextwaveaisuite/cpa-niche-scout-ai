import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!siteUrl || !priceId) {
      throw new Error("Missing Stripe environment variables");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard?upgrade=success`,
      cancel_url: `${siteUrl}/dashboard?upgrade=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("STRIPE CHECKOUT ERROR:", error.message);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
