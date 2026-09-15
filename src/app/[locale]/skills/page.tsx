import type { Metadata } from "next";
import { SkillsGrid } from "@/components/competences/SkillsGrid";
import { SkillsWordCloud } from "@/components/competences/SkillsWordCloud";
import { CertificationList } from "@/components/competences/CertificationList";
import { getSkills } from "@/lib/sanity/queries/skills";
import { getCertifications } from "@/lib/sanity/queries/certifications";

const t = {
  fr: {
    title: "Compétences & Certifications",
    heading: "Compétences",
    wordCloud: "Vue d'ensemble",
    certifications: "Certifications",
  },
  en: {
    title: "Skills & Certifications",
    heading: "Skills",
    wordCloud: "Overview",
    certifications: "Certifications",
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
        ? "Compétences techniques et certifications de Bidy Andrianarison"
        : "Bidy Andrianarison's technical skills and certifications",
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
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">{i.heading}</h1>
        <div className="mb-12 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="mb-4 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
            {i.wordCloud}
          </h2>
          <SkillsWordCloud skills={skills} locale={locale} />
        </div>
        <SkillsGrid skills={skills} locale={locale} />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          {i.certifications}
        </h2>
        <CertificationList certifications={certifications} />
      </section>
    </main>
  );
}
