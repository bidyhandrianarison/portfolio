import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CertificationsTab } from "../CertificationsTab";
import type { Certification } from "@/sanity/types";

jest.mock("next-sanity", () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
    withConfig: jest.fn(),
  })),
}));

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    width: jest.fn().mockReturnThis(),
    height: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://example.com/image.jpg"),
  })),
}));

function makeCert(
  _id: string,
  name: string,
  category: Certification["category"],
  withSlug = true,
): Certification {
  return {
    _id,
    _type: "certification",
    name: { fr: name, en: name },
    slug: withSlug ? { current: name.toLowerCase() } : (undefined as never),
    issuer: { fr: "Issuer", en: "Issuer" },
    date: "2024",
    category,
    order: Number(_id),
  };
}

const certIa = makeCert("1", "Cert IA", "ia");
const certData = makeCert("2", "Cert Data", "data");
const withoutSlug = makeCert("3", "Ghost", "ia", false);

describe("CertificationsTab", () => {
  it("counts only certifications that render (have a slug)", () => {
    render(
      <CertificationsTab certifications={[certIa, withoutSlug]} locale="fr" />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("Ghost")).not.toBeInTheDocument();
  });

  it("uses singular label for one certification", () => {
    render(<CertificationsTab certifications={[certIa]} locale="fr" />);
    expect(screen.getByText("certification")).toBeInTheDocument();
    expect(screen.queryByText("certifications")).not.toBeInTheDocument();
  });

  it("renders category filter pills", () => {
    render(
      <CertificationsTab certifications={[certIa, certData]} locale="fr" />,
    );
    expect(screen.getByRole("button", { name: "Toutes" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "IA & Auto" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Data" })).toBeInTheDocument();
  });

  it("filters by category on click", () => {
    render(
      <CertificationsTab certifications={[certIa, certData]} locale="fr" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Data" }));
    expect(screen.getByText("Cert Data")).toBeInTheDocument();
    expect(screen.queryByText("Cert IA")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Data" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows empty state when no certifications", () => {
    render(<CertificationsTab certifications={[]} locale="fr" />);
    expect(screen.getByText(/aucune certification/i)).toBeInTheDocument();
  });
});
