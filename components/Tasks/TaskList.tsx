import { Task } from "@/context/types";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  toggleTask,
  deleteTask,
}: {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}) {
  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm" style={{ color: "#c8bfba" }}>
          No tasks yet
        </p>
        <p className="text-xs mt-1" style={{ color: "#d8d0cc" }}>
          Add one above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pending.length > 0 && (
        <div className="space-y-1.5">
          {pending.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-1.5">
          <p
            className="text-[10px] font-medium tracking-[0.12em] uppercase px-1"
            style={{ color: "#c8bfba" }}
          >
            Completed
          </p>
          {completed.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
