import { NextResponse } from "next/server";
import { checkAndConsumeCredit } from "@/lib/credits";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  const credit = checkAndConsumeCredit(ip);

  if (!credit.allowed) {
    return NextResponse.json(
      { error: "Daily credit limit reached. Upgrade to continue." },
      { status: 429 }
    );
  }

  const { niche } = await req.json();

  // existing GPT logic below (unchanged)
  // ...
}
