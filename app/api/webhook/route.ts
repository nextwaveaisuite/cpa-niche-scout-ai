import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  // ✅ PAYMENT CONFIRMED
  if (event.type === "checkout.session.completed") {
    console.log("Stripe checkout completed");

    const res = NextResponse.json({ received: true });

    // 🔒 Authoritative Pro cookie (server-issued)
    res.cookies.set("cpa_pro", "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res;
  }

  return NextResponse.json({ received: true });
      }
  
