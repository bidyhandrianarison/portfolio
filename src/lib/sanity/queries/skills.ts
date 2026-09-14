import { client } from "@/lib/sanity/client";
import type { Skill } from "@/sanity/types";

const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) {
  _id,
  _type,
  name,
  category,
  proficiency
}`;

export async function getSkills(): Promise<Skill[]> {
  return client.fetch<Skill[]>(SKILLS_QUERY);
}
