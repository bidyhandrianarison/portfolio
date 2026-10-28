import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { Logo } from "@/components/ui/logo";
import { contactLinks } from "@/lib/constants/contacts";

export function Header({ locale }: { locale: string }) {
  return (
    <header className="border-line bg-glass sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href={`/${locale}`}
          className="hover:text-accent flex items-center gap-2 text-lg font-bold transition-colors"
          title={locale === "fr" ? "Retour à l'accueil" : "Back to home"}
        >
          <Logo className="text-accent h-10 w-10" />
          <span className="sr-only">
            {locale === "fr" ? "Accueil" : "Home"}
          </span>
          <span className="hidden text-base font-semibold tracking-[-.02em] sm:inline">
            Sarobidy
          </span>
        </Link>

        <PrimaryNav locale={locale} variant="desktop" />

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {contactLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="text-muted hover:bg-panel-2 hover:text-content flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {link.label === "Email" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  )}
                  {link.label === "LinkedIn" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
                    />
                  )}
                  {link.label === "GitHub" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                    />
                  )}
                </svg>
              </Link>
            ))}
            <LanguageSwitcher locale={locale} />
          </div>
          <ThemeToggle />
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
