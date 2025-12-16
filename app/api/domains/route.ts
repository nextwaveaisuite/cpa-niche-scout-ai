import { NextResponse } from "next/server";
import { callMini } from "@/lib/openai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { niche } = await req.json();

  const text = await callMini(`
Suggest brandable expired-style domains for:
${niche}
`);

  return NextResponse.json({
    domains: text
  });
}
