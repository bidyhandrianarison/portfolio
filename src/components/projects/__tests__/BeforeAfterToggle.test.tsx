import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("renders content items", () => {
    render(<BeforeAfterToggle data={data} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("After 1")).toBeInTheDocument();
  });

  it("has slider role with correct aria attributes", () => {
    render(<BeforeAfterToggle data={data} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "horizontal");
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });

  it("uses custom aria-label when provided", () => {
    render(<BeforeAfterToggle data={data} ariaLabel="Custom label" />);
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-label",
      "Custom label",
    );
  });

  it("defaults aria-label to before vs after", () => {
    render(<BeforeAfterToggle data={data} />);
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-label",
      "Avant vs Après",
    );
  });

  it("moves slider left on ArrowLeft", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterToggle data={data} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowLeft}");
    expect(slider).toHaveAttribute("aria-valuenow", "45");
  });

  it("moves slider right on ArrowRight", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterToggle data={data} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "55");
  });

  it("clamps position at 0", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterToggle data={data} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    for (let i = 0; i < 15; i++) await user.keyboard("{ArrowLeft}");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
  });

  it("clamps position at 100", async () => {
    const user = userEvent.setup();
    render(<BeforeAfterToggle data={data} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    for (let i = 0; i < 15; i++) await user.keyboard("{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "100");
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
});
