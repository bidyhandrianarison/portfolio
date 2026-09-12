import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/providers/i18n-provider";

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

  return {
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: "Sarobidy Andrianarison",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sarobidy Andrianarison",
  jobTitle: "Mobile Dev · IA Engineer · UI/UX Designer",
  url: "https://bidyhandrianarison.com",
  sameAs: ["https://github.com/sarobidy", "https://linkedin.com/in/sarobidy"],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                const d = (!t && window.matchMedia('(prefers-color-scheme: dark)').matches) || t === 'dark';
                if (d) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
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
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
