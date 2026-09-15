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
  const prefersReducedRef = useRef(true);
  const [state, setState] = useState<"hidden" | "glitching" | "visible">(
    "hidden",
  );

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedRef.current) {
      setState("visible");
    }
  }, []);

  useEffect(() => {
    if (prefersReducedRef.current) return;

    const el = ref.current;
    if (!el) return;

    let glitchTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setState("glitching");
            glitchTimer = setTimeout(() => {
              setState("visible");
            }, 400);
          }, delay);
          observer.unobserve(el);
          outerTimer = timer;
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    let outerTimer: ReturnType<typeof setTimeout> | null = null;
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (outerTimer) clearTimeout(outerTimer);
      if (glitchTimer) clearTimeout(glitchTimer);
    };
  }, [delay]);

  const isVisible = state === "visible";
  const isGlitching = state === "glitching";

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Glitch overlay */}
      {isGlitching && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          aria-hidden="true"
        >
          {/* Horizontal slice copies */}
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
          {/* Scan line */}
          <div
            className="glitch-scanline bg-primary-500/60 absolute right-0 left-0 h-px"
            style={{
              animation: "glitch-scanline 0.4s linear forwards",
            }}
          />
          {/* Color shift flicker */}
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
