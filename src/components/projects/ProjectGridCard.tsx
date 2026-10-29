import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";
import { metric } from "@/lib/format/metric";
import { projectsT } from "@/lib/i18n-server";
import { featuredSlugs } from "@/lib/constants/projects";
import { cn } from "@/lib/utils/cn";

export function ProjectGridCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = projectsT(locale);
  const featured =
    project.featured ?? featuredSlugs.includes(project.slug.current);
  const headlineMetric = featured
    ? project.metrics?.filter(
        (metricRow) => metricRow.value && metricRow.label,
      )?.[0]
    : undefined;

  return (
    <Link
      href={`/${locale}/projects/${project.slug.current}`}
      className={cn("proj press", featured && "etude")}
    >
      <div className="bg-panel-2 relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl">
        {project.hero?.image?.asset?.url ? (
          <Image
            src={project.hero.image.asset.url}
            alt={project.hero.image.alt || resolveLocale(project.title, locale)}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <svg
            data-testid="project-placeholder"
            aria-hidden="true"
            viewBox="0 0 80 80"
            fill="none"
            className="text-accent h-16 w-16"
          >
            <rect
              x="10"
              y="16"
              width="60"
              height="48"
              rx="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10 28h60M19 22h1m6 0h1m6 0h1M28 42l-6 5 6 5m24-10 6 5-6 5m-8-14-7 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <p className="meta">
        {resolveProjectRole(project, locale)} · {project.period}
      </p>
      {headlineMetric && (
        <>
          <p className="res">
            {metric(resolveLocale(headlineMetric.value, locale))}
          </p>
          <p className="meta">{resolveLocale(headlineMetric.label, locale)}</p>
        </>
      )}
      <h2>{resolveLocale(project.title, locale)}</h2>
      <p className="d">{resolveLocale(project.description, locale)}</p>
      <div className="flex flex-wrap gap-1.5">
        {(project.tags ?? []).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <span className="go">{featured ? t("voirEtude") : t("voirProjet")}</span>
    </Link>
  );
}
