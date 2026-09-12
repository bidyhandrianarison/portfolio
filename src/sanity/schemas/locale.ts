import { defineField } from "sanity";

const languages = [
  { id: "fr", title: "Français", isDefault: true },
  { id: "en", title: "English" },
];

export function localeField(
  name: string,
  title: string,
  type: "string" | "text" = "string",
) {
  return defineField({
    name,
    title,
    type: "object",
    fields: languages.map((lang) =>
      defineField({
        name: lang.id,
        title: lang.title,
        type,
      }),
    ),
  });
}

export { languages };
