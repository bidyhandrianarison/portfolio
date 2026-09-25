"use client";

import { useEffect, useRef } from "react";

export function MermaidDiagram({
  chart,
  bare = false,
}: {
  chart: string;
  bare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const thisRender = ++renderCount.current;
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      if (cancelled) return;
      const isDark = document.documentElement.classList.contains("dark");
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        securityLevel: "strict",
        themeVariables: {
          fontFamily: "Montserrat, sans-serif",
        },
      });
      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (renderCount.current === thisRender && ref.current)
            ref.current.innerHTML = svg;
        })
        .catch(() => {
          if (renderCount.current === thisRender && ref.current)
            ref.current.textContent =
              "Impossible d'afficher le diagramme / Failed to render diagram";
        });
    });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (bare) {
    return (
      <div
        ref={ref}
        className="flex h-full w-full items-center justify-center [&_svg]:h-auto [&_svg]:max-h-full [&_svg]:w-auto [&_svg]:max-w-full"
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div
        ref={ref}
        className="[&_svg]:h-auto [&_svg]:w-full! [&_svg]:max-w-none!"
      />
    </div>
  );
}
