import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MermaidDiagram } from "../MermaidDiagram";

jest.mock("mermaid", () => ({
  initialize: jest.fn(),
  render: jest.fn().mockResolvedValue({ svg: "<svg>test</svg>" }),
}));

describe("MermaidDiagram", () => {
  it("renders the diagram SVG", async () => {
    render(<MermaidDiagram chart="graph TD; A-->B" />);
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
  });

  it("calls mermaid.render", () => {
    const mermaid = require("mermaid");
    render(<MermaidDiagram chart="graph TD; A-->B" />);
    expect(mermaid.render).toHaveBeenCalled();
  });

  it("shows error text on render failure", async () => {
    const mermaid = require("mermaid");
    mermaid.render.mockRejectedValueOnce(new Error("parse error"));
    render(<MermaidDiagram chart="invalid" />);
    await waitFor(() => {
      expect(screen.getByText("Failed to render diagram")).toBeInTheDocument();
    });
  });
});
