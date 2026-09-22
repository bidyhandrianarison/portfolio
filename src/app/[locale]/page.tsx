import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getProjects } from "@/lib/sanity/queries/projects";
import { getFeaturedCertifications } from "@/lib/sanity/queries/certifications";
import { getSettings } from "@/lib/sanity/queries/settings";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { CvDownloadButton } from "@/components/parcours/CvDownloadButton";
import { ProfileHero } from "@/components/visual/ProfileHero";
import { GlitchReveal } from "@/components/visual/GlitchReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CompactProjectCard } from "@/components/projects/CompactProjectCard";
import { featuredSlugs } from "@/lib/constants/projects";
import { CATEGORY_LABELS } from "@/lib/constants/certifications";
import { urlFor } from "@/lib/sanity/image";

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
  const lang = locale === "en" ? "en" : ("fr" as "fr" | "en");

  const resolveLocale = (val: unknown): string | undefined => {
    if (!val) return undefined;
    if (typeof val === "string") return val;
    if (typeof val === "object" && val !== null) {
      const obj = val as Record<string, string>;
      return obj[lang] ?? obj.fr ?? undefined;
    }
    return undefined;
  };

  if (certifications.length === 0) return null;

  const categoryColors: Record<string, string> = {
    ia: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    mobile: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    web: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    cloud:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    design: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  };

  return (
    <GlitchReveal>
      <section className="mb-20" aria-label={i.certificationsLabel}>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          {i.certificationsHeading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Link
              key={cert._id ?? cert.name}
              href={`/${locale}/certifications/${cert.slug?.current}`}
              className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
            >
              {cert.image && (
                <div className="relative h-32 overflow-hidden rounded-t-xl">
                  <Image
                    src={urlFor(cert.image).width(600).height(300).url()}
                    alt={cert.image.alt || (resolveLocale(cert.name) ?? "")}
                    fill
                    className="object-cover opacity-60 transition-opacity group-hover:opacity-80"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[cert.category] ?? ""}`}
                  >
                    {CATEGORY_LABELS[cert.category]?.[lang] ?? cert.category}
                  </span>
                  <span className="text-xs text-neutral-400">{cert.date}</span>
                </div>
                <h3 className="text-lg font-semibold">
                  {resolveLocale(cert.name) ?? ""}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {resolveLocale(cert.issuer) ?? ""}
                </p>
                {resolveLocale(cert.description?.why) && (
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {resolveLocale(cert.description?.why)}
                  </p>
                )}
              </div>
            </Link>
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

  const visibleProjects = others.slice(0, 4);

  return (
    <GlitchReveal>
      <section className="mb-20" aria-label={i.otherLabel}>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          {i.otherHeading}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <CompactProjectCard
              key={project._id}
              slug={project.slug.current}
              title={
                project.title[locale as keyof typeof project.title] ??
                project.title.fr
              }
              role={project.role}
              period={project.period}
              tags={project.tags}
              href={`/${locale}/projects/${project.slug.current}`}
              imageUrl={project.hero?.image?.asset?.url}
              imageAlt={project.hero?.image?.alt}
            />
          ))}
        </div>
        <Link
          href={`/${locale}/projects`}
          className="text-primary-600 dark:text-primary-400 mt-6 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          {locale === "fr" ? "Voir tous les projets" : "View all projects"} →
        </Link>
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
