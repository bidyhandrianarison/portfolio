export const featuredSlugs: string[] = [
  "assistant-emails",
  "automatisation-commandes",
  "compte-rendus",
];

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
    slug: "assistant-emails",
    title: "Assistant de traitement d'emails",
    role: "Conception UX, IA, Développement, Automatisation",
    period: "2025 – 2026",
    tags: ["#ia", "#automatisation", "#email", "#rag", "#design"],
    description:
      "Assistant IA qui lit les emails et prépare des réponses dans la boîte habituelle. Le dirigeant valide puis envoie.",
  },
  {
    slug: "automatisation-commandes",
    title: "Automatisation de la planification des commandes",
    role: "Projet de bout en bout",
    period: "2025 – 2026",
    tags: ["#automatisation", "#data", "#processus"],
    description:
      "Système traitant les données et générant des suggestions de commande pour remplacer un cycle manuel de deux semaines.",
  },
  {
    slug: "compte-rendus",
    title: "Générateur de comptes-rendus",
    role: "IA, Développement",
    period: "2025 – 2026",
    tags: ["#ia", "#résumé", "#réunion", "#design"],
    description:
      "Outil produisant résumés, décisions et actions de suivi à partir de notes de réunions ou discussions d'équipe.",
  },
  {
    slug: "mahafaka",
    title: "Mahafaka",
    role: "Développeur Mobile",
    period: "2024 – 2025",
    tags: ["#mobile", "#flutter"],
    description: "Application mobile Flutter.",
  },
  {
    slug: "ramarofish",
    title: "RamaroFish",
    role: "Développeur",
    period: "2024 – 2025",
    tags: ["#web", "#fullstack"],
    description: "Application web fullstack.",
  },
  {
    slug: "mizzaria",
    title: "Mizzaria",
    role: "Développeur Mobile",
    period: "2024 – 2025",
    tags: ["#mobile", "#flutter"],
    description: "Application mobile Flutter.",
  },
  {
    slug: "foodtruck-app",
    title: "Foodtruck App",
    role: "Développeur Mobile",
    period: "2024 – 2025",
    tags: ["#mobile", "#flutter"],
    description: "Application mobile pour foodtruck.",
  },
  {
    slug: "mesdocs",
    title: "mesDocs",
    role: "Développeur Web",
    period: "2024 – 2025",
    tags: ["#web", "#documents"],
    description: "Application web de gestion de documents.",
  },
];
