"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils/cn";

export type PipelineStage = { title: string; sub: string };

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReduce(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(REDUCE_QUERY);
  mql.addEventListener?.("change", callback);
  return () => mql.removeEventListener?.("change", callback);
}

function snapshotReduce() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCE_QUERY).matches;
}

function serverSnapshotReduce() {
  return false;
}

/**
 * Pipeline (07-synthese.html) : étape `on` tour à tour sur une boucle de 1400ms,
 * les précédentes passent à `done`, la log illustrative suit ; pause via
 * visibilitychange ; prefers-reduced-motion → état final figé, aucun intervalle.
 */
export function PipelineLoop({
  stages,
  logs,
}: {
  stages: PipelineStage[];
  logs: string[];
}) {
  const reduce = useSyncExternalStore(
    subscribeToReduce,
    snapshotReduce,
    serverSnapshotReduce,
  );
  const [tickIndex, setTickIndex] = useState(0);
  const total = stages.length;
  const index = reduce ? total - 1 : tickIndex;

  useEffect(() => {
    if (reduce) return;
    const tick = () => setTickIndex((current) => (current + 1) % total);
    let timer = setInterval(tick, 1400);
    const onVisibilityChange = () => {
      clearInterval(timer);
      if (!document.hidden) timer = setInterval(tick, 1400);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduce, total]);

  return (
    <>
      <ol className="grid grid-cols-1 gap-2.5 min-[901px]:grid-cols-5">
        {stages.map((stage, k) => {
          const on = k === index;
          const done = k < index;
          return (
            <li
              key={stage.title}
              className={cn(
                "bg-panel-2 relative rounded-[10px] border px-3 py-3.5 transition-colors duration-300",
                on
                  ? "on border-accent bg-accent-soft shadow-accent-soft ring-accent-soft ring-3"
                  : "border-line",
                done && "done border-accent/40",
                "min-[901px]:mr-5 min-[901px]:last:mr-0",
              )}
            >
              {k < total - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -right-[23px] hidden h-px w-[22px] min-[901px]:block",
                    on ? "bg-accent" : done ? "bg-accent/50" : "bg-line",
                  )}
                />
              )}
              <span
                className={cn(
                  "font-mono text-[0.6875rem] font-medium",
                  on ? "text-accent" : "text-muted",
                )}
              >
                {String(k + 1).padStart(2, "0")}
              </span>
              <b className="mt-1 mb-0.5 block text-[0.9375rem] tracking-[-0.01em]">
                {stage.title}
              </b>
              <span className="text-muted font-mono text-xs font-normal">
                {stage.sub}
              </span>
            </li>
          );
        })}
      </ol>
      <p
        aria-live="off"
        data-testid="pipeline-log"
        className="text-muted mt-3.5 font-mono text-xs leading-[1.6]"
        dangerouslySetInnerHTML={{ __html: `› ${logs[index]}` }}
      />
    </>
  );
}
