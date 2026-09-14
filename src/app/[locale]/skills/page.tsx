import type { Metadata } from "next";
import { SkillsGrid } from "@/components/competences/SkillsGrid";
import { CertificationList } from "@/components/competences/CertificationList";
import { skills } from "@/lib/constants/skills";
import { certifications } from "@/lib/constants/certifications";

const t = {
  fr: {
    title: "Compétences & Certifications",
    heading: "Compétences",
    certifications: "Certifications",
  },
  en: {
    title: "Skills & Certifications",
    heading: "Skills",
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

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">{i.heading}</h1>
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
