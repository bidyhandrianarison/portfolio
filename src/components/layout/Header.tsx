import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { ScrolledHeader } from "@/components/layout/scrolled-header";
import { Logo } from "@/components/ui/logo";

export function Header({ locale }: { locale: string }) {
  const content = (
    <>
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
            <LanguageSwitcher locale={locale} />
          </div>
          <ThemeToggle />
          <MobileNav locale={locale} />
        </div>
      </div>
    </>
  );

  return (
    <ScrolledHeader className="site-header border-line bg-glass sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-[1.8]">
      {content}
    </ScrolledHeader>
  );
}
