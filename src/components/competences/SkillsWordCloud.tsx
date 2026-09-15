"use client";

import { useState, useMemo } from "react";
import type { Skill } from "@/sanity/types";

interface SkillsWordCloudProps {
  skills: Skill[];
  locale: string;
}

const categoryColors: Record<
  string,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  mobile: {
    bg: "bg-neutral-100",
    text: "text-neutral-700",
    darkBg: "dark:bg-neutral-800",
    darkText: "dark:text-neutral-300",
  },
  ia: {
    bg: "bg-neutral-100",
    text: "text-neutral-700",
    darkBg: "dark:bg-neutral-800",
    darkText: "dark:text-neutral-300",
  },
  design: {
    bg: "bg-neutral-100",
    text: "text-neutral-700",
    darkBg: "dark:bg-neutral-800",
    darkText: "dark:text-neutral-300",
  },
  data: {
    bg: "bg-neutral-100",
    text: "text-neutral-700",
    darkBg: "dark:bg-neutral-800",
    darkText: "dark:text-neutral-300",
  },
  infra: {
    bg: "bg-neutral-100",
    text: "text-neutral-700",
    darkBg: "dark:bg-neutral-800",
    darkText: "dark:text-neutral-300",
  },
};

const levelWeight: Record<string, number> = {
  intermediate: 300,
  advanced: 500,
  expert: 700,
};

const categoryLabels: Record<string, { fr: string; en: string }> = {
  mobile: { fr: "Mobile", en: "Mobile" },
  ia: { fr: "IA", en: "AI" },
  design: { fr: "Design", en: "Design" },
  data: { fr: "Data", en: "Data" },
  infra: { fr: "Infrastructure", en: "Infrastructure" },
};

export function SkillsWordCloud({ skills, locale }: SkillsWordCloudProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";

  const categories = useMemo(() => {
    const cats = new Set(skills.map((s) => s.category));
    return Array.from(cats).sort();
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (!activeCategory) return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  const maxLevel = useMemo(() => {
    const levels = filteredSkills.map((s) => levelWeight[s.proficiency] ?? 500);
    return Math.max(...levels, 1);
  }, [filteredSkills]);

  const sizes = useMemo(() => {
    return filteredSkills.map((s) => {
      const weight = levelWeight[s.proficiency] ?? 500;
      const minSize = 0.875;
      const maxSize = 2.25;
      return (
        minSize + ((weight - 300) / (maxLevel - 300 || 1)) * (maxSize - minSize)
      );
    });
  }, [filteredSkills, maxLevel]);

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            activeCategory === null
              ? "bg-primary-600 text-white shadow-md"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          }`}
        >
          {lang === "fr" ? "Tous" : "All"}
        </button>
        {categories.map((cat) => {
          const colors = categoryColors[cat] ?? categoryColors.tools;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                isActive
                  ? `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} shadow-md ring-2 ring-current/20`
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {categoryLabels[cat]?.[lang] ?? cat}
            </button>
          );
        })}
      </div>

      {/* Word cloud */}
      <div className="relative flex min-h-[200px] flex-wrap items-center justify-center gap-x-4 gap-y-3 py-8">
        {filteredSkills.map((skill, i) => {
          const colors = categoryColors[skill.category] ?? categoryColors.tools;
          const size = sizes[i];
          const isHovered = hoveredSkill === skill._id;
          const isOtherHovered =
            hoveredSkill !== null && hoveredSkill !== skill._id;

          return (
            <button
              key={skill._id}
              className={`skill-word inline-flex items-center gap-1.5 rounded-lg px-3 py-1 font-sans select-none ${
                isHovered
                  ? `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} shadow-lg ring-2 ring-current/20`
                  : isOtherHovered
                    ? "opacity-40"
                    : `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`
              }`}
              style={{
                fontSize: `${size}rem`,
                fontWeight: levelWeight[skill.proficiency] ?? 500,
                transition:
                  "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={() => setHoveredSkill(skill._id)}
              onMouseLeave={() => setHoveredSkill(null)}
              aria-label={`${skill.name} — ${categoryLabels[skill.category]?.[lang] ?? skill.category}`}
            >
              {skill.name}
              {isHovered && (
                <span className="text-xs opacity-70">
                  ·{" "}
                  {skill.proficiency === "expert"
                    ? lang === "fr"
                      ? "Expert"
                      : "Expert"
                    : skill.proficiency === "advanced"
                      ? lang === "fr"
                        ? "Avancé"
                        : "Advanced"
                      : lang === "fr"
                        ? "Intermédiaire"
                        : "Intermediate"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1">
          <span className="inline-block h-1 w-3 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          {lang === "fr" ? "Taille = niveau" : "Size = level"}
        </span>
        <span className="flex items-center gap-1">
          <span className="bg-primary-300 inline-block h-1 w-3 rounded-full" />
          {lang === "fr" ? "Couleur = catégorie" : "Color = category"}
        </span>
      </div>
    </div>
  );
}
