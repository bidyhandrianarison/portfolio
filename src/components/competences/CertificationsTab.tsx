"use client";

import { useState } from "react";
import type { Certification } from "@/sanity/types";
import { CertificationCard } from "./CertificationCard";
import { CATEGORY_LABELS } from "@/lib/constants/certifications";

interface CertificationsTabProps {
  certifications: Certification[];
  locale: string;
}

const t = {
  fr: {
    all: "Toutes",
    countOne: "certification",
    countMany: "certifications",
    empty: "Aucune certification pour le moment.",
    emptyCategory: "Aucune certification dans cette catégorie.",
    groupLabel: "Filtrer par catégorie",
  },
  en: {
    all: "All",
    countOne: "certification",
    countMany: "certifications",
    empty: "No certifications yet.",
    emptyCategory: "No certifications in this category.",
    groupLabel: "Filter by category",
  },
} as const;

export function CertificationsTab({
  certifications,
  locale,
}: CertificationsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const i = t[locale as keyof typeof t] ?? t.fr;
  const lang = locale === "en" ? "en" : "fr";

  const renderable = certifications.filter((c) => c.slug?.current);

  if (renderable.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500 dark:text-neutral-400">
        {i.empty}
      </p>
    );
  }

  const categories = Object.entries(CATEGORY_LABELS)
    .filter(([value]) => renderable.some((c) => c.category === value))
    .map(([value, label]) => ({ value, label: label[lang] }));

  const filtered =
    activeCategory === null
      ? renderable
      : renderable.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-8">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
          {renderable.length}
        </strong>{" "}
        {renderable.length === 1 ? i.countOne : i.countMany}
      </p>

      <div
        role="group"
        aria-label={i.groupLabel}
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          aria-pressed={activeCategory === null}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-primary-500 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          }`}
        >
          {i.all}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() =>
              setActiveCategory(activeCategory === cat.value ? null : cat.value)
            }
            aria-pressed={activeCategory === cat.value}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
      >
        {filtered.map((certification) => (
          <CertificationCard
            key={certification._id}
            certification={certification}
            locale={locale}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-neutral-500 dark:text-neutral-400">
          {i.emptyCategory}
        </p>
      )}
    </div>
  );
}
