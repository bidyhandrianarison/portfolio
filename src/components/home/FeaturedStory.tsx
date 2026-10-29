import Link from "next/link";
import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getProjectBySlug } from "@/lib/sanity/queries/projects";
import { resolveLocale, type LocaleString } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";
import { Reveal } from "@/components/home/Reveal";

export async function FeaturedStory({ locale }: { locale: string }) {
  const t = homeT(locale);
  const project = await getProjectBySlug("assistant-emails").catch(
    (error: unknown) => {
      console.error("[home] featured story failed:", error);
      return null;
    },
  );

  if (!project) {
    return <ErrorFallback feature="home-story" locale={locale} />;
  }

  const metric = project.metrics?.[0] ?? null;
  const beforeAfter = project.beforeAfter ?? null;
  const localized = (text?: LocaleString) =>
    text ? resolveLocale(text, locale) : "";
  const toLines = (text?: string) => (text ?? "").split("\n").filter(Boolean);
  const beforeLines = toLines(localized(beforeAfter?.beforeContent));
  const afterLines = toLines(localized(beforeAfter?.afterContent));

  return (
    <div className="wrap">
      <Reveal>
        <article className="border-line bg-panel rounded-[20px] border p-[clamp(22px,5vw,56px)]">
          <p className="meta">
            {t("story.meta")} · {resolveProjectRole(project, locale)} ·{" "}
            {project.period}
          </p>
          <h3 className="mt-2.5 font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] font-semibold tracking-[-0.01em]">
            {resolveLocale(project.title, locale)}
          </h3>
          <p className="text-muted mt-3 max-w-[58ch] font-serif text-lg leading-[1.65] font-normal">
            {resolveLocale(project.description, locale)}
          </p>
          {metric && (
            <>
              <p className="text-accent mt-8 font-serif text-[clamp(2.6rem,7vw,4.4rem)] leading-none font-semibold tracking-[-0.02em]">
                {resolveLocale(metric.value, locale)}
              </p>
              <p className="meta mt-2.5">
                {resolveLocale(metric.label, locale)}
              </p>
            </>
          )}
          {(beforeLines.length > 0 || afterLines.length > 0) && (
            <div className="border-line mt-8 grid grid-cols-1 gap-7 border-t pt-7 md:grid-cols-2">
              <div>
                <h4 className="text-muted mb-2.5 font-mono text-xs font-semibold tracking-[0.1em] uppercase">
                  {t("story.before")}
                </h4>
                <ul className="grid gap-2 font-serif text-[1.0625rem] leading-[1.55]">
                  {beforeLines.map((line) => (
                    <li key={line} className="text-muted relative pl-[18px]">
                      <span aria-hidden="true" className="absolute left-0">
                        —
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-accent mb-2.5 font-mono text-xs font-semibold tracking-[0.1em] uppercase">
                  {t("story.after")}
                </h4>
                <ul className="grid gap-2 font-serif text-[1.0625rem] leading-[1.55]">
                  {afterLines.map((line) => (
                    <li key={line} className="text-content relative pl-[18px]">
                      <span
                        aria-hidden="true"
                        className="text-accent absolute left-0"
                      >
                        ✓
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <Link
            href={`/${locale}/projects/assistant-emails`}
            className="btn press mt-[18px]"
          >
            {t("story.readStudy")}
          </Link>
        </article>
      </Reveal>
    </div>
  );
}
