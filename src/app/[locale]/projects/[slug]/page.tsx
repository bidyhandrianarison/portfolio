import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";
import { CaseStudyTemplate } from "@/components/projects/CaseStudyTemplate";

export function generateStaticParams() {
  const frProjects = getAllProjects("fr");
  const enProjects = getAllProjects("en");
  const allSlugs = new Set([
    ...frProjects.map((p) => p.frontmatter.slug),
    ...enProjects.map((p) => p.frontmatter.slug),
  ]);
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);
  if (!project) return {};

  return {
    title: `${project.frontmatter.title} — Sarobidy`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();

  return <CaseStudyTemplate project={project} locale={locale} />;
}
