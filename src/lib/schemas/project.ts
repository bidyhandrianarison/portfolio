import { z } from "zod";

const codeSnippetSchema = z
  .object({
    path: z.string(),
    language: z.string(),
    code: z.string().optional(),
    githubUrl: z.string().url().optional(),
  })
  .refine((s) => s.code || s.githubUrl, {
    message: "codeSnippet must have either code or githubUrl",
  });

const colorSwatchSchema = z.object({
  name: z.string(),
  value: z.string(),
  variable: z.string().optional(),
});

const designSystemSchema = z
  .object({
    colors: z.array(colorSwatchSchema).optional(),
    spacing: z.array(z.string()).optional(),
    typography: z
      .object({
        families: z.array(z.string()),
        scale: z.array(z.string()),
      })
      .optional(),
    components: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    figmaLink: z.string().url().optional(),
    storybookLink: z.string().url().optional(),
  })
  .optional();

const aiPipelineStepSchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  prompt: z.string().optional(),
  metrics: z
    .object({
      latency: z.string().optional(),
      accuracy: z.string().optional(),
      cost: z.string().optional(),
    })
    .optional(),
});

const aiPipelineSchema = z
  .object({
    steps: z.array(aiPipelineStepSchema),
    description: z.string().optional(),
  })
  .optional();

const localeStringSchema = z.union([
  z.string(),
  z.object({ fr: z.string(), en: z.string() }),
]);

const metricSchema = z.object({
  label: localeStringSchema,
  value: localeStringSchema,
  baseline: z.string().optional(),
  trend: z.enum(["up", "down", "neutral"]).optional(),
  threshold: z
    .object({
      green: z.string().optional(),
      yellow: z.string().optional(),
      red: z.string().optional(),
    })
    .optional(),
});

const architectureNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["file", "route", "external"]).optional(),
  url: z.string().optional(),
});

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  role: z.string(),
  period: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  hero: z
    .object({
      headline: z.string(),
      subtext: z.string(),
      image: z.string().optional(),
    })
    .optional(),
  architecture: z
    .object({
      mermaid: z.string(),
      nodes: z.array(architectureNodeSchema).optional(),
    })
    .optional(),
  codeSnippets: z.array(codeSnippetSchema).optional(),
  designSystem: designSystemSchema,
  aiPipeline: aiPipelineSchema,
  metrics: z.array(metricSchema).optional(),
  beforeAfter: z
    .object({
      beforeLabel: localeStringSchema,
      afterLabel: localeStringSchema,
      beforeContent: localeStringSchema,
      afterContent: localeStringSchema,
    })
    .optional(),
  confidential: z.boolean().optional(),
  confidentialNote: z.string().optional(),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
