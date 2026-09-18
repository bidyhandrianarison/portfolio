import type { Skill } from "@/sanity/types";
import { categoryLabels, proficiencyLabels } from "@/lib/constants/skills";

const proficiencyColors: Record<string, string> = {
  expert:
    "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100",
  advanced:
    "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100",
  intermediate:
    "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
};

interface SkillsGridProps {
  skills: Skill[];
  locale: string;
}

export function SkillsGrid({ skills, locale }: SkillsGridProps) {
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";

  const grouped = Object.groupBy(skills, (s) => s.category);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {categoryLabels[category]?.[lang] ?? category}
          </h2>
          <div className="flex flex-wrap gap-2">
            {items?.map((skill) => (
              <span
                key={skill._id}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${proficiencyColors[skill.proficiency]}`}
              >
                {skill.name}
                <span className="text-xs">
                  {proficiencyLabels[skill.proficiency]?.[lang] ??
                    skill.proficiency}
                </span>
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
