"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const t = {
  fr: {
    heading: "Page introuvable",
    message: "La page que vous recherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
    home: "/fr",
  },
  en: {
    heading: "Page not found",
    message: "The page you are looking for does not exist or has been moved.",
    back: "Back to home",
    home: "/en",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "fr";
  const i = t[locale];

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-neutral-900 dark:text-white">
        404
      </h1>
      <h2 className="mb-2 text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {i.heading}
      </h2>
      <p className="mb-6 max-w-md text-neutral-500 dark:text-neutral-400">
        {i.message}
      </p>
      <Link
        href={i.home}
        className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        {i.back}
      </Link>
    </div>
  );
}
