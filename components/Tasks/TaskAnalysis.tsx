"use client";

import { TaskAnalysis } from "@/hooks/useTaskAnalysis";

export default function TaskAnalysisCard({ analysis, isLoading, error, onAnalyze, hasTasks }: {
  analysis: TaskAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onAnalyze: () => void;
  hasTasks: boolean;
}) {
  return (
    <div className="space-y-3">
      <button
        onClick={onAnalyze}
        disabled={isLoading || !hasTasks}
        className="btn w-full btn-sm font-normal"
        style={{
          background: "linear-gradient(135deg, #8b687f22, #7b435b22)",
          border: "1px solid #8b687f44",
          color: "#7b435b",
        }}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="loading loading-spinner loading-xs" />
            Analysing…
          </span>
        ) : (
          "✦ Analyse tasks"
        )}
      </button>

      {error && (
        <p className="text-xs text-error text-center">{error}</p>
      )}

      {analysis && !isLoading && (
        <div className="space-y-3 text-sm">
          {/* completion bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-base-content/50">
              <span>Completion</span>
              <span>{Math.round(analysis.completionRate)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-base-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${analysis.completionRate}%`,
                  background: "linear-gradient(90deg, #8b687f, #7b435b)",
                }}
              />
            </div>
          </div>

          {/* summary */}
          <p className="text-xs text-base-content/60 leading-relaxed">{analysis.summary}</p>

          {/* top priority */}
          <div
            className="px-3 py-2 rounded-lg text-xs"
            style={{ background: "#8b687f11", borderLeft: "3px solid #8b687f" }}
          >
            <p className="font-medium text-[11px] uppercase tracking-wider mb-1" style={{ color: "#8b687f" }}>
              Top priority
            </p>
            <p className="text-base-content/80">{analysis.topPriority}</p>
          </div>

          {/* suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="space-y-1.5">
              <p className="font-medium text-[11px] uppercase tracking-wider text-base-content/40">
                Suggestions
              </p>
              <ul className="space-y-1">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-xs text-base-content/70 leading-relaxed">
                    <span style={{ color: "#8b687f" }}>–</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* conflicts */}
          {analysis.conflicts.length > 0 && (
            <div className="space-y-1.5">
              <p className="font-medium text-[11px] uppercase tracking-wider text-error/60">
                Conflicts
              </p>
              <ul className="space-y-1">
                {analysis.conflicts.map((c, i) => (
                  <li key={i} className="flex gap-2 text-xs text-error/70 leading-relaxed">
                    <span>!</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}