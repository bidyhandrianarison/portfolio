import type { Metadata } from "next";
import { SkillsPageTabs } from "@/components/competences/SkillsPageTabs";
import { getSkills } from "@/lib/sanity/queries/skills";
import { getCertifications } from "@/lib/sanity/queries/certifications";

const t = {
  fr: {
    title: "Compétences & Certifications",
    heading: "Compétences & Certifications",
    skillsTab: "Compétences",
    certificationsTab: "Certifications",
  },
  en: {
    title: "Skills & Certifications",
    heading: "Skills & Certifications",
    skillsTab: "Skills",
    certificationsTab: "Certifications",
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
    description:
      locale === "fr"
        ? "Compétences techniques et certifications de Sarobidy Andrianarison"
        : "Sarobidy Andrianarison's technical skills and certifications",
  };
}

export default async function CompetencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  const [skills, certifications] = await Promise.all([
    getSkills(),
    getCertifications(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">{i.heading}</h1>
      <SkillsPageTabs
        skills={skills}
        certifications={certifications}
        locale={locale}
        labels={{
          skillsTab: i.skillsTab,
          certificationsTab: i.certificationsTab,
        }}
      />
    </main>
  );
}
