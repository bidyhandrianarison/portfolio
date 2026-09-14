import { Suspense } from "react";
import { getAllProjects } from "@/lib/content/projects";
import { projects as allProjectsConstant } from "@/lib/constants/projects";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/projects/ProjectCard";

const featuredSlugs = [
  "assistant-emails",
  "automatisation-commandes",
  "compte-rendus",
];

const t = {
  fr: {
    title: "Projets",
    featuredHeading: "Études de cas",
    featuredLabel: "Études de cas",
    otherHeading: "Autres projets",
    otherLabel: "Autres projets",
  },
  en: {
    title: "Projects",
    featuredHeading: "Case Studies",
    featuredLabel: "Case Studies",
    otherHeading: "Other Projects",
    otherLabel: "Other Projects",
  },
} as const;

function FeaturedProjects({
  locale,
  projects,
}: {
  locale: string;
  projects: ReturnType<typeof getAllProjects>;
}) {
  const featured = projects.filter((p) =>
    featuredSlugs.includes(p.frontmatter.slug),
  );
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <section className="mb-16" aria-label={i.featuredLabel}>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        {i.featuredHeading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard
            key={project.frontmatter.slug}
            slug={project.frontmatter.slug}
            title={project.frontmatter.title}
            role={project.frontmatter.role}
            period={project.frontmatter.period}
            description={project.frontmatter.description}
            tags={project.frontmatter.tags}
            locale={locale}
            href={`/${locale}/projects/${project.frontmatter.slug}`}
            variant="featured"
          />
        ))}
      </div>
    </section>
  );
}

function OtherProjects({ locale }: { locale: string }) {
  const others = allProjectsConstant.filter(
    (p) => !featuredSlugs.includes(p.slug),
  );
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <section aria-label={i.otherLabel}>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        {i.otherHeading}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {others.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            role={project.role}
            period={project.period}
            description={project.description}
            tags={project.tags}
            locale={locale}
            href={`/${locale}/projects/${project.slug}`}
          />
        ))}
      </div>
    </section>
  );
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;
  const contentProjects = getAllProjects(locale);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {i.title}
        </h1>
      </section>

      <Suspense fallback={<HomeSkeleton />}>
        <FeaturedProjects locale={locale} projects={contentProjects} />
      </Suspense>

      <OtherProjects locale={locale} />
    </main>
  );
}
