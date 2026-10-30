"use client";

import { useState } from "react";
import type { Project } from "@/sanity/types";
import {
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  type ProjectType,
} from "@/lib/constants/projects";
import { projectsT } from "@/lib/i18n-server";
import { trackEvent } from "@/lib/utils/analytics";
import { FilterPills, type FilterFacet } from "@/components/ui/FilterPills";
import { ProjectGridCard } from "./ProjectGridCard";

/**
 * Barre de filtres maquette projets.html : pills press (primitive FilterPills),
 * compteur aria-live, grille de cartes maquette.
 */
export function ProjectFilterBar({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  const t = projectsT(locale);
  const [selected, setSelected] = useState<ProjectType | "all">("all");

  const facets: FilterFacet[] = PROJECT_TYPES.map((type) => ({
    value: type,
    label: PROJECT_TYPE_LABELS[type][locale === "en" ? "en" : "fr"],
    count: projects.filter((project) => project.projectTypes?.includes(type))
      .length,
  }));

  const filtered =
    selected === "all"
      ? projects
      : projects.filter((project) => project.projectTypes?.includes(selected));

  const selectType = (value: string) => {
    if (value === selected) return;
    setSelected(value as ProjectType | "all");
    trackEvent("project_filter", { type: value });
  };

  return (
    <div>
      <FilterPills
        data-testid="projects-filters"
        filtersLabel={t("filtersLabel")}
        allValue="all"
        allLabel={t("all")}
        allCount={projects.length}
        count={filtered.length}
        facets={facets}
        selected={selected}
        onChange={selectType}
        countOne={t("countOne")}
        countMany={t("countMany")}
      />
      <div className="projects-grid mt-6" data-testid="projects-grid">
        {filtered.map((project) => (
          <ProjectGridCard
            key={project._id}
            project={project}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
