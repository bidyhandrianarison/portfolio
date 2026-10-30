import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getProjects } from "@/lib/sanity/queries/projects";
import { resolveLocale } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";
import { CarouselInteractive } from "@/components/home/CarouselInteractive";
import { Reveal } from "@/components/home/Reveal";

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
    .filter(
      (project) =>
        project.projectTypes?.includes("mobile") ||
        project.slug.current === "mesdocs",
    )
    .slice(0, 7);
  if (apps.length === 0) {
    return <ErrorFallback feature="home-apps" locale={locale} />;
  }

  const carouselApps = apps.map((app) => ({
    slug: app.slug.current,
    name: resolveLocale(app.title, locale),
    role: resolveProjectRole(app, locale),
    year: app.period,
    tags: app.tags,
    screenshot:
      app.mobileScreenshot?.url ||
      (
        {
          ramarofish: "/images/apps/ramarofish.png",
          mizzaria: "/images/apps/mizzaria.png",
          "foodtruck-app": "/images/apps/foodtruck-app.png",
        } as Record<string, string>
      )[app.slug.current],
  }));

  return (
    <section aria-labelledby="home-apps-title">
      <Reveal className="wrap sec-head">
        <h2 id="home-apps-title">{t("apps.title")}</h2>
        <span className="meta">
          {t("apps.meta").replace("{{count}}", String(apps.length))}
        </span>
      </Reveal>
      <CarouselInteractive
        locale={locale}
        apps={carouselApps}
        labels={{
          title: t("apps.title"),
          viewProject: t("apps.viewProject"),
          prev: t("apps.prev"),
          next: t("apps.next"),
          hint: t("apps.hint"),
        }}
      />
    </section>
  );
}
