import Link from "next/link";
import { projects } from "@/lib/constants/projects";

const featuredSlugs = ["redsmite", "codilee", "freelance"];
const featured = projects.filter((p) => featuredSlugs.includes(p.slug));
const others = projects.filter((p) => !featuredSlugs.includes(p.slug));

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Sarobidy Andrianarison
        </h1>
        <p className="mt-4 text-lg text-balance text-neutral-600 dark:text-neutral-400">
          Je transforme des processus complexes en produits simples, utiles et
          intelligents
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
          Mobile Dev · IA Engineer · UI/UX Designer
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/projects"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Voir mes projets
          </Link>
          <Link
            href="/contact"
            className="focus:ring-primary-500 inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Me contacter
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-20" aria-label="Projets vedettes">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          Projets vedettes
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <article
              key={project.slug}
              className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">
                {project.role} · {project.period}
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="mb-20" aria-label="Autres projets">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          Autres projets
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((project) => (
            <article
              key={project.slug}
              className="hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">
                {project.role} · {project.period}
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl bg-neutral-100 p-8 text-center dark:bg-neutral-900">
        <h2 className="text-2xl font-semibold tracking-tight">
          Travaillons ensemble
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Vous avez un projet en tête ? Discutons-en.
        </p>
        <Link
          href="/contact"
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Me contacter
        </Link>
      </section>
    </main>
  );
}
