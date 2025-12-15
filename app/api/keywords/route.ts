import { NextResponse } from "next/server";
import { callMini } from "../../../lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json(
        { error: "Niche is required" },
        { status: 400 }
      );
    }

    const prompt = `
Generate 20 buyer-intent CPA keywords for the niche: "${niche}"

Rules:
- Focus on high commercial intent
- Include problem + solution keywords
- Avoid generic informational keywords
- Return as a clean bullet list
`;

    const result = await callMini(prompt);

    return NextResponse.json({
      niche,
      keywords: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Keyword generation failed" },
      { status: 500 }
    );
  }
    }
  
