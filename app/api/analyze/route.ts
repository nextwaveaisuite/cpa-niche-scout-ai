import { NextRequest, NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";
import { checkCredits, deductCredits } from "@/lib/credits";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const credit = checkCredits(req, 1);
  if (!credit.allowed) return credit.response!;

  const { niche } = await req.json();

  const result = await callFull(
    `Analyze the CPA niche "${niche}" for profitability, buyer intent, and competition.`
  );

  const res = NextResponse.json({ quick_score: result });
  deductCredits(res, req, 1);
  return res;
}
