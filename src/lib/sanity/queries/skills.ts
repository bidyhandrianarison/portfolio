import { getClient } from "@/lib/sanity/client";
import type { Skill } from "@/sanity/types";

const SKILLS_QUERY = `*[_type == "skill"] | order(name asc) {
  _id,
  _type,
  name,
  category,
  proficiency
}`;

export async function getSkills(): Promise<Skill[]> {
  const client = getClient();
  if (!client) return [];
  return client.fetch<Skill[]>(SKILLS_QUERY);
}
