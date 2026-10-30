export const SKILL_CATEGORY_ORDER = [
  "ia",
  "data",
  "mobile",
  "infra",
  "design",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORY_ORDER)[number];
