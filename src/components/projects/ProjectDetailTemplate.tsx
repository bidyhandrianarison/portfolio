import Link from "next/link";
import type { Project } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";
import { resolveProjectRole } from "@/lib/utils/project-role";
import { projectsT } from "@/lib/i18n-server";
import { SCREEN_VARIANTS } from "@/lib/constants/projects";
import { PhoneMock } from "@/components/ui/PhoneMock";
import { PortableTextContent } from "./PortableTextContent";
import { ProjectsPrevNext } from "./ProjectsPrevNext";

/**
 * Détail « projet » (non featured) — maquette stricte projet.html : split
 * colonne texte + téléphone CSS sticky, nav précédent/suivant. hero/architecture/
 * codeSnippets non affichés.
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

      <section className="wrap mt-12">
        <div className="grid grid-cols-1 items-start gap-12 min-[901px]:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-3.5 text-xl tracking-[-0.02em]">
              {t("tasksTitle")}
            </h2>
            {bodyBlocks.length > 0 ? (
              <div className="taches max-w-3xl">
                <PortableTextContent value={bodyBlocks} />
              </div>
            ) : (
              <p className="text-muted text-[0.9375rem] leading-relaxed">
                {resolveLocale(project.description, locale)}
              </p>
            )}
          </div>
          <div className="justify-self-center min-[901px]:sticky min-[901px]:top-24">
            <PhoneMock
              title={resolveLocale(project.title, locale)}
              sub={
                project.stack?.slice(0, 2).join(" · ") ??
                (project.tags ?? []).slice(0, 2).join(" · ")
              }
              screen={SCREEN_VARIANTS[project.slug.current] ?? "liste"}
            />
          </div>
        </div>
      </section>

      <div className="pt-8">{prevNext}</div>
    </main>
  );
}
