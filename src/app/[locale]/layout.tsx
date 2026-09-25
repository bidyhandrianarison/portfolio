import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { SITE_URL } from "@/lib/constants/site";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const description =
    locale === "fr"
      ? "Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems. Freelance & ouvert aux opportunités."
      : "Hybrid engineer building mobile apps, AI systems, and design systems. Freelance & open to opportunities.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Sarobidy Andrianarison",
      template: "%s — Sarobidy Andrianarison",
    },
    description,
    alternates: {
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      title: "Sarobidy Andrianarison",
      description,
      url: `/${locale}`,
      type: "website",
      locale: ogLocale,
      siteName: "Sarobidy Andrianarison",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Sarobidy Andrianarison",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sarobidy Andrianarison",
      description,
      images: ["/og.png"],
    },
  };
}

const jsonLd = (locale: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Sarobidy Andrianarison",
      jobTitle:
        locale === "fr"
          ? "Développeur Mobile · Ingénieur IA · Designer UI/UX"
          : "Mobile Dev · AI Engineer · UI/UX Designer",
      url: SITE_URL,
      sameAs: [
        "https://github.com/bidyhandrianarison",
        "https://linkedin.com/in/n-sarobidy-andrianarison-075554203",
      ],
    },
    {
      "@type": "WebSite",
      name: "Sarobidy Andrianarison",
      url: SITE_URL,
    },
  ],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <I18nProvider locale={locale}>
      <script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(locale)),
        }}
      />
      <Header locale={locale} />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <Footer locale={locale} />
    </I18nProvider>
  );
}
