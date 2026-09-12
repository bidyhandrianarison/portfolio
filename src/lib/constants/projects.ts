export interface Project {
  slug: string;
  title: string;
  role: string;
  period: string;
  tags: string[];
  description: string;
}

export const projects: Project[] = [
  {
    slug: "redsmite",
    title: "Redsmite",
    role: "Ingénieur IA & Automatisation",
    period: "mai 2026 – présent",
    tags: ["#ia", "#automation", "#rag", "#langchain", "#python"],
    description: "Systèmes RAG et automatisation IA en production.",
  },
  {
    slug: "codilee",
    title: "Codilee",
    role: "Développeur Mobile",
    period: "juil 2026 – présent",
    tags: ["#mobile", "#flutter", "#dart", "#ci/cd"],
    description:
      "Applications mobiles Flutter avec CI/CD et tests automatisés.",
  },
  {
    slug: "freelance",
    title: "Freelance",
    role: "Développeur / UI/UX Designer",
    period: "juil 2024 – présent",
    tags: ["#mobile", "#design", "#fullstack", "#client-facing"],
    description: "Développement mobile, design system et IA pour clients.",
  },
  {
    slug: "everabyte",
    title: "Everabyte",
    role: "Développeur",
    period: "oct 2025 – jan 2026",
    tags: ["#web", "#backend", "#api"],
    description: "Développement web backend et API.",
  },
  {
    slug: "misa",
    title: "MISA",
    role: "Webmaster",
    period: "jan 2024 – déc 2024",
    tags: ["#web", "#cms", "#analytics", "#seo"],
    description: "Gestion de site institutionnel avec analytics et SEO.",
  },
];
