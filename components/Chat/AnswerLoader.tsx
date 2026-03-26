import { IoSparkles } from "react-icons/io5";

const AnswerLoader = () => (
  <div className="flex items-center py-1">
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-pulse-wave"
            style={{
              background: `linear-gradient(90deg, #9fa0c3, #8b687f)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>
      <div className="flex items-center space-x-1.5">
        <IoSparkles
          size={14}
          className="text-[#8b687f] animate-gentle-sparkle"
        />
        <span className="text-base-content/40 text-sm animate-breathe-text">
          Aria is thinking…
        </span>
      </div>
    </div>

    <style>{`
      @keyframes pulse-wave { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
      @keyframes gentle-sparkle { 0%,100%{opacity:.5;transform:rotate(0deg) scale(1)} 50%{opacity:1;transform:rotate(180deg) scale(1.1)} }
      @keyframes breathe-text { 0%,100%{opacity:.6} 50%{opacity:.9} }
      .animate-pulse-wave { animation: pulse-wave 1.4s ease-in-out infinite; }
      .animate-gentle-sparkle { animation: gentle-sparkle 2s ease-in-out infinite; }
      .animate-breathe-text { animation: breathe-text 2s ease-in-out infinite; }
    `}</style>
  </div>
);

export default AnswerLoader;
