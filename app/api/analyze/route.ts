import { NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const text = await callFull(`
Analyze the CPA viability of this niche:
${niche}
Provide a clear score, monetization insight, and traffic notes.
`);

  return NextResponse.json({
    quick_score: text
  });
}
