import type { Metadata } from "next";
import { getTimelineEntries } from "@/lib/sanity/queries/timeline";
import { ParcoursTimeline } from "@/components/parcours/ParcoursTimeline";
import { RemoteNotice } from "@/components/parcours/RemoteNotice";

const t = {
  fr: {
    title: "Parcours",
    empty: "Aucun parcours disponible.",
  },
  en: {
    title: "About",
    empty: "No timeline available.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  return {
    title: `${i.title} — Sarobidy Andrianarison`,
    description:
      locale === "fr"
        ? "Parcours académique et professionnel de Sarobidy Andrianarison."
        : "Academic and professional journey of Sarobidy Andrianarison.",
  };
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  let entries: Awaited<ReturnType<typeof getTimelineEntries>>;
  try {
    entries = await getTimelineEntries();
  } catch (err) {
    console.error("[parcours] Failed to fetch timeline:", err);
    entries = [];
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {i.title}
        </h1>
      </section>

      <RemoteNotice locale={locale} />

      {entries.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">{i.empty}</p>
      ) : (
        <ParcoursTimeline entries={entries} locale={locale} />
      )}
    </main>
  );
}
