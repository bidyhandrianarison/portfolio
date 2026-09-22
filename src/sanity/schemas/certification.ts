import { defineField, defineType } from "sanity";
import { localeField } from "./locale";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    localeField("name", "Name"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.fr", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    localeField("issuer", "Issuer"),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "e.g. 2024, March 2024",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "IA & Automatisation", value: "ia" },
          { title: "Mobile", value: "mobile" },
          { title: "Web & Fullstack", value: "web" },
          { title: "Cloud & DevOps", value: "cloud" },
          { title: "Design", value: "design" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        localeField("why", "Why I got this", "text", { rows: 2 }),
        localeField("what", "What I learned", "text", { rows: 2 }),
        localeField("result", "Result", "text", { rows: 2 }),
      ],
    }),
    defineField({
      name: "image",
      title: "Certificate Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      description: "Photo ou scan du certificat",
    }),
    defineField({
      name: "url",
      title: "Verification URL",
      type: "url",
      description: "Optional link to verify the certification",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Afficher sur la page d'accueil",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower = first)",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name.fr",
      subtitle: "issuer.fr",
      category: "category",
      media: "image",
    },
    prepare(select) {
      const categoryLabels: Record<string, string> = {
        ia: "IA & Auto",
        mobile: "Mobile",
        web: "Web",
        cloud: "Cloud",
        design: "Design",
      };
      return {
        title: select.title,
        subtitle: `${select.subtitle} · ${categoryLabels[select.category] || select.category}`,
        media: select.media,
      };
    },
  },
});
