import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { skills } from "@/lib/constants/skills";

const designProjects = projects.filter((p) =>
  p.tags.some((t) => ["#design", "#figma"].includes(t)),
);
const designSkills = skills.filter((s) => s.category === "design");

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
  };
}

export default function DesignPersonaPage() {
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
