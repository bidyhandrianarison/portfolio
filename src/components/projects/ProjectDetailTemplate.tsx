import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { PortableTextContent } from "./PortableTextContent";

const t = {
  fr: {
    back: "← Retour aux projets",
    repo: "Voir le code",
    demo: "Voir la démo",
  },
  en: {
    back: "← Back to projects",
    repo: "View code",
    demo: "View demo",
  },
} as const;

export function ProjectDetailTemplate({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Link
        href={`/${locale}/projects`}
        className="text-primary-600 hover:text-primary-700 mb-8 inline-block text-sm"
      >
        {i.back}
      </Link>

      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title[locale as keyof typeof project.title] ??
            project.title.fr}
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          {project.role && project.period
            ? `${project.role} · ${project.period}`
            : project.role || project.period || ""}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              {i.repo}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {i.demo}
            </a>
          )}
        </div>
      </header>

      {project.hero?.image && (
        <div className="mb-12 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src={urlFor(project.hero.image).width(1200).height(675).url()}
            alt={project.hero.image.alt || project.title.fr}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {project.body && (
        <PortableTextContent
          value={
            project.body[locale as keyof typeof project.body] ??
            project.body.fr ??
            []
          }
        />
      )}
    </main>
  );
}
