import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/sanity/queries/projects";
import { CaseStudyTemplate } from "@/components/projects/CaseStudyTemplate";
import { ProjectDetailTemplate } from "@/components/projects/ProjectDetailTemplate";
import { featuredSlugs } from "@/lib/constants/projects";

const supportedLocales = ["fr", "en"] as const;

export async function generateStaticParams() {
  const projects = await getProjects();
  return supportedLocales.flatMap((locale) =>
    projects.map((p) => ({ slug: p.slug.current, locale })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  if (!supportedLocales.includes(locale as (typeof supportedLocales)[number])) {
    return {};
  }
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title[locale as keyof typeof project.title] ?? project.title.fr} — Sarobidy`,
    description:
      project.description[locale as keyof typeof project.description] ??
      project.description.fr,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  if (!supportedLocales.includes(locale as (typeof supportedLocales)[number])) {
    notFound();
  }
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const isFeatured = project.featured ?? featuredSlugs.includes(slug);

  return isFeatured ? (
    <CaseStudyTemplate project={project} locale={locale} />
  ) : (
    <ProjectDetailTemplate project={project} locale={locale} />
  );
}
