import type { Timeline } from "@/sanity/types";
import { TimelineSection } from "./TimelineSection";

interface ParcoursTimelineProps {
  entries: Timeline[];
  locale: string;
}

const sectionLabels = {
  fr: { academic: "Académique", professional: "Professionnel" },
  en: { academic: "Academic", professional: "Professional" },
} as const;

export function ParcoursTimeline({ entries, locale }: ParcoursTimelineProps) {
  const labels =
    sectionLabels[locale as keyof typeof sectionLabels] ?? sectionLabels.fr;

  const academic = entries.filter((e) => e.section === "academic");
  const professional = entries.filter((e) => e.section === "professional");
  entries
    .filter((e) => e.section !== "academic" && e.section !== "professional")
    .forEach((e) =>
      console.warn(
        `TimelineEntry "${e.title?.fr ?? e._id}" has unexpected section: "${e.section}"`,
      ),
    );

  return (
    <>
      <TimelineSection
        title={labels.academic}
        entries={academic}
        locale={locale}
      />
      <TimelineSection
        title={labels.professional}
        entries={professional}
        locale={locale}
      />
    </>
  );
}
