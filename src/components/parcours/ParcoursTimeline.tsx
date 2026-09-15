"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Timeline } from "@/sanity/types";
import { TimelineEntry } from "./TimelineEntry";
import { TimelineFilters } from "./TimelineFilters";
import { ViewToggle } from "./ViewToggle";

type Filter = "all" | "academic" | "professional";

interface ParcoursTimelineProps {
  entries: Timeline[];
  locale: string;
}

export function ParcoursTimeline({ entries, locale }: ParcoursTimelineProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"timeline" | "grid">("timeline");

  if (entries.length === 0) return null;

  const filtered =
    filter === "all" ? entries : entries.filter((e) => e.section === filter);

  const academicCount = entries.filter((e) => e.section === "academic").length;
  const professionalCount = entries.filter(
    (e) => e.section === "professional",
  ).length;

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TimelineFilters active={filter} onChange={setFilter} locale={locale} />
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {filter === "all"
              ? `${entries.length} ${locale === "fr" ? "entrées" : "entries"}`
              : `${filtered.length} / ${filter === "academic" ? academicCount : professionalCount}`}
          </span>
          <ViewToggle view={view} onChange={setView} locale={locale} />
        </div>
      </div>

      {/* Timeline view */}
      {view === "timeline" && (
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-neutral-200 dark:bg-neutral-800" />
          <AnimatePresence mode="popLayout">
            {filtered.map((entry, i) => (
              <TimelineEntry
                key={entry._id}
                entry={entry}
                locale={locale}
                index={i}
                view="timeline"
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <motion.div layout className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((entry, i) => (
              <TimelineEntry
                key={entry._id}
                entry={entry}
                locale={locale}
                index={i}
                view="grid"
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-neutral-500 dark:text-neutral-400"
        >
          {locale === "fr"
            ? "Aucune entrée pour cette catégorie."
            : "No entries for this category."}
        </motion.p>
      )}
    </div>
  );
}
