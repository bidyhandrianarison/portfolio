"use client";

export function ThemeScript() {
  return (
    <script
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
