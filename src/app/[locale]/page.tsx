import { personas } from "@/lib/constants/personas";
import { PersonaCard } from "@/components/layout/PersonaCard";

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
