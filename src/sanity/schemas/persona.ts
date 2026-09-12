import { defineField, defineType } from "sanity";
import { localeField } from "./locale";

export default defineType({
  name: "persona",
  title: "Persona",
  type: "document",
  fields: [
    defineField({
      name: "title_i18n",
      title: "Title",
      type: "string",
    }),
    localeField("headline", "Headline", "text"),
    localeField("subtext", "Subtext", "text"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_i18n", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "ctaPrimary",
      title: "CTA Primary",
      type: "object",
      fields: [
        localeField("label", "Label"),
        defineField({ name: "href", title: "Href", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "CTA Secondary",
      type: "object",
      fields: [
        localeField("label", "Label"),
        defineField({ name: "href", title: "Href", type: "string" }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
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
    select: { title: "title_i18n", subtitle: "headline.fr" },
  },
});
