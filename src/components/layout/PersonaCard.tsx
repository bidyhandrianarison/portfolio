import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Persona } from "@/lib/constants/personas";

interface PersonaCardProps {
  persona: Persona;
}

export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {persona.tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2.5 py-0.5 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-xl leading-tight font-bold text-balance">
        {persona.headline}
      </h2>

      <p className="text-neutral-600 dark:text-neutral-400">
        {persona.subtext}
      </p>

      <div className="mt-auto flex flex-wrap gap-3 pt-2">
        <Link
          href={persona.ctaPrimary.href}
          className="bg-primary-600 hover:bg-primary-700 focus-visible:ring-primary-500 inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {persona.ctaPrimary.label}
        </Link>
        <Link
          href={persona.ctaSecondary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-visible:ring-primary-500 inline-flex h-10 items-center justify-center rounded-lg bg-neutral-100 px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
        >
          {persona.ctaSecondary.label}
        </Link>
      </div>
    </Card>
  );
}
