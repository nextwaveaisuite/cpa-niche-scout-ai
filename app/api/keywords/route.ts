import { NextResponse } from "next/server";
import { callMini } from "@/lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const prompt = `
Generate 20 buyer-intent CPA keywords for the niche: ${niche}.
Return as a bullet list with short intent notes.
`;

  const result = await callMini(prompt);

  return NextResponse.json({ niche, result });
}
