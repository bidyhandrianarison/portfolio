import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  projectFrontmatterSchema,
  type ProjectFrontmatter,
} from "../schemas/project";

const CONTENT_DIR = path.join(process.cwd(), "src/content/projects");
const VALID_LOCALES = ["fr", "en"];

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
  filePath: string;
}

function parseFrontmatter(raw: Record<string, unknown>): ProjectFrontmatter {
  const result = projectFrontmatterSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid project frontmatter:\n${issues}`);
  }
  return result.data;
}

function sanitizeSlug(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9-]/g, "");
}

export function getProjectBySlug(
  slug: string,
  locale: string = "fr",
): Project | null {
  const safeSlug = sanitizeSlug(slug);
  const safeLocale = VALID_LOCALES.includes(locale) ? locale : "fr";

  const filePath = path.join(CONTENT_DIR, `${safeSlug}.${safeLocale}.mdx`);
  if (!fs.existsSync(filePath)) {
    const fallbackPath = path.join(CONTENT_DIR, `${safeSlug}.mdx`);
    if (fs.existsSync(fallbackPath)) {
      try {
        const raw = fs.readFileSync(fallbackPath, "utf-8");
        const { data, content } = matter(raw);
        return {
          frontmatter: parseFrontmatter(data),
          content,
          filePath: fallbackPath,
        };
      } catch {
        return null;
      }
    }
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      frontmatter: parseFrontmatter(data),
      content,
      filePath,
    };
  } catch {
    return null;
  }
}

export function getAllProjects(locale: string = "fr"): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const safeLocale = VALID_LOCALES.includes(locale) ? locale : "fr";

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => {
    if (!f.endsWith(".mdx")) return false;
    if (f.endsWith(`.${safeLocale}.mdx`)) return true;
    if (!f.includes(".fr.") && !f.includes(".en.")) return true;
    return false;
  });

  return files
    .map((file) => {
      const slug = file.replace(`.${safeLocale}.mdx`, "").replace(".mdx", "");
      return getProjectBySlug(slug, safeLocale);
    })
    .filter((p): p is Project => p !== null);
}

export function getProjectsByTag(
  tag: string,
  locale: string = "fr",
): Project[] {
  return getAllProjects(locale).filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}
