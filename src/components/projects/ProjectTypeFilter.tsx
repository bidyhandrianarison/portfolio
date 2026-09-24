"use client";

import Link from "next/link";
import { useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/sanity/types";
import {
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  type ProjectType,
} from "@/lib/constants/projects";
import { trackEvent } from "@/lib/utils/analytics";
import { CompactProjectCard } from "./CompactProjectCard";
import { ProjectCard } from "./ProjectCard";

const t = {
  fr: {
    all: "Tout",
    empty: "Aucun projet de ce type",
    reset: "Tout réinitialiser",
    viewAll: "Voir tous les projets",
    groupLabel: "Filtrer par type de projet",
    resultsShown: (count: number) =>
      `${count} projet${count === 1 ? "" : "s"} affiché${count === 1 ? "" : "s"}`,
  },
  en: {
    all: "All",
    empty: "No projects of this type",
    reset: "Reset all",
    viewAll: "View all projects",
    groupLabel: "Filter by project type",
    resultsShown: (count: number) =>
      `${count} project${count === 1 ? "" : "s"} shown`,
  },
} as const;

type FilterValue = ProjectType | "all";

const urlListeners = new Set<() => void>();

function subscribeToUrl(listener: () => void) {
  urlListeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    urlListeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function readSelectedType() {
  return new URLSearchParams(window.location.search).get("type") ?? "all";
}

function readSelectedTypeServer() {
  return "all";
}

interface ProjectTypeFilterProps {
  projects: Project[];
  locale: string;
  variant: "compact" | "full";
}

function ViewAllProjectsLink({
  locale,
  selected,
}: {
  locale: string;
  selected: string;
}) {
  const i = t[locale === "en" ? "en" : "fr"];
  const href =
    selected === "all"
      ? `/${locale}/projects`
      : `/${locale}/projects?type=${encodeURIComponent(selected)}`;
  return (
    <Link
      href={href}
      className="text-primary-600 dark:text-primary-400 mt-6 inline-flex items-center gap-1 text-sm font-medium hover:underline"
    >
      {i.viewAll} →
    </Link>
  );
}

function CompactGrid({
  projects,
  locale,
  selected,
}: {
  projects: Project[];
  locale: string;
  selected: string;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.slice(0, 4).map((project) => (
          <CompactProjectCard
            key={project._id}
            slug={project.slug.current}
            title={
              project.title[locale as keyof typeof project.title] ??
              project.title.fr
            }
            role={project.role}
            period={project.period}
            tags={project.tags}
            href={`/${locale}/projects/${project.slug.current}`}
            imageUrl={project.hero?.image?.asset?.url}
            imageAlt={project.hero?.image?.alt}
          />
        ))}
      </div>
      <ViewAllProjectsLink locale={locale} selected={selected} />
    </>
  );
}

function FullGrid({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          slug={project.slug.current}
          title={
            project.title[locale as keyof typeof project.title] ??
            project.title.fr
          }
          role={project.role}
          period={project.period}
          description={
            project.description[locale as keyof typeof project.description] ??
            project.description.fr
          }
          tags={project.tags}
          locale={locale}
          href={`/${locale}/projects/${project.slug.current}`}
          imageUrl={project.hero?.image?.asset?.url}
          imageAlt={project.hero?.image?.alt}
          imageLqip={project.hero?.image?.asset?.metadata?.lqip}
        />
      ))}
    </div>
  );
}

export function ProjectTypeFilter({
  projects,
  locale,
  variant,
}: ProjectTypeFilterProps) {
  const i = t[locale === "en" ? "en" : "fr"];
  const lang = locale === "en" ? "en" : "fr";
  const reduceMotion = useReducedMotion();
  const selected = useSyncExternalStore(
    subscribeToUrl,
    readSelectedType,
    readSelectedTypeServer,
  );

  const selectType = (type: FilterValue) => {
    if (type === selected) return;
    const url = new URL(window.location.href);
    if (type === "all") {
      url.searchParams.delete("type");
    } else {
      url.searchParams.set("type", type);
    }
    window.history.replaceState(window.history.state, "", url);
    trackEvent("project_filter", { type });
    urlListeners.forEach((listener) => listener());
  };

  const facets = PROJECT_TYPES.map((type) => ({
    type,
    count: projects.filter((project) => project.projectTypes?.includes(type))
      .length,
  })).filter((facet) => facet.count > 0);

  const filtered =
    selected === "all"
      ? projects
      : projects.filter((project) => project.projectTypes?.includes(selected));

  const isEmpty = selected !== "all" && filtered.length === 0;

  const renderPill = (label: string, count: number, value: FilterValue) => (
    <button
      type="button"
      key={value}
      onClick={() => selectType(value)}
      aria-pressed={selected === value}
      className="relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors"
      style={{ color: selected === value ? "white" : undefined }}
    >
      {selected === value &&
        (reduceMotion ? (
          <div className="bg-primary-600 absolute inset-0 rounded-full" />
        ) : (
          <motion.div
            layoutId="projectTypeFilter"
            className="bg-primary-600 absolute inset-0 rounded-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        ))}
      <span className="relative z-10">
        {label} ({count})
      </span>
    </button>
  );

  let content: ReactNode;
  if (isEmpty) {
    content = (
      <div className="py-12 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">{i.empty}</p>
        <button
          type="button"
          onClick={() => selectType("all")}
          className="text-primary-600 dark:text-primary-400 mt-3 text-sm font-medium hover:underline"
        >
          {i.reset}
        </button>
        {variant === "compact" && (
          <ViewAllProjectsLink locale={locale} selected={selected} />
        )}
      </div>
    );
  } else if (variant === "compact") {
    content = (
      <CompactGrid projects={filtered} locale={locale} selected={selected} />
    );
  } else {
    content = <FullGrid projects={filtered} locale={locale} />;
  }

  return (
    <div>
      <div
        role="group"
        aria-label={i.groupLabel}
        className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-1"
      >
        {renderPill(i.all, projects.length, "all")}
        {facets.map(({ type, count }) =>
          renderPill(PROJECT_TYPE_LABELS[type][lang], count, type),
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        {i.resultsShown(filtered.length)}
      </p>
      {content}
    </div>
  );
}
