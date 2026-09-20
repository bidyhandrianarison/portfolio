import Link from "next/link";
import type { Project } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";
import { MermaidDiagram } from "./MermaidDiagram";
import { BeforeAfterToggle } from "./BeforeAfterToggle";
import { PortableTextContent } from "./PortableTextContent";

const t = {
  fr: {
    context: "Contexte",
    contribution: "Contribution",
    solution: "Solution",
    result: "Résultat",
    back: "← Retour aux projets",
    repo: "Voir le code",
    demo: "Voir la démo",
  },
  en: {
    context: "Context",
    contribution: "Contribution",
    solution: "Solution",
    result: "Results",
    back: "← Back to projects",
    repo: "View code",
    demo: "View demo",
  },
} as const;

function MetricsBar({
  metrics,
  locale,
}: {
  metrics: NonNullable<Project["metrics"]>;
  locale: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="rounded-xl border border-neutral-200 bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-950"
        >
          <p className="text-primary-600 text-2xl font-bold">
            {resolveLocale(m.value, locale)}
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {resolveLocale(m.label, locale)}
          </p>
        </div>
      ))}
    </div>
  );
}

function CodeSnippet({
  snippet,
}: {
  snippet: NonNullable<Project["codeSnippets"]>[number];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900">
        <code className="text-xs text-neutral-600 dark:text-neutral-400">
          {snippet.path}
        </code>
        <span className="text-xs text-neutral-400">{snippet.language}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className="font-mono text-neutral-800 dark:text-neutral-200">
          {snippet.code}
        </code>
      </pre>
    </div>
  );
}

export function CaseStudyTemplate({
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
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          {project.description[locale as keyof typeof project.description] ??
            project.description.fr}
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

      {project.confidential && (
        <div className="border-warning-300 bg-warning-50 dark:border-warning-800 dark:bg-warning-950/30 mb-8 rounded-lg border p-4">
          <p className="text-warning-800 dark:text-warning-200 text-sm font-medium">
            ⚠ Ce projet contient des données sous NDA. Les détails sensibles ont
            été masqués.
            {project.confidentialNote && ` ${project.confidentialNote}`}
          </p>
        </div>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <MetricsBar metrics={project.metrics} locale={locale} />
      )}

      {project.beforeAfter &&
        (() => {
          const bc = project.beforeAfter.beforeContent
            ? resolveLocale(project.beforeAfter.beforeContent, locale)
            : "";
          const ac = project.beforeAfter.afterContent
            ? resolveLocale(project.beforeAfter.afterContent, locale)
            : "";
          return bc || ac;
        })() && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">{i.result}</h2>
            <BeforeAfterToggle
              data={{
                beforeLabel:
                  (project.beforeAfter.beforeLabel
                    ? resolveLocale(project.beforeAfter.beforeLabel, locale)
                    : null) || (locale === "en" ? "Before" : "Avant"),
                afterLabel:
                  (project.beforeAfter.afterLabel
                    ? resolveLocale(project.beforeAfter.afterLabel, locale)
                    : null) || (locale === "en" ? "After" : "Après"),
                beforeContent: project.beforeAfter.beforeContent
                  ? resolveLocale(project.beforeAfter.beforeContent, locale)
                  : "",
                afterContent: project.beforeAfter.afterContent
                  ? resolveLocale(project.beforeAfter.afterContent, locale)
                  : "",
              }}
            />
          </section>
        )}

      {project.architecture?.mermaid && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{i.solution}</h2>
          <MermaidDiagram chart={project.architecture.mermaid} />
        </section>
      )}

      {project.codeSnippets && project.codeSnippets.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{i.contribution}</h2>
          <div className="space-y-4">
            {project.codeSnippets.map((snippet) => (
              <CodeSnippet key={snippet.path} snippet={snippet} />
            ))}
          </div>
        </section>
      )}

      {project.body && (
        <section className="mt-12">
          <PortableTextContent
            value={
              project.body[locale as keyof typeof project.body] ??
              project.body.fr ??
              []
            }
          />
        </section>
      )}
    </main>
  );
}
