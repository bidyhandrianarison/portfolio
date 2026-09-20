import { getClient } from "@/lib/sanity/client";
import type { Timeline } from "@/sanity/types";

const TIMELINE_QUERY = `*[_type == "timeline"] | order(dateStart desc) {
  _id,
  _type,
  dateStart,
  dateEnd,
  title,
  organization,
  description,
  image,
  tags,
  section,
  order
}`;

export async function getTimelineEntries(): Promise<Timeline[]> {
  const client = getClient();
  if (!client) return [];
  return client.fetch<Timeline[]>(TIMELINE_QUERY);
}
