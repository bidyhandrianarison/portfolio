import Link from "next/link";
import Image from "next/image";
import type { Certification } from "@/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { CATEGORY_LABELS } from "@/lib/constants/certifications";

interface CertificationCardProps {
  certification: Certification;
  locale: string;
}

export function CertificationCard({
  certification,
  locale,
}: CertificationCardProps) {
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
  const why = resolveLocale(certification.description?.why);

  if (!certification.slug?.current) return null;

  return (
    <Link
      href={`/${locale}/certifications/${certification.slug.current}`}
      className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
    >
      {certification.image && (
        <div className="relative h-32 overflow-hidden rounded-t-xl">
          <Image
            src={urlFor(certification.image).width(600).height(300).url()}
            alt={certification.image.alt || name}
            fill
            className="object-cover opacity-60 transition-opacity group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
            {CATEGORY_LABELS[certification.category]?.[lang] ??
              certification.category}
          </span>
          <span className="text-xs text-neutral-400">{certification.date}</span>
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {issuer}
        </p>
        {why && (
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {why}
          </p>
        )}
      </div>
    </Link>
  );
}
