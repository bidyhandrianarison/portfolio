import Link from "next/link";
import type { Certification } from "@/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { CATEGORY_LABELS } from "@/lib/constants/certifications";
import { CertLightbox } from "@/components/competences/CertLightbox";

interface CertificationDetailProps {
  certification: Certification;
  locale: string;
}

const t = {
  fr: {
    back: "← Retour aux certifications",
    why: "Pourquoi",
    what: "Ce que j'ai appris",
    result: "Résultat",
    verify: "Vérifier la certification →",
  },
  en: {
    back: "← Back to certifications",
    why: "Why",
    what: "What I learned",
    result: "Result",
    verify: "Verify certification →",
  },
} as const;

export function CertificationDetail({
  certification,
  locale,
}: CertificationDetailProps) {
  const i = t[locale as keyof typeof t] ?? t.fr;

  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";

  const resolveLocale = (val: unknown): string | undefined => {
    if (!val) return undefined;
    if (typeof val === "string") return val;
    if (typeof val === "object" && val !== null) {
      const obj = val as Record<string, string>;
      return obj[lang] ?? obj.fr ?? undefined;
    }
    return undefined;
  };

  const name = resolveLocale(certification.name) ?? "";
  const issuer = resolveLocale(certification.issuer) ?? "";

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Link
        href={`/${locale}/skills?tab=certifications`}
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
      >
        {i.back}
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 inline-block rounded-full px-3 py-1 text-[13px] font-medium">
            {CATEGORY_LABELS[certification.category]?.[lang] ??
              certification.category}
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {certification.date}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {name}
        </h1>

        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {issuer}
        </p>
      </header>

      {certification.image && (
        <CertLightbox
          src={urlFor(certification.image).width(1200).height(800).url()}
          alt={certification.image.alt || name}
        />
      )}

      {certification.description && (
        <div className="space-y-6 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          {resolveLocale(certification.description.why) && (
            <div>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                {i.why}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                {resolveLocale(certification.description.why)}
              </p>
            </div>
          )}

          {resolveLocale(certification.description.what) && (
            <div>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                {i.what}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                {resolveLocale(certification.description.what)}
              </p>
            </div>
          )}

          {resolveLocale(certification.description.result) && (
            <div>
              <h2 className="mb-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                {i.result}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                {resolveLocale(certification.description.result)}
              </p>
            </div>
          )}
        </div>
      )}

      {certification.url && (
        <div className="flex justify-center">
          <Link
            href={certification.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
          >
            {i.verify}
          </Link>
        </div>
      )}
    </article>
  );
}
