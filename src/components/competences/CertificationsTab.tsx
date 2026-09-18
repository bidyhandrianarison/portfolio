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
    count: "certifications",
    empty: "Aucune certification dans cette catégorie.",
  },
  en: {
    all: "All",
    count: "certifications",
    empty: "No certifications in this category.",
  },
} as const;

export function CertificationsTab({
  certifications,
  locale,
}: CertificationsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const i = t[locale as keyof typeof t] ?? t.fr;
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";

  const categories = [
    { value: "ia", label: CATEGORY_LABELS.ia[lang] },
    { value: "mobile", label: CATEGORY_LABELS.mobile[lang] },
    { value: "web", label: CATEGORY_LABELS.web[lang] },
    { value: "cloud", label: CATEGORY_LABELS.cloud[lang] },
    { value: "design", label: CATEGORY_LABELS.design[lang] },
  ];

  const filtered =
    activeCategory === null
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <span>
          <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
            {certifications.length}
          </strong>{" "}
          {i.count}
        </span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={i.count}>
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
          {i.empty}
        </p>
      )}
    </div>
  );
}
