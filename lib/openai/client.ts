import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

/**
 * Canonical OpenAI client
 * Used directly by Pro-gated routes
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper for full analysis (higher quality / longer output)
 * Used by /api/analyze
 */
export async function callFull(prompt: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an expert CPA marketing analyst. Provide structured, actionable insights.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return res.choices[0].message.content || "";
}

/**
 * Helper for fast/cheap keyword-style output
 * Used by /api/keywords
 */
export async function callMini(prompt: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a CPA keyword research assistant. Be concise and list-focused.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return res.choices[0].message.content || "";
          }
