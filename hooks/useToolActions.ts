import { useEffect, useRef } from "react";
import { Task } from "@/context/types";
import { UIMessage } from "ai";

interface Params {
  messages: UIMessage[];
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
}

export function useToolActions({
  messages,
  tasks,
  addTask,
  toggleTask,
}: Params) {
  const processedRef = useRef<Set<string>>(new Set());

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("aria-processed-tool-calls");
    if (stored) {
      processedRef.current = new Set(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    for (const message of messages) {
      if (message.role !== "assistant") continue;

      for (const part of message.parts ?? []) {
        if (part.type !== "tool-addTask" && part.type !== "tool-completeTask")
          continue;

        if (part.state !== "output-available") continue;

        const toolCallId = part.toolCallId as string;
        if (processedRef.current.has(toolCallId)) continue;

        processedRef.current.add(toolCallId);

        localStorage.setItem(
          "aria-processed-tool-calls",
          JSON.stringify([...processedRef.current]),
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = part.output as any;

        if (part.type === "tool-addTask" && result?.action === "add") {
          const exists = tasks.some((t) => t.title === result.task.title);
          if (!exists) addTask(result.task);
        }

        if (
          part.type === "tool-completeTask" &&
          result?.action === "complete"
        ) {
          const match = tasks.find((t) =>
            result.id ? t.id === result.id : t.title === result.title,
          );

          if (match && !match.completed) toggleTask(match.id);
        }
      }
    }
  }, [messages, tasks, addTask, toggleTask]);
}
