"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface GlitchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlitchReveal({
  children,
  className = "",
  delay = 0,
}: GlitchRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Hide element immediately via DOM (bypasses React state in effect)
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";

    let glitchTimer: ReturnType<typeof setTimeout> | null = null;
    let outerTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          outerTimer = setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "none";

            setGlitching(true);
            glitchTimer = setTimeout(() => setGlitching(false), 400);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (outerTimer) clearTimeout(outerTimer);
      if (glitchTimer) clearTimeout(glitchTimer);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {glitching && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="glitch-slice-1 absolute inset-0"
            style={{
              clipPath: "inset(10% 0 80% 0)",
              transform: "translateX(-6px)",
              opacity: 0.8,
              mixBlendMode: "screen",
            }}
          >
            {children}
          </div>
          <div
            className="glitch-slice-2 absolute inset-0"
            style={{
              clipPath: "inset(40% 0 40% 0)",
              transform: "translateX(8px)",
              opacity: 0.8,
              mixBlendMode: "screen",
            }}
          >
            {children}
          </div>
          <div
            className="glitch-slice-3 absolute inset-0"
            style={{
              clipPath: "inset(70% 0 10% 0)",
              transform: "translateX(-4px)",
              opacity: 0.8,
              mixBlendMode: "screen",
            }}
          >
            {children}
          </div>
          <div
            className="glitch-scanline bg-primary-500/60 absolute right-0 left-0 h-px"
            style={{ animation: "glitch-scanline 0.4s linear forwards" }}
          />
          <div
            className="absolute inset-0"
            style={{
              animation: "glitch-flicker 0.15s steps(2) 3",
              background:
                "linear-gradient(90deg, rgba(249,115,22,0.1) 0%, transparent 50%, rgba(59,130,246,0.1) 100%)",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
}
