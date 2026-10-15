import type { Project } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";

type ProjectRoleFields = Pick<Project, "role" | "localizedRole">;

export function resolveProjectRole(
  project: ProjectRoleFields,
  locale: string,
): string {
  const localizedRole = project.localizedRole
    ? resolveLocale(project.localizedRole, locale)
    : "";

  return localizedRole || project.role || "";
}
