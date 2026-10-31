import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";
import { projectsT, systemsPipeline } from "@/lib/i18n-server";
import { SCREEN_VARIANTS } from "@/lib/constants/projects";
import { PhoneMock } from "@/components/ui/PhoneMock";
import { PortableTextContent } from "./PortableTextContent";
import { ProjectsPrevNext } from "./ProjectsPrevNext";
import { PipelineFigure } from "@/components/home/PipelineFigure";

/**
 * Détail « projet » (non featured) — maquette stricte projet.html : split
 * colonne texte + visuel sticky et navigation précédent/suivant.
 */
export async function ProjectDetailTemplate({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = projectsT(locale);
  const bodyBlocks =
    (locale === "en" ? project.body?.en : project.body?.fr) ??
    project.body?.fr ??
    [];
  const firstBlock = bodyBlocks[0];
  const firstHeading =
    firstBlock && ["h2", "h3"].includes(firstBlock.style ?? "")
      ? firstBlock.children
          .map((child) => child.text)
          .join("")
          .trim()
      : "";
  const taskBlocks = [
    t("tasksTitle").toLocaleLowerCase(),
    "my tasks on this project",
  ].includes(firstHeading.toLocaleLowerCase())
    ? bodyBlocks.slice(1)
    : bodyBlocks;
  const numberedTaskBlocks = taskBlocks.map((block) =>
    (block.style === "normal" || !block.style) &&
    block.children.some((child) => child.text.trim()) &&
    (!block.listItem || block.level === 1 || !block.level)
      ? { ...block, listItem: "number" as const, level: 1 }
      : block,
  );
  const prevNext = await ProjectsPrevNext({ project, locale });
  const isMobile = project.projectTypes?.includes("mobile");
  const image = project.hero?.image;
  const pipeline = systemsPipeline(locale, project.slug.current);

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
        <p className="lede mt-4 font-sans">
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

      {pipeline && (
        <section className="wrap mt-8" aria-label={t("pipeline")}>
          <PipelineFigure {...pipeline} />
        </section>
      )}

      <section className="wrap mt-12">
        <div className="grid grid-cols-1 items-start gap-12 min-[901px]:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-3.5 text-xl tracking-[-0.02em]">
              {t("tasksTitle")}
            </h2>
            {taskBlocks.length > 0 ? (
              <div className="taches max-w-3xl">
                <PortableTextContent value={numberedTaskBlocks} />
              </div>
            ) : (
              <p className="text-muted text-[0.9375rem] leading-relaxed">
                {resolveLocale(project.description, locale)}
              </p>
            )}
          </div>
          {(isMobile || image?.asset?.url) && (
            <div className="w-full justify-self-center min-[901px]:sticky min-[901px]:top-24">
              {isMobile ? (
                <div className="flex justify-center">
                  <PhoneMock
                    title={resolveLocale(project.title, locale)}
                    sub={
                      project.stack?.slice(0, 2).join(" · ") ??
                      (project.tags ?? []).slice(0, 2).join(" · ")
                    }
                    screen={SCREEN_VARIANTS[project.slug.current] ?? "liste"}
                    screenshot={
                      project.slug.current ===
                      "application-reservation-coiffure"
                        ? "/images/apps/reservation-coiffure-apercu.png"
                        : project.mobileScreenshot?.url
                    }
                    screenshotFit={
                      project.slug.current ===
                      "application-reservation-coiffure"
                        ? "coiffure-preview"
                        : "contain"
                    }
                    screenshotBackground={
                      project.slug.current === "application-stockage-mobile"
                        ? "#06293a"
                        : undefined
                    }
                  />
                </div>
              ) : image?.asset?.url ? (
                <Image
                  src={image.asset.url}
                  alt={image.alt || resolveLocale(project.title, locale)}
                  width={image.asset.metadata?.dimensions?.width || 1200}
                  height={image.asset.metadata?.dimensions?.height || 800}
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className="h-auto w-full rounded-2xl"
                />
              ) : null}
            </div>
          )}
        </div>
      </section>

      <div className="pt-8">{prevNext}</div>
    </main>
  );
}
