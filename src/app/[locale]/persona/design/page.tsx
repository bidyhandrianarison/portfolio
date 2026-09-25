import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";
import { pageAlternates } from "@/lib/constants/site";

const designProjects = projects.filter((p) =>
  p.tags.some((t) => ["#design", "#figma"].includes(t)),
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
        ? "Designer UI/UX & Ingénieur Design Systems"
        : "UI/UX Designer & Design Systems Engineer",
    description:
      locale === "fr"
        ? "Design tokens, bibliothèques de composants, Figma-to-code. Des systèmes que les développeurs utilisent vraiment."
        : "Design tokens, component libraries, Figma-to-code. Systems that developers actually use.",
    alternates: pageAlternates(locale, "/persona/design"),
  };
}

export default async function DesignPersonaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allSkills = await getSkills();
  const designSkills = allSkills.filter((s) => s.category === "design");

  return (
    <PersonaPage
      title={
        locale === "fr"
          ? "Designer UI/UX & Design Systems"
          : "Design Systems Engineer"
      }
      description={
        locale === "fr"
          ? "Tokens multi-plateformes (Web, Flutter, iOS, Android). Composants accessibles (Radix). Documentation Storybook. Sync Figma → code. Adoption mesurée."
          : "Multi-platform tokens (Web, Flutter, iOS, Android). Accessible components (Radix). Storybook docs. Figma → code sync. Measured adoption."
      }
      projects={designProjects}
      skills={designSkills}
      kits={[
        {
          name: "Design System Kit",
          slug: "design-system-kit",
          description:
            "Design system complet : tokens, composants Radix-based, Storybook, sync Figma.",
        },
      ]}
    />
  );
}
