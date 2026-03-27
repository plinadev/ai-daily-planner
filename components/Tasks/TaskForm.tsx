"use client";

import { useState, useEffect, useRef } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Task, TaskPriority } from "@/context/types";

function GhostInput({
  value,
  suggestion,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder,
}: {
  value: string;
  suggestion: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center px-3 text-sm overflow-hidden whitespace-pre z-10"
      >
        <span className="invisible">{value}</span>
        <span style={{ color: "#c8bfba" }}>{suggestion}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full text-sm bg-transparent relative z-20 px-3 py-2 rounded-lg transition-all outline-none"
        style={{
          border: "1px solid #e0d8d4",
          color: "#1a1a2e",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c8bfba")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e0d8d4")}
      />
    </div>
  );
}

const priorityOptions: {
  value: TaskPriority;
  label: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    value: "low",
    label: "Low",
    color: "#4a8f6a",
    bg: "#eef7f2",
    border: "#a8d8bc",
  },
  {
    value: "medium",
    label: "Med",
    color: "#b08030",
    bg: "#fdf6e8",
    border: "#e0c070",
  },
  {
    value: "high",
    label: "High",
    color: "#c0544a",
    bg: "#fdf0ef",
    border: "#e0a09a",
  },
];

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
}

export default function TaskForm({
  onAdd,
}: {
  onAdd: (task: Omit<Task, "id" | "completed" | "createdAt">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(getCurrentTime);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [activeField, setActiveField] = useState<
    "title" | "description" | null
  >(null);
  const [titleSuggestion, setTitleSuggestion] = useState("");
  const [descSuggestion, setDescSuggestion] = useState("");

  const activeFieldRef = useRef<"title" | "description" | null>(null);
  const completeRef = useRef<(value: string) => void>(() => {});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextRef = useRef(false);

  const { complete, isLoading } = useCompletion({
    api: "/api/completion",
    onFinish: (_, completion) => {
      const trimmed = completion.trim();
      if (!trimmed) return;
      if (activeFieldRef.current === "title") setTitleSuggestion(" " + trimmed);
      else if (activeFieldRef.current === "description")
        setDescSuggestion(" " + trimmed);
    },
  });

  useEffect(() => {
    completeRef.current = complete;
  }, [complete]);

  const setActiveFieldBoth = (field: "title" | "description" | null) => {
    activeFieldRef.current = field;
    setActiveField(field);
  };

  const activeValue = activeField === "title" ? title : description;

  useEffect(() => {
    if (!activeField) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (suppressNextRef.current) {
      suppressNextRef.current = false;
      return;
    }
    debounceRef.current = setTimeout(() => {
      if (activeValue.length >= 5) completeRef.current(activeValue);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [activeValue, activeField]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    field: "title" | "description",
  ) => {
    const suggestion = field === "title" ? titleSuggestion : descSuggestion;
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      suppressNextRef.current = true;
      if (field === "title") {
        setTitle((p) => p + suggestion);
        setTitleSuggestion("");
      } else {
        setDescription((p) => p + suggestion);
        setDescSuggestion("");
      }
    }
    if (e.key === "Escape") {
      suppressNextRef.current = true;
      setTitleSuggestion("");
      setDescSuggestion("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, time, priority });
    setTitle("");
    setDescription("");
    setTime("");
    setPriority("medium");
    setTitleSuggestion("");
    setDescSuggestion("");
    setActiveFieldBoth(null);
  };

  const fieldLabel =
    "text-[10px] font-medium tracking-[0.12em] uppercase mb-1.5 block";
  const fieldLabelStyle = { color: "#b0a8a0" };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Title */}
      <div>
        <label className={fieldLabel} style={fieldLabelStyle}>
          Title
        </label>
        <GhostInput
          value={title}
          suggestion={titleSuggestion}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleSuggestion("");
          }}
          onFocus={() => setActiveFieldBoth("title")}
          onBlur={() => setTimeout(() => setTitleSuggestion(""), 150)}
          onKeyDown={(e) => handleKeyDown(e, "title")}
          placeholder="What needs to be done?"
        />
        <p
          className="h-3.5 text-[10px] mt-1 pl-0.5"
          style={{ color: "#c8bfba" }}
        >
          {isLoading && activeField === "title"
            ? "Thinking…"
            : titleSuggestion
              ? "Tab to accept · Esc to dismiss"
              : ""}
        </p>
      </div>

      {/* Description */}
      <div>
        <label className={fieldLabel} style={fieldLabelStyle}>
          Notes
        </label>
        <GhostInput
          value={description}
          suggestion={descSuggestion}
          onChange={(e) => {
            setDescription(e.target.value);
            setDescSuggestion("");
          }}
          onFocus={() => setActiveFieldBoth("description")}
          onBlur={() => setTimeout(() => setDescSuggestion(""), 150)}
          onKeyDown={(e) => handleKeyDown(e, "description")}
          placeholder="Optional details…"
        />
        <p
          className="h-3.5 text-[10px] mt-1 pl-0.5"
          style={{ color: "#c8bfba" }}
        >
          {isLoading && activeField === "description"
            ? "Thinking…"
            : descSuggestion
              ? "Tab to accept · Esc to dismiss"
              : ""}
        </p>
      </div>

      {/* Time + Priority */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className={fieldLabel} style={fieldLabelStyle}>
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg outline-none transition-all"
            style={{
              border: "1px solid #e0d8d4",
              color: time ? "#1a1a2e" : "#c8bfba",
              background: "transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        </div>

        <div>
          <label className={fieldLabel} style={fieldLabelStyle}>
            Priority
          </label>
          <div className="flex gap-1">
            {priorityOptions.map((opt) => {
              const active = priority === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className="flex-1 text-[11px] font-medium py-2 rounded-lg transition-all"
                  style={{
                    background: active ? opt.bg : "transparent",
                    border: `1px solid ${active ? opt.border : "#e0d8d4"}`,
                    color: active ? opt.color : "#c8bfba",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg text-sm font-medium transition-all mt-1"
        style={{
          background: title.trim()
            ? "linear-gradient(135deg, #8b687f, #7b435b)"
            : "#f0ebe8",
          color: title.trim() ? "white" : "#c8bfba",
          border: "1px solid transparent",
        }}
      >
        Add task
      </button>
    </form>
  );
}
