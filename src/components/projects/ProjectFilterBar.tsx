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
import { cn } from "@/lib/utils/cn";
import { ProjectGridCard } from "./ProjectGridCard";

function countLabel(locale: string, count: number): string {
  const raw =
    count <= 1
      ? projectsT(locale)("countOne")
      : (projectsT(locale)("countMany") as string);
  return raw.replace("{n}", String(count));
}

/**
 * Barre de filtres maquette projets.html : boutons press par type avec
 * comptes calculés, compteur aria-live, grille de cartes maquette.
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

  const facets = PROJECT_TYPES.map((type) => ({
    type,
    label: PROJECT_TYPE_LABELS[type][locale === "en" ? "en" : "fr"],
    count: projects.filter((project) => project.projectTypes?.includes(type))
      .length,
  })).filter((facet) => facet.count > 0);

  const filtered =
    selected === "all"
      ? projects
      : projects.filter((project) => project.projectTypes?.includes(selected));

  const selectType = (value: ProjectType | "all") => {
    if (value === selected) return;
    setSelected(value);
    trackEvent("project_filter", { type: value });
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div
          role="group"
          aria-label={t("filtersLabel")}
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => selectType("all")}
            aria-pressed={selected === "all"}
            className={cn(
              "press border-line hover:border-accent/50 cursor-pointer rounded-full border px-3 py-[7px] text-[0.8125rem] font-medium",
              selected === "all"
                ? "border-content bg-content text-bg"
                : "bg-panel text-muted",
            )}
          >
            {t("all")} <span className="font-mono">({projects.length})</span>
          </button>
          {facets.map(({ type, label, count }) => (
            <button
              key={type}
              type="button"
              onClick={() => selectType(type)}
              aria-pressed={selected === type}
              className={cn(
                "press border-line hover:border-accent/50 cursor-pointer rounded-full border px-3 py-[7px] text-[0.8125rem] font-medium",
                selected === type
                  ? "border-content bg-content text-bg"
                  : "bg-panel text-muted",
              )}
            >
              {label} <span className="font-mono">({count})</span>
            </button>
          ))}
        </div>
        <p className="meta" aria-live="polite">
          {countLabel(locale, filtered.length)}
        </p>
      </div>
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
