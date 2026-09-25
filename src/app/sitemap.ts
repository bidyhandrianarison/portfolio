import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/sanity/queries/projects";
import { getCertifications } from "@/lib/sanity/queries/certifications";

const BASE_URL = "https://www.sarobidy-andrianarison.consulting";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  let certifications: Awaited<ReturnType<typeof getCertifications>> = [];

  try {
    [projects, certifications] = await Promise.all([
      getProjects(),
      getCertifications(),
    ]);
  } catch {
    // Graceful degradation: return static pages only
  }

  const locales = ["fr", "en"] as const;

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${locale}/parcours`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${locale}/persona/mobile`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/${locale}/persona/ia`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/${locale}/persona/design`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/${locale}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]);

  const projectPages: MetadataRoute.Sitemap = projects.flatMap((project) =>
    (["fr", "en"] as const).map((locale) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const certPages: MetadataRoute.Sitemap = certifications
    .filter((cert) => cert.slug?.current)
    .flatMap((cert) =>
      (["fr", "en"] as const).map((locale) => ({
        url: `${BASE_URL}/${locale}/certifications/${cert.slug!.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    );

  return [...staticPages, ...projectPages, ...certPages];
}
