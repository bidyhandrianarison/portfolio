import { defineField, defineType } from "sanity";

const categories = [
  { title: "Mobile", value: "mobile" },
  { title: "IA", value: "ia" },
  { title: "Design", value: "design" },
  { title: "Data", value: "data" },
  { title: "Infrastructure", value: "infra" },
];

const proficiencies = [
  { title: "Expert", value: "expert" },
  { title: "Advanced", value: "advanced" },
  { title: "Intermediate", value: "intermediate" },
];

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency",
      type: "string",
      options: { list: proficiencies },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
