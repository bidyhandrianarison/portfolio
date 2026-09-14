import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/constants/projects";
import type { Skill } from "@/sanity/types";

interface PersonaPageProps {
  title: string;
  description: string;
  projects: Project[];
  skills: Skill[];
  kits?: { name: string; slug: string; description: string }[];
}

export function PersonaPage({
  title,
  description,
  projects,
  skills,
  kits,
}: PersonaPageProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-500">
        <Link
          href="/"
          className="hover:text-neutral-900 dark:hover:text-neutral-50"
        >
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900 dark:text-neutral-50">Persona</span>
        <span className="mx-2">/</span>
        <span className="text-neutral-900 dark:text-neutral-50">{title}</span>
      </nav>

      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Compétences</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill._id}
              className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-3 py-1 text-sm font-medium"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Projets</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug}>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-neutral-500">{project.role}</p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
              <p className="mt-2 text-xs text-neutral-400">{project.period}</p>
            </Card>
          ))}
        </div>
      </section>

      {kits && kits.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Starter Kits</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {kits.map((kit) => (
              <Card key={kit.slug}>
                <h3 className="font-semibold">{kit.name}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {kit.description}
                </p>
                <Link
                  href={`/starter-kits/${kit.slug}`}
                  className="text-primary-600 mt-3 inline-block text-sm font-medium hover:underline"
                >
                  Voir le kit →
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Link
        href="/"
        className="text-primary-600 inline-block text-sm font-medium hover:underline"
      >
        ← Retour à l&apos;accueil
      </Link>
    </main>
  );
}
