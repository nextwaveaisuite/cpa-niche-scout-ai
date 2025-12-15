import { NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const prompt = `
You are a CPA strategist.
For the niche "${niche}", suggest:
- Best CPA offer types
- Traffic sources
- Funnel angles
- Compliance notes
Format clean and structured.
`;

  const result = await callFull(prompt);

  return NextResponse.json({ niche, result });
}
