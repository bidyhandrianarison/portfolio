"use client";

import { useEffect, useRef } from "react";

/**
 * Bandeau défilant — port de commun.js : la classe `scrolled` se pose dès
 * scrollY > 4 (listener passive, nettoyé au démontage).
 */
export function ScrolledHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const onScroll = () =>
      header.classList.toggle("scrolled", window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // iOS : :active ne s'active qu'avec un écouteur tactile (port de commun.js)
    const onTouchStart = () => {};
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}
