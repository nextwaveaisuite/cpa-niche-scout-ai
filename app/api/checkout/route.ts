import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  return `https://${raw}`;
}

export async function POST() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY");
    }

    if (!process.env.STRIPE_PRICE_ID) {
      throw new Error("Missing STRIPE_PRICE_ID");
    }

    const SITE_URL = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/dashboard?upgrade=success`,
      cancel_url: `${SITE_URL}/dashboard?upgrade=cancel`,
    });

    if (!session.url) {
      throw new Error("Stripe session created but no URL returned");
    }

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("🔥 STRIPE CHECKOUT ERROR:", err);

    return NextResponse.json(
      {
        error: "Stripe checkout failed",
        stripeMessage: err.message,
      },
      { status: 500 }
    );
  }
          }
