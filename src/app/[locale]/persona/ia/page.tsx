import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";
import { pageAlternates } from "@/lib/constants/site";

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
    alternates: pageAlternates(locale, "/persona/ia"),
  };
}

export default async function IAPersonaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allSkills = await getSkills();
  const iaSkills = allSkills.filter((s) => s.category === "ia");

  return (
    <PersonaPage
      title={locale === "fr" ? "Ingénieur IA" : "AI Engineer"}
      description={
        locale === "fr"
          ? "LangChain/LlamaIndex, stratégie de chunking, évaluation rigoureuse, optimisation coûts/latence. Je construis des systèmes IA qui marchent en prod, pas en démo."
          : "LangChain/LlamaIndex, chunking strategy, rigorous evaluation, cost/latency optimization. I build AI systems that work in production, not demos."
      }
      projects={iaProjects}
      skills={iaSkills}
    />
  );
}
