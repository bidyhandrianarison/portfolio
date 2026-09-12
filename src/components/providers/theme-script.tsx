"use client";

import Script from "next/script";

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const t = localStorage.getItem('theme');
            const d = (!t && window.matchMedia('(prefers-color-scheme: dark)').matches) || t === 'dark';
            if (d) document.documentElement.classList.add('dark');
          } catch(e) {}
        `,
      }}
    />
  );
}
