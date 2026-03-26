import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt: `
You are an task manager assistant helping complete task descriptions.

Rules:
- Continue the sentence naturally
- Keep it short (max 8 words)
- Do NOT repeat the input
- No quotes

User input:
"${prompt}"
`,
  });

  return result.toUIMessageStreamResponse();
}
