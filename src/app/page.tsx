import type { Metadata } from "next";
import { personas } from "@/lib/constants/personas";
import { PersonaCard } from "@/components/layout/PersonaCard";

import { SITE_URL } from "@/lib/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sarobidy Andrianarison",
    description:
      "Développeur mobile · Ingénieur IA · Designer UI/UX — Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems.",
    alternates: {
      canonical: SITE_URL,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
  };
}

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Sarobidy Andrianarison
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Développeur Mobile · Ingénieur IA · Designer UI/UX
        </p>
      </section>

      <section aria-label="Choisir votre parcours">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>
      </section>
    </main>
  );
}
