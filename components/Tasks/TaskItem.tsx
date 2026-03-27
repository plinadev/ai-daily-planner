import { Task } from "@/context/types";
import { IoTrash } from "react-icons/io5";

const priorityConfig = {
  high: { color: "#c0544a", bg: "#fdf0ef", label: "High" },
  medium: { color: "#b08030", bg: "#fdf6e8", label: "Med" },
  low: { color: "#4a8f6a", bg: "#eef7f2", label: "Low" },
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const p = priorityConfig[task.priority];

  return (
    <div
      className="group flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200"
      style={{
        background: task.completed
          ? "rgba(245,242,240,0.6)"
          : "rgba(255,255,255,0.85)",
        border: `1px solid ${task.completed ? "#ede8e4" : "#e8e2de"}`,
      }}
    >
      {/* custom checkbox */}
      <button
        onClick={onToggle}
        className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center"
        style={{
          background: task.completed ? "#8b687f" : "transparent",
          borderColor: task.completed ? "#8b687f" : "#c8bfba",
        }}
      >
        {task.completed && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path
              d="M1 3l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium leading-snug transition-all"
          style={{
            color: task.completed ? "#b0a8a0" : "#1a1a2e",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </p>

        {task.description && (
          <p
            className="text-xs mt-0.5 leading-relaxed"
            style={{ color: "#a09890" }}
          >
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          {task.time && (
            <span
              className="text-[11px] tabular-nums"
              style={{ color: "#b0a8a0" }}
            >
              {task.time}
            </span>
          )}
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full tracking-wide"
            style={{ background: p.bg, color: p.color }}
          >
            {p.label}
          </span>
        </div>
      </div>

      {/* delete */}
      <button
        onClick={onDelete}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-base-200"
        style={{ color: "#c8bfba" }}
      >
        <IoTrash size={13} />
      </button>
    </div>
  );
}
