import { defineQuery } from "groq";
import { getClient } from "@/lib/sanity/client";
import type { Project } from "@/sanity/types";

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project"] | order(order asc) {
  _id,
  _type,
  title,
  description,
  slug,
  role,
  period,
  tags,
  projectTypes,
  order,
  featured,
  architecture { mermaid },
  hero {
    image {
      asset->{
        _ref,
        url,
        metadata { lqip, dimensions { width, height } }
      },
      alt,
      hotspot
    }
  }
}`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    description,
    slug,
    role,
    period,
    tags,
    order,
    featured,
    hero {
      headline,
      subtext,
      image {
        asset->{
          _ref,
          url,
          metadata { lqip, dimensions { width, height } }
        },
        alt,
        hotspot
      }
    },
    architecture {
      mermaid,
      nodes
    },
    metrics,
    beforeAfter,
    codeSnippets,
    confidential,
    confidentialNote,
    repoUrl,
    demoUrl,
    body
  }`,
);

export async function getProjects(): Promise<Project[]> {
  const client = getClient();
  if (!client) return [];
  return client.fetch<Project[]>(PROJECTS_QUERY);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const client = getClient();
  if (!client) return null;
  return client.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
}
