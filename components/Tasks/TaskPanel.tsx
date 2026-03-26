// TaskPanel.tsx
"use client";

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskAnalysisCard from "./TaskAnalysis";
import { useTasks } from "@/context/TasksContext";
import { useTaskAnalysis } from "@/hooks/useTaskAnalysis";

export default function TaskPanel() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { analysis, isLoading, error, analyze } = useTaskAnalysis();

  return (
    <div
      className="min-w-sm flex flex-col h-full bg-base-100 rounded-2xl shadow-lg overflow-hidden"
      style={{ boxShadow: "0 8px 40px #9fa0c322, 0 2px 8px #8b687f11" }}
    >
      <div className="px-6 py-5 border-b border-base-200">
        <h2
          className="text-xl"
          style={{ fontFamily: "'Instrument Serif', serif", color: "#7b435b" }}
        >
          Tasks
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />

        <div className="border-t border-base-200 pt-4">
          <TaskAnalysisCard
            analysis={analysis}
            isLoading={isLoading}
            error={error}
            onAnalyze={() => analyze(tasks)}
            hasTasks={tasks.length > 0}
          />
        </div>
      </div>
    </div>
  );
}