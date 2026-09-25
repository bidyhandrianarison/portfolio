import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MermaidDiagram } from "../MermaidDiagram";

jest.mock("mermaid", () => ({
  __esModule: true,
  default: {
    initialize: jest.fn(),
    render: jest.fn().mockResolvedValue({ svg: "<svg>test</svg>" }),
  },
}));

describe("MermaidDiagram", () => {
  it("renders the diagram SVG", async () => {
    render(<MermaidDiagram chart="graph TD; A-->B" />);
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
  });

  it("calls mermaid.render", async () => {
    const mermaid = (await import("mermaid")).default;
    render(<MermaidDiagram chart="graph TD; A-->B" />);
    await waitFor(() => {
      expect(mermaid.render).toHaveBeenCalled();
    });
  });

  it("shows error text on render failure", async () => {
    const mermaid = (await import("mermaid")).default;
    (mermaid.render as jest.Mock).mockRejectedValueOnce(
      new Error("parse error"),
    );
    render(<MermaidDiagram chart="invalid" />);
    await waitFor(() => {
      expect(
        screen.getByText(/Impossible d'afficher le diagramme/),
      ).toBeInTheDocument();
    });
  });

  it("renders bare without outer chrome", async () => {
    const { container } = render(
      <MermaidDiagram chart="graph TD; A-->B" bare />,
    );
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
    expect(container.firstChild).not.toHaveClass("rounded-xl");
  });
});
