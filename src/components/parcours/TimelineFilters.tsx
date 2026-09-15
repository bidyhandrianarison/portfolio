"use client";

import { motion } from "framer-motion";

type Filter = "all" | "academic" | "professional";

interface TimelineFiltersProps {
  active: Filter;
  onChange: (filter: Filter) => void;
  locale: string;
}

const labels: Record<Filter, { fr: string; en: string }> = {
  all: { fr: "Tous", en: "All" },
  academic: { fr: "Académique", en: "Academic" },
  professional: { fr: "Professionnel", en: "Professional" },
};

export function TimelineFilters({
  active,
  onChange,
  locale,
}: TimelineFiltersProps) {
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";

  return (
    <div className="flex gap-2">
      {(Object.keys(labels) as Filter[]).map((filter) => (
        <button
          type="button"
          key={filter}
          onClick={() => onChange(filter)}
          aria-pressed={active === filter}
          className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
          style={{ color: active === filter ? "white" : undefined }}
        >
          {active === filter && (
            <motion.div
              layoutId="activeFilter"
              className="bg-primary-600 absolute inset-0 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{labels[filter][lang]}</span>
        </button>
      ))}
    </div>
  );
}
