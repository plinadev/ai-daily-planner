import { AttachmentPreview } from "@/hooks/useAttachments";
import { IoClose } from "react-icons/io5";

export default function AttachmentPreviewList({
  attachments,
  removeAttachment,
}: {
  attachments: AttachmentPreview[];
  removeAttachment: (index: number) => void;
}) {
  if (!attachments.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-3 lg:w-[680px] w-full">
      {attachments.map((a: AttachmentPreview, i: number) => (
        <div key={i} className="relative group">
          <img
            src={a.url}
            alt="preview"
            className="w-16 h-16 rounded-lg object-cover border border-base-200 shadow-sm"
          />
          <button
            onClick={() => removeAttachment(i)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "#7b435b", color: "white" }}
          >
            <IoClose size={11} />
          </button>
        </div>
      ))}
    </div>
  );
}
