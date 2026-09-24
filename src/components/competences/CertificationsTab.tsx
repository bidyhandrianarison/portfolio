"use client";

import type { Certification } from "@/sanity/types";
import { CertificationCard } from "./CertificationCard";

interface CertificationsTabProps {
  certifications: Certification[];
  locale: string;
}

const t = {
  fr: {
    countOne: "certification",
    countMany: "certifications",
    empty: "Aucune certification pour le moment.",
  },
  en: {
    countOne: "certification",
    countMany: "certifications",
    empty: "No certifications yet.",
  },
} as const;

export function CertificationsTab({
  certifications,
  locale,
}: CertificationsTabProps) {
  const i = t[locale as keyof typeof t] ?? t.fr;

  const renderable = certifications.filter((c) => c.slug?.current);

  if (renderable.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500 dark:text-neutral-400">
        {i.empty}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
          {renderable.length}
        </strong>{" "}
        {renderable.length === 1 ? i.countOne : i.countMany}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {renderable.map((certification) => (
          <CertificationCard
            key={certification._id}
            certification={certification}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
