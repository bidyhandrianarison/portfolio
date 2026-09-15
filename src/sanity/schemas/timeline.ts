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
      name: "dateStart",
      title: "Date de début",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dateEnd",
      title: "Date de fin",
      description: "Laisser vide si encore en poste",
      type: "date",
    }),
    localeField("title", "Title"),
    localeField("organization", "Organization", "string"),
    localeField("description", "Description", "text"),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Photo de l'école ou de l'entreprise",
      options: { hotspot: true },
    }),
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
    select: { title: "title.fr", subtitle: "dateStart" },
  },
});
