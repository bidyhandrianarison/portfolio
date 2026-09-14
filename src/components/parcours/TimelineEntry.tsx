"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Timeline } from "@/sanity/types";
import { urlFor } from "@/lib/sanity/image";

interface TimelineEntryProps {
  entry: Timeline;
  locale: string;
  index: number;
  view: "timeline" | "grid";
}

const sectionBadge: Record<string, { fr: string; en: string; color: string }> =
  {
    academic: {
      fr: "Académique",
      en: "Academic",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    professional: {
      fr: "Professionnel",
      en: "Professional",
      color:
        "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    },
  };

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

export function TimelineEntry({
  entry,
  locale,
  index,
  view,
}: TimelineEntryProps) {
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const badge = sectionBadge[entry.section] ?? sectionBadge.professional;
  const startDate = formatDate(entry.dateStart, locale);
  const endDate = entry.dateEnd
    ? formatDate(entry.dateEnd, locale)
    : lang === "fr"
      ? "Présent"
      : "Present";

  if (view === "grid") {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
      >
        {entry.image && (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={urlFor(entry.image).width(600).height(300).url()}
              alt={entry.title[lang] ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span
              className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}
            >
              {badge[lang]}
            </span>
          </div>
        )}
        <div className="p-5">
          <time className="text-primary-600 text-sm font-semibold">
            {startDate} — {endDate}
          </time>
          <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {entry.title[lang]}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            {entry.description[lang]}
          </p>
          {entry.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex gap-6 pb-10 last:pb-0"
    >
      {/* Dot */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="border-primary-500 h-4 w-4 rounded-full border-2 bg-white dark:bg-neutral-950" />
        <div className="mt-1 h-full w-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* Content card */}
      <div className="group flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
        {entry.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={urlFor(entry.image).width(800).height(400).url()}
              alt={entry.title[lang] ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute right-4 bottom-3 left-4">
              <time className="text-sm font-semibold text-white drop-shadow">
                {startDate} — {endDate}
              </time>
            </div>
          </div>
        )}
        <div className="p-5">
          {!entry.image && (
            <time className="text-primary-600 text-sm font-semibold">
              {startDate} — {endDate}
            </time>
          )}
          <div className="mt-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {entry.title[lang]}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}
            >
              {badge[lang]}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {entry.description[lang]}
          </p>
          {entry.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
