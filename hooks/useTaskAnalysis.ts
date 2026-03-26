import { useState } from "react";
import { Task } from "@/context/types";
import z from "zod";

const analysisSchema = z.object({
  topPriority: z.string(),
  summary: z.string(),
  suggestions: z.array(z.string()),
  conflicts: z.array(z.string()),
  completionRate: z.number(),
});

export type TaskAnalysis = z.infer<typeof analysisSchema>;

export function useTaskAnalysis() {
  const [analysis, setAnalysis] = useState<TaskAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (tasks: Task[]) => {
    if (tasks.length === 0) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setAnalysis(analysisSchema.parse(data));
    } catch (e) {
      setError("Could not generate analysis. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { analysis, isLoading, error, analyze };
}
