import Link from "next/link";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/sarobidy" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sarobidy" },
  { label: "Email", href: "mailto:contact@bidyhandrianarison.com" },
];

const footerLabels = {
  fr: { copyright: "© Tous droits réservés", ariaLabel: "Liens sociaux" },
  en: { copyright: "© All rights reserved", ariaLabel: "Social links" },
};

export function Footer({ locale = "fr" }: { locale?: string }) {
  const labels =
    footerLabels[locale as keyof typeof footerLabels] ?? footerLabels.fr;

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-neutral-500">
          {labels.copyright} Sarobidy Andrianarison
        </p>

        <nav aria-label={labels.ariaLabel} className="flex gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
