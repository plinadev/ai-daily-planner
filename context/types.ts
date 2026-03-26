export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: number;
}
