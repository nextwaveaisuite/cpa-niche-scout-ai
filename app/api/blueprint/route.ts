import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai/client";
import { checkCredits, deductCredits } from "@/lib/credits";

export async function POST(req: NextRequest) {
  const credit = checkCredits(req, 3);
  if (!credit.allowed) return credit.response!;

  const { niche } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "Create a CPA monetization blueprint including funnel, traffic, and content.",
      },
      { role: "user", content: niche },
    ],
  });

  const res = NextResponse.json({
    blueprint: completion.choices[0].message.content,
  });

  deductCredits(res, req, 3);
  return res;
}
