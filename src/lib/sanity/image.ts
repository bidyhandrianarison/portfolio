import { getClient } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

export function urlFor(
  source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0],
) {
  return createImageUrlBuilder(getClient()).image(source);
}
