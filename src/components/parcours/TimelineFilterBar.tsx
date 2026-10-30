"use client";

import { useState } from "react";
import type { Timeline } from "@/sanity/types";
import { parcoursT } from "@/lib/i18n-server";
import { FilterPills, type FilterFacet } from "@/components/ui/FilterPills";
import { TimelineFrise } from "./TimelineFrise";

/**
 * Choix le plus simple (miroir ProjectFilterBar) : ce composant client
 * possède le state, rend les pills et la frise filtrée. TimelineFrise reste
 * un composant de présentation pur réutilisable côté server.
 */
export function TimelineFilterBar({
  entries,
  locale,
}: {
  entries: Timeline[];
  locale: string;
}) {
  const t = parcoursT(locale);
  const [selected, setSelected] = useState<string>("all");

  const facets: FilterFacet[] = (["professional", "academic"] as const).map(
    (section) => ({
      value: section,
      label: t(`kind.${section}`),
      count: entries.filter((entry) => entry.section === section).length,
    }),
  );

  const filtered =
    selected === "all"
      ? entries
      : entries.filter((entry) => entry.section === selected);

  return (
    <div>
      <FilterPills
        data-testid="frise-filters"
        filtersLabel={t("filtersLabel")}
        allValue="all"
        allLabel={t("all")}
        allCount={entries.length}
        count={filtered.length}
        facets={facets}
        selected={selected}
        onChange={setSelected}
        countOne={t("countOne")}
        countMany={t("countMany")}
      />
      <div className="mt-6">
        <TimelineFrise entries={filtered} locale={locale} />
      </div>
    </div>
  );
}
