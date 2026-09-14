import { client } from "@/lib/sanity/client";
import type { Project } from "@/sanity/types";

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  _type,
  title,
  description,
  slug,
  role,
  period,
  tags,
  order
}`;

export async function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(PROJECTS_QUERY);
}
