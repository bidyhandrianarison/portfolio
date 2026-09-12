"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  function getHref(lang: string) {
    const segments = pathname.split("/");
    segments[1] = lang;
    return segments.join("/");
  }

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={getHref(lang.code)}
          className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
            locale === lang.code
              ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200"
              : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
