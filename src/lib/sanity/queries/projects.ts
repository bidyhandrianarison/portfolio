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
  order,
  featured
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
  return getClient().fetch<Project[]>(PROJECTS_QUERY);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getClient().fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
}
