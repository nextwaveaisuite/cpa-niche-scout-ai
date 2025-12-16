import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: "Missing niche" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a CPA niche analysis expert.",
        },
        {
          role: "user",
          content: `Analyze the CPA viability of this niche:\n${niche}`,
        },
      ],
      max_tokens: 800,
    });

    return NextResponse.json({
      quick_score: completion.choices[0].message.content,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
