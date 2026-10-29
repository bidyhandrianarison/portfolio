import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getSkills } from "@/lib/sanity/queries/skills";
import { getTimelineEntries } from "@/lib/sanity/queries/timeline";
import { getProjects } from "@/lib/sanity/queries/projects";
import { SKILL_CATEGORY_ORDER } from "@/lib/constants/skills";
import { resolveLocale } from "@/lib/utils/locale";
import { ClockTick } from "@/components/home/ClockTick";
import { Reveal } from "@/components/home/Reveal";

function Tile({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-line bg-panel flex min-w-0 flex-col gap-2.5 rounded-[20px] border p-5 ${className ?? ""}`}
    >
      <span className="lbl">{label}</span>
      {children}
    </div>
  );
}

export async function BentoBrief({ locale }: { locale: string }) {
  const t = homeT(locale);
  let skills: Awaited<ReturnType<typeof getSkills>> = [];
  let timeline: Awaited<ReturnType<typeof getTimelineEntries>> = [];
  let projects: Awaited<ReturnType<typeof getProjects>> = [];

  try {
    [skills, timeline, projects] = await Promise.all([
      getSkills(),
      getTimelineEntries(),
      getProjects(),
    ]);
  } catch (error) {
    console.error("[home] bento failed:", error);
    return <ErrorFallback feature="home-bento" locale={locale} />;
  }

  const metric =
    projects.find((project) => project.slug.current === "assistant-emails")
      ?.metrics?.[0] ?? null;
  const metricValue = metric
    ? resolveLocale(metric.value, locale)
    : t("bento.metricFallback");
  const recent = timeline.slice(0, 4);
  const domains = SKILL_CATEGORY_ORDER.map((category) => ({
    category,
    label: t(`bento.buildCategories.${category}`),
    skills: skills.filter((skill) => skill.category === category),
  }));

  return (
    <div className="wrap">
      <Reveal className="sec-head">
        <h2>{t("bento.title")}</h2>
        <span className="meta">{t("bento.meta")}</span>
      </Reveal>
      <Reveal className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label={t("bento.statusLabel")}>
          <strong className="text-ok-text flex items-center gap-2 text-lg">
            <i aria-hidden="true" className="bg-ok h-2 w-2 rounded-full" />
            {t("bento.statusValue")}
          </strong>
          <span className="meta">{t("bento.statusSub")}</span>
          <ClockTick
            locale={locale}
            className="mt-auto font-mono text-[1.75rem] leading-none font-semibold tracking-[-0.02em]"
          />
          <span className="meta">{t("bento.clockSub")}</span>
        </Tile>
        <Tile label={t("bento.metricLabel")}>
          <p className="mt-auto text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none font-bold tracking-[-0.045em] whitespace-nowrap">
            {metricValue.includes("→") ? (
              <>
                {metricValue.slice(0, metricValue.indexOf("→") + 1)}{" "}
                <span className="text-accent">
                  {metricValue.slice(metricValue.indexOf("→") + 1).trim()}
                </span>
              </>
            ) : (
              metricValue
            )}
          </p>
          <span className="meta">{t("bento.metricSub")}</span>
        </Tile>
        <Tile
          label={t("bento.buildLabel")}
          className="sm:col-span-2 lg:row-span-2"
        >
          <div className="grid gap-3">
            {domains.map((domain) => (
              <div key={domain.category} className="grid gap-1.5">
                <b className="text-sm tracking-[-0.01em]">{domain.label}</b>
                <div className="flex flex-wrap gap-1.5">
                  {domain.skills.map((skill) => (
                    <span key={skill._id} className="tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tile>
        <Tile label={t("bento.pathLabel")} className="sm:col-span-2">
          <ol className="relative grid grid-cols-2 gap-x-3 gap-y-4 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="bg-line absolute top-1 right-0 left-1 hidden h-px lg:block"
            />
            {recent.map((entry) => (
              <li key={entry._id} className="relative min-w-0 pt-5">
                <span
                  aria-hidden="true"
                  className="bg-accent absolute top-0 left-0 h-2 w-2 rounded-full"
                />
                <b className="block text-[0.9375rem] tracking-[-0.01em]">
                  {resolveLocale(entry.organization ?? entry.title, locale)}
                </b>
                <span className="text-muted block text-[0.8125rem] leading-[1.4]">
                  {resolveLocale(entry.title, locale)} ·{" "}
                  {entry.dateStart.slice(0, 4)}
                </span>
              </li>
            ))}
          </ol>
        </Tile>
      </Reveal>
    </div>
  );
}
