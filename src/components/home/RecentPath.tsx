import Link from "next/link";
import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getTimelineEntries } from "@/lib/sanity/queries/timeline";
import { resolveLocale } from "@/lib/utils/locale";

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
      <div className="sec-head">
        <h2>{t("recent.title")}</h2>
        <Link href={`/${locale}/parcours`} className="go">
          {t("recent.viewAll")}
        </Link>
      </div>
      <ol className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-4">
        {entries.map((entry) => (
          <li
            key={entry._id}
            className="border-line bg-panel border-t-accent flex flex-col gap-1 rounded-2xl border border-t-[3px] p-[18px]"
          >
            <span className="meta">
              {formatMonth(entry.dateStart)} —{" "}
              {entry.dateEnd ? formatMonth(entry.dateEnd) : t("recent.present")}
            </span>
            <b className="mt-1 leading-[1.3] tracking-[-0.01em]">
              {resolveLocale(entry.title, locale)}
            </b>
            {entry.organization && (
              <span className="text-[0.875rem] font-semibold">
                {resolveLocale(entry.organization, locale)}
              </span>
            )}
            <p className="text-muted mt-1 text-[0.875rem]">
              {resolveLocale(entry.description, locale)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
