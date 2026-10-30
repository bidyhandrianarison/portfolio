import Image from "next/image";
import type { Timeline } from "@/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { resolveLocale } from "@/lib/utils/locale";
import { parcoursT } from "@/lib/i18n-server";
import { cn } from "@/lib/utils/cn";

function formatTimelineDate(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

/**
 * Frise maquette parcours.html : colonne dates 150px + carte .what, dot
 * accent + halo acc-soft et badge « En cours » quand dateEnd est absent.
 */
export function TimelineFrise({
  entries,
  locale,
}: {
  entries: Timeline[];
  locale: string;
}) {
  const t = parcoursT(locale);

  return (
    <ol className="frise" data-testid="frise">
      {entries.map((entry) => {
        const isPresent = !entry.dateEnd;
        return (
          <li key={entry._id} className={cn("step", isPresent && "present")}>
            <div className="when meta">
              <time dateTime={entry.dateStart}>
                {formatTimelineDate(entry.dateStart, locale)}
              </time>{" "}
              <span>
                {entry.dateEnd
                  ? `— ${formatTimelineDate(entry.dateEnd, locale)}`
                  : t("present")}
              </span>
            </div>
            <article className="what">
              <div className="top">
                <span className="kind meta">
                  {entry.section === "academic"
                    ? t("kind.academic")
                    : t("kind.professional")}
                </span>
                {isPresent && (
                  <span className="now">
                    <i aria-hidden="true" />
                    {t("now")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {entry.image?.asset?._ref && (
                  <Image
                    src={urlFor(entry.image).width(96).height(96).url()}
                    alt=""
                    width={48}
                    height={48}
                    className="border-line h-12 w-12 shrink-0 rounded-xl border bg-white object-contain p-1"
                  />
                )}
                <div className="min-w-0">
                  <h2>{resolveLocale(entry.title, locale)}</h2>
                  {entry.organization && (
                    <p className="org">
                      {resolveLocale(entry.organization, locale)}
                    </p>
                  )}
                </div>
              </div>
              <p className="desc">{resolveLocale(entry.description, locale)}</p>
              <div className="tags">
                {(entry.tags ?? []).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
