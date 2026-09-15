"use client";

interface ViewToggleProps {
  view: "timeline" | "grid";
  onChange: (view: "timeline" | "grid") => void;
  locale: string;
}

const ariaLabel: Record<string, { fr: string; en: string }> = {
  timeline: { fr: "Vue timeline", en: "Timeline view" },
  grid: { fr: "Vue grille", en: "Grid view" },
};

export function ViewToggle({ view, onChange, locale }: ViewToggleProps) {
  const lang = locale === "en" ? "en" : "fr";

  return (
    <div className="flex rounded-lg border border-neutral-200 dark:border-neutral-800">
      <button
        type="button"
        onClick={() => onChange("timeline")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          view === "timeline"
            ? "bg-primary-600 text-white"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
        }`}
        aria-label={ariaLabel.timeline[lang]}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          view === "grid"
            ? "bg-primary-600 text-white"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
        }`}
        aria-label={ariaLabel.grid[lang]}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
          />
        </svg>
      </button>
    </div>
  );
}
