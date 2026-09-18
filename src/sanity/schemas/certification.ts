import { defineField, defineType } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      validation: (rule) => rule.required(),
    }),
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
        defineField({
          name: "why",
          title: "Why I got this",
          type: "text",
          rows: 2,
          description: "Pourquoi tu as obtenu cette certification",
        }),
        defineField({
          name: "what",
          title: "What I learned",
          type: "text",
          rows: 2,
          description: "Ce que tu as appris",
        }),
        defineField({
          name: "result",
          title: "Result",
          type: "text",
          rows: 2,
          description: "Ce que ça t'a permis de faire concrètement",
        }),
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
      title: "name",
      subtitle: "issuer",
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
