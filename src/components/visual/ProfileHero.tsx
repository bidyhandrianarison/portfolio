"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedBlob } from "@/components/visual/AnimatedBlob";
import { SvgPattern } from "@/components/visual/SvgPattern";
import { Particles } from "@/components/visual/Particles";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ProfileHeroProps {
  name: string;
  tagline: string;
  roles: string;
  viewProjects: string;
  contact: string;
  locale: string;
}

export function ProfileHero({
  name,
  tagline,
  roles,
  viewProjects,
  contact,
  locale,
}: ProfileHeroProps) {
  const { ref: heroRef, isVisible } = useScrollReveal();

  return (
    <section ref={heroRef} className="relative mb-20">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <AnimatedBlob />
        <SvgPattern />
        <Particles />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 py-12 sm:flex-row sm:items-center sm:py-20">
        {/* Profile image */}
        <div
          className={`shrink-0 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="group relative">
            {/* Glow ring */}
            <div className="from-primary-400 dark:from-primary-600 absolute -inset-2 rounded-full bg-gradient-to-br to-orange-400 opacity-60 blur-md transition-opacity group-hover:opacity-100 dark:to-orange-600" />
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-44 sm:w-44 dark:border-neutral-950">
              <Image
                src="/pdp.jpg"
                alt={name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={`text-center transition-all delay-150 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } sm:text-left`}
        >
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {name}
          </h1>
          <p className="mt-4 text-lg text-balance text-neutral-600 dark:text-neutral-400">
            {tagline}
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {roles}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
            <Link
              href={`/${locale}/projects`}
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {viewProjects}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="focus:ring-primary-500 inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {contact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
