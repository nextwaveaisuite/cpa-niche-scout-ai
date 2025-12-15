import { NextResponse } from "next/server";
import { callMini, callFull } from "../../../lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: "Niche required" }, { status: 400 });
    }

    const quick = await callMini(`Score CPA viability for niche: ${niche}`);
    const deep = await callFull(`Provide deep CPA analysis for niche: ${niche}`);

    return NextResponse.json({
      niche,
      quick_score: quick,
      deep_analysis: deep,
    });
  } catch {
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
