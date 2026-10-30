import type { Metadata } from "next";
import Link from "next/link";
import { getSkills } from "@/lib/sanity/queries/skills";
import { getCertifications } from "@/lib/sanity/queries/certifications";
import { skillsT } from "@/lib/i18n-server";
import { SKILL_CATEGORY_ORDER } from "@/lib/constants/skills";
import { DomainGrid } from "@/components/competences/DomainGrid";
import { CertificationsSection } from "@/components/competences/CertificationsSection";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { pageAlternates } from "@/lib/constants/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = skillsT(locale);

  return {
    title: t("pageTitle"),
    description: t("description"),
    alternates: pageAlternates(locale, "/skills"),
  };
}

export default async function CompetencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = skillsT(locale);

  let skills: Awaited<ReturnType<typeof getSkills>>;
  let certifications: Awaited<ReturnType<typeof getCertifications>>;
  try {
    [skills, certifications] = await Promise.all([
      getSkills(),
      getCertifications(),
    ]);
  } catch (error) {
    console.error("[skills] fetch failed:", error);
    return (
      <main className="wrap py-14">
        <ErrorFallback feature="skills" locale={locale} />
      </main>
    );
  }

  return (
    <main>
      <div className="wrap py-14">
        <p className="meta">
          {t("metaDomains").replace("{n}", String(SKILL_CATEGORY_ORDER.length))}{" "}
          ·{" "}
          {t("metaCerts").replace(
            "{n}",
            String(
              certifications.filter(
                (certification) => certification.slug?.current,
              ).length,
            ),
          )}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-bold tracking-[-0.04em]">
          {t("pageTitle")}
        </h1>
        <p className="text-muted mt-4 max-w-[60ch] text-lg">{t("lead")}</p>
      </div>
      <section className="wrap pb-14" aria-labelledby="t-domains">
        <div className="sec-head">
          <h2 id="t-domains">{t("domainsTitle")}</h2>
        </div>
        <DomainGrid skills={skills} locale={locale} />
        <p className="mt-[18px]">
          <Link href={`/${locale}/projects`} className="btn press">
            {t("viewProjects")}
          </Link>
        </p>
      </section>
      <section
        id="certifications"
        className="wrap pb-14"
        aria-labelledby="t-certs"
      >
        <div className="sec-head">
          <h2 id="t-certs">{t("certTitle")}</h2>
        </div>
        <CertificationsSection
          certifications={certifications}
          locale={locale}
        />
      </section>
    </main>
  );
}
