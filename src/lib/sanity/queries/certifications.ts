import { client } from "@/lib/sanity/client";
import type { Certification } from "@/sanity/types";

const CERTIFICATIONS_QUERY = `*[_type == "certification"] | order(order asc) {
  _id,
  _type,
  name,
  issuer,
  date,
  url,
  order
}`;

export async function getCertifications(): Promise<Certification[]> {
  return client.fetch<Certification[]>(CERTIFICATIONS_QUERY);
}
