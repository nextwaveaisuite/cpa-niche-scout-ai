import { NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const text = await callFull(`
Create a YouTube video script that promotes a CPA offer in:
${niche}
`);

  return NextResponse.json({
    deep_analysis: text
  });
}
