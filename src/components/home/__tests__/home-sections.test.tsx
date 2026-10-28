import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
  }) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} data-fill={fill ? "true" : undefined} />
  ),
}));

const mockEmailAssistant = {
  _id: "p1",
  _type: "project",
  slug: { current: "assistant-emails" },
  title: { fr: "Assistant de traitement d'emails", en: "Email assistant" },
  description: {
    fr: "Assistant IA qui lit les emails et prépare des réponses.",
    en: "AI assistant that reads emails.",
  },
  role: "Conception UX",
  localizedRole: { fr: "Conception UX", en: "UX design" },
  period: "2025 – 2026",
  tags: ["#ia"],
  projectTypes: ["ia"],
  metrics: [
    {
      label: {
        fr: "temps de traitement · 50+ emails/jour",
        en: "processing time · 50+ emails/day",
      },
      value: { fr: "2h → 25 min", en: "2h → 25 min" },
    },
  ],
  beforeAfter: {
    beforeLabel: { fr: "Avant", en: "Before" },
    afterLabel: { fr: "Après", en: "After" },
    beforeContent: {
      fr: "2h/jour à trier et répondre\nmanuellement",
      en: "2h/day sorting\nmanually",
    },
    afterContent: {
      fr: "Réponses pré-remplies\nvalidées en 30 s",
      en: "Pre-filled replies\nvalidated in 30 s",
    },
  },
};

const mockMahafaka = {
  _id: "p3",
  _type: "project",
  slug: { current: "mahafaka" },
  title: { fr: "Mahafaka", en: "Mahafaka" },
  description: { fr: "App mobile.", en: "Mobile app." },
  role: "UI/UX Designer",
  localizedRole: { fr: "UI/UX Designer", en: "UI/UX Designer" },
  period: "2025",
  tags: ["#mobile", "#figma"],
  projectTypes: ["mobile"],
  metrics: [],
  beforeAfter: null,
};

const mockOrderAssistant = {
  ...mockEmailAssistant,
  _id: "p2",
  slug: { current: "automatisation-commandes" },
  title: { fr: "Commandes", en: "Orders" },
};

const mockReportsAssistant = {
  ...mockEmailAssistant,
  _id: "p4",
  slug: { current: "compte-rendus" },
};

jest.mock("@/lib/sanity/queries/projects", () => ({
  getProjects: jest.fn(async () => [
    mockEmailAssistant,
    mockOrderAssistant,
    mockReportsAssistant,
    mockMahafaka,
  ]),
  getProjectBySlug: jest.fn(async () => mockEmailAssistant),
}));

jest.mock("@/lib/sanity/queries/timeline", () => ({
  getTimelineEntries: jest.fn(async () => [
    {
      _id: "t1",
      _type: "timeline",
      dateStart: "2026-07-01",
      title: { fr: "Développeur Mobile", en: "Mobile Developer" },
      organization: { fr: "Codilee", en: "Codilee" },
      description: { fr: "Fonctionnalités mobiles.", en: "Mobile features." },
      section: "professional",
      order: 1,
      tags: [],
    },
  ]),
}));

jest.mock("@/lib/sanity/queries/skills", () => ({
  getSkills: jest.fn(async () => [
    {
      _id: "s1",
      _type: "skill",
      name: "LLM",
      category: "ia",
      proficiency: "expert",
    },
    {
      _id: "s2",
      _type: "skill",
      name: "Figma",
      category: "design",
      proficiency: "advanced",
    },
    {
      _id: "s3",
      _type: "skill",
      name: "Flutter",
      category: "mobile",
      proficiency: "expert",
    },
    {
      _id: "s4",
      _type: "skill",
      name: "Docker",
      category: "infra",
      proficiency: "advanced",
    },
    {
      _id: "s5",
      _type: "skill",
      name: "SQL",
      category: "data",
      proficiency: "expert",
    },
  ]),
}));

jest.mock("@/lib/sanity/queries/certifications", () => ({
  getFeaturedCertifications: jest.fn(async () => [
    {
      _id: "c1",
      _type: "certification",
      name: { fr: "AWS AI Practitioner", en: "AWS AI Practitioner" },
      issuer: { fr: "Udacity", en: "Udacity" },
      date: "2026-02",
      category: "ia",
      order: 1,
    },
  ]),
}));

import Link from "next/link";
import { HomeHero } from "../HomeHero";
import { BentoBrief } from "../BentoBrief";
import { AiSystems } from "../AiSystems";
import { FeaturedStory } from "../FeaturedStory";
import { Bridge } from "../Bridge";
import { AppsCarousel } from "../AppsCarousel";
import { RecentPath } from "../RecentPath";
import { CertsRow } from "../CertsRow";
import { ContactBand } from "../ContactBand";

describe("HomeHero", () => {
  it("rend le pill de statut, le h1 avec accent et les 2 CTA", () => {
    render(<HomeHero locale="fr" />);
    expect(
      screen.getByText(/Disponible — remote\/freelance/),
    ).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("simples, utiles et intelligents");
    expect(
      screen.getByAltText("Portrait de Sarobidy Andrianarison"),
    ).toHaveAttribute("src", "/pdp.jpg");
    expect(
      screen.getByRole("link", { name: "Voir mes projets" }),
    ).toHaveAttribute("href", "/fr/projects");
  });

  it("rend la hero EN", () => {
    render(<HomeHero locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "simple, useful, and intelligent products",
    );
    expect(
      screen.getByRole("link", { name: "View my projects" }),
    ).toHaveAttribute("href", "/en/projects");
  });
});

describe("BentoBrief", () => {
  it("rend les 4 tuiles avec les données réelles", async () => {
    render(await BentoBrief({ locale: "fr" }));
    expect(screen.getByText("Statut")).toBeInTheDocument();
    expect(screen.getByText("Assistant emails")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === "2h → 25 min"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Codilee/)).toBeInTheDocument();
    expect(screen.getByText("Systèmes IA")).toBeInTheDocument();
    expect(screen.getByText("LLM")).toBeInTheDocument();
  });
});

describe("AiSystems", () => {
  it("rend le pipeline statique, 3 fiches et les cellules io EN", async () => {
    render(await AiSystems({ locale: "en" }));
    expect(screen.getByText("Incoming email")).toBeInTheDocument();
    expect(screen.getByText("Classification")).toBeInTheDocument();
    expect(screen.getAllByText("Input").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("Output").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("2h → 25 min").length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /View the case study/ }).length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("rend le libellé FR côté fr", async () => {
    render(await AiSystems({ locale: "fr" }));
    expect(screen.getAllByText("Entrée").length).toBeGreaterThanOrEqual(3);
  });
});

describe("FeaturedStory", () => {
  it("rend le récit vedette avec pull-quote et avant/après", async () => {
    render(await FeaturedStory({ locale: "fr" }));
    expect(
      screen.getByText("Assistant de traitement d'emails"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Étude vedette/)).toBeInTheDocument();
    expect(screen.getByText("Avant")).toBeInTheDocument();
    expect(screen.getByText(/Réponses pré-remplies/)).toBeInTheDocument();
  });
});

describe("Bridge", () => {
  it("rend le pont typographique FR", () => {
    render(<Bridge locale="fr" />);
    expect(screen.getByText("des systèmes aux écrans")).toBeInTheDocument();
    expect(screen.getByText(/Des produits/)).toBeInTheDocument();
  });

  it("rend le pont EN", () => {
    render(<Bridge locale="en" />);
    expect(screen.getByText(/Products that are/)).toBeInTheDocument();
  });
});

describe("AppsCarousel", () => {
  it("rend la piste des apps mobile avec caption et boutons inactifs", async () => {
    render(await AppsCarousel({ locale: "fr" }));
    expect(screen.getAllByText("Mahafaka").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByRole("button", { name: "Application précédente" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("link", { name: /Voir le projet/ }),
    ).toHaveAttribute("href", "/fr/projects/mahafaka");
  });
});

describe("RecentPath", () => {
  it("rend les cartes de parcours", async () => {
    render(await RecentPath({ locale: "fr" }));
    expect(screen.getByText("Développeur Mobile")).toBeInTheDocument();
    expect(screen.getByText(/Codilee/)).toBeInTheDocument();
  });
});

describe("CertsRow", () => {
  it("rend la liste des certifications vedettes", async () => {
    render(await CertsRow({ locale: "fr" }));
    expect(screen.getByText("AWS AI Practitioner")).toBeInTheDocument();
    expect(screen.getByText(/Udacity · 2026-02/)).toBeInTheDocument();
  });
});

describe("ContactBand", () => {
  it("rend la bande contact avec LinkedIn, GitHub et email", () => {
    render(<ContactBand locale="fr" />);
    expect(screen.getByText("Travaillons ensemble")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/n-sarobidy-andrianarison-075554203",
    );
    expect(
      screen.getByRole("link", { name: /bidyhandrianarison@gmail.com/ }),
    ).toHaveAttribute("href", "mailto:bidyhandrianarison@gmail.com");
  });
});

describe("fallbacks Sanity", () => {
  const queries = jest.requireMock("@/lib/sanity/queries/projects") as {
    getProjects: jest.Mock;
    getProjectBySlug: jest.Mock;
  };
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockRestore();
  });

  it("rend le fallback du bento quand les requêtes Sanity échouent", async () => {
    queries.getProjects.mockRejectedValueOnce(new Error("CMS hors ligne"));
    const { BentoBrief } = await import("../BentoBrief");
    render(await BentoBrief({ locale: "fr" }));
    expect(
      screen.getByText("Cette section est momentanément indisponible."),
    ).toBeInTheDocument();
  });

  it("rend le fallback des systems quand getProjects échoue", async () => {
    queries.getProjects.mockRejectedValueOnce(new Error("CMS hors ligne"));
    render(await AiSystems({ locale: "fr" }));
    expect(
      screen.getByText("Cette section est momentanément indisponible."),
    ).toBeInTheDocument();
  });

  it("rend le fallback du récit vedette quand le projet est introuvable", async () => {
    queries.getProjectBySlug.mockRejectedValueOnce(
      new Error("projet introuvable"),
    );
    render(await FeaturedStory({ locale: "fr" }));
    expect(
      screen.getByText("Cette section est momentanément indisponible."),
    ).toBeInTheDocument();
  });
});
