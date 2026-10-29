import type { Skill } from "@/sanity/types";
import { skillsT } from "@/lib/i18n-server";
import { SKILL_CATEGORY_ORDER } from "@/lib/constants/skills";
import { cn } from "@/lib/utils/cn";

/**
 * Grille maquette competences.html (.doms 6 col) : IA et Data en span-3,
 * les trois autres en span-2, numéros 01–05 fixés par SKILL_CATEGORY_ORDER,
 * tags data-driven depuis getSkills.
 */
export function DomainGrid({
  skills,
  locale,
}: {
  skills: Skill[];
  locale: string;
}) {
  const t = skillsT(locale);

  return (
    <div className="doms" data-testid="doms">
      {SKILL_CATEGORY_ORDER.map((category, index) => {
        const domainSkills = skills.filter(
          (skill) => skill.category === category,
        );
        return (
          <article
            key={category}
            className={cn(
              "dom",
              (category === "ia" || category === "data") && "large",
            )}
          >
            <span className="n meta">{String(index + 1).padStart(2, "0")}</span>
            <h3>{t(`domains.${category}.title`)}</h3>
            <p>{t(`domains.${category}.description`)}</p>
            <div className="tags">
              {domainSkills.map((skill) => (
                <span key={skill._id} className="tag">
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
