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
        {featured.map((project, index) => {
          const metric = project.metrics?.[0];
          const copy = (key: string) =>
            t(`systems.sheets.${project.slug.current}.${key}`);
          const sheetT = (key: string) => t(`systems.io.${key}`);
          const ioCells = [
            { label: sheetT("entry"), content: copy("entry") },
            { label: sheetT("processing"), content: copy("processing") },
            { label: sheetT("output"), content: copy("output") },
            {
              label: sheetT("result"),
              content: metric ? resolveLocale(metric.value, locale) : "",
              accent: true,
            },
          ];

          return (
            <Reveal key={project._id}>
              <article className="border-line bg-panel overflow-hidden rounded-[14px] border">
                <div className="border-line flex flex-wrap items-center justify-between gap-3 border-b px-[18px] py-4">
                  <div>
                    <p className="meta">
                      sys/{String(index + 1).padStart(2, "0")} ·{" "}
                      {project.period}
                    </p>
                    <h3 className="mt-0.5 text-lg tracking-[-0.02em]">
                      {resolveLocale(project.title, locale)}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/projects/${project.slug.current}`}
                    className="go"
                  >
                    {t("systems.viewStudy")}
                  </Link>
                </div>
                <dl className="border-line grid grid-cols-1 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 min-[901px]:grid-cols-4">
                  {ioCells.map((cell, cellIndex) => (
                    <div
                      key={cell.label}
                      className={`border-line border-b px-[18px] py-3.5 min-[901px]:border-r min-[901px]:border-b-0 min-[901px]:[&:nth-child(4n)]:border-r-0 ${
                        cellIndex === ioCells.length - 1 ? "bg-accent-soft" : ""
                      }`}
                    >
                      <dt className="lbl mb-1.5">{cell.label}</dt>
                      <dd
                        className={`text-[0.9375rem] ${
                          cell.accent
                            ? "text-accent font-semibold tracking-[-0.01em]"
                            : ""
                        }`}
                      >
                        {cell.content}
                      </dd>
                    </div>
                  ))}
                </dl>
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
