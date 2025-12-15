import { NextResponse } from "next/server";
import { callFull } from "../../../lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: "Niche required" }, { status: 400 });
    }

    const prompt = `
Create a CPA website blueprint for niche "${niche}" including:
- Page structure
- Content plan
- Monetization strategy
- Traffic plan
`;

    const result = await callFull(prompt);

    return NextResponse.json({ niche, blueprint: result });
  } catch {
    return NextResponse.json(
      { error: "Blueprint generation failed" },
      { status: 500 }
    );
  }
}
