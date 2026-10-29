import Link from "next/link";
import type { Project } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";
import { metric } from "@/lib/format/metric";
import { projectsT } from "@/lib/i18n-server";
import { ProjectsPrevNext } from "./ProjectsPrevNext";

/**
 * Détail « étude » (featured) — maquette stricte projet.html : en-tête
 * typographique, KPI chiffrés, Avant/Après, nav précédent/suivant.
 * hero.image / architecture / codeSnippets / body volontairement non affichés.
 */
export async function CaseStudyTemplate({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = projectsT(locale);
  const beforeAfter = project.beforeAfter;
  const before = beforeAfter?.beforeContent
    ? resolveLocale(beforeAfter.beforeContent, locale)
    : "";
  const after = beforeAfter?.afterContent
    ? resolveLocale(beforeAfter.afterContent, locale)
    : "";
  const rows = (content: string) =>
    content.split("\n").filter((line) => line.trim().length > 0);
  const prevNext = await ProjectsPrevNext({ project, locale });

  return (
    <main>
      <div className="wrap pt-14">
        <Link href={`/${locale}/projects`} className="meta hover:underline">
          {t("back")}
        </Link>
        <p className="meta mt-5">
          {resolveProjectRole(project, locale)} · {project.period}
        </p>
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-bold tracking-[-0.04em]">
          {resolveLocale(project.title, locale)}
        </h1>
        <p className="lede mt-4">
          {resolveLocale(project.description, locale)}
        </p>
        <div className="mt-4.5 flex flex-wrap gap-1.5">
          {(project.tags ?? []).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <section className="wrap mt-8" aria-label={t("results")}>
          <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
            {project.metrics
              .filter((metricRow) => metricRow.value && metricRow.label)
              .map((metricRow) => (
                <div key={metricRow.label.fr} className="kpi">
                  <b>{metric(resolveLocale(metricRow.value, locale))}</b>
                  <p className="meta">
                    {resolveLocale(metricRow.label, locale)}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}

      {(before || after) && (
        <section className="wrap mt-6 max-[600px]:mt-3.5">
          <h2 className="sr-only">
            {t("avant")} / {t("apres")}
          </h2>
          <article className="story">
            <div className="grid grid-cols-1 gap-8 min-[601px]:grid-cols-2">
              <div>
                <h4>
                  {beforeAfter?.beforeLabel
                    ? resolveLocale(beforeAfter.beforeLabel, locale)
                    : t("avant")}
                </h4>
                <ul>
                  {rows(before).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>
                  {beforeAfter?.afterLabel
                    ? resolveLocale(beforeAfter.afterLabel, locale)
                    : t("apres")}
                </h4>
                <ul>
                  {rows(after).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>
      )}

      <div className="pt-8">{prevNext}</div>
    </main>
  );
}
