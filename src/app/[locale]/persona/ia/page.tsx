import type { Metadata } from "next";
import { PersonaPage } from "@/components/layout/PersonaPage";
import { projects } from "@/lib/constants/projects";
import { skills } from "@/lib/constants/skills";

const iaProjects = projects.filter((p) =>
  p.tags.some((t) => ["#ia", "#rag", "#langchain", "#python"].includes(t)),
);
const iaSkills = skills.filter((s) => s.category === "ia");

export const metadata: Metadata = {
  title: "AI Engineer — RAG, LangChain, LLM Eval",
  description:
    "Production-grade RAG, agent systems, evaluation pipelines. Let's build your AI product.",
};

export default function IAPersonaPage() {
  return (
    <PersonaPage
      title="AI Engineer"
      description="LangChain/LlamaIndex, chunking strategy, evaluation rigoureuse, cost/latency optimization. Je build des systèmes IA qui marchent en prod, pas en demo."
      projects={iaProjects}
      skills={iaSkills}
    />
  );
}
