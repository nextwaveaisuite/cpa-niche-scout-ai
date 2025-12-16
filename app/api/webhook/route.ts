import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const Stripe = (await import("stripe")).default;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    });

    const body = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      // PRO UNLOCK LOGIC GOES HERE (Phase 4)
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 400 }
    );
  }
}
