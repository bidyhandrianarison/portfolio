import type { Timeline } from "@/sanity/types";
import { TimelineEntry } from "./TimelineEntry";

interface TimelineSectionProps {
  title: string;
  entries: Timeline[];
  locale: string;
}

export function TimelineSection({
  title,
  entries,
  locale,
}: TimelineSectionProps) {
  if (entries.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <div className="border-l-2 border-neutral-200 dark:border-neutral-800">
        {entries.map((entry) => (
          <TimelineEntry
            key={entry._id}
            dateStart={entry.dateStart}
            dateEnd={entry.dateEnd}
            title={entry.title}
            description={entry.description}
            tags={entry.tags}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
