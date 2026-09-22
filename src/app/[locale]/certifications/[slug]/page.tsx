import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificationDetail } from "@/components/competences/CertificationDetail";
import {
  getCertificationBySlug,
  getCertifications,
} from "@/lib/sanity/queries/certifications";

const t = {
  fr: {
    notFound: "Certification introuvable",
  },
  en: {
    notFound: "Certification not found",
  },
} as const;

const supportedLocales = ["fr", "en"] as const;

export async function generateStaticParams() {
  const certifications = await getCertifications();
  return supportedLocales.flatMap((locale) =>
    certifications
      .filter((cert) => cert.slug?.current)
      .map((cert) => ({ slug: cert.slug.current, locale })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const certification = await getCertificationBySlug(slug);

  if (!certification) {
    return { title: t[locale as keyof typeof t]?.notFound ?? t.fr.notFound };
  }

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

  const certName = resolveLocale(certification.name) ?? "";
  const certIssuer = resolveLocale(certification.issuer) ?? "";

  return {
    title: `${certName} — ${certIssuer}`,
    description:
      resolveLocale(certification.description?.why) ??
      `Certification ${certName}`,
    alternates: {
      canonical: `https://sarobidy-andrianarison.netlify.app/${locale}/certifications/${slug}`,
      languages: {
        fr: `/fr/certifications/${slug}`,
        en: `/en/certifications/${slug}`,
      },
    },
  };
}

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const certification = await getCertificationBySlug(slug);

  if (!certification) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <CertificationDetail certification={certification} locale={locale} />
    </main>
  );
}
