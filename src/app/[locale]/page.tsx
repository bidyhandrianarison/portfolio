import type { Metadata } from "next";
import { Suspense } from "react";
import { pageAlternates } from "@/lib/constants/site";
import { HomeHero } from "@/components/home/HomeHero";
import { BentoBrief } from "@/components/home/BentoBrief";
import { AiSystems } from "@/components/home/AiSystems";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { Bridge } from "@/components/home/Bridge";
import { AppsCarousel } from "@/components/home/AppsCarousel";
import { RecentPath } from "@/components/home/RecentPath";
import { CertsRow } from "@/components/home/CertsRow";
import { ContactBand } from "@/components/home/ContactBand";
import { SectionSkeleton } from "@/components/ui/skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description =
    locale === "fr"
      ? "Ingénieur hybride construisant des applications mobiles, des systèmes IA et des design systems."
      : "Hybrid engineer building mobile apps, AI systems, and design systems.";

  return {
    description,
    alternates: pageAlternates(locale),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <HomeHero locale={locale} />

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <BentoBrief locale={locale} />
        </Suspense>
      </section>

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <AiSystems locale={locale} />
        </Suspense>
      </section>

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedStory locale={locale} />
        </Suspense>
      </section>

      <Bridge locale={locale} />

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <AppsCarousel locale={locale} />
        </Suspense>
      </section>

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <RecentPath locale={locale} />
        </Suspense>
      </section>

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <CertsRow locale={locale} />
        </Suspense>
      </section>

      <section className="py-14">
        <Suspense fallback={<SectionSkeleton />}>
          <ContactBand locale={locale} />
        </Suspense>
      </section>
    </main>
  );
}
