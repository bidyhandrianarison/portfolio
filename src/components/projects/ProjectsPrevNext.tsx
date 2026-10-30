import Link from "next/link";
import type { Project } from "@/sanity/types";
import { getProjects } from "@/lib/sanity/queries/projects";
import { resolveLocale } from "@/lib/utils/locale";
import { projectsT } from "@/lib/i18n-server";
import { cn } from "@/lib/utils/cn";

/**
 * Navigation précédent/suivant des pages détail : wrap cyclique modulo
 * sur la liste ordonnée (order asc) des projets.
 */
export async function ProjectsPrevNext({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = projectsT(locale);
  let ordered: Project[];
  try {
    ordered = await getProjects();
  } catch (error) {
    console.error("[projects] prev/next failed:", error);
    return null;
  }
  if (ordered.length === 0) return null;

  const index = ordered.findIndex(
    (candidate) => candidate.slug.current === project.slug.current,
  );
  const position = index < 0 ? 0 : index;
  const previous = ordered[(position + ordered.length - 1) % ordered.length];
  const next = ordered[(position + 1) % ordered.length];

  return (
    <nav
      className="wrap grid grid-cols-1 gap-3.5 pt-2 pb-14 min-[601px]:grid-cols-2"
      aria-label={t("pnLabel")}
    >
      <Link
        href={`/${locale}/projects/${previous.slug.current}`}
        className="press border-line bg-panel hover:border-accent/50 block rounded-2xl border px-5 py-[18px]"
      >
        <span className="meta">{t("prev")}</span>
        <b className="mt-1 block tracking-[-0.01em]">
          {resolveLocale(previous.title, locale)}
        </b>
      </Link>
      <Link
        href={`/${locale}/projects/${next.slug.current}`}
        className="press border-line bg-panel hover:border-accent/50 block rounded-2xl border px-5 py-[18px] text-right max-[600px]:text-left"
      >
        <span className="meta">{t("next")}</span>
        <b className="mt-1 block tracking-[-0.01em]">
          {resolveLocale(next.title, locale)}
        </b>
      </Link>
    </nav>
  );
}
