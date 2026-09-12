import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const navLinks = [
  { label: "Projets", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Decision Log", href: "/decision-log" },
  { label: "Starter Kits", href: "/starter-kits" },
  { label: "Chat", href: "/chat" },
];

export function Header({ locale }: { locale: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="text-lg font-bold">
          Sarobidy
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
