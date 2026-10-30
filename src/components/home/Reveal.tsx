"use client";

import { useEffect, useRef } from "react";

/**
 * Apparition au défilement — port de commun.js/commun.css (rootMargin 0px 0px -8% 0px,
 * translateY 24px, un seul passage puis unobserve). Le contenu SSR reste visible :
 * le masquage ne se pose qu'au mount, si l'élément commence sous la ligne de flottaison.
 */
export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.opacity = "0";
    if (reduce) {
      el.style.transition = "opacity .2s ease";
    } else {
      el.style.transform = "translateY(24px)";
      el.style.transition =
        "opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1)";
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("in");
          el.style.opacity = "1";
          if (!reduce) el.style.transform = "none";
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
