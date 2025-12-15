import { NextResponse } from "next/server";
import { callMini } from "@/lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const prompt = `
Suggest expired-domain style names for a CPA niche: ${niche}.
Include brandable .com ideas and SEO-style domains.
`;

  const result = await callMini(prompt);

  return NextResponse.json({ niche, result });
}
