import { getClient } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

type ImageSource = Parameters<
  ReturnType<typeof createImageUrlBuilder>["image"]
>[0];

export function urlFor(source: ImageSource) {
  return createImageUrlBuilder(getClient()!).image(source);
}
