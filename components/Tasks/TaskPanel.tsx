"use client";

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskAnalysisCard from "./TaskAnalysis";
import { useTasks } from "@/context/TasksContext";
import { useTaskAnalysis } from "@/hooks/useTaskAnalysis";

export default function TaskPanel() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { analysis, isLoading, error, analyze } = useTaskAnalysis();

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div
      className=" w-full md:max-w-sm lg:max-w-lg flex flex-col h-full rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #faf9f7 0%, #f5f2f0 100%)",
        boxShadow: "0 8px 40px #9fa0c318, 0 2px 8px #8b687f10",
        border: "1px solid #e8e2de",
      }}
    >
      {/* header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-base-content/30 mb-1">
              Your day
            </p>
            <h2
              className="text-2xl leading-none"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: "#7b435b",
              }}
            >
              Tasks
            </h2>
          </div>
          {tasks.length > 0 && (
            <div className="text-right">
              <p
                className="text-2xl font-light tabular-nums"
                style={{ color: "#9fa0c3" }}
              >
                {completed}
                <span className="text-base text-base-content/20">
                  /{tasks.length}
                </span>
              </p>
              <p className="text-[10px] tracking-widest uppercase text-base-content/30">
                done
              </p>
            </div>
          )}
        </div>

        {/* progress bar */}
        {tasks.length > 0 && (
          <div className="mt-4 h-[2px] rounded-full bg-base-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completed / tasks.length) * 100}%`,
                background: "linear-gradient(90deg, #9fa0c3, #8b687f, #7b435b)",
              }}
            />
          </div>
        )}
      </div>

      {/* scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {/* form */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid #ede8e4",
          }}
        >
          <TaskForm onAdd={addTask} />
        </div>

        {/* list */}
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

        {/* analysis */}
        {tasks.length > 0 && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid #ede8e4",
            }}
          >
            <TaskAnalysisCard
              analysis={analysis}
              isLoading={isLoading}
              error={error}
              onAnalyze={() => analyze(tasks)}
              hasTasks={tasks.length > 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
