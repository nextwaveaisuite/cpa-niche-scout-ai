import { NextRequest, NextResponse } from "next/server";
import { callMini } from "@/lib/openai/client";
import { checkUsage, incrementUsage } from "@/lib/usage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const usage = checkUsage(req);
  if (!usage.allowed) return usage.response!;

  const { niche } = await req.json();

  const result = await callMini(
    `Generate buyer-intent CPA keywords for the niche "${niche}".`
  );

  const res = NextResponse.json({ keywords: result });
  incrementUsage(res, req);
  return res;
}
