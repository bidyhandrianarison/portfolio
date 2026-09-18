import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";

const iaProjects = projects.filter((p) =>
  p.tags.some((t) => ["#ia", "#rag", "#langchain", "#python"].includes(t)),
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
        ? "Ingénieur IA — RAG, LangChain, LLM Eval"
        : "AI Engineer — RAG, LangChain, LLM Eval",
    description:
      locale === "fr"
        ? "RAG production-ready, systèmes d'agents, pipelines d'évaluation. Construisons votre produit IA."
        : "Production-grade RAG, agent systems, evaluation pipelines. Let's build your AI product.",
    alternates: {
      canonical: `https://sarobidy-andrianarison.netlify.app/${locale}/persona/ia`,
    },
  };
}

export default async function IAPersonaPage() {
  const allSkills = await getSkills();
  const iaSkills = allSkills.filter((s) => s.category === "ia");

  return (
    <PersonaPage
      title="AI Engineer"
      description="LangChain/LlamaIndex, chunking strategy, evaluation rigoureuse, cost/latency optimization. Je build des systèmes IA qui marchent en prod, pas en demo."
      projects={iaProjects}
      skills={iaSkills}
    />
  );
}
