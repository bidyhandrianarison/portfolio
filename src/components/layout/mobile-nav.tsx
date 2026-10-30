"use client";

import { useState, useEffect, useRef } from "react";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function MobileNav({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const ariaLabels = {
    fr: { open: "Ouvrir le menu", close: "Fermer le menu" },
    en: { open: "Open menu", close: "Close menu" },
  };
  const labels = ariaLabels[lang];

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.close : labels.open}
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-14 z-40 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
          >
            <PrimaryNav
              locale={locale}
              variant="mobile"
              firstLinkRef={firstLinkRef}
              onNavigate={() => setOpen(false)}
            />

            <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
