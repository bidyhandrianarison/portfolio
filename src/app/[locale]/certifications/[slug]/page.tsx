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

  return {
    title: `${certification.name} — ${certification.issuer}`,
    description:
      certification.description?.why || `Certification ${certification.name}`,
    alternates: {
      canonical: `https://sarobidy-andrianarison.netlify.app/${locale}/certifications/${slug}`,
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
