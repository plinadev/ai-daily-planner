import {
  IoSparkles,
  IoCalendar,
  IoCheckmarkDone,
  IoTime,
} from "react-icons/io5";

const EmptyChatAnimation = ({
  onSuggestion,
}: {
  onSuggestion: (s: string) => void;
}) => {
  const suggestions = [
    "Plan my day — I have 3 meetings and a deadline",
    "Help me prioritize my task list",
    "I'm feeling overwhelmed, where do I start?",
  ];

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-40 h-40 rounded-full blur-2xl animate-pulse"
              style={{
                background: "linear-gradient(135deg, #bcf8ec33, #9fa0c333)",
              }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="absolute inset-0">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${18 + i * 10}%`,
                    top: `${12 + (i % 3) * 28}%`,
                    animationDelay: `${i * 0.35}s`,
                  }}
                >
                  <IoSparkles
                    size={7 + (i % 3) * 4}
                    className="animate-twinkle"
                    style={{
                      color: i % 2 === 0 ? "#9fa0c3" : "#8b687f",
                      opacity: 0.5,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="relative flex items-center space-x-6">
              {/* Calendar card */}
              <div
                className="bg-base-100 rounded-xl p-4 shadow-lg animate-float-gentle"
                style={{ border: "2px solid #aed9e066" }}
              >
                <IoCalendar
                  size={32}
                  className="mx-auto"
                  style={{ color: "#9fa0c3" }}
                />
                <div className="mt-2 space-y-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full animate-pulse"
                      style={{
                        background: "#aed9e066",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ color: "#9fa0c3", background: "#aed9e066" }}
                  >
                    Plan
                  </span>
                </div>
              </div>

              {/* Flow dots */}
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-flow-dots"
                    style={{
                      background: "linear-gradient(90deg, #9fa0c3, #7b435b)",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              {/* Checklist card */}
              <div
                className="bg-base-100 rounded-xl p-4 shadow-lg animate-float-gentle-delayed"
                style={{ border: "2px solid #aed9e066" }}
              >
                <IoCheckmarkDone
                  size={32}
                  className="mx-auto"
                  style={{ color: "#9fa0c3" }}
                />
                <div className="mt-2 flex justify-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-typing-dots"
                      style={{
                        background: "#aed9e066",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ color: "#9fa0c3", background: "#aed9e033" }}
                  >
                    Done
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 animate-spin pointer-events-none"
              style={{ animationDuration: "14s" }}
            >
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <IoTime size={16} className="text-base-content/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <h2
            className="text-3xl font-normal leading-tight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: "#1a1a2e",
              animation: "fade-in-up 0.7s ease-out 0.1s both",
              opacity: 0,
            }}
          >
            Good day. I&apos;m <span style={{ color: "#7b435b" }}>Aria</span>.
          </h2>
          <p
            className="text-base-content/50 text-base"
            style={{ animation: "fade-in 0.6s ease-out 0.8s both", opacity: 0 }}
          >
            Your personal daily planner. Tell me what&apos;s on your plate and
            I&apos;ll help you make sense of it.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
          {suggestions.map((s, i) => (
            <button
              key={s}
              onClick={() => onSuggestion(s)}
              className="text-left text-sm bg-base-100 border border-base-300 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer"
              style={{
                color: "#8b687f",
                animation: `slide-in-questions 0.6s ease-out ${1.0 + i * 0.15}s both`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "#9fa0c366";
                (e.currentTarget as HTMLElement).style.background = "#bcf8ec11";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.background = "";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-gentle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float-gentle-delayed { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes twinkle { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes flow-dots { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes typing-dots { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-8px);opacity:1} }
        @keyframes fade-in-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes slide-in-questions { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-gentle-delayed { animation: float-gentle-delayed 4s ease-in-out infinite .5s; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-flow-dots { animation: flow-dots 1.5s ease-in-out infinite; }
        .animate-typing-dots { animation: typing-dots 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default EmptyChatAnimation;
