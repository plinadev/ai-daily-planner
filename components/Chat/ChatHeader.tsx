export default function ChatHeader() {
  return (
    <div className="flex-shrink-0 px-6 py-5 border-b border-base-200 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, #bcf8ec 0%, #aed9e0 40%, #9fa0c3 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10 flex items-end justify-between">
        <div>
          <h1
            className="text-2xl leading-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: "#7b435b",
            }}
          >
            Aria
          </h1>
          <p
            className="text-[11px] mt-1 tracking-widest uppercase font-light"
            style={{ color: "#8b687f" }}
          >
            AI Daily Planner
          </p>
        </div>
        <div className="text-right">
          <div
            className="text-[11px] font-medium px-3 py-1.5 rounded-full"
            style={{
              background: "#ffffff55",
              color: "#7b435b",
              backdropFilter: "blur(8px)",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
