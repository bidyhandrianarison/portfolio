import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Project } from "@/lib/content/projects";
import { MermaidDiagram } from "./MermaidDiagram";
import { BeforeAfterToggle } from "./BeforeAfterToggle";
import { caseStudyComponents } from "./CaseStudyMDXComponents";

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
}: {
  metrics: NonNullable<Project["frontmatter"]["metrics"]>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-neutral-200 bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-950"
        >
          <p className="text-primary-600 text-2xl font-bold">{m.value}</p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function CodeSnippet({
  snippet,
}: {
  snippet: NonNullable<Project["frontmatter"]["codeSnippets"]>[number];
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
  const { frontmatter: fm } = project;

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link
        href={`/${locale}/projects`}
        className="text-primary-600 hover:text-primary-700 mb-8 inline-block text-sm"
      >
        {i.back}
      </Link>

      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {fm.title}
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          {fm.role} · {fm.period}
        </p>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          {fm.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {fm.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {fm.repoUrl && (
            <a
              href={fm.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              {i.repo}
            </a>
          )}
          {fm.demoUrl && (
            <a
              href={fm.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {i.demo}
            </a>
          )}
        </div>
      </header>

      {fm.confidential && (
        <div className="border-warning-300 bg-warning-50 dark:border-warning-800 dark:bg-warning-950/30 mb-8 rounded-lg border p-4">
          <p className="text-warning-800 dark:text-warning-200 text-sm font-medium">
            ⚠ Ce projet contient des données sous NDA. Les détails sensibles ont
            été masqués.
            {fm.confidentialNote && ` ${fm.confidentialNote}`}
          </p>
        </div>
      )}

      {fm.metrics && <MetricsBar metrics={fm.metrics} />}

      {fm.beforeAfter && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{i.result}</h2>
          <BeforeAfterToggle data={fm.beforeAfter} />
        </section>
      )}

      {fm.architecture && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{i.solution}</h2>
          <MermaidDiagram chart={fm.architecture.mermaid} />
        </section>
      )}

      {fm.codeSnippets && fm.codeSnippets.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{i.contribution}</h2>
          <div className="space-y-4">
            {fm.codeSnippets.map((snippet) => (
              <CodeSnippet key={snippet.path} snippet={snippet} />
            ))}
          </div>
        </section>
      )}

      <article className="mt-12 max-w-3xl">
        {project.content && (
          <MDXRemote
            source={project.content}
            components={caseStudyComponents}
          />
        )}
      </article>
    </main>
  );
}
