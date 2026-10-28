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
    "flex min-h-11 items-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors";

  if (currentState) {
    return `${baseClassName} text-accent`;
  }

  return `${baseClassName} text-muted hover:bg-accent-soft hover:text-content`;
}

function getMobileLinkClassName(currentState: "page" | "location" | undefined) {
  const baseClassName =
    "flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors";

  if (currentState) {
    return `${baseClassName} bg-accent-soft text-accent`;
  }

  return `${baseClassName} text-content hover:bg-panel-2`;
}
