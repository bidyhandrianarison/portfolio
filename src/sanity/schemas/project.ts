import { defineField, defineType, defineArrayMember } from "sanity";
import { localeField } from "./locale";

const bodyBlock = {
  type: "block",
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      { title: "Code", value: "code" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          { name: "href", type: "url", title: "URL" },
          {
            name: "openInNewTab",
            type: "boolean",
            title: "Open in new tab",
            initialValue: true,
          },
        ],
      },
    ],
  },
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "Blockquote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
};

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    localeField("title", "Title"),
    localeField("description", "Description", "text"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.fr", maxLength: 96 },
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
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
      description: "Featured projects show full case studies",
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "text" }),
        defineField({
          name: "image",
          title: "Hero Image",
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
        }),
      ],
    }),
    defineField({
      name: "architecture",
      title: "Architecture Diagram",
      type: "object",
      fields: [
        defineField({
          name: "mermaid",
          title: "Mermaid Diagram",
          type: "text",
          rows: 10,
        }),
        defineField({
          name: "nodes",
          title: "Architecture Nodes",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "id", title: "ID", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "type",
                  title: "Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "File", value: "file" },
                      { title: "Route", value: "route" },
                      { title: "External", value: "external" },
                    ],
                  },
                }),
                defineField({ name: "url", title: "URL", type: "url" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            localeField("label", "Label"),
            localeField("value", "Value"),
            defineField({
              name: "baseline",
              title: "Baseline",
              type: "string",
            }),
            defineField({
              name: "trend",
              title: "Trend",
              type: "string",
              options: {
                list: [
                  { title: "Up", value: "up" },
                  { title: "Down", value: "down" },
                  { title: "Neutral", value: "neutral" },
                ],
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "beforeAfter",
      title: "Before/After Comparison",
      type: "object",
      fields: [
        localeField("beforeLabel", "Before Label"),
        localeField("afterLabel", "After Label"),
        localeField("beforeContent", "Before Content", "text", { rows: 5 }),
        localeField("afterContent", "After Content", "text", { rows: 5 }),
      ],
    }),
    defineField({
      name: "codeSnippets",
      title: "Code Snippets",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "path", title: "File Path", type: "string" }),
            defineField({
              name: "language",
              title: "Language",
              type: "string",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
              rows: 20,
            }),
            defineField({
              name: "githubUrl",
              title: "GitHub URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "confidential",
      title: "Confidential Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "confidentialNote",
      title: "Confidential Note",
      type: "string",
      hidden: ({ parent }) => !parent?.confidential,
    }),
    defineField({
      name: "repoUrl",
      title: "Repository URL",
      type: "url",
    }),
    defineField({
      name: "demoUrl",
      title: "Demo URL",
      type: "url",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "object",
      fields: [
        defineField({
          name: "fr",
          title: "French",
          type: "array",
          of: [bodyBlock],
        }),
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [bodyBlock],
        }),
      ],
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
      title: "title.fr",
      role: "role",
      featured: "featured",
      media: "hero.image",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: select.featured ? `⭐ ${select.role}` : select.role,
        media: select.media,
      };
    },
  },
});
