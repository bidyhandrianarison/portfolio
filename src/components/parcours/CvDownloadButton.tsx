"use client";

import type { Settings } from "@/sanity/types";
import { trackEvent } from "@/lib/utils/analytics";
import { parcoursT } from "@/lib/i18n-server";

interface CvDownloadButtonProps {
  settings: Settings | null;
  locale: string;
}

export function CvDownloadButton({ settings, locale }: CvDownloadButtonProps) {
  const t = parcoursT(locale);
  const urls = settings?.cvDownloadUrl;
  if (!urls) return null;

  const url = urls[locale as keyof typeof urls] ?? urls.fr;
  if (!url) return null;

  function handleClick() {
    trackEvent("cv_download", { lang: locale });
  }

  return (
    <a href={url} download onClick={handleClick} className="btn press">
      {t("cv")}
    </a>
  );
}
