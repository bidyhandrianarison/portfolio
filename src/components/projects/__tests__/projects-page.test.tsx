import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Project } from "@/sanity/types";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("@/lib/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

const mockProjetA: Project = {
  _id: "a",
  _type: "project",
  slug: { current: "mahafaka" },
  title: { fr: "Mahafaka", en: "Mahafaka" },
  description: {
    fr: "Application publicitaire et de partage d'informations malgache.",
    en: "Malagasy advertising app.",
  },
  role: "UI/UX Designer",
  localizedRole: { fr: "UI/UX Designer", en: "UI/UX Designer" },
  period: "2024 – 2025",
  tags: ["#figma"],
  projectTypes: ["mobile"],
  order: 1,
  metrics: [],
  featured: false,
};

const mockProjetB: Project = {
  ...mockProjetA,
  _id: "b",
  slug: { current: "ramarofish" },
  title: { fr: "RamaroFish", en: "RamaroFish" },
  order: 2,
  projectTypes: ["design"],
  metrics: undefined,
};

const mockEtudeC: Project = {
  _id: "c",
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
  tags: ["#ia", "#rag"],
  projectTypes: ["ia"],
  order: 3,
  featured: true,
  metrics: [
    {
      label: { fr: "Temps de traitement", en: "Processing time" },
      value: { fr: "2h → 25 min", en: "2h → 25 min" },
    },
    {
      label: { fr: "Emails traités", en: "Emails processed" },
      value: { fr: "50+ par jour", en: "50+ per day" },
    },
  ],
  beforeAfter: {
    beforeLabel: { fr: "Avant", en: "Before" },
    afterLabel: { fr: "Après", en: "After" },
    beforeContent: {
      fr: "2h/jour à trier et répondre manuellement\nOublis fréquents de relances",
      en: "2h/day sorting manually\nFrequent lapses",
    },
    afterContent: {
      fr: "Réponses pré-remplies validées en 30 s\nZéro oubli de relance",
      en: "Pre-filled replies validated in 30 s\nZero relapse",
    },
  },
};

const FIXTURE = [mockProjetA, mockProjetB, mockEtudeC];

jest.mock("@/lib/sanity/queries/projects", () => ({
  getProjects: jest.fn(async () => FIXTURE),
  getProjectBySlug: jest.fn(async () => mockEtudeC),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} />
  ),
}));

// next-sanity (ESM) ne se charge pas sous jest : le contenu portable est stubbé
jest.mock("../PortableTextContent", () => ({
  PortableTextContent: () => <div data-testid="portable-text" />,
}));

import { ProjectFilterBar } from "../ProjectFilterBar";
import { CaseStudyTemplate } from "../CaseStudyTemplate";
import { ProjectDetailTemplate } from "../ProjectDetailTemplate";
import { metric } from "@/lib/format/metric";
import ProjectsPage from "@/app/[locale]/projects/page";

describe("grille /projects", () => {
  it("rend les 3 cartes, la variante étude porte le res metric(), les autres non", async () => {
    render(await ProjectsPage({ params: Promise.resolve({ locale: "fr" }) }));

    const grid = screen.getByTestId("projects-grid");
    expect(grid.querySelectorAll("a.proj")).toHaveLength(3);

    const resValue = metric("2h → 25 min");
    expect(
      screen.getByText((_, element) => element?.textContent === resValue),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Voir l'étude →")).toHaveLength(1);
    expect(screen.getAllByText("Voir le projet →")).toHaveLength(2);
  });

  it("grille EN : libellés et fallback .fr", async () => {
    render(await ProjectsPage({ params: Promise.resolve({ locale: "en" }) }));
    expect(screen.getAllByText("View the case study →")).toHaveLength(1);
    expect(screen.getAllByText("View the project →")).toHaveLength(2);
  });
});

describe("ProjectFilterBar", () => {
  it("compte des boutons dérivé des props, aria-pressed sur Tout", () => {
    render(<ProjectFilterBar projects={FIXTURE} locale="fr" />);
    expect(screen.getByRole("button", { name: "Tout (3)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Mobile (1)" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Data/ }),
    ).not.toBeInTheDocument();
  });

  it("clic filtre réduit la grille et le compteur aria-live devient singulier", () => {
    render(<ProjectFilterBar projects={FIXTURE} locale="fr" />);
    fireEvent.click(screen.getByRole("button", { name: "Mobile (1)" }));

    expect(screen.getByRole("button", { name: "Mobile (1)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByTestId("projects-grid").querySelectorAll("a.proj"),
    ).toHaveLength(1);
    expect(screen.getByText("1 projet affiché")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Tout (3)" }));
    expect(
      screen.getByTestId("projects-grid").querySelectorAll("a.proj"),
    ).toHaveLength(3);
    expect(screen.getByText("3 projets affichés")).toBeInTheDocument();
  });

  it("filtre type multiple : projet sous chaque facet", () => {
    const projets = [
      { ...mockProjetA, projectTypes: ["mobile", "design"] },
      mockProjetB,
    ];
    render(<ProjectFilterBar projects={projets} locale="fr" />);
    fireEvent.click(screen.getByRole("button", { name: "Design (2)" }));
    expect(
      screen.getByTestId("projects-grid").querySelectorAll("a.proj"),
    ).toHaveLength(2);
  });

  it("pill active : fond inversé exclusif (lisible clair et sombre)", () => {
    render(<ProjectFilterBar projects={FIXTURE} locale="fr" />);
    const active = screen.getByRole("button", { name: "Tout (3)" });
    expect(active).toHaveClass("bg-content", "text-bg");
    expect(active).not.toHaveClass("bg-panel");
  });
});

describe("détail étude (featured)", () => {
  it("rend les KPI metric(), les titres Avant/Après et les deux colonnes", async () => {
    render(
      await CaseStudyTemplate({ project: mockEtudeC as never, locale: "fr" }),
    );

    expect(
      screen.getByText(
        (_, element) => element?.textContent === metric("2h → 25 min"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === metric("50+ par jour"),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Avant")).toBeInTheDocument();
    expect(screen.getByText("Après")).toBeInTheDocument();
    expect(
      screen.getByText(/2h\/jour à trier et répondre manuellement/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Réponses pré-remplies validées en 30 s/),
    ).toBeInTheDocument();
  });

  it("nav pn wrap modulo : sur a, Précédent pointe vers c", async () => {
    const { container } = render(
      await CaseStudyTemplate({ project: mockProjetA as never, locale: "fr" }),
    );
    const links = [...container.querySelectorAll("nav a")];
    const prev = links.find((link) => link.textContent?.includes("Précédent"));
    const next = links.find((link) => link.textContent?.includes("Suivant"));
    expect(prev).toHaveAttribute("href", "/fr/projects/assistant-emails");
    expect(next).toHaveAttribute("href", "/fr/projects/ramarofish");
  });

  it("pipeline de l'étude (assistant-emails) : figure présente", async () => {
    render(
      await CaseStudyTemplate({ project: mockEtudeC as never, locale: "fr" }),
    );
    expect(
      screen.getByText("pipeline · assistant de traitement d'emails"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("pipeline-log")).toBeInTheDocument();
  });

  it("projet sans pipeline rédigé : pas de section pipeline", async () => {
    render(
      await CaseStudyTemplate({ project: mockProjetA as never, locale: "fr" }),
    );
    expect(screen.queryByText(/pipeline ·/)).not.toBeInTheDocument();
  });
});

describe("détail projet (non featured)", () => {
  it("rend le PhoneMock avec fallback variante liste", async () => {
    render(
      await ProjectDetailTemplate({
        project: mockProjetA as never,
        locale: "fr",
      }),
    );
    expect(screen.getByTestId("phone-mock")).toBeInTheDocument();
    expect(screen.getByText("Mes tâches sur ce projet")).toBeInTheDocument();
  });
});

describe("[slug] 404", () => {
  it("appelle notFound() quand le slug est inconnu", async () => {
    const queries = jest.requireMock("@/lib/sanity/queries/projects") as {
      getProjectBySlug: jest.Mock;
    };
    queries.getProjectBySlug.mockResolvedValueOnce(null);

    const { notFound } = await import("next/navigation");
    const { default: ProjectPage } =
      await import("@/app/[locale]/projects/[slug]/page");

    await expect(
      ProjectPage({
        params: Promise.resolve({ slug: "inconnu", locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();

    queries.getProjectBySlug.mockResolvedValue(mockEtudeC);
  });
});
