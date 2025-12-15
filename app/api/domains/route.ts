import { NextResponse } from "next/server";
import { callMini } from "../../../lib/openai/client";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: "Niche required" }, { status: 400 });
    }

    const prompt = `
Generate expired-domain style domain ideas for CPA niche "${niche}".
Include brandable and SEO-friendly names.
`;

    const result = await callMini(prompt);

    return NextResponse.json({ niche, domains: result });
  } catch {
    return NextResponse.json(
      { error: "Domain generation failed" },
      { status: 500 }
    );
  }
}
