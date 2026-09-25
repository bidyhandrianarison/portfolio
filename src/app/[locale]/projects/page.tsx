import type { Metadata } from "next";
import { getProjects } from "@/lib/sanity/queries/projects";
import { ProjectTypeFilter } from "@/components/projects/ProjectTypeFilter";
import { pageAlternates } from "@/lib/constants/site";

const t = {
  fr: {
    title: "Projets",
    description:
      "Projets et études de cas de Sarobidy Andrianarison — développeur mobile, ingénieur IA et designer UI/UX.",
    catalogLabel: "Catalogue des projets",
  },
  en: {
    title: "Projects",
    description:
      "Projects and case study by Sarobidy Andrianarison — mobile developer, AI engineer, and UI/UX designer.",
    catalogLabel: "Project catalog",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  return {
    title: i.title,
    description: i.description,
    alternates: pageAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {i.title}
        </h1>
      </section>

      <section aria-label={i.catalogLabel}>
        <ProjectTypeFilter projects={projects} locale={locale} variant="full" />
      </section>
    </main>
  );
}
