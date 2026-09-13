import { client } from "@/lib/sanity/client";
import type { Settings } from "@/sanity/types";

const SETTINGS_QUERY = `*[_type == "settings"][0] {
  _id,
  _type,
  siteTitle,
  siteDescription,
  cvDownloadUrl,
  socialLinks
}`;

export async function getSettings(): Promise<Settings | null> {
  return client.fetch<Settings | null>(SETTINGS_QUERY);
}
