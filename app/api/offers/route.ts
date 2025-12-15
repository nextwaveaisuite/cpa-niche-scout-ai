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
You are a CPA expert.
For the niche "${niche}", provide:
- Best CPA offer types
- Traffic sources
- Funnel angles
- Compliance notes
`;

    const result = await callFull(prompt);

    return NextResponse.json({ niche, offers: result });
  } catch {
    return NextResponse.json(
      { error: "Offer analysis failed" },
      { status: 500 }
    );
  }
}
