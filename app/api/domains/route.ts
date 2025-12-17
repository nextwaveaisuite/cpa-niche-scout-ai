import { NextRequest, NextResponse } from "next/server";
import { isProUser } from "@/lib/pro";
import { openai } from "@/lib/openai/client";

export async function POST(req: NextRequest) {
  if (!isProUser(req)) {
    return NextResponse.json(
      {
        error: "pro_required",
        message: "Domain ideas are a Pro feature. Please upgrade.",
      },
      { status: 402 }
    );
  }

  const { niche } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Generate brandable domain names for this niche.",
      },
      {
        role: "user",
        content: niche,
      },
    ],
  });

  return NextResponse.json({
    domains: completion.choices[0].message.content,
  });
}
