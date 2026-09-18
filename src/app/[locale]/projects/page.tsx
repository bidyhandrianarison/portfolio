import { Suspense } from "react";
import { getProjects } from "@/lib/sanity/queries/projects";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { featuredSlugs } from "@/lib/constants/projects";

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
  projects: Awaited<ReturnType<typeof getProjects>>;
}) {
  const featured = projects.filter((p) =>
    featuredSlugs.includes(p.slug.current),
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
            key={project._id}
            slug={project.slug.current}
            title={
              project.title[locale as keyof typeof project.title] ??
              project.title.fr
            }
            role={project.role}
            period={project.period}
            description={
              project.description[locale as keyof typeof project.description] ??
              project.description.fr
            }
            tags={project.tags}
            locale={locale}
            href={`/${locale}/projects/${project.slug.current}`}
            variant="featured"
          />
        ))}
      </div>
    </section>
  );
}

function OtherProjects({
  locale,
  projects,
}: {
  locale: string;
  projects: Awaited<ReturnType<typeof getProjects>>;
}) {
  const others = projects.filter(
    (p) => !featuredSlugs.includes(p.slug.current),
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
            key={project._id}
            slug={project.slug.current}
            title={
              project.title[locale as keyof typeof project.title] ??
              project.title.fr
            }
            role={project.role}
            period={project.period}
            description={
              project.description[locale as keyof typeof project.description] ??
              project.description.fr
            }
            tags={project.tags}
            locale={locale}
            href={`/${locale}/projects/${project.slug.current}`}
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
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {i.title}
        </h1>
      </section>

      <Suspense fallback={<HomeSkeleton />}>
        <FeaturedProjects locale={locale} projects={projects} />
      </Suspense>

      <OtherProjects locale={locale} projects={projects} />
    </main>
  );
}
