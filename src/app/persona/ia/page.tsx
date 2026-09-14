import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { getSkills } from "@/lib/sanity/queries/skills";

const iaProjects = projects.filter((p) =>
  p.tags.some((t) => ["#ia", "#rag", "#langchain", "#python"].includes(t)),
);

export const metadata: Metadata = {
  title: "AI Engineer — RAG, LangChain, LLM Eval",
  description:
    "Production-grade RAG, agent systems, evaluation pipelines. Let's build your AI product.",
};

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
