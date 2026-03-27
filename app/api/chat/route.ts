import { Task } from "@/context/types";
import { openai } from "@/lib/ai.config";
import { convertToModelMessages, stepCountIs, streamText, tool } from "ai";
import z from "zod";

const addTaskTool = tool({
  description: "Add a new task to the user's task list",
  inputSchema: z.object({
    title: z.string().describe("Task title"),
    time: z.string().optional().describe("Time in HH:MM format"),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
  }),
  execute: async (args) => ({
    success: true,
    message: `Task "${args.title}" has been added${args.time ? ` at ${args.time}` : ""} with ${args.priority} priority.`,
    task: args,
    action: "add",
  }),
});

const completeTaskTool = tool({
  description: "Mark a task as completed by its ID or title",
  inputSchema: z.object({
    id: z.string().optional().describe("Task ID"),
    title: z.string().optional().describe("Task title to match"),
  }),
  execute: async (args) => ({
    success: true,
    message: `Task "${args.title ?? args.id}" has been marked as completed.`,
    action: "complete",
    ...args,
  }),
});

const makeGetTasksTool = (tasks: Task[]) =>
  tool({
    description: "Retrieve the user's tasks, optionally filtered by status",
    inputSchema: z.object({
      status: z.enum(["pending", "completed"]).optional(),
    }),
    execute: async ({ status }) => {
      if (!status) return tasks;
      return tasks.filter((t) =>
        status === "completed" ? t.completed : !t.completed,
      );
    },
  });

const getTimeTool = tool({
  description: "Get the current date and time",
  inputSchema: z.object({}),
  execute: async () => ({ now: new Date().toISOString() }),
});

export async function POST(req: Request) {
  const { messages, tasks } = await req.json();

  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    tools: {
      addTask: addTaskTool,
      completeTask: completeTaskTool,
      getTasks: makeGetTasksTool(tasks),
      getCurrentTime: getTimeTool,
    },
    stopWhen: stepCountIs(3),
    system: `You are Aria, a sharp and friendly AI daily planner. Today's date is ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.

The user's current tasks are:
${JSON.stringify(tasks, null, 2)}

Your job is to help users organize their day, prioritize tasks, manage time, and stay focused.
- Help break down overwhelming tasks into clear, actionable steps
- Suggest time blocks and realistic schedules
- Are concise but warm — no corporate fluff
- Proactively flag conflicts, overloading, or unrealistic plans
- When assigning times to tasks, NEVER schedule them before the current time (${currentTime}) if user did not specifically ask for it. Always suggest future time slots
Always end responses with a clear next step or question to keep momentum going.`,
  });

  return result.toUIMessageStreamResponse();
}
