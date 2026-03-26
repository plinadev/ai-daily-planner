
import { openai } from "@/lib/ai.config";
import { generateObject } from "ai";
import z from "zod";

const analysisSchema = z.object({
  topPriority: z
    .string()
    .describe("The single most important task to focus on right now"),
  summary: z.string().describe("Brief overview of the current task load"),
  suggestions: z
    .array(z.string())
    .describe("3-5 actionable suggestions to improve productivity"),
  conflicts: z
    .array(z.string())
    .describe("Any scheduling conflicts or overload issues detected"),
  completionRate: z.number().describe("Percentage of tasks completed (0-100)"),
});

export async function POST(req: Request) {
  const { tasks } = await req.json();

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: analysisSchema,
    prompt: `Analyze the following task list and provide insights:

${JSON.stringify(tasks, null, 2)}

Give practical, specific advice based on the actual tasks provided.`,
  });

  return Response.json(object);
}
