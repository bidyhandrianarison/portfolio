import Link from "next/link";
import { contactLinks } from "@/lib/constants/contacts";

const footerLabels = {
  fr: {
    copyright: "© {year} Sarobidy Andrianarison. Tous droits réservés.",
    legal: "Mentions légales",
    ariaLabel: "Liens sociaux",
  },
  en: {
    copyright: "© {year} Sarobidy Andrianarison. All rights reserved.",
    legal: "Legal notice",
    ariaLabel: "Social links",
  },
};

export function Footer({ locale = "fr" }: { locale?: string }) {
  const labels =
    footerLabels[locale as keyof typeof footerLabels] ?? footerLabels.fr;

  return (
    <footer className="border-line border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <p className="meta">
          {labels.copyright.replace("{year}", String(new Date().getFullYear()))}
        </p>

        <nav aria-label={labels.ariaLabel} className="flex gap-4">
          <Link
            href={`/${locale}/mentions-legales`}
            className="meta hover:text-content flex min-h-11 items-center transition-colors"
          >
            {labels.legal}
          </Link>
          {contactLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="meta hover:text-content flex min-h-11 items-center transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
