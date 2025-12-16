import { NextResponse } from "next/server";
import { callFull } from "@/lib/openai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const text = await callFull(`
Create a CPA website blueprint for:
${niche}
Include pages, funnels, and traffic plan.
`);

  return NextResponse.json({
    blueprint: text
  });
}
