"use client";

import { useEffect, useState } from "react";
import type { Certification } from "@/sanity/types";
import { skillsT } from "@/lib/i18n-server";
import { FilterPills, type FilterFacet } from "@/components/ui/FilterPills";
import { CATEGORY_LABELS } from "@/lib/constants/certifications";
import { CertificationCard } from "./CertificationCard";

/**
 * Section certifications maquette competences.html : pills press par
 * catégorie (primitive FilterPills) + grille cert-grid 3 col de cartes
 * cliquables vers /certifications/[slug].
 */
export function CertificationsSection({
  certifications,
  locale,
}: {
  certifications: Certification[];
  locale: string;
}) {
  const t = skillsT(locale);
  const [selected, setSelected] = useState<string>("all");

  // Deep-link hérité ?tab=certifications : scroll simple vers la section.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("tab") ===
        "certifications"
    ) {
      document.getElementById("certifications")?.scrollIntoView();
    }
  }, []);

  if (certifications.length === 0) {
    return <p className="meta">{t("certEmpty")}</p>;
  }

  const renderable = certifications.filter(
    (certification) => certification.slug?.current,
  );

  const facets: FilterFacet[] = Object.entries(CATEGORY_LABELS).map(
    ([value, label]) => ({
      value,
      label: label[locale === "en" ? "en" : "fr"],
      count: renderable.filter(
        (certification) => certification.category === value,
      ).length,
    }),
  );

  const filtered =
    selected === "all"
      ? renderable
      : renderable.filter(
          (certification) => certification.category === selected,
        );

  return (
    <div>
      <FilterPills
        data-testid="cert-filters"
        filtersLabel={t("certFiltersLabel")}
        allValue="all"
        allLabel={t("certAll")}
        allCount={renderable.length}
        count={filtered.length}
        facets={facets}
        selected={selected}
        onChange={setSelected}
        countOne={t("certCountOne")}
        countMany={t("certCountMany")}
      />
      <ul className="cert-grid mt-6" data-testid="cert-grid">
        {filtered.map((certification) => (
          <li key={certification._id}>
            <CertificationCard certification={certification} locale={locale} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="meta py-6">{t("certEmptyCategory")}</p>
      )}
    </div>
  );
}
