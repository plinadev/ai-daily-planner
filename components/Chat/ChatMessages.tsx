import MessageItem from "./MessageItem";
import EmptyChatAnimation from "./EmptyChatAnimation";
import AnswerLoader from "./AnswerLoader";
import { ChatStatus, UIMessage } from "ai";

export default function ChatMessages({
  messages,
  status,
  error,
  onSuggestion,
}: {
  messages: UIMessage[];
  status: ChatStatus;
  error?: Error | null;
  onSuggestion: (text: string) => void;
}) {
  const isLoading = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const showStandaloneLoader = isLoading && lastMessage?.role === "user";

  if (messages.length === 0) {
    return (
      <div className="h-full">
        <EmptyChatAnimation onSuggestion={onSuggestion} />
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5 lg:w-[680px] lg:mx-auto">
      {messages.map((m, index: number) => (
        <MessageItem
          key={m.id}
          m={m}
          status={status}
          isLast={index === messages.length - 1}
        />
      ))}

      {showStandaloneLoader && (
        <div className="space-y-1">
          <div
            className="text-xs font-semibold mb-1 text-left"
            style={{ color: "#8b687f" }}
          >
            Aria
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble bg-transparent pl-0 text-[15px]">
              <AnswerLoader />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          className="text-sm px-4 py-3 rounded-xl text-center"
          style={{
            background: "#ffeaea",
            color: "#b04040",
            border: "1px solid #f5c0c0",
          }}
        >
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}
