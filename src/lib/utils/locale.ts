export type Locale = "fr" | "en";

export type LocaleString = { fr: string; en: string };

export function resolveLocale(
  value: string | LocaleString | null | undefined,
  locale: string,
): string {
  if (typeof value === "string") return value;
  return value?.[locale as Locale] || value?.fr || "";
}
