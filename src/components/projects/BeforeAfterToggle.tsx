"use client";

import { useMemo } from "react";

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
  return (
    <div
      className="grid overflow-hidden rounded-xl border border-neutral-200 sm:grid-cols-2 dark:border-neutral-800"
      role="group"
      aria-label={ariaLabel ?? `${data.beforeLabel} vs ${data.afterLabel}`}
    >
      <div className="border-b border-neutral-200 p-6 sm:border-r sm:border-b-0 dark:border-neutral-800">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-neutral-200 px-3 py-1 text-[13px] font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
            {data.beforeLabel}
          </span>
        </div>
        <div className="text-sm text-neutral-800 dark:text-neutral-200">
          <ContentList content={data.beforeContent} />
        </div>
      </div>

      <div className="bg-primary-50/50 dark:bg-primary-950/30 p-6">
        <div className="mb-3">
          <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 inline-block rounded-full px-3 py-1 text-[13px] font-medium">
            {data.afterLabel}
          </span>
        </div>
        <div className="text-sm text-neutral-800 dark:text-neutral-200">
          <ContentList content={data.afterContent} />
        </div>
      </div>
    </div>
  );
}
