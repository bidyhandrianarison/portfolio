import { defineField, defineType } from "sanity";
import { localeField } from "./locale";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title_i18n",
      title: "Title",
      type: "string",
    }),
    localeField("description", "Description", "text"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_i18n", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
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
    select: { title: "title_i18n", subtitle: "role" },
  },
});
