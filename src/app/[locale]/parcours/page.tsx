import type { Metadata } from "next";
import Image from "next/image";
import { getTimelineEntries } from "@/lib/sanity/queries/timeline";
import { getSettings } from "@/lib/sanity/queries/settings";
import { homeT, parcoursT } from "@/lib/i18n-server";
import { TimelineFilterBar } from "@/components/parcours/TimelineFilterBar";
import { CvDownloadButton } from "@/components/parcours/CvDownloadButton";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { pageAlternates } from "@/lib/constants/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = parcoursT(locale);

  return {
    title: t("pageTitle"),
    description: t("description"),
    alternates: pageAlternates(locale, "/parcours"),
  };
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = parcoursT(locale);

  let entries: Awaited<ReturnType<typeof getTimelineEntries>>;
  let settings: Awaited<ReturnType<typeof getSettings>>;
  try {
    [entries, settings] = await Promise.all([
      getTimelineEntries(),
      getSettings(),
    ]);
  } catch (error) {
    console.error("[parcours] fetch failed:", error);
    return (
      <main className="wrap py-14">
        <ErrorFallback feature="parcours" locale={locale} />
      </main>
    );
  }

  return (
    <main>
      <div className="wrap py-14">
        <span className="avail">
          <i aria-hidden="true" />
          {homeT(locale)("avail")}
        </span>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-bold tracking-[-0.04em]">
          {t("pageTitle")}
        </h1>
        <div className="head-row">
          <span className="avatar" aria-hidden="true">
            <b>SA</b>
            <Image
              src="/pdp.jpg"
              alt=""
              fill
              sizes="72px"
              className="object-cover"
              priority
            />
          </span>
          <p className="text-muted max-w-[52ch] text-lg">{t("lead")}</p>
        </div>
        <div className="mt-5">
          <CvDownloadButton settings={settings} locale={locale} />
        </div>
      </div>
      <section className="wrap pb-14" aria-label={t("filtersLabel")}>
        {entries.length === 0 ? (
          <p className="meta">{t("empty")}</p>
        ) : (
          <TimelineFilterBar entries={entries} locale={locale} />
        )}
      </section>
    </main>
  );
}
