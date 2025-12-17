import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    // 🔒 Hard validation — fail loudly
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY");
    }

    if (!process.env.STRIPE_PRICE_ID) {
      throw new Error("Missing STRIPE_PRICE_ID");
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      throw new Error("Missing NEXT_PUBLIC_SITE_URL");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // MUST match your price type
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=cancel`,
    });

    if (!session.url) {
      throw new Error("Stripe session created but no redirect URL returned");
    }

    // ✅ THIS IS THE CRITICAL PART — REDIRECT
    return NextResponse.redirect(session.url, { status: 303 });

  } catch (error: any) {
    console.error("🔥 STRIPE CHECKOUT ERROR:", error.message);

    return NextResponse.json(
      {
        error: "Stripe checkout failed",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
