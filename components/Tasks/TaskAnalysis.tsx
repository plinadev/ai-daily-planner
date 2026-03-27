"use client";

import { TaskAnalysis } from "@/hooks/useTaskAnalysis";

export default function TaskAnalysisCard({
  analysis,
  isLoading,
  error,
  onAnalyze,
  hasTasks,
}: {
  analysis: TaskAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onAnalyze: () => void;
  hasTasks: boolean;
}) {
  return (
    <div className="space-y-4">
      {/* header row */}
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-[10px] font-medium tracking-[0.12em] uppercase"
            style={{ color: "#b0a8a0" }}
          >
            AI Analysis
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#c8bfba" }}>
            Insights about your task list
          </p>
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading || !hasTasks}
          className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full transition-all disabled:opacity-40"
          style={{
            background: isLoading
              ? "#f0ebe8"
              : "linear-gradient(135deg, #8b687f18, #7b435b10)",
            border: "1px solid #e0d8d4",
            color: "#7b435b",
          }}
        >
          {isLoading ? (
            <>
              <span
                className="loading loading-spinner loading-xs"
                style={{ color: "#8b687f" }}
              />
              Analysing…
            </>
          ) : (
            <>
              <span>✦</span>
              Analyze
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-center py-2" style={{ color: "#c0544a" }}>
          {error}
        </p>
      )}

      {analysis && !isLoading && (
        <div className="space-y-5">
          {/* progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <p
                className="text-[10px] font-medium tracking-[0.12em] uppercase"
                style={{ color: "#c8bfba" }}
              >
                Completion
              </p>
              <p
                className="text-lg font-light tabular-nums"
                style={{ color: "#8b687f" }}
              >
                {Math.round(analysis.completionRate)}
                <span className="text-xs" style={{ color: "#c8bfba" }}>
                  %
                </span>
              </p>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "#ede8e4" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${analysis.completionRate}%`,
                  background:
                    "linear-gradient(90deg, #9fa0c3, #8b687f, #7b435b)",
                }}
              />
            </div>
          </div>

          {/* summary */}
          <p className="text-sm leading-relaxed" style={{ color: "#7a7068" }}>
            {analysis.summary}
          </p>

          {/* top priority */}
          <div
            className="px-4 py-3 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #faf5f3, #f5eeea)",
              borderLeft: "3px solid #8b687f",
            }}
          >
            <p
              className="text-[10px] font-medium tracking-[0.12em] uppercase mb-1.5"
              style={{ color: "#8b687f" }}
            >
              Focus on first
            </p>
            <p
              className="text-sm font-medium leading-snug"
              style={{ color: "#3a2830" }}
            >
              {analysis.topPriority}
            </p>
          </div>

          {/* suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="space-y-2.5">
              <p
                className="text-[10px] font-medium tracking-[0.12em] uppercase"
                style={{ color: "#c8bfba" }}
              >
                Suggestions
              </p>
              <ul className="space-y-2">
                {analysis.suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed"
                    style={{ color: "#7a7068" }}
                  >
                    <span
                      className="flex-shrink-0 font-medium"
                      style={{ color: "#9fa0c3" }}
                    >
                      –
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* conflicts */}
          {analysis.conflicts.length > 0 && (
            <div
              className="px-4 py-3 rounded-xl space-y-2"
              style={{ background: "#fdf2f1", border: "1px solid #f0d0ce" }}
            >
              <p
                className="text-[10px] font-medium tracking-[0.12em] uppercase"
                style={{ color: "#c07870" }}
              >
                Conflicts
              </p>
              <ul className="space-y-1.5">
                {analysis.conflicts.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed"
                    style={{ color: "#a05050" }}
                  >
                    <span className="flex-shrink-0">!</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* empty state */}
      {!analysis && !isLoading && (
        <p className="text-xs text-center py-4" style={{ color: "#d0c8c4" }}>
          Click the button to get insights about your tasks
        </p>
      )}
    </div>
  );
}
