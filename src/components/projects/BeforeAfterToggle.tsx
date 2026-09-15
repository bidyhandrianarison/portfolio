"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface BeforeAfterData {
  beforeLabel: string;
  afterLabel: string;
  beforeContent: string;
  afterContent: string;
}

function ContentList({ content }: { content: string }) {
  const items = useMemo(
    () =>
      content
        .replace(/\r/g, "")
        .split("\n")
        .map((l) => l.replace(/^-\s*/, "").trim())
        .filter(Boolean),
    [content],
  );

  return (
    <ul className="list-disc space-y-1 pl-4 text-sm text-neutral-800 dark:text-neutral-200">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function BeforeAfterToggle({
  data,
  ariaLabel,
}: {
  data: BeforeAfterData;
  ariaLabel?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      if (isDragging.current) return;
      setPosition((p) => p);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }, []);

  const panelContent = (
    <>
      <div className="mb-3">
        <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 inline-block rounded-full px-3 py-1 text-xs font-medium">
          {data.afterLabel}
        </span>
      </div>
      <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
        <ContentList content={data.afterContent} />
      </div>
    </>
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-neutral-200 select-none dark:border-neutral-800"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="slider"
      aria-label={ariaLabel ?? `${data.beforeLabel} vs ${data.afterLabel}`}
      aria-orientation="horizontal"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(position)}% ${data.beforeLabel}`}
    >
      {/* After panel — full width, underneath */}
      <div className="p-6">{panelContent}</div>

      {/* Before panel — clipped via clip-path, renders ON TOP */}
      <div
        className="border-primary-500 pointer-events-none absolute inset-0 border-r-2 bg-white p-6 dark:bg-neutral-950"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="mb-3">
          <span className="mb-3 inline-block rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
            {data.beforeLabel}
          </span>
        </div>
        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
          <ContentList content={data.beforeContent} />
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="bg-primary-500 absolute top-0 bottom-0 z-10 flex w-1 cursor-ew-resize items-center justify-center transition-[left] duration-150 ease-out motion-reduce:transition-none"
        style={{ left: `calc(${position}% - 2px)` }}
        aria-hidden="true"
      >
        <div className="bg-primary-500 h-8 w-8 rounded-full border-2 border-white shadow-md" />
      </div>
    </div>
  );
}
