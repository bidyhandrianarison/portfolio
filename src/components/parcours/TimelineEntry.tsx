import type { LocaleString, LocaleText } from "@/sanity/types";

interface TimelineEntryProps {
  dateStart: string;
  dateEnd?: string;
  title: LocaleString;
  description: LocaleText;
  tags: string[];
  locale: string;
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(locale, { year: "numeric", month: "long" });
}

export function TimelineEntry({
  dateStart,
  dateEnd,
  title,
  description,
  tags,
  locale,
}: TimelineEntryProps) {
  const loc = locale === "en" ? "en" : "fr";

  const startFormatted = formatDate(dateStart, loc);
  const dateDisplay = dateEnd
    ? `${startFormatted} — ${formatDate(dateEnd, loc)}`
    : startFormatted;

  return (
    <article className="relative pb-10 pl-8 last:pb-0">
      <div className="border-primary-500 absolute top-1.5 left-0 h-3 w-3 rounded-full border-2 bg-white dark:bg-neutral-950" />
      <div className="absolute top-5 bottom-0 left-[5px] w-px bg-neutral-200 last:hidden dark:bg-neutral-800" />

      <time className="text-primary-600 dark:text-primary-400 text-sm font-bold">
        {dateDisplay}
      </time>
      <h3 className="mt-1 font-sans text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title[loc] ?? title.fr}
      </h3>
      <p className="mt-2 font-serif text-neutral-600 dark:text-neutral-400">
        {description[loc] ?? description.fr}
      </p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
