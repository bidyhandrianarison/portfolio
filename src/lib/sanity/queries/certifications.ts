import { getClient } from "@/lib/sanity/client";
import type { Certification } from "@/sanity/types";

const CERTIFICATIONS_QUERY = `*[_type == "certification"] | order(order asc) {
  _id,
  _type,
  name,
  slug,
  issuer,
  date,
  category,
  description,
  image {
    asset -> {
      _ref,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt,
    hotspot
  },
  url,
  featured,
  order
}`;

const FEATURED_CERTIFICATIONS_QUERY = `*[_type == "certification" && featured == true] | order(order asc)[0...3] {
  _id,
  _type,
  name,
  slug,
  issuer,
  date,
  category,
  description,
  image {
    asset -> {
      _ref,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt,
    hotspot
  },
  url,
  featured,
  order
}`;

const CERTIFICATION_BY_SLUG_QUERY = `*[_type == "certification" && slug.current == $slug][0] {
  _id,
  _type,
  name,
  slug,
  issuer,
  date,
  category,
  description,
  image {
    asset -> {
      _ref,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt,
    hotspot
  },
  url,
  featured,
  order
}`;

export async function getCertifications(): Promise<Certification[]> {
  return getClient().fetch<Certification[]>(CERTIFICATIONS_QUERY);
}

export async function getFeaturedCertifications(): Promise<Certification[]> {
  return getClient().fetch<Certification[]>(FEATURED_CERTIFICATIONS_QUERY);
}

export async function getCertificationBySlug(
  slug: string,
): Promise<Certification | null> {
  return getClient().fetch<Certification | null>(CERTIFICATION_BY_SLUG_QUERY, {
    slug,
  });
}
