import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";

const mobileProjects = projects.filter((p) =>
  p.tags.some((t) => ["#mobile", "#flutter", "#dart", "#ci/cd"].includes(t)),
);

export const metadata: Metadata = {
  title: "Mobile Developer — Flutter, React Native, CI/CD",
  description:
    "Hire a mobile engineer who ships fast, writes tests, and bridges with AI/Design.",
};

export default async function MobilePersonaPage() {
  const allSkills = await getSkills();
  const mobileSkills = allSkills.filter(
    (s) => s.category === "mobile" || s.name === "CI/CD",
  );

  return (
    <PersonaPage
      title="Mobile Developer"
      description="Flutter/Dart expert. CI/CD zero-touch. Tests automatisés. Architecture clean. Prêt à rejoindre votre squad ou lead le mobile."
      projects={mobileProjects}
      skills={mobileSkills}
    />
  );
}
