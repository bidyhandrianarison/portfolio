import type { Metadata } from "next";
import { SkillsPageTabs } from "@/components/competences/SkillsPageTabs";
import { getSkills } from "@/lib/sanity/queries/skills";
import { getCertifications } from "@/lib/sanity/queries/certifications";
import { pageAlternates } from "@/lib/constants/site";

const t = {
  fr: {
    title: "Compétences & Certifications",
    heading: "Compétences & Certifications",
    intro:
      "Cinq expertises, un fil conducteur : transformer la complexité en produits fiables. Démontré par des projets concrets.",
    description:
      "Compétences en IA, data, mobile, infra et design — avec les certifications et projets qui les prouvent.",
    skillsTab: "Compétences",
    certificationsTab: "Certifications",
    tabsAria: "Compétences et certifications",
  },
  en: {
    title: "Skills & Certifications",
    heading: "Skills & Certifications",
    intro:
      "Five expertises, one thread: turning complexity into reliable products. Demonstrated through concrete projects.",
    description:
      "Skills in AI, data, mobile, infra and design — with the certifications and projects that prove them.",
    skillsTab: "Skills",
    certificationsTab: "Certifications",
    tabsAria: "Skills and certifications",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  return {
    title: i.title,
    description: i.description,
    alternates: pageAlternates(locale, "/skills"),
  };
}

export default async function CompetencesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const { tab } = await searchParams;
  const i = t[locale as keyof typeof t] ?? t.fr;
  const initialTab = tab === "certifications" ? "certifications" : "skills";

  const [skills, certifications] = await Promise.all([
    getSkills(),
    getCertifications(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-3 text-3xl font-bold tracking-tight">{i.heading}</h1>
      <p className="mb-8 max-w-2xl text-neutral-600 dark:text-neutral-400">
        {i.intro}
      </p>
      <SkillsPageTabs
        skills={skills}
        certifications={certifications}
        locale={locale}
        initialTab={initialTab}
        labels={{
          skillsTab: i.skillsTab,
          certificationsTab: i.certificationsTab,
          tabsAria: i.tabsAria,
        }}
      />
    </main>
  );
}
