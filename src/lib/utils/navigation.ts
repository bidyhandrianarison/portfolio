export type CurrentNavState = "page" | "location";

function normalizePathname(pathname: string): string {
  const withoutTrailingSlashes = pathname.replace(/\/+$/, "");
  return withoutTrailingSlashes || "/";
}

function removeLocalePrefix(pathname: string, locale: string): string {
  const localePrefix = `/${locale}`;

  if (pathname === localePrefix) {
    return "/";
  }

  if (pathname.startsWith(`${localePrefix}/`)) {
    return pathname.slice(localePrefix.length);
  }

  return pathname;
}

export function getCurrentNavState(
  pathname: string,
  locale: string,
  href: string,
): CurrentNavState | undefined {
  const normalizedPathname = normalizePathname(
    removeLocalePrefix(normalizePathname(pathname), locale),
  );
  const normalizedHref = normalizePathname(href);

  if (normalizedPathname === normalizedHref) {
    return "page";
  }

  const isNestedRoute = normalizedPathname.startsWith(`${normalizedHref}/`);
  const isCertificationDetailInSkills =
    normalizedHref === "/skills" &&
    normalizedPathname.startsWith("/certifications/");

  return isNestedRoute || isCertificationDetailInSkills
    ? "location"
    : undefined;
}
