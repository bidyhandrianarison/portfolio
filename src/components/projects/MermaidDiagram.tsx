"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "strict",
});

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const thisRender = ++renderCount.current;
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (renderCount.current === thisRender && ref.current)
          ref.current.innerHTML = svg;
      })
      .catch(() => {
        if (renderCount.current === thisRender && ref.current)
          ref.current.textContent = "Failed to render diagram";
      });
  }, [chart]);

  return (
    <div
      ref={ref}
      className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
    />
  );
}
