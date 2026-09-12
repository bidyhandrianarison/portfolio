export interface Skill {
  id: string;
  name: string;
  category: "mobile" | "ia" | "design" | "data" | "infra";
  proficiency: "expert" | "advanced" | "intermediate";
}

export const skills: Skill[] = [
  {
    id: "flutter",
    name: "Flutter / Dart",
    category: "mobile",
    proficiency: "expert",
  },
  {
    id: "react-native",
    name: "React Native",
    category: "mobile",
    proficiency: "advanced",
  },
  { id: "dart", name: "Dart", category: "mobile", proficiency: "expert" },
  {
    id: "kotlin",
    name: "Kotlin / Android",
    category: "mobile",
    proficiency: "intermediate",
  },
  { id: "rag", name: "RAG", category: "ia", proficiency: "expert" },
  {
    id: "langchain",
    name: "LangChain / LlamaIndex",
    category: "ia",
    proficiency: "expert",
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "ia",
    proficiency: "expert",
  },
  {
    id: "llm-eval",
    name: "LLM Evaluation",
    category: "ia",
    proficiency: "advanced",
  },
  { id: "python", name: "Python", category: "ia", proficiency: "expert" },
  { id: "sql", name: "SQL / Data", category: "data", proficiency: "advanced" },
  {
    id: "data-viz",
    name: "Data Visualization",
    category: "data",
    proficiency: "advanced",
  },
  {
    id: "figma",
    name: "Figma / Prototyping",
    category: "design",
    proficiency: "expert",
  },
  {
    id: "design-tokens",
    name: "Design Tokens",
    category: "design",
    proficiency: "expert",
  },
  {
    id: "storybook",
    name: "Storybook",
    category: "design",
    proficiency: "advanced",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    category: "design",
    proficiency: "expert",
  },
  { id: "ci-cd", name: "CI/CD", category: "infra", proficiency: "expert" },
  { id: "docker", name: "Docker", category: "infra", proficiency: "advanced" },
  {
    id: "vercel",
    name: "Vercel / Serverless",
    category: "infra",
    proficiency: "advanced",
  },
  { id: "git", name: "Git / GitHub", category: "infra", proficiency: "expert" },
];
