import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PrimaryNav } from "../PrimaryNav";

let currentPath = "/fr";
jest.mock("next/navigation", () => ({ usePathname: () => currentPath }));

describe("PrimaryNav", () => {
  it("identifie l’accueil comme page active", () => {
    currentPath = "/fr";
    render(<PrimaryNav locale="fr" variant="desktop" />);
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/fr",
    );
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("ne marque pas l’accueil comme actif sur un projet", () => {
    currentPath = "/fr/projects/exemple";
    render(<PrimaryNav locale="fr" variant="mobile" />);
    expect(screen.getByRole("link", { name: "Accueil" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Projets" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });
});
