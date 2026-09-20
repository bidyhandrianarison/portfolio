import { client } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
