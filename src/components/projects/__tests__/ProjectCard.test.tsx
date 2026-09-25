import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";

jest.mock("@/lib/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

jest.mock("../MermaidDiagram", () => ({
  MermaidDiagram: ({ chart }: { chart: string }) => (
    <div data-testid="diagram-excerpt">{chart}</div>
  ),
}));

const baseProps = {
  slug: "assistant-emails",
  title: "Assistant e-mails",
  role: "IA",
  period: "2025",
  description: "Tri automatique des e-mails",
  tags: ["#ia"],
  locale: "fr",
  href: "/fr/projects/assistant-emails",
};

describe("ProjectCard", () => {
  it("affiche l'extrait de diagramme en en-tête quand pas d'image (featured)", () => {
    render(
      <ProjectCard
        {...baseProps}
        variant="featured"
        diagram="graph TD; A-->B"
      />,
    );
    expect(screen.getByTestId("diagram-excerpt")).toBeInTheDocument();
    expect(screen.getByText("graph TD; A-->B")).toBeInTheDocument();
  });

  it("affiche l'image quand imageUrl est fourni (priorité au diagramme)", () => {
    render(
      <ProjectCard
        {...baseProps}
        variant="featured"
        imageUrl="https://example.com/img.png"
        diagram="graph TD; A-->B"
      />,
    );
    expect(screen.getByAltText("Assistant e-mails")).toBeInTheDocument();
    expect(screen.queryByTestId("diagram-excerpt")).not.toBeInTheDocument();
  });

  it("n'affiche ni image ni diagramme — carte texte seule", () => {
    render(<ProjectCard {...baseProps} variant="featured" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByTestId("diagram-excerpt")).not.toBeInTheDocument();
    expect(screen.getByText("Assistant e-mails")).toBeInTheDocument();
    expect(screen.getByText("Voir l'étude →")).toBeInTheDocument();
  });
});
