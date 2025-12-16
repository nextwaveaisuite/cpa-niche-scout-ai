import { NextResponse } from "next/server";
import OpenAI from "openai";
import { IS_PRO } from "@/lib/pro";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  if (!IS_PRO) {
    return NextResponse.json(
      { error: "Pro feature. Upgrade to unlock video scripts." },
      { status: 403 }
    );
  }

  const { niche } = await req.json();

  const prompt = `
Create a YouTube video concept for the CPA niche: "${niche}"

Return:
1. A powerful 1-sentence hook
2. A short 6–8 bullet video script outline
3. A strong CTA suitable for CPA offers

Keep it concise, practical, and high-converting.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return NextResponse.json({
    video_script: completion.choices[0].message.content,
  });
}
