import Link from "next/link";
import { Suspense } from "react";
import { getProjects } from "@/lib/sanity/queries/projects";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { CvDownloadButton } from "@/components/parcours/CvDownloadButton";
import { ProfileHero } from "@/components/visual/ProfileHero";
import { GlitchReveal } from "@/components/visual/GlitchReveal";

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
  const allProjects = await getProjects();
  const featured = allProjects.filter((p) =>
    featuredSlugs.includes(p.slug.current),
  );
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <GlitchReveal>
      <section className="mb-20" aria-label={i.featuredLabel}>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          {i.featuredHeading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <article
              key={project._id}
              className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <h3 className="text-lg font-semibold">
                {project.title[locale as keyof typeof project.title] ??
                  project.title.fr}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {project.role} · {project.period}
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description[
                  locale as keyof typeof project.description
                ] ?? project.description.fr}
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
    </GlitchReveal>
  );
}

async function OtherProjects({ locale }: { locale: string }) {
  const allProjects = await getProjects();
  const others = allProjects.filter(
    (p) => !featuredSlugs.includes(p.slug.current),
  );
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <GlitchReveal>
      <section className="mb-20" aria-label={i.otherLabel}>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          {i.otherHeading}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((project) => (
            <article
              key={project._id}
              className="hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <h3 className="font-semibold">
                {project.title[locale as keyof typeof project.title] ??
                  project.title.fr}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {project.role} · {project.period}
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description[
                  locale as keyof typeof project.description
                ] ?? project.description.fr}
              </p>
            </article>
          ))}
        </div>
      </section>
    </GlitchReveal>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  let settings = null;
  try {
    settings = await getSettings();
  } catch (err) {
    console.error("[home] Failed to fetch settings:", err);
  }

  return (
    <main className="relative">
      {/* Hero — full-bleed, sort du conteneur */}
      <ProfileHero
        name="Sarobidy Andrianarison"
        tagline={i.tagline}
        roles={i.roles}
        viewProjects={i.viewProjects}
        contact={i.contact}
        locale={locale}
      />

      {/* Contenu principal */}
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:pt-12">
        {/* Featured Projects */}
        <Suspense fallback={<HomeSkeleton />}>
          <FeaturedProjects locale={locale} />
        </Suspense>

        {/* Other Projects */}
        <Suspense fallback={<HomeSkeleton />}>
          <OtherProjects locale={locale} />
        </Suspense>

        {/* Contact CTA */}
        <GlitchReveal>
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
        </GlitchReveal>
      </div>
    </main>
  );
}
