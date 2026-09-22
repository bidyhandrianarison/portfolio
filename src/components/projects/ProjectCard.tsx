"use client";

import Link from "next/link";
import Image from "next/image";
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
  imageUrl?: string;
  imageAlt?: string;
  imageLqip?: string;
}

const t = {
  fr: { viewStudy: "Voir l'étude →", viewProject: "Voir le projet →" },
  en: { viewStudy: "View case study →", viewProject: "View project →" },
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
  imageUrl,
  imageAlt,
  imageLqip,
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
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
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
      className="group hover:border-primary-300 dark:hover:border-primary-700 flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
    >
      {imageUrl ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          {imageLqip && (
            <div
              className="absolute inset-0 scale-110 blur-xl"
              style={{
                backgroundImage: `url(${imageLqip})`,
                backgroundSize: "cover",
              }}
            />
          )}
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loader={({ src }) => src}
            unoptimized
          />
        </div>
      ) : (
        <div className="from-primary-100 via-primary-50 dark:from-primary-900 dark:via-primary-950 relative aspect-[16/10] bg-gradient-to-br to-orange-100 dark:to-orange-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary-300 dark:text-primary-700 text-4xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {role} · {period}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-primary-600 mt-3 inline-flex items-center gap-1 text-sm font-medium">
          {i.viewProject}
        </span>
      </div>
    </Link>
  );
}
