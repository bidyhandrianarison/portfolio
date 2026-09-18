import type { Metadata } from "next";
import { ThemeScript } from "@/components/providers/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Sarobidy Andrianarison — Mobile Dev · IA Engineer · UI/UX Designer",
    template: "%s — Sarobidy Andrianarison",
  },
  description:
    "Hybrid engineer building mobile apps, AI systems, and design systems. Freelance & open to opportunities.",
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
