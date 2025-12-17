import { NextRequest, NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";
import { checkUsage, incrementUsage } from "@/lib/usage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const usage = checkUsage(req);
  if (!usage.allowed) return usage.response!;

  const { niche } = await req.json();

  const result = await callFull(
    `Analyze the CPA niche "${niche}" for profitability, buyer intent, and competition.`
  );

  const res = NextResponse.json({ quick_score: result });
  incrementUsage(res, req);
  return res;
}
