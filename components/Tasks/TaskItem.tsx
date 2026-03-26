import { Task } from "@/hooks/useTasks";
import { IoTrash } from "react-icons/io5";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="p-4 rounded-xl border border-base-200 flex justify-between items-start gap-3"
      style={{
        background: task.completed ? "#f0f0f5" : "#ffffff",
      }}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="mt-1"
        />

        <div>
          <h3
            className={`font-medium ${
              task.completed ? "line-through opacity-60" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm opacity-70">{task.description}</p>
          )}

          <div className="text-xs mt-1 flex gap-2">
            {task.time && <span>🕒 {task.time}</span>}
            <span
              style={{
                color:
                  task.priority === "high"
                    ? "#b04040"
                    : task.priority === "medium"
                      ? "#c59b08"
                      : "#4a8f6a",
              }}
            >
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      <button onClick={onDelete} className="opacity-60 hover:opacity-100">
        <IoTrash />
      </button>
    </div>
  );
}
