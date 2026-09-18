import Link from "next/link";
import Image from "next/image";
import type { Certification } from "@/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { CATEGORY_LABELS } from "@/lib/constants/certifications";

interface CertificationCardProps {
  certification: Certification;
  locale: string;
}

const t = {
  fr: {
    why: "Pourquoi :",
    result: "Résultat :",
    viewDetail: "Voir le détail →",
  },
  en: {
    why: "Why:",
    result: "Result:",
    viewDetail: "View details →",
  },
} as const;

export function CertificationCard({
  certification,
  locale,
}: CertificationCardProps) {
  const i = t[locale as keyof typeof t] ?? t.fr;
  const hasDescription =
    certification.description?.why ||
    certification.description?.what ||
    certification.description?.result;

  if (!certification.slug?.current) return null;

  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";

  return (
    <Link
      href={`/${locale}/certifications/${certification.slug.current}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        {certification.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={urlFor(certification.image).width(800).height(400).url()}
              alt={certification.image.alt || certification.name}
              fill
              className="object-cover opacity-20 transition-opacity group-hover:opacity-30"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-neutral-900" />
          </div>
        )}

        <div className="relative p-6">
          <div className="mb-3 flex items-start justify-between gap-2">
            <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 inline-block rounded-full px-3 py-1 text-xs font-medium">
              {CATEGORY_LABELS[certification.category]?.[lang] ??
                certification.category}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {certification.date}
            </span>
          </div>

          <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {certification.name}
          </h3>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            {certification.issuer}
          </p>

          {hasDescription && (
            <div className="mb-4 space-y-2 text-sm">
              {certification.description?.why && (
                <p>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {i.why}
                  </span>{" "}
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {certification.description.why}
                  </span>
                </p>
              )}
              {certification.description?.result && (
                <p>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {i.result}
                  </span>{" "}
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {certification.description.result}
                  </span>
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-neutral-700">
              {i.viewDetail}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
