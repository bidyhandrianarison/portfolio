export interface LocaleString {
  fr: string;
  en: string;
}

export interface LocaleText {
  fr: string;
  en: string;
}

export interface Persona {
  _id: string;
  _type: "persona";
  title_i18n: string;
  headline: LocaleText;
  subtext: LocaleText;
  slug: { current: string };
  tags: string[];
  ctaPrimary: { label: LocaleString; href: string };
  ctaSecondary: { label: LocaleString; href: string };
  order: number;
}

export interface Project {
  _id: string;
  _type: "project";
  title_i18n: string;
  description: LocaleText;
  slug: { current: string };
  role: string;
  period: string;
  tags: string[];
  order: number;
}

export interface Skill {
  _id: string;
  _type: "skill";
  name: string;
  category: "mobile" | "ia" | "design" | "data" | "infra";
  proficiency: "expert" | "advanced" | "intermediate";
}

export interface Timeline {
  _id: string;
  _type: "timeline";
  date: string;
  title: LocaleString;
  description: LocaleText;
  tags: string[];
  section: "academic" | "professional";
  order: number;
}

export interface Settings {
  _id: string;
  _type: "settings";
  siteTitle: LocaleString;
  siteDescription: LocaleText;
  cvDownloadUrl: { fr: string; en: string };
  socialLinks: { platform: string; url: string }[];
}
