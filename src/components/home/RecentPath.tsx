import Link from "next/link";
import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getTimelineEntries } from "@/lib/sanity/queries/timeline";
import { resolveLocale } from "@/lib/utils/locale";
import { Reveal } from "@/components/home/Reveal";

export async function RecentPath({ locale }: { locale: string }) {
  const t = homeT(locale);

  let entries;
  try {
    entries = (await getTimelineEntries()).slice(0, 4);
  } catch (error) {
    console.error("[home] recent path failed:", error);
    return <ErrorFallback feature="home-recent" locale={locale} />;
  }

  const formatMonth = (isoDate: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
      month: "short",
      year: "numeric",
    }).format(new Date(isoDate));

  return (
    <div className="wrap">
      <Reveal className="sec-head">
        <h2>{t("recent.title")}</h2>
        <Link href={`/${locale}/parcours`} className="go">
          {t("recent.viewAll")}
        </Link>
      </Reveal>
      <Reveal>
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {entries.map((entry) => {
            const description = resolveLocale(entry.description, locale);
            const items = description.split(/(?<=[.!?])\s+/).filter(Boolean);
            return (
              <li
                key={entry._id}
                className="border-line before:bg-accent relative flex flex-col gap-1 border-l px-6 pt-5 pb-6 before:absolute before:top-0 before:-left-1 before:h-[7px] before:w-[7px] before:rounded-full"
              >
                <span className="meta text-accent">
                  {formatMonth(entry.dateStart)} —{" "}
                  {entry.dateEnd
                    ? formatMonth(entry.dateEnd)
                    : t("recent.present")}
                </span>
                <b className="mt-1 leading-[1.3] tracking-[-0.01em]">
                  {resolveLocale(entry.title, locale)}
                </b>
                {entry.organization && (
                  <span className="text-[0.875rem] font-semibold">
                    {resolveLocale(entry.organization, locale)}
                  </span>
                )}
                {items.length > 1 ? (
                  <ul className="text-muted mt-2 list-disc space-y-1.5 pl-4 text-[0.875rem] leading-relaxed">
                    {items.map((item, index) => (
                      <li key={`${entry._id}-${index}`}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted mt-1 text-[0.875rem]">
                    {description}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </div>
  );
}
