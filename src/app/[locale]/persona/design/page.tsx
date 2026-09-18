import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";

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
    alternates: {
      canonical: `https://sarobidy-andrianarison.netlify.app/${locale}/persona/design`,
    },
  };
}

export default async function DesignPersonaPage() {
  const allSkills = await getSkills();
  const designSkills = allSkills.filter((s) => s.category === "design");

  return (
    <PersonaPage
      title="Design Systems Engineer"
      description="Tokens multi-platform (Web, Flutter, iOS, Android). Composants accessibles (Radix). Storybook doc. Sync Figma → code. Adoption mesurée."
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
