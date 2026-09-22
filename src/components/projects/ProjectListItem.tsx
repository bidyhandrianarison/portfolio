"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/utils/analytics";

interface ProjectListItemProps {
  slug: string;
  title: string;
  role: string;
  period: string;
  tags: string[];
  locale: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function ProjectListItem({
  slug,
  title,
  role,
  period,
  tags,
  locale,
  href,
  imageUrl,
  imageAlt,
}: ProjectListItemProps) {
  function handleClick() {
    trackEvent("project_open", { slug });
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="group hover:border-primary-300 dark:hover:border-primary-700 flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3 transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
    >
      {imageUrl ? (
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loader={({ src }) => src}
            unoptimized
          />
        </div>
      ) : (
        <div className="from-primary-100 dark:from-primary-900 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br to-orange-100 dark:to-orange-900">
          <span className="text-primary-400 dark:text-primary-600 text-xl font-bold">
            {title.charAt(0)}
          </span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold">{title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {role} · {period}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <svg
        className="group-hover:text-primary-600 h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
