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
      name: "url",
      title: "Verification URL",
      type: "url",
      description: "Optional link to verify the certification",
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
    select: { title: "name", subtitle: "issuer" },
  },
});
