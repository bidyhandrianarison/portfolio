"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const initialized = useRef(false);

  const applyTheme = useCallback((mode: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = stored ?? preferred;
    setTheme(initial);
    applyTheme(initial);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange(e: MediaQueryListEvent) {
      const s = localStorage.getItem("theme");
      if (!s) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [applyTheme]);

  useEffect(() => {
    if (!initialized.current) return;
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, applyTheme]);

  function toggle() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      className="focus:ring-primary-500 rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-950"
      aria-label={
        theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"
      }
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {theme === "dark" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        )}
      </svg>
    </button>
  );
}
