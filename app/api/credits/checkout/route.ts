import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL!.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;

export async function POST(req: Request) {
  const { pack } = await req.json();

  const packs: Record<
    string,
    { credits: number; price: number }
  > = {
    small: { credits: 20, price: 900 },
    medium: { credits: 50, price: 1900 },
    large: { credits: 100, price: 2900 },
  };

  if (!packs[pack]) {
    return NextResponse.json(
      { error: "Invalid credit pack" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${packs[pack].credits} Credit Pack`,
          },
          unit_amount: packs[pack].price,
        },
        quantity: 1,
      },
    ],
    success_url: `${SITE_URL}/dashboard?credits=${packs[pack].credits}`,
    cancel_url: `${SITE_URL}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
    }
      
