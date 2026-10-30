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
    enlarge: "Cliquer pour agrandir",
  },
  en: {
    back: "← Back to certifications",
    why: "Why",
    what: "What I learned",
    result: "Result",
    verify: "Verify certification →",
    enlarge: "Click to enlarge",
  },
} as const;

export function CertificationDetail({
  certification,
  locale,
}: CertificationDetailProps) {
  const lang = locale === "en" ? "en" : "fr";
  const i = t[lang];
  const resolveLocale = (value: unknown): string | undefined => {
    if (!value) return undefined;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      const localized = value as Record<string, string>;
      return localized[lang] ?? localized.fr ?? undefined;
    }
    return undefined;
  };

  const name = resolveLocale(certification.name) ?? "";
  const issuer = resolveLocale(certification.issuer) ?? "";
  const sections = [
    { title: i.why, content: resolveLocale(certification.description?.why) },
    { title: i.what, content: resolveLocale(certification.description?.what) },
    {
      title: i.result,
      content: resolveLocale(certification.description?.result),
    },
  ].filter((section) => section.content);

  return (
    <article className="mx-auto max-w-5xl">
      <Link
        href={`/${locale}/skills#certifications`}
        className="text-muted hover:text-content inline-flex min-h-11 items-center text-sm"
      >
        {i.back}
      </Link>
      <header className="mt-6">
        <p className="meta">
          <span className="text-accent">
            {CATEGORY_LABELS[certification.category]?.[lang] ??
              certification.category}
          </span>{" "}
          · {certification.date}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] leading-[1.12] font-bold tracking-[-0.04em]">
          {name}
        </h1>
        <p className="text-muted mt-3 text-base">{issuer}</p>
      </header>
      <div
        className={
          certification.image
            ? "mt-8 grid items-start gap-8 md:grid-cols-2 md:gap-12"
            : "mt-8 max-w-2xl"
        }
      >
        {certification.image && (
          <div>
            <CertLightbox
              src={urlFor(certification.image).width(1200).height(800).url()}
              alt={certification.image.alt || name}
              locale={lang}
            />
            <p className="meta mt-2">{i.enlarge}</p>
          </div>
        )}
        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-content mb-2 text-base font-semibold">
                {section.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
          {certification.url && (
            <Link
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              className="go inline-flex min-h-11 items-center"
            >
              {i.verify}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
