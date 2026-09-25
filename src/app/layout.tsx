import type { Metadata } from "next";
import { ThemeScript } from "@/components/providers/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sarobidy Andrianarison",
    template: "%s — Sarobidy Andrianarison",
  },
  description:
    "Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems. Freelance & ouvert aux opportunités.",
  icons: {
    icon: "/favicon.svg",
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname,m=p.match(/^\\/(fr|en)/);if(m)document.documentElement.lang=m[1]})()`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
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
