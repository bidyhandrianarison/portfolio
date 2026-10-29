import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

const { ScrolledHeader } = jest.requireActual(
  "@/components/layout/scrolled-header",
);

function mockScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
  });
}

describe("ScrolledHeader", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("pose `scrolled` dès scrollY > 4 et le retire au retour en haut", () => {
    mockScrollY(0);
    const { container } = render(
      <ScrolledHeader className="site-header">
        <span>nav</span>
      </ScrolledHeader>,
    );
    const header = container.querySelector("header")!;
    expect(header).not.toHaveClass("scrolled");

    mockScrollY(4);
    fireEvent.scroll(window);
    expect(header).not.toHaveClass("scrolled");

    mockScrollY(5);
    fireEvent.scroll(window);
    expect(header).toHaveClass("scrolled");

    mockScrollY(0);
    fireEvent.scroll(window);
    expect(header).not.toHaveClass("scrolled");
  });
});
