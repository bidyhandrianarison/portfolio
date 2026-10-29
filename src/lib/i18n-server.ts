import fr from "../../public/locales/fr/common.json";
import en from "../../public/locales/en/common.json";

const RESOURCES: Record<string, Record<string, unknown>> = {
  fr: fr as unknown as Record<string, unknown>,
  en: en as unknown as Record<string, unknown>,
};

function lookup(node: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (current, part) =>
        current && typeof current === "object"
          ? (current as Record<string, unknown>)[part]
          : undefined,
      node,
    );
}

function sectionNode(locale: string, section: string): Record<string, unknown> {
  return ((RESOURCES[locale]?.[section] as
    Record<string, unknown> | undefined) ?? RESOURCES.fr[section]) as Record<
    string,
    unknown
  >;
}

export function homeT(locale: string) {
  const home = sectionNode(locale, "home");
  return <T = string>(key: string): T => lookup(home, key) as T;
}

export function projectsT(locale: string) {
  const projects = sectionNode(locale, "projects");
  return <T = string>(key: string): T => lookup(projects, key) as T;
}

/**
 * Contenu pipeline d'une étude de cas (home.systems.pipelines.<slug>).
 * null si le projet n'a pas de pipeline rédigé — la section est masquée.
 */
export function systemsPipeline(
  locale: string,
  slug: string,
): {
  caption: string;
  result: string;
  stages: { title: string; sub: string }[];
  logs: string[];
} | null {
  const node = lookup(
    RESOURCES[locale]?.["home"] ?? RESOURCES.fr["home"],
    `systems.pipelines.${slug}`,
  ) as
    | {
        caption?: string;
        result?: string;
        stages?: { title: string; sub: string }[];
        logs?: string[];
      }
    | undefined;
  if (!node?.stages || !node.logs) return null;
  return {
    caption: node.caption ?? "",
    result: node.result ?? "",
    stages: node.stages,
    logs: node.logs,
  };
}
