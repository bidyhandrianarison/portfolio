import Link from "next/link";
import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getProjects } from "@/lib/sanity/queries/projects";
import { featuredSlugs } from "@/lib/constants/projects";
import { resolveLocale } from "@/lib/utils/locale";
import { PipelineFigure } from "@/components/home/PipelineFigure";
import { Reveal } from "@/components/home/Reveal";

export async function AiSystems({ locale }: { locale: string }) {
  const t = homeT(locale);

  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("[home] ai systems failed:", error);
    return <ErrorFallback feature="home-systems" locale={locale} />;
  }

  const featured = featuredSlugs
    .map((slug) => projects.find((project) => project.slug.current === slug))
    .filter((project) => project !== undefined);

  if (featured.length === 0) {
    return <ErrorFallback feature="home-systems" locale={locale} />;
  }

  const stageList = t("systems.pipelines.assistant-emails.stages") as {
    title: string;
    sub: string;
  }[];
  const pipelineLogs = t("systems.pipelines.assistant-emails.logs") as string[];

  return (
    <div className="wrap">
      <Reveal className="sec-head">
        <h2>{t("systems.title")}</h2>
        <span className="meta">{t("systems.meta")}</span>
      </Reveal>

      <Reveal className="mb-3.5">
        <PipelineFigure
          caption={t("systems.pipelines.assistant-emails.caption")}
          result={t("systems.pipelines.assistant-emails.result")}
          stages={stageList}
          logs={pipelineLogs}
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-3.5">
        {featured.map((project) => {
          const metric = project.metrics?.[0];

          return (
            <Reveal key={project._id}>
              <article className="border-line grid gap-3 border-b py-6 md:grid-cols-[1.2fr_1.7fr_auto] md:items-center md:gap-6">
                <div>
                  <h3 className="text-lg tracking-[-0.02em]">
                    {resolveLocale(project.title, locale)}
                  </h3>
                  <p className="meta mt-1">{project.period}</p>
                </div>
                <div className="text-sm leading-relaxed">
                  {metric && (
                    <p className="text-accent font-semibold">
                      {resolveLocale(metric.value, locale)}
                    </p>
                  )}
                  <p className="text-muted">
                    {t(`systems.sheets.${project.slug.current}.output`)}
                  </p>
                </div>
                <Link
                  href={`/${locale}/projects/${project.slug.current}`}
                  className="go"
                >
                  {t("systems.viewStudy")}
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Link href={`/${locale}/projects`} className="btn press mt-4.5">
        {t("systems.viewAll")}
      </Link>
    </div>
  );
}
