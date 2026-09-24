import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getProjects } from "@/lib/sanity/queries/projects";
import { getFeaturedCertifications } from "@/lib/sanity/queries/certifications";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { ProfileHero } from "@/components/visual/ProfileHero";
import { GlitchReveal } from "@/components/visual/GlitchReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectTypeFilter } from "@/components/projects/ProjectTypeFilter";
import { CertificationCard } from "@/components/competences/CertificationCard";
import { featuredSlugs } from "@/lib/constants/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description =
    locale === "fr"
      ? "Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems."
      : "Hybrid engineer building mobile apps, AI systems, and design systems.";

  return {
    description,
    alternates: {
      canonical: `https://sarobidy-andrianarison.netlify.app/${locale}`,
    },
  };
}

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
    certificationsLabel: "Certifications vedettes",
    certificationsHeading: "Certifications",
    viewAllCertifications: "Voir toutes les certifications",
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
    certificationsLabel: "Featured certifications",
    certificationsHeading: "Certifications",
    viewAllCertifications: "View all certifications",
    contactHeading: "Let's work together",
    contactText: "Have a project in mind? Let's talk.",
  },
} as const;

async function FeaturedProjects({
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
    <GlitchReveal>
      <section className="mb-20" aria-label={i.featuredLabel}>
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
                project.description[
                  locale as keyof typeof project.description
                ] ?? project.description.fr
              }
              tags={project.tags}
              locale={locale}
              href={`/${locale}/projects/${project.slug.current}`}
              variant="featured"
              imageUrl={project.hero?.image?.asset?.url}
              imageAlt={project.hero?.image?.alt}
              imageLqip={project.hero?.image?.asset?.metadata?.lqip}
            />
          ))}
        </div>
      </section>
    </GlitchReveal>
  );
}

async function FeaturedCertifications({ locale }: { locale: string }) {
  let certifications;
  try {
    certifications = await getFeaturedCertifications();
  } catch {
    return null;
  }
  const i = t[locale as keyof typeof t] ?? t.fr;

  if (certifications.length === 0) return null;

  return (
    <GlitchReveal>
      <section className="mb-20" aria-label={i.certificationsLabel}>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          {i.certificationsHeading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <CertificationCard
              key={cert._id}
              certification={cert}
              locale={locale}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/${locale}/skills?tab=certifications`}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium hover:underline"
          >
            {i.viewAllCertifications} →
          </Link>
        </div>
      </section>
    </GlitchReveal>
  );
}

async function OtherProjects({
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

  if (others.length === 0) return null;

  return (
    <GlitchReveal>
      <section className="mb-20" aria-label={i.otherLabel}>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          {i.otherHeading}
        </h2>
        <ProjectTypeFilter
          projects={others}
          locale={locale}
          variant="compact"
        />
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

  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try {
    projects = await getProjects();
  } catch (err) {
    console.error("[home] Failed to fetch projects:", err);
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
          <FeaturedProjects locale={locale} projects={projects} />
        </Suspense>

        {/* Other Projects */}
        <Suspense fallback={<HomeSkeleton />}>
          <OtherProjects locale={locale} projects={projects} />
        </Suspense>

        {/* Featured Certifications */}
        <Suspense fallback={<HomeSkeleton />}>
          <FeaturedCertifications locale={locale} />
        </Suspense>

        {/* Contact CTA */}
        <GlitchReveal>
          <section className="from-primary-50 to-primary-100/50 dark:from-primary-950/50 dark:to-primary-900/30 rounded-2xl bg-gradient-to-br p-8 text-center">
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
