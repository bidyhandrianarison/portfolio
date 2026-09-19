import type { Metadata } from "next";
import { personas } from "@/lib/constants/personas";
import { PersonaCard } from "@/components/layout/PersonaCard";

const SITE_URL = "https://sarobidy-andrianarison.netlify.app";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sarobidy Andrianarison",
    description:
      "Mobile Dev · AI Engineer · UI/UX Designer — Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems.",
    alternates: {
      canonical: SITE_URL,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
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
          Mobile Dev · IA Engineer · UI/UX Designer
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
