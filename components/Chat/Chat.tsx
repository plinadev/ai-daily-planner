"use client";

import { useAttachments } from "@/hooks/useAttachments";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import { usePasteImages } from "@/hooks/usePasteImages";
import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useTasks } from "@/context/TasksContext";
import { DefaultChatTransport } from "ai";
import { Task } from "@/context/types";

let latestTasks: Task[] = [];

const transport = new DefaultChatTransport({
  api: "/api/chat",
  prepareSendMessagesRequest: ({ messages, trigger, messageId }) => ({
    body: {
      messages,
      trigger,
      messageId,
      tasks: latestTasks,
    },
  }),
});
export default function Chat() {
  const { tasks, addTask, toggleTask } = useTasks();

  useEffect(() => {
    latestTasks = tasks;
  }, [tasks]);
  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  });

  const [input, setInput] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  const { attachments, setAttachments, addFiles, removeAttachment, uploadAll } =
    useAttachments();

  useChatPersistence(messages, setMessages);
  usePasteImages(addFiles);

  const scrollRef = useAutoScroll([messages, status]);

  useEffect(() => {
    for (const message of messages) {
      if (message.role !== "assistant") continue;

      for (const part of message.parts ?? []) {
        if (part.type !== "tool-addTask" && part.type !== "tool-completeTask")
          continue;
        if (part.state !== "output-available") continue;

        const result = (part as any).output;

        if (part.type === "tool-addTask" && result?.action === "add") {
          const exists = tasks.some((t) => t.title === result.task.title);
          if (!exists) addTask(result.task);
        }

        if (
          part.type === "tool-completeTask" &&
          result?.action === "complete"
        ) {
          const match = tasks.find((t) =>
            result.id ? t.id === result.id : t.title === result.title,
          );
          if (match && !match.completed) toggleTask(match.id);
        }
      }
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = async (text?: string) => {
    const value = text ?? input;

    if ((!value.trim() && attachments.length === 0) || isLoading) return;

    const files = await uploadAll();

    setInput("");
    setAttachments([]);

    if (textareaRef.current) textareaRef.current.style.height = "40px";

    await sendMessage({
      text: value,
      files: files.length > 0 ? files : undefined,
    });
  };

  return (
    <div
      className="w-full flex flex-col h-full bg-base-100 rounded-2xl shadow-lg overflow-hidden"
      style={{ boxShadow: "0 8px 40px #9fa0c322, 0 2px 8px #8b687f11" }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        addFiles(e.dataTransfer.files);
      }}
    >
      {dragOver && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl pointer-events-none"
          style={{
            background: "rgba(159,160,195,0.15)",
            border: "2px dashed #9fa0c3",
            backdropFilter: "blur(2px)",
          }}
        >
          <p className="text-[#7b435b] font-medium text-sm tracking-wide">
            Drop image here
          </p>
        </div>
      )}

      <ChatHeader />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <ChatMessages
          messages={messages}
          status={status}
          error={error}
          onSuggestion={handleSend}
        />
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isLoading={isLoading}
        addFiles={addFiles}
        attachments={attachments}
        removeAttachment={removeAttachment}
        fileInputRef={fileInputRef}
        textareaRef={textareaRef}
      />
    </div>
  );
}
