import { useEffect } from "react";

export function usePasteImages(addFiles: (files: File[]) => void) {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles: File[] = [];

      for (const item of Array.from(items)) {
        if (
          item.kind === "file" &&
          (item.type === "image/png" || item.type === "image/jpeg")
        ) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }

      if (imageFiles.length) addFiles(imageFiles);
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [addFiles]);
}
