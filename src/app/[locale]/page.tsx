import Link from "next/link";
import { Suspense } from "react";
import { projects } from "@/lib/constants/projects";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { CvDownloadButton } from "@/components/parcours/CvDownloadButton";

const featuredSlugs = [
  "assistant-emails",
  "automatisation-commandes",
  "compte-rendus",
];

const t = {
  fr: {
    tagline:
      "Je transforme des processus complexes en produits simples, utiles et intelligents",
    roles: "Développeur Mobile · Ingénieur IA · UI/UX Designer",
    viewProjects: "Voir mes projets",
    contact: "Me contacter",
    featuredLabel: "Projets vedettes",
    featuredHeading: "Projets vedettes",
    otherLabel: "Autres projets",
    otherHeading: "Autres projets",
    contactHeading: "Travaillons ensemble",
    contactText: "Vous avez un projet en tête ? Discutons-en.",
  },
  en: {
    tagline: "I turn complex processes into simple, useful, and smart products",
    roles: "Mobile Dev · AI Engineer · UI/UX Designer",
    viewProjects: "View projects",
    contact: "Contact me",
    featuredLabel: "Featured projects",
    featuredHeading: "Featured projects",
    otherLabel: "Other projects",
    otherHeading: "Other projects",
    contactHeading: "Let's work together",
    contactText: "Have a project in mind? Let's talk.",
  },
} as const;

async function FeaturedProjects({ locale }: { locale: string }) {
  const featured = projects.filter((p) => featuredSlugs.includes(p.slug));
  const i = t[locale as keyof typeof t];

  return (
    <section className="mb-20" aria-label={i.featuredLabel}>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        {i.featuredHeading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <article
            key={project.slug}
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
          </article>
        ))}
      </div>
    </section>
  );
}

async function OtherProjects({ locale }: { locale: string }) {
  const others = projects.filter((p) => !featuredSlugs.includes(p.slug));
  const i = t[locale as keyof typeof t];

  return (
    <section className="mb-20" aria-label={i.otherLabel}>
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t];

  let settings = null;
  try {
    settings = await getSettings();
  } catch (err) {
    console.error("[home] Failed to fetch settings:", err);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Sarobidy Andrianarison
        </h1>
        <p className="mt-4 text-lg text-balance text-neutral-600 dark:text-neutral-400">
          {i.tagline}
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
          {i.roles}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/projects`}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {i.viewProjects}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="focus:ring-primary-500 inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {i.contact}
          </Link>
          <CvDownloadButton settings={settings} locale={locale} />
        </div>
      </section>

      {/* Featured Projects */}
      <Suspense fallback={<HomeSkeleton />}>
        <FeaturedProjects locale={locale} />
      </Suspense>

      {/* Other Projects */}
      <Suspense fallback={<HomeSkeleton />}>
        <OtherProjects locale={locale} />
      </Suspense>

      {/* Contact CTA */}
      <section className="rounded-2xl bg-neutral-100 p-8 text-center dark:bg-neutral-900">
        <h2 className="text-2xl font-semibold tracking-tight">
          {i.contactHeading}
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {i.contactText}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          {i.contact}
        </Link>
      </section>
    </main>
  );
}
