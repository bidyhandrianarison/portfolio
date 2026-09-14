export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    id: "flutter-dev",
    name: "Initiation au Développement mobile",
    issuer: "Google",
    date: "2023",
    url: "https://www.coursera.org/account/accomplishments/verify/ABC123",
  },
  {
    id: "bcg-genai",
    name: "BCG - GenAI Job Simulation",
    issuer: "Forage",
    date: "2024",
    url: "https://www.theforage.com/completion/ABC123",
  },
  {
    id: "docker-intro",
    name: "Introduction à Docker",
    issuer: "OpenClassrooms",
    date: "2024",
  },
  {
    id: "rag-langchain",
    name: "Retrieval Augmented Generation (RAG) with LangChain",
    issuer: "DeepLearning.AI",
    date: "2024",
    url: "https://www.coursera.org/account/accomplishments/verify/ABC456",
  },
  {
    id: "sql-datacamp",
    name: "Data Manipulation in SQL",
    issuer: "DataCamp",
    date: "2023",
  },
];
