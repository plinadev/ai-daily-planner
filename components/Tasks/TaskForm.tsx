"use client";

import { useState, useEffect, useRef } from "react";
import { useCompletion } from "@ai-sdk/react";
import { TaskPriority } from "@/context/types";

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
        <span className="text-base-content/30">{suggestion}</span>
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
        className="input input-bordered w-full text-sm bg-transparent relative z-20"
      />
    </div>
  );
}

export default function TaskForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* TITLE */}
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium tracking-widest uppercase text-base-content/50">
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
          placeholder="e.g. Finalise Q3 report"
        />
        <p className="h-4 text-[11px] text-base-content/40">
          {isLoading && activeField === "title"
            ? "Thinking…"
            : titleSuggestion
              ? "Tab to accept · Esc to dismiss"
              : ""}
        </p>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium tracking-widest uppercase text-base-content/50">
          Description
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
        <p className="h-4 text-[11px] text-base-content/40">
          {isLoading && activeField === "description"
            ? "Thinking…"
            : descSuggestion
              ? "Tab to accept · Esc to dismiss"
              : ""}
        </p>
      </div>

      <div className="divider my-0" />

      <div className="grid grid-cols-2 gap-3">
        {/* TIME */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-base-content/50">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input input-bordered w-full text-sm"
          />
        </div>

        {/* PRIORITY */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium tracking-widest uppercase text-base-content/50">
            Priority
          </label>
          <div className="flex gap-1.5">
            {(["low", "medium", "high"] as TaskPriority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`btn btn-xs flex-1 font-normal border transition-all ${
                  priority === p
                    ? p === "low"
                      ? "bg-success/20 border-success/50 text-success"
                      : p === "medium"
                        ? "bg-warning/20 border-warning/50 text-warning"
                        : "bg-error/20 border-error/50 text-error"
                    : "btn-ghost border-base-content/10 text-base-content/40"
                }`}
              >
                {p === "medium"
                  ? "Med"
                  : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <button type="submit" className="btn btn-neutral w-full mt-1">
        Add task
      </button>
    </form>
  );
}
