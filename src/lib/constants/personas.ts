export interface Persona {
  id: string;
  slug: string;
  headline: string;
  subtext: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  tags: string[];
}

export const personas: Persona[] = [
  {
    id: "mobile",
    slug: "mobile",
    headline:
      "Des apps mobiles qui shipent vite, scalent propre, et s'intègrent à votre stack IA.",
    subtext:
      "Flutter/Dart expert. CI/CD zero-touch. Tests automatisés. Architecture clean. Prêt à rejoindre votre squad ou lead le mobile.",
    ctaPrimary: { label: "Voir projets mobile →", href: "/persona/mobile" },
    ctaSecondary: {
      label: "Mon GitHub",
      href: "https://github.com/bidyhandrianarison",
    },
    tags: [
      "#mobile",
      "#flutter",
      "#dart",
      "#ci-cd",
      "#testing",
      "#architecture",
    ],
  },
  {
    id: "ia",
    slug: "ia",
    headline: "RAG, agents, eval — de l'idée à la prod sans science-fiction.",
    subtext:
      "LangChain/LlamaIndex, chunking strategy, evaluation rigoureuse, cost/latency optimization. Je build des systèmes IA qui marchent en prod, pas en demo.",
    ctaPrimary: { label: "Discuter de mon projet →", href: "/chat" },
    ctaSecondary: { label: "Voir cas IA →", href: "/persona/ia" },
    tags: ["#ia", "#rag", "#langchain", "#llm-eval", "#prompt-eng", "#python"],
  },
  {
    id: "design",
    slug: "design",
    headline: "Design systems qui servent le dev, pas l'ego du designer.",
    subtext:
      "Tokens multi-platform (Web, Flutter, iOS, Android). Composants accessibles (Radix). Storybook doc. Sync Figma → code. Adoption mesurée.",
    ctaPrimary: { label: "Voir mes design systems →", href: "/persona/design" },
    ctaSecondary: {
      label: "Starter Kit gratuit",
      href: "/starter-kits/design-system-kit",
    },
    tags: [
      "#design",
      "#tokens",
      "#figma",
      "#storybook",
      "#accessibility",
      "#multi-platform",
    ],
  },
];
