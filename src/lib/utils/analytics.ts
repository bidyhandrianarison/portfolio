"use client";

export function trackEvent(name: string, payload?: Record<string, string>) {
  if (typeof window === "undefined") return;

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, payload }),
    keepalive: true,
  }).catch(() => {});
}
