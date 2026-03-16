import { openai } from "@/lib/ai.config";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: "You are a helpful AI daily planner.",
  });

  return result.toTextStreamResponse();
}
