import { NextResponse } from "next/server";
import { callMini } from "@/lib/openai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const text = await callMini(`
Generate high-intent CPA keywords for:
${niche}
Format as a clean list.
`);

  return NextResponse.json({
    keywords: text
  });
}
