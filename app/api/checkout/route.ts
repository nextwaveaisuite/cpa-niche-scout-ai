import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // ✅ one-time payment
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    });

    // 🔥 THIS is the key fix
    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    console.error("Stripe error:", err);
    return new NextResponse("Stripe checkout failed", { status: 500 });
  }
}
