import { defineField, defineType } from "sanity";
import { localeField } from "./locale";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    localeField("siteTitle", "Site Title"),
    localeField("siteDescription", "Site Description", "text"),
    defineField({
      name: "cvDownloadUrl",
      title: "CV Download URL",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "French", type: "url" }),
        defineField({ name: "en", title: "English", type: "url" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "siteTitle.fr" },
  },
});
