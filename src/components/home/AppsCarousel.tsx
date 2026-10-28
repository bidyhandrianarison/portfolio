import Link from "next/link";
import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getProjects } from "@/lib/sanity/queries/projects";
import { resolveLocale } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";

function PhoneMock({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="bg-phone shadow-deep h-[532px] w-[260px] rounded-[44px] p-2.5">
      <div className="bg-panel text-content relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[35px] p-4 pt-11">
        <span
          aria-hidden="true"
          className="bg-phone absolute top-2.5 left-1/2 h-6 w-[84px] -translate-x-1/2 rounded-[20px]"
        />
        <div>
          <div className="text-2xl font-bold tracking-[-0.04em]">{title}</div>
          <div className="text-muted font-mono text-[0.6875rem] font-medium">
            {sub}
          </div>
        </div>
        <div className="border-accent/35 bg-accent-soft h-32 rounded-[20px] border" />
        <div className="flex gap-2">
          <div className="bg-accent h-[26px] flex-1 rounded-[13px]" />
          <div className="bg-panel-2 h-[26px] flex-1 rounded-[13px]" />
          <div className="bg-panel-2 h-[26px] flex-1 rounded-[13px]" />
        </div>
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-panel-2 flex items-center gap-2.5 rounded-[14px] p-2"
          >
            <div className="border-accent/30 bg-accent-soft h-[42px] w-[42px] flex-none rounded-xl border" />
            <div className="grid flex-1 gap-1.5">
              <span className="bg-content/18 block h-[7px] rounded-[4px]" />
              <span className="bg-content/18 block h-[7px] w-3/5 rounded-[4px]" />
            </div>
          </div>
        ))}
        <div className="bg-panel-2 mt-auto flex h-[50px] items-center justify-around rounded-[18px]">
          <b className="bg-accent h-5 w-5 rounded-[7px]" />
          <b className="bg-content/20 h-5 w-5 rounded-[7px]" />
          <b className="bg-content/20 h-5 w-5 rounded-[7px]" />
          <b className="bg-content/20 h-5 w-5 rounded-[7px]" />
        </div>
      </div>
    </div>
  );
}

export async function AppsCarousel({ locale }: { locale: string }) {
  const t = homeT(locale);

  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("[home] apps carousel failed:", error);
    return <ErrorFallback feature="home-apps" locale={locale} />;
  }

  const apps = projects
    .filter((project) => project.projectTypes?.includes("mobile"))
    .slice(0, 7);
  if (apps.length === 0) {
    return <ErrorFallback feature="home-apps" locale={locale} />;
  }

  const latest = apps[0];

  return (
    <section aria-labelledby="home-apps-title">
      <div className="wrap sec-head">
        <h2 id="home-apps-title">{t("apps.title")}</h2>
        <span className="meta">{t("apps.meta")}</span>
      </div>
      <div
        className="overflow-hidden pt-7 pb-2"
        aria-label={t("apps.title")}
        aria-roledescription="carrousel"
      >
        <div className="flex gap-7 pl-[calc(50%-130px)]">
          {apps.map((app, index) => (
            <article
              key={app._id}
              className={`w-[260px] flex-none transition-opacity duration-300 ${
                index === 0 ? "" : "[transform:scale(.9)] opacity-50"
              }`}
            >
              <PhoneMock
                title={resolveLocale(app.title, locale)}
                sub={resolveProjectRole(app, locale)}
              />
            </article>
          ))}
        </div>
      </div>
      <div className="py-6 text-center">
        <p className="meta">{latest.period}</p>
        <h3 className="mt-1 text-[1.75rem] leading-[1.1] tracking-[-0.035em]">
          {resolveLocale(latest.title, locale)}
        </h3>
        <p className="text-muted mt-1 text-[0.9375rem]">
          {resolveProjectRole(latest, locale)}
        </p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
          {latest.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/${locale}/projects/${latest.slug.current}`}
          className="go mt-3 inline-block"
        >
          {t("apps.viewProject")}
        </Link>
      </div>
      <div className="mt-4.5 flex items-center justify-center gap-3.5">
        <button
          type="button"
          disabled
          aria-label={t("apps.prev")}
          className="border-line bg-panel text-content h-11 w-11 cursor-not-allowed rounded-[10px] border text-xl"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {apps.map((app, index) => (
            <i
              key={app._id}
              aria-hidden="true"
              className={`h-[7px] rounded-[4px] ${
                index === 0 ? "bg-accent w-[22px]" : "bg-line w-[7px]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          disabled
          aria-label={t("apps.next")}
          className="border-line bg-panel text-content h-11 w-11 cursor-not-allowed rounded-[10px] border text-xl"
        >
          →
        </button>
      </div>
      <p className="meta mt-2.5 text-center">{t("apps.hint")}</p>
    </section>
  );
}
