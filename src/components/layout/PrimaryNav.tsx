"use client";

import type { Ref } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants/nav";
import { getCurrentNavState } from "@/lib/utils/navigation";

interface PrimaryNavProps {
  locale: string;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
  firstLinkRef?: Ref<HTMLAnchorElement>;
}

export function PrimaryNav({
  locale,
  variant,
  onNavigate,
  firstLinkRef,
}: PrimaryNavProps) {
  const pathname = usePathname();
  const isMobile = variant === "mobile";
  const language = locale === "en" ? "en" : "fr";
  const navigationLabel =
    language === "fr" ? "Navigation principale" : "Main navigation";

  return (
    <nav
      aria-label={navigationLabel}
      className={isMobile ? undefined : "hidden items-center md:flex"}
    >
      <ul
        className={isMobile ? "flex flex-col gap-2" : "flex items-center gap-6"}
      >
        {navLinks.map((link, index) => {
          const currentState = getCurrentNavState(pathname, locale, link.href);
          const linkClassName = isMobile
            ? getMobileLinkClassName(currentState)
            : getDesktopLinkClassName(currentState);

          return (
            <li key={link.href}>
              <Link
                ref={isMobile && index === 0 ? firstLinkRef : undefined}
                href={`/${locale}${link.href}`}
                onClick={onNavigate}
                aria-current={currentState}
                className={linkClassName}
              >
                {link.label[language]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function getDesktopLinkClassName(
  currentState: "page" | "location" | undefined,
) {
  const baseClassName =
    "relative flex min-h-11 items-center px-1 text-sm transition-colors after:absolute after:inset-x-1 after:bottom-0 after:h-[3px] after:rounded-t-full after:content-[''] after:transition-transform motion-reduce:after:transition-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500";

  if (currentState) {
    return `${baseClassName} font-semibold text-primary-700 after:scale-x-100 after:bg-primary-500 dark:text-primary-400`;
  }

  return `${baseClassName} text-neutral-600 after:scale-x-0 after:bg-primary-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50`;
}

function getMobileLinkClassName(currentState: "page" | "location" | undefined) {
  const baseClassName =
    "relative flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500";

  if (currentState) {
    return `${baseClassName} bg-primary-50 text-primary-700 after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-10 after:rounded-full after:bg-primary-500 after:content-[''] dark:bg-primary-950/40 dark:text-primary-300`;
  }

  return `${baseClassName} text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800`;
}
