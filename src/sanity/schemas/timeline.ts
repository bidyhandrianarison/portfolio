import { defineField, defineType } from "sanity";
import { localeField } from "./locale";

const sections = [
  { title: "Academic", value: "academic" },
  { title: "Professional", value: "professional" },
];

export default defineType({
  name: "timeline",
  title: "Timeline",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    localeField("title", "Title"),
    localeField("description", "Description", "text"),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: { list: sections },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Date desc",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.fr", subtitle: "date" },
  },
});
