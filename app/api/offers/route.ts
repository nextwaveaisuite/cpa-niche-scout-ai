import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai/client";
import { checkCredits, deductCredits } from "@/lib/credits";

export async function POST(req: NextRequest) {
  const credit = checkCredits(req, 2);
  if (!credit.allowed) return credit.response!;

  const { niche } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Generate profitable CPA offers." },
      { role: "user", content: niche },
    ],
  });

  const res = NextResponse.json({
    offers: completion.choices[0].message.content,
  });

  deductCredits(res, req, 2);
  return res;
    }
