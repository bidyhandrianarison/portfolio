import type { Settings } from "@/sanity/types";

const label = {
  fr: "Télécharger mon CV",
  en: "Download my CV",
} as const;

interface CvDownloadButtonProps {
  settings: Settings | null;
  locale: string;
}

export function CvDownloadButton({ settings, locale }: CvDownloadButtonProps) {
  const urls = settings?.cvDownloadUrl;
  if (!urls) return null;

  const url = urls[locale as keyof typeof urls] ?? urls.fr;
  if (!url) return null;

  return (
    <a
      href={url}
      download
      className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      {label[locale as keyof typeof label] ?? label.fr}
    </a>
  );
}
