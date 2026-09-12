import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { ThemeScript } from "@/components/providers/theme-script";

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
  const title =
    locale === "fr"
      ? "Sarobidy Andrianarison — Développeur Mobile · Ingénieur IA · UI/UX Designer"
      : "Sarobidy Andrianarison — Mobile Dev · AI Engineer · UI/UX Designer";
  const description =
    locale === "fr"
      ? "Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems. Freelance & ouvert aux opportunités."
      : "Hybrid engineer building mobile apps, AI systems, and design systems. Freelance & hiring.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sarobidy Andrianarison",
    jobTitle:
      locale === "fr"
        ? "Développeur Mobile · Ingénieur IA · UI/UX Designer"
        : "Mobile Dev · AI Engineer · UI/UX Designer",
    url: "https://bidyhandrianarison.com",
    sameAs: ["https://github.com/sarobidy", "https://linkedin.com/in/sarobidy"],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="focus:bg-primary-600 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:rounded-lg focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <I18nProvider locale={locale}>
          <Header locale={locale} />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer locale={locale} />
        </I18nProvider>
      </body>
    </html>
  );
}
