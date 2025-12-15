import { NextResponse } from "next/server";
import { callMini, callFull } from "@/lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const quick = await callMini(`Score CPA viability of niche: ${niche}`);
  const deep = await callFull(`Deep CPA analysis for niche: ${niche}`);

  return NextResponse.json({
    niche,
    quick_score: quick,
    deep_analysis: deep
  });
}
