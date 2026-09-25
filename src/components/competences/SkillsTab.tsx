import type { ReactNode } from "react";
import Link from "next/link";
import type { Skill } from "@/sanity/types";
import { GlitchReveal } from "@/components/visual/GlitchReveal";

interface SkillsTabProps {
  skills: Skill[];
  locale: string;
}

const categoryOrder = ["ia", "data", "mobile", "infra", "design"] as const;

type Category = (typeof categoryOrder)[number];

const proficiencyLabels: Record<string, { fr: string; en: string }> = {
  expert: { fr: "Expert", en: "Expert" },
  advanced: { fr: "Avancé", en: "Advanced" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
};

const expertise: Record<
  Category,
  {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    icon: ReactNode;
  }
> = {
  ia: {
    title: { fr: "Systèmes IA", en: "AI Systems" },
    description: {
      fr: "LLMs, RAG, prompt engineering et évaluation — de la preuve de concept à la production.",
      en: "LLMs, RAG, prompt engineering and evaluation — from prototype to production.",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
      </svg>
    ),
  },
  data: {
    title: { fr: "Systèmes Data", en: "Data Systems" },
    description: {
      fr: "SQL, analyse et visualisation pour transformer les données en décisions.",
      en: "SQL, analysis and visualization that turn data into decisions.",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  mobile: {
    title: { fr: "Applications Mobiles", en: "Mobile Applications" },
    description: {
      fr: "Flutter et React Native, de la conception UI jusqu'aux stores.",
      en: "Flutter and React Native, from UI design to the app stores.",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  infra: {
    title: { fr: "Infrastructure & DevOps", en: "Infrastructure & DevOps" },
    description: {
      fr: "Docker, CI/CD et Git pour des livraisons fiables et reproductibles.",
      en: "Docker, CI/CD and Git for reliable, repeatable deliveries.",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="8" rx="2" />
        <rect x="2" y="13" width="20" height="8" rx="2" />
        <path d="M6 7h.01M6 17h.01" />
      </svg>
    ),
  },
  design: {
    title: { fr: "Produit & Design", en: "Product & Design" },
    description: {
      fr: "UI/UX, design tokens et prototypage pour des produits aboutis.",
      en: "UI/UX, design tokens and prototyping for polished products.",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.83-.44-1.13-.29-.28-.44-.65-.44-1.12a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2z" />
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      </svg>
    ),
  },
};

const skillProofLinks: Record<string, string> = {
  RAG: "assistant-emails",
  "Prompt Engineering": "assistant-emails",
  Python: "assistant-emails",
  "LLM Evaluation": "compte-rendus",
  "SQL / Data": "automatisation-commandes",
  "Data Visualization": "automatisation-commandes",
  "UI/UX Design": "foodtruck-app",
  "Figma / Prototyping": "foodtruck-app",
  "React Native": "foodtruck-app",
  "Flutter / Dart": "mahafaka",
};

export function SkillsTab({ skills, locale }: SkillsTabProps) {
  const lang = locale === "en" ? "en" : "fr";

  if (skills.length === 0) {
    return (
      <p className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
        {lang === "fr"
          ? "Aucune compétence pour le moment."
          : "No skills to show yet."}
      </p>
    );
  }

  const grouped = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill);
    grouped.set(skill.category, list);
  }

  const orderedGroups = categoryOrder
    .map((category) => ({ category, items: grouped.get(category) ?? [] }))
    .filter((group) => group.items.length > 0);

  const remainder = orderedGroups.length % 3;
  const lastSpanClass =
    remainder === 1 ? "lg:col-span-3" : remainder === 2 ? "lg:col-span-2" : "";

  const marqueeNames = [...new Set(skills.map((skill) => skill.name))];

  return (
    <GlitchReveal>
      <div className="space-y-10">
        <div>
          <h2 className="mb-6 flex items-baseline gap-3 text-lg font-semibold">
            {lang === "fr" ? "Ce que je construis" : "What I Build"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedGroups.map(({ category, items }, index) => {
              const { title, description, icon } = expertise[category];
              const isLast = index === orderedGroups.length - 1;

              return (
                <article
                  key={category}
                  className={`flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 ${
                    isLast ? lastSpanClass : ""
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      {icon}
                    </span>
                    <h3 className="text-base font-semibold">{title[lang]}</h3>
                  </div>
                  <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {description[lang]}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {items.map((skill) => {
                      const href = skillProofLinks[skill.name];
                      const proficiencyText =
                        proficiencyLabels[skill.proficiency]?.[lang] ??
                        skill.proficiency;
                      const tagClass =
                        "inline-block rounded-full border border-neutral-200 bg-white px-2.5 py-1 font-mono text-[13px] font-medium text-neutral-600 transition-colors dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400";

                      const content = (
                        <>
                          {skill.name}
                          <span className="sr-only"> — {proficiencyText}</span>
                        </>
                      );

                      return (
                        <li key={skill._id}>
                          {href ? (
                            <Link
                              href={`/${locale}/projects/${href}`}
                              className={`${tagClass} hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-300`}
                            >
                              {content}
                            </Link>
                          ) : (
                            <span className={tagClass}>{content}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>

        <div
          className="marquee-region overflow-hidden border-y border-neutral-200 py-4 dark:border-neutral-800"
          aria-hidden="true"
        >
          <div className="animate-marquee flex w-max items-center whitespace-nowrap">
            {marqueeNames.map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="font-mono text-sm font-medium text-neutral-500 dark:text-neutral-400"
              >
                {name}
                <span className="text-primary-400 mx-4">•</span>
              </span>
            ))}
            {marqueeNames.map((name, index) => (
              <span
                key={`dup-${name}-${index}`}
                className="font-mono text-sm font-medium text-neutral-500 dark:text-neutral-400"
              >
                {name}
                <span className="text-primary-400 mx-4">•</span>
              </span>
            ))}
          </div>
        </div>

        <p className="text-center">
          <Link
            href={`/${locale}/projects`}
            className="text-primary-600 dark:text-primary-400 inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {lang === "fr" ? "Voir les projets" : "View projects"} →
          </Link>
        </p>
      </div>
    </GlitchReveal>
  );
}
