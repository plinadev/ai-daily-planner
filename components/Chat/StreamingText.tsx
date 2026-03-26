import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function StreamingText({
  text,
  isStreaming,
}: {
  text: string;
  isStreaming: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!isStreaming) {
      timeoutRef.current = setTimeout(() => setDisplayed(text), 0);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    intervalRef.current = setInterval(() => {
      setDisplayed((prev) => {
        if (prev.length >= text.length) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return prev;
        }
        return text.slice(0, prev.length + 1);
      });
    }, 28);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, isStreaming]);

  return (
    <span className="relative">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold" style={{ color: "#7b435b" }}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic opacity-80">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="text-[15px]">{children}</li>,
          code: ({ children }) => (
            <code
              className="px-1.5 py-0.5 rounded text-[13px] font-mono"
              style={{ background: "#9fa0c322", color: "#7b435b" }}
            >
              {children}
            </code>
          ),
          h1: ({ children }) => (
            <h1
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className="text-lg font-semibold mb-1.5"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold mb-1">{children}</h3>
          ),
          hr: () => <hr className="my-3 border-base-300" />,
        }}
      >
        {displayed}
      </ReactMarkdown>
    </span>
  );
}

export default StreamingText;
