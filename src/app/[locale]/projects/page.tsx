import Link from "next/link";
import { Suspense } from "react";
import { projects } from "@/lib/constants/projects";
import { HomeSkeleton } from "@/components/ui/skeleton";

const featuredSlugs = ["redsmite", "codilee", "freelance"];

const t = {
  fr: {
    title: "Projets",
    featuredHeading: "Études de cas",
    featuredLabel: "Études de cas",
    otherHeading: "Autres projets",
    otherLabel: "Autres projets",
    viewStudy: "Voir l'étude →",
  },
  en: {
    title: "Projects",
    featuredHeading: "Case Studies",
    featuredLabel: "Case Studies",
    otherHeading: "Other Projects",
    otherLabel: "Other Projects",
    viewStudy: "View case study →",
  },
} as const;

async function FeaturedProjects({ locale }: { locale: string }) {
  const featured = projects.filter((p) => featuredSlugs.includes(p.slug));
  const i = t[locale as keyof typeof t];

  return (
    <section className="mb-16" aria-label={i.featuredLabel}>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        {i.featuredHeading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <Link
            key={project.slug}
            href={`/${locale}/projects/${project.slug}`}
            className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {project.role} · {project.period}
            </p>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-primary-600 mt-4 inline-block text-sm font-medium">
              {i.viewStudy}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

async function OtherProjects({ locale }: { locale: string }) {
  const others = projects.filter((p) => !featuredSlugs.includes(p.slug));
  const i = t[locale as keyof typeof t];

  return (
    <section aria-label={i.otherLabel}>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        {i.otherHeading}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {others.map((project) => (
          <article
            key={project.slug}
            className="hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {project.role} · {project.period}
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
          </article>
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
  const i = t[locale as keyof typeof t];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {i.title}
        </h1>
      </section>

      <Suspense fallback={<HomeSkeleton />}>
        <FeaturedProjects locale={locale} />
      </Suspense>

      <Suspense fallback={<HomeSkeleton />}>
        <OtherProjects locale={locale} />
      </Suspense>
    </main>
  );
}
