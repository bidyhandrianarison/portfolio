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
  title: LocaleString;
  headline: LocaleText;
  subtext: LocaleText;
  slug: { current: string };
  tags: string[];
  ctaPrimary: { label: LocaleString; href: string };
  ctaSecondary: { label: LocaleString; href: string };
  order: number;
}

export interface ProjectHero {
  headline?: string;
  subtext?: string;
  image?: {
    asset: {
      _ref: string;
      url: string;
      metadata?: {
        lqip?: string;
        dimensions?: { width: number; height: number };
      };
    };
    alt: string;
    hotspot?: { x: number; y: number; height: number; width: number };
  };
}

export interface ProjectArchitecture {
  mermaid?: string;
  nodes?: Array<{
    id: string;
    label: string;
    type?: "file" | "route" | "external";
    url?: string;
  }>;
}

export interface ProjectMetric {
  label: string;
  value: string;
  baseline?: string;
  trend?: "up" | "down" | "neutral";
}

export interface ProjectBeforeAfter {
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent?: string;
  afterContent?: string;
}

export interface ProjectCodeSnippet {
  path: string;
  language: string;
  code?: string;
  githubUrl?: string;
}

export interface PortableTextBlock {
  _type: "block";
  _key: string;
  style?: "normal" | "h2" | "h3" | "blockquote";
  list?: "bullet" | "number";
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
    openInNewTab?: boolean;
  }>;
}

export interface Project {
  _id: string;
  _type: "project";
  title: LocaleString;
  description: LocaleText;
  slug: { current: string };
  role: string;
  period: string;
  tags: string[];
  order: number;
  featured?: boolean;
  hero?: ProjectHero;
  architecture?: ProjectArchitecture;
  metrics?: ProjectMetric[];
  beforeAfter?: ProjectBeforeAfter;
  codeSnippets?: ProjectCodeSnippet[];
  confidential?: boolean;
  confidentialNote?: string;
  repoUrl?: string;
  demoUrl?: string;
  body?: {
    fr?: PortableTextBlock[];
    en?: PortableTextBlock[];
  };
}

export interface Skill {
  _id: string;
  _type: "skill";
  name: string;
  category: "mobile" | "ia" | "design" | "data" | "infra";
  proficiency: "expert" | "advanced" | "intermediate";
}

export interface CertificationDescription {
  why?: string;
  what?: string;
  result?: string;
}

export interface CertificationImage {
  asset: {
    _ref: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
  alt: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Certification {
  _id: string;
  _type: "certification";
  name: string;
  slug: { current: string };
  issuer: string;
  date: string;
  category: "ia" | "mobile" | "web" | "cloud" | "design";
  description?: CertificationDescription;
  image?: CertificationImage;
  url?: string;
  featured?: boolean;
  order: number;
}

export interface Timeline {
  _id: string;
  _type: "timeline";
  dateStart: string;
  dateEnd?: string;
  title: LocaleString;
  organization?: LocaleString;
  description: LocaleText;
  image?: { asset: { _ref: string }; hotspot?: unknown };
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
