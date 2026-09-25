export const SITE_URL = "https://www.sarobidy-andrianarison.consulting";

export function pageAlternates(
  locale: string,
  path = "",
): {
  canonical: string;
  languages: Record<string, string>;
} {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      fr: `${SITE_URL}/fr${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/fr${path}`,
    },
  };
}
