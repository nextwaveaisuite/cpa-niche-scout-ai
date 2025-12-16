import { NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const text = await callFull(`
List CPA offer types, payout ranges, and funnels for:
${niche}
`);

  return NextResponse.json({
    offers: text
  });
}
