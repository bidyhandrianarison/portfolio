import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/sanity/queries/projects";
import { getCertifications } from "@/lib/sanity/queries/certifications";

const BASE_URL = "https://sarobidy-andrianarison.netlify.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, certifications] = await Promise.all([
    getProjects(),
    getCertifications(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/fr/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/en/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fr/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fr/parcours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/parcours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fr/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

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
