"use client";

import { SkillsWordCloud } from "@/components/competences/SkillsWordCloud";
import { SkillsGrid } from "@/components/competences/SkillsGrid";
import type { Skill } from "@/sanity/types";

interface SkillsTabProps {
  skills: Skill[];
  locale: string;
}

export function SkillsTab({ skills, locale }: SkillsTabProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="mb-4 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          {locale === "fr" ? "Vue d'ensemble" : "Overview"}
        </h2>
        <SkillsWordCloud skills={skills} locale={locale} />
      </div>
      <SkillsGrid skills={skills} locale={locale} />
    </div>
  );
}
