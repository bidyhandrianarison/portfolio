"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/utils/analytics";

interface ProjectCardProps {
  slug: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  locale: string;
  href: string;
  variant?: "featured" | "default";
}

const t = {
  fr: { viewStudy: "Voir l'étude →" },
  en: { viewStudy: "View case study →" },
} as const;

export function ProjectCard({
  slug,
  title,
  role,
  period,
  description,
  tags,
  locale,
  href,
  variant = "default",
}: ProjectCardProps) {
  const i = t[locale as keyof typeof t] ?? t.fr;

  function handleClick() {
    trackEvent("project_open", { slug });
  }

  if (variant === "featured") {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">
          {role} · {period}
        </p>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-primary-600 mt-4 inline-block text-sm font-medium">
          {i.viewStudy}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-neutral-500">
        {role} · {period}
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </Link>
  );
}
