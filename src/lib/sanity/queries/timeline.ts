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
  return getClient().fetch<Timeline[]>(TIMELINE_QUERY);
}
