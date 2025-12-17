import { NextRequest, NextResponse } from "next/server";
import { callMini } from "@/lib/openai/client";
import { checkCredits, deductCredits } from "@/lib/credits";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const credit = checkCredits(req, 1);
  if (!credit.allowed) return credit.response!;

  const { niche } = await req.json();

  const result = await callMini(
    `Generate buyer-intent CPA keywords for the niche "${niche}".`
  );

  const res = NextResponse.json({ keywords: result });
  deductCredits(res, req, 1);
  return res;
}
