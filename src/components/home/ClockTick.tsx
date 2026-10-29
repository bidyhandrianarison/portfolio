"use client";

import { useEffect, useState } from "react";

const PLACEHOLDER = "--:--";

function format(locale: string, date: Date): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Indian/Antananarivo",
  }).format(date);
}

/** Horloge de Madagascar (07-synthese.html) : tick immédiat puis setInterval 30000ms. */
export function ClockTick({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const [time, setTime] = useState(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setTime(format(locale, new Date()));
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, [locale]);

  return <div className={className}>{time}</div>;
}
