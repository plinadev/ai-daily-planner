import { useEffect } from "react";

const STORAGE_KEY = "aria-chat-messages";

function getStoredMessages() {
  if (typeof window === "undefined") return undefined;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : undefined;
}

export function useChatPersistence(messages: any[], setMessages: any) {
  useEffect(() => {
    const stored = getStoredMessages();
    if (stored) {
      setMessages(stored);
    }
  }, [setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);
}
