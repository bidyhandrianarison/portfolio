import type { Metadata } from "next";
import { getProjects } from "@/lib/sanity/queries/projects";
import { ProjectFilterBar } from "@/components/projects/ProjectFilterBar";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { projectsT } from "@/lib/i18n-server";
import { pageAlternates } from "@/lib/constants/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = projectsT(locale);

  return {
    title: t("pageTitle"),
    description: t("description"),
    alternates: pageAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = projectsT(locale);

  let projects;
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("[projects] grid failed:", error);
    return (
      <main className="wrap py-16">
        <ErrorFallback feature="projects" locale={locale} />
      </main>
    );
  }

  // Années étendue dérivée des period strings (« 2024 – 2025 » → min/max)
  const years = projects
    .flatMap((project) => project.period.match(/\d{4}/g) ?? [])
    .map(Number);
  const span =
    years.length > 0 ? `${Math.min(...years)} – ${Math.max(...years)}` : "";
  const metaCount = t(projects.length === 1 ? "metaOne" : "metaMany").replace(
    "{n}",
    String(projects.length),
  );

  return (
    <main>
      <div className="wrap py-14">
        <p className="meta">
          {metaCount}
          {span && ` · ${span}`}
        </p>
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-bold tracking-[-0.04em]">
          {t("pageTitle")}
        </h1>
      </div>
      <section className="wrap pb-14" aria-label={t("pageTitle")}>
        <ProjectFilterBar projects={projects} locale={locale} />
      </section>
    </main>
  );
}
