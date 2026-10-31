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
  PortableTextContent: ({
    value,
  }: {
    value: { children: { text: string }[]; listItem?: string }[];
  }) => (
    <div data-testid="portable-text">
      {value.map((block, index) => (
        <span key={index} data-list-item={block.listItem}>
          {block.children.map((child) => child.text).join("")}
        </span>
      ))}
    </div>
  ),
}));

import { ProjectFilterBar } from "../ProjectFilterBar";
import { CaseStudyTemplate } from "../CaseStudyTemplate";
import { ProjectDetailTemplate } from "../ProjectDetailTemplate";
import { metric } from "@/lib/format/metric";
import ProjectsPage from "@/app/[locale]/projects/page";

describe("grille /projects", () => {
  it("affiche les autres projets même si une description Sanity est absente", () => {
    render(
      <ProjectFilterBar
        projects={[
          {
            ...mockProjetA,
            description: null as unknown as Project["description"],
          },
          mockProjetB,
        ]}
        locale="fr"
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Mahafaka" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "RamaroFish" }),
    ).toBeInTheDocument();
  });
  it("affiche l'aperçu lorsqu'un projet possède une image", () => {
    render(
      <ProjectFilterBar
        projects={[
          {
            ...mockProjetA,
            hero: {
              image: {
                asset: {
                  _ref: "image-1",
                  url: "https://cdn.sanity.io/project.jpg",
                },
                alt: "Maquette Mahafaka",
              },
            },
          },
          mockProjetB,
        ]}
        locale="fr"
      />,
    );
    expect(
      screen.getByRole("img", { name: "Maquette Mahafaka" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByTestId("project-placeholder")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
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
  it("affiche le pipeline du tableau de bord Netflix", async () => {
    const project = {
      ...mockProjetA,
      slug: { current: "dashboard-netflix-data-analytics" },
    };
    render(await ProjectDetailTemplate({ project, locale: "fr" }));
    expect(screen.getByText("base MySQL")).toBeInTheDocument();
    expect(screen.getByText("tableau de bord React")).toBeInTheDocument();
  });
  it("affiche le pipeline d’analyse des produits dans les deux langues", async () => {
    const project = {
      ...mockProjetA,
      slug: { current: "analyse-produits-alimentaires" },
    };
    const { unmount } = render(
      await ProjectDetailTemplate({ project, locale: "fr" }),
    );
    expect(screen.getByText("valeurs manquantes")).toBeInTheDocument();
    unmount();
    render(await ProjectDetailTemplate({ project, locale: "en" }));
    expect(screen.getByText("missing values")).toBeInTheDocument();
  });
  it("affiche le pipeline credit scoring en français et en anglais", async () => {
    const project = { ...mockProjetA, slug: { current: "ml-credit-scoring" } };
    const { unmount } = render(
      await ProjectDetailTemplate({ project, locale: "fr" }),
    );
    expect(screen.getByText("risque de défaut")).toBeInTheDocument();
    unmount();
    render(await ProjectDetailTemplate({ project, locale: "en" }));
    expect(screen.getByText("default risk")).toBeInTheDocument();
  });
  it("affiche le pipeline de détection des menaces dans les deux langues", async () => {
    const project = {
      ...mockProjetA,
      slug: { current: "detection-menaces-deep-learning" },
    };
    const { unmount } = render(
      await ProjectDetailTemplate({ project, locale: "fr" }),
    );
    expect(screen.getByText("Données BETH")).toBeInTheDocument();
    expect(screen.getByText("classes pondérées")).toBeInTheDocument();
    unmount();
    render(await ProjectDetailTemplate({ project, locale: "en" }));
    expect(screen.getAllByText("BETH data").length).toBeGreaterThan(0);
    expect(screen.getByText("weighted classes")).toBeInTheDocument();
  });
  it("numérote les tâches issues de paragraphes et de listes à puces", async () => {
    const blocks = [undefined, "bullet" as const, "number" as const].map(
      (listItem, index) => ({
        _type: "block" as const,
        _key: String(index),
        style: "normal" as const,
        listItem,
        markDefs: [],
        children: [
          {
            _type: "span" as const,
            _key: "text",
            text: `Tâche ${index}`,
            marks: [],
          },
        ],
      }),
    );
    render(
      await ProjectDetailTemplate({
        project: { ...mockProjetA, body: { fr: blocks } },
        locale: "fr",
      }),
    );
    expect(
      screen
        .getByTestId("portable-text")
        .querySelectorAll('[data-list-item="number"]'),
    ).toHaveLength(3);
  });
  it("affiche l’image principale sans téléphone pour un projet non mobile", async () => {
    const project: Project = {
      ...mockProjetB,
      hero: {
        image: {
          asset: { _ref: "image-1", url: "https://cdn.sanity.io/desktop.png" },
          alt: "Maquette desktop",
        },
      },
    };
    render(await ProjectDetailTemplate({ project, locale: "fr" }));
    expect(
      screen.getByRole("img", { name: "Maquette desktop" }),
    ).toHaveAttribute("src", "https://cdn.sanity.io/desktop.png");
    expect(screen.queryByTestId("phone-mock")).not.toBeInTheDocument();
  });

  it("ne montre pas de téléphone pour un projet non mobile sans image", async () => {
    render(await ProjectDetailTemplate({ project: mockProjetB, locale: "fr" }));
    expect(screen.queryByTestId("phone-mock")).not.toBeInTheDocument();
  });
  it.each([
    ["fr", "Mes tâches sur ce projet"],
    ["en", "My tasks on this project"],
  ])("évite le titre répété dans le contenu %s", async (locale, duplicate) => {
    const blocks = [
      {
        _type: "block" as const,
        _key: "heading",
        style: "h3" as const,
        markDefs: [],
        children: [
          { _type: "span" as const, _key: "text", text: duplicate, marks: [] },
        ],
      },
      {
        _type: "block" as const,
        _key: "task",
        style: "normal" as const,
        markDefs: [],
        children: [
          {
            _type: "span" as const,
            _key: "task-text",
            text: "Design",
            marks: [],
          },
        ],
      },
    ];
    render(
      await ProjectDetailTemplate({
        project: { ...mockProjetA, body: { fr: blocks, en: blocks } },
        locale,
      }),
    );
    expect(screen.getByTestId("portable-text")).toHaveTextContent("Design");
    expect(screen.getByTestId("portable-text")).not.toHaveTextContent(
      duplicate,
    );
  });
  it("affiche la capture mobile fournie par Sanity", async () => {
    render(
      await ProjectDetailTemplate({
        project: {
          ...mockProjetA,
          mobileScreenshot: { url: "https://cdn.sanity.io/image.png" },
        },
        locale: "fr",
      }),
    );
    expect(
      document.querySelector('img[src="https://cdn.sanity.io/image.png"]'),
    ).toBeInTheDocument();
  });
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
