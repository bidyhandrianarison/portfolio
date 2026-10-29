import Link from "next/link";
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
