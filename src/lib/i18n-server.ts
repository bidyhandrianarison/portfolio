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

export function homeT(locale: string) {
  const home =
    (RESOURCES[locale]?.home as Record<string, unknown> | undefined) ??
    (RESOURCES.fr.home as Record<string, unknown>);

  return <T = string>(key: string): T => lookup(home, key) as T;
}
