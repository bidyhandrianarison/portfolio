import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BeforeAfterToggle } from "../BeforeAfterToggle";

const data = {
  beforeLabel: "Avant",
  afterLabel: "Après",
  beforeContent: "- Item 1\n- Item 2\n- Item 3",
  afterContent: "- After 1\n- After 2",
};

describe("BeforeAfterToggle", () => {
  it("renders both labels", () => {
    render(<BeforeAfterToggle data={data} />);
    expect(screen.getByText("Avant")).toBeInTheDocument();
    expect(screen.getByText("Après")).toBeInTheDocument();
  });

  it("renders both columns content simultaneously", () => {
    render(<BeforeAfterToggle data={data} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.getByText("After 1")).toBeInTheDocument();
    expect(screen.getByText("After 2")).toBeInTheDocument();
  });

  it("exposes an accessible group label", () => {
    render(<BeforeAfterToggle data={data} />);
    expect(
      screen.getByRole("group", { name: "Avant vs Après" }),
    ).toBeInTheDocument();
  });

  it("uses custom aria-label when provided", () => {
    render(<BeforeAfterToggle data={data} ariaLabel="Custom label" />);
    expect(
      screen.getByRole("group", { name: "Custom label" }),
    ).toBeInTheDocument();
  });

  it("normalizes \\r\\n line endings", () => {
    const crlfData = {
      ...data,
      beforeContent: "- Item 1\r\n- Item 2\r\n- Item 3",
    };
    render(<BeforeAfterToggle data={crlfData} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("has no slider role", () => {
    render(<BeforeAfterToggle data={data} />);
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
  });
});
