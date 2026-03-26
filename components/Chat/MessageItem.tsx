import StreamingText from "./StreamingText";
import { FileUIPart } from "ai";

export default function MessageItem({ m, status, isLast }: any) {
  const isUser = m.role === "user";

  const text = m.parts
    .filter((p: any) => p.type === "text")
    .map((p: any) => p.text)
    .join("");

  const imageParts = m.parts.filter(
    (p: any): p is FileUIPart =>
      p.type === "file" &&
      (p.mediaType === "image/png" || p.mediaType === "image/jpeg") &&
      typeof p.url === "string" &&
      p.url.startsWith("https://"),
  );

  if (!isUser && !text) return null; // no loader here anymore

  return (
    <div className="space-y-1">
      <div className={`text-xs font-semibold mb-1 ${isUser ? "text-right" : "text-left"}`}
        style={{ color: isUser ? "#9fa0c3" : "#8b687f" }}>
        {isUser ? "You" : "Aria"}
      </div>

      {imageParts.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${isUser ? "justify-end" : "justify-start"} mb-1`}>
          {imageParts.map((img, idx) => (
            <img key={idx} src={img.url} alt="attachment"
              className="rounded-xl max-w-[220px] max-h-[180px] object-cover border border-base-200 shadow-sm" />
          ))}
        </div>
      )}

      <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
        {(!isUser || text) && (
          <div className={`chat-bubble text-[15px] leading-relaxed ${isUser ? "" : "bg-transparent pl-0"}`}
            style={isUser ? { background: "#9fa0c322", color: "#1a1a2e" } : { color: "#1a1a2e" }}>
            {isUser ? (
              <span className="whitespace-pre-wrap">{text}</span>
            ) : (
              <StreamingText text={text} isStreaming={status === "streaming" && isLast} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}