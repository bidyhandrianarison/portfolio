import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";
import { Card } from "../card";

describe("Design-system (CAP-1)", () => {
  it("Button primary utilise le token accent sémantique", () => {
    render(<Button>Voir mes projets</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-accent");
  });

  it("Button secondary utilise les surfaces du panel (claire et sombre via vars)", () => {
    render(<Button variant="secondary">Me contacter</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-panel", "text-content");
  });

  it("Button primary réagit à l'appui press de la maquette", () => {
    render(<Button>test press</Button>);
    expect(screen.getByRole("button")).toHaveClass("active:scale-[.97]");
  });

  it("Card rend la surface panel avec la bordure line, sans overrides dark:", () => {
    render(<Card>titre de carte</Card>);
    const card = screen.getByText("titre de carte").closest("div");
    expect(card).toHaveClass("bg-panel", "border-line", "rounded-[1.25rem]");
  });
});
