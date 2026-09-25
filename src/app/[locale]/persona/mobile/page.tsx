import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";
import { pageAlternates } from "@/lib/constants/site";

const mobileProjects = projects.filter((p) =>
  p.tags.some((t) => ["#mobile", "#flutter", "#dart", "#ci/cd"].includes(t)),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "fr"
        ? "Développeur Mobile — Flutter, React Native, CI/CD"
        : "Mobile Developer — Flutter, React Native, CI/CD",
    description:
      locale === "fr"
        ? "Engagez un ingénieur mobile qui livre vite, écrit des tests, et fait le pont avec l'IA/Design."
        : "Hire a mobile engineer who ships fast, writes tests, and bridges with AI/Design.",
    alternates: pageAlternates(locale, "/persona/mobile"),
  };
}

export default async function MobilePersonaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allSkills = await getSkills();
  const mobileSkills = allSkills.filter(
    (s) => s.category === "mobile" || s.name === "CI/CD",
  );

  return (
    <PersonaPage
      title={locale === "fr" ? "Développeur Mobile" : "Mobile Developer"}
      description={
        locale === "fr"
          ? "Expert Flutter/Dart. CI/CD sans friction. Tests automatisés. Architecture clean. Prêt à rejoindre votre squad ou piloter le mobile."
          : "Flutter/Dart expert. Zero-touch CI/CD. Automated tests. Clean architecture. Ready to join your squad or lead mobile."
      }
      projects={mobileProjects}
      skills={mobileSkills}
    />
  );
}
