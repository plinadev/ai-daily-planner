import { useEffect, useRef } from "react";

export function useAutoScroll(deps: any[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, deps);

  return containerRef;
}
