import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";

const designProjects = projects.filter((p) =>
  p.tags.some((t) => ["#design", "#figma"].includes(t)),
);

export const metadata: Metadata = {
  title: "UI/UX Designer & Design Systems Engineer",
  description:
    "Design tokens, component libraries, Figma-to-code. Systems that developers actually use.",
};

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
