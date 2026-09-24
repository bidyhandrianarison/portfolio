import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectTypeFilter } from "../ProjectTypeFilter";
import { trackEvent } from "@/lib/utils/analytics";
import type { Project } from "@/sanity/types";

jest.mock("@/lib/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

jest.mock("../CompactProjectCard", () => ({
  CompactProjectCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("../ProjectCard", () => ({
  ProjectCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

function makeProject(
  _id: string,
  name: string,
  projectTypes?: string[],
): Project {
  return {
    _id,
    _type: "project",
    title: { fr: name, en: name },
    description: { fr: name, en: name },
    slug: { current: name.toLowerCase().replace(/\s+/g, "-") },
    role: "Dev",
    period: "2024",
    tags: [],
    order: 0,
    projectTypes,
  };
}

const projects: Project[] = [
  makeProject("1", "Mizzaria", ["mobile", "design"]),
  makeProject("2", "mesDocs", ["design"]),
  makeProject("3", "RamaroFish", ["mobile"]),
  makeProject("4", "Sans type"),
];

function renderFilter(
  locale = "fr",
  variant: "compact" | "full" = "compact",
  data: Project[] = projects,
) {
  return render(
    <ProjectTypeFilter projects={data} locale={locale} variant={variant} />,
  );
}

describe("ProjectTypeFilter", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    jest.clearAllMocks();
  });

  it("computes counters from data and hides zero-count facets", () => {
    renderFilter();
    expect(
      screen.getByRole("button", { name: "Tout (4)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mobile (2)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Design (2)" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /IA/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Data/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Web/ }),
    ).not.toBeInTheDocument();
  });

  it("filters on click, syncs URL, and emits project_filter", () => {
    renderFilter();
    fireEvent.click(screen.getByRole("button", { name: "Mobile (2)" }));

    expect(screen.getByText("Mizzaria")).toBeInTheDocument();
    expect(screen.getByText("RamaroFish")).toBeInTheDocument();
    expect(screen.queryByText("mesDocs")).not.toBeInTheDocument();
    expect(screen.queryByText("Sans type")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mobile (2)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(window.location.search).toBe("?type=mobile");
    expect(trackEvent).toHaveBeenCalledWith("project_filter", {
      type: "mobile",
    });
    expect(
      screen.getByRole("link", { name: /Voir tous les projets/ }),
    ).toHaveAttribute("href", "/fr/projects?type=mobile");
  });

  it("shows a multi-type project under each of its facets", () => {
    renderFilter();
    fireEvent.click(screen.getByRole("button", { name: "Design (2)" }));
    expect(screen.getByText("Mizzaria")).toBeInTheDocument();
    expect(screen.getByText("mesDocs")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mobile (2)" }));
    expect(screen.getByText("Mizzaria")).toBeInTheDocument();
    expect(screen.queryByText("mesDocs")).not.toBeInTheDocument();
  });

  it("shows a project without types only under Tout", () => {
    renderFilter();
    expect(screen.getByText("Sans type")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mobile (2)" }));
    expect(screen.queryByText("Sans type")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Tout (4)" }));
    expect(screen.getByText("Sans type")).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });

  it("shows empty state with reset for an unknown type in the URL", () => {
    window.history.replaceState({}, "", "/?type=xyz");
    renderFilter();

    expect(screen.getByText("Aucun projet de ce type")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tout réinitialiser" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Mizzaria")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Voir tous les projets/ }),
    ).toHaveAttribute("href", "/fr/projects?type=xyz");

    fireEvent.click(screen.getByRole("button", { name: "Tout réinitialiser" }));
    expect(screen.getByText("Mizzaria")).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });

  it("compact variant shows at most 4 projects plus the view-all link", () => {
    const five = [...projects, makeProject("5", "Cinquieme", ["web"])];
    renderFilter("fr", "compact", five);

    expect(screen.getByText("Mizzaria")).toBeInTheDocument();
    expect(screen.queryByText("Cinquieme")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tout (5)" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Web (1)" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Voir tous les projets/ }),
    ).toHaveAttribute("href", "/fr/projects");
  });

  it("full variant renders every filtered project", () => {
    renderFilter("fr", "full");
    expect(screen.getByText("Mizzaria")).toBeInTheDocument();
    expect(screen.getByText("mesDocs")).toBeInTheDocument();
    expect(screen.getByText("RamaroFish")).toBeInTheDocument();
    expect(screen.getByText("Sans type")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Voir tous les projets/ }),
    ).not.toBeInTheDocument();
  });

  it("renders English labels and empty state", () => {
    window.history.replaceState({}, "", "/?type=xyz");
    renderFilter("en");

    expect(screen.getByRole("button", { name: "All (4)" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mobile (2)" }),
    ).toBeInTheDocument();
    expect(screen.getByText("No projects of this type")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset all" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Filter by project type" }),
    ).toBeInTheDocument();
  });
});
