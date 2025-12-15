import { NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const prompt = `
Create a CPA site blueprint for niche: ${niche}.
Include:
- Homepage sections
- Content plan
- Monetization
- Traffic strategy
`;

  const result = await callFull(prompt);

  return NextResponse.json({ niche, result });
}
