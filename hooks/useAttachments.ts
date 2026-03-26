import { useCallback, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";

export interface AttachmentPreview {
  file: File;
  url: string;
}

function isImageFile(file: File) {
  return file.type === "image/png" || file.type === "image/jpeg";
}

async function uploadToBlob(file: File): Promise<string> {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
  });
  return blob.url;
}

export function useAttachments() {
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter(isImageFile);
    if (!arr.length) return;

    setAttachments((prev) => [
      ...prev,
      ...arr.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    return () => {
      attachments.forEach((a) => URL.revokeObjectURL(a.url));
    };
  }, [attachments]);

  const uploadAll = async () => {
    return Promise.all(
      attachments.map(async (a) => ({
        type: "file" as const,
        url: await uploadToBlob(a.file),
        mediaType: a.file.type as "image/png" | "image/jpeg",
      })),
    );
  };

  return {
    attachments,
    setAttachments,
    addFiles,
    removeAttachment,
    uploadAll,
  };
}
