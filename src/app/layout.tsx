import type { Metadata } from "next";
import Script from "next/script";
import { ThemeScript } from "@/components/providers/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Sarobidy Andrianarison — Mobile Dev · IA Engineer · UI/UX Designer",
    template: "%s — Sarobidy Andrianarison",
  },
  description:
    "Hybrid engineer building mobile apps, AI systems, and design systems. Freelance & hiring.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sarobidy Andrianarison",
  jobTitle: "Mobile Dev · AI Engineer · UI/UX Designer",
  url: "https://bidyhandrianarison.com",
  sameAs: ["https://github.com/sarobidy", "https://linkedin.com/in/sarobidy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
        {children}
      </body>
    </html>
  );
}
