import { IoSend, IoAttach } from "react-icons/io5";
import AttachmentPreviewList from "./AttachmentPreviewList";
import { Dispatch, RefObject, SetStateAction } from "react";
import { AttachmentPreview } from "@/hooks/useAttachments";

export default function ChatInput({
  input,
  setInput,
  handleSend,
  isLoading,
  addFiles,
  attachments,
  removeAttachment,
  fileInputRef,
  textareaRef,
}: {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;

  handleSend: (text?: string) => Promise<void> | void;

  isLoading: boolean;

  addFiles: (files: FileList | File[]) => void;

  attachments: AttachmentPreview[];
  removeAttachment: (index: number) => void;

  fileInputRef: RefObject<HTMLInputElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col p-4 border-t border-base-200 lg:items-center flex-shrink-0"
      style={{
        background: "linear-gradient(160deg, #faf9f7 0%, #f5f2f0 100%)",
      }}
    >
      <AttachmentPreviewList
        attachments={attachments}
        removeAttachment={removeAttachment}
      />

      <div className="flex items-center space-x-2 lg:w-[680px] w-full">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="h-10 w-10 btn btn-square rounded-lg flex-shrink-0 border-none disabled:opacity-40"
          style={{ background: "#9fa0c322", color: "#8b687f" }}
        >
          <IoAttach size={20} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "40px";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
          }}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          className="textarea w-full min-h-[40px] max-h-[120px] resize-none rounded-lg text-[15px] leading-6 py-2 px-3"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: `1px solid ${"#e8e2de"}`,
            color: "#1a1a2e",
          }}
        />

        <button
          disabled={isLoading || (!input.trim() && attachments.length === 0)}
          onClick={() => handleSend()}
          className="h-10 w-10 btn btn-square rounded-lg flex-shrink-0 border-none disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, #8b687f, #7b435b)",
            color: "white",
          }}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <IoSend size={15} />
          )}
        </button>
      </div>

      <p
        className="text-[11px] mt-2 lg:w-[680px] w-full"
        style={{ color: "#9fa0c3" }}
      >
        Enter to send · Shift+Enter for new line · Ctrl+V or drag to attach
        image
      </p>
    </div>
  );
}
