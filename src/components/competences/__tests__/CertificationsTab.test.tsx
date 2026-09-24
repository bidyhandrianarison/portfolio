import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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

const withSlug: Certification = {
  _id: "1",
  _type: "certification",
  name: { fr: "Cert A", en: "Cert A" },
  slug: { current: "cert-a" },
  issuer: { fr: "Issuer", en: "Issuer" },
  date: "2024",
  category: "ia",
  order: 0,
};

const withoutSlug: Certification = {
  _id: "2",
  _type: "certification",
  name: { fr: "Ghost", en: "Ghost" },
  slug: undefined as unknown as { current: string },
  issuer: { fr: "X", en: "X" },
  date: "2024",
  category: "ia",
  order: 1,
};

describe("CertificationsTab", () => {
  it("counts only certifications that render (have a slug)", () => {
    render(
      <CertificationsTab
        certifications={[withSlug, withoutSlug]}
        locale="fr"
      />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("Ghost")).not.toBeInTheDocument();
  });

  it("uses singular label for one certification", () => {
    render(<CertificationsTab certifications={[withSlug]} locale="fr" />);
    expect(screen.getByText("certification")).toBeInTheDocument();
    expect(screen.queryByText("certifications")).not.toBeInTheDocument();
  });

  it("does not render category filter pills", () => {
    render(<CertificationsTab certifications={[withSlug]} locale="fr" />);
    expect(
      screen.queryByRole("button", { name: "Toutes" }),
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no certifications", () => {
    render(<CertificationsTab certifications={[]} locale="fr" />);
    expect(screen.getByText(/aucune certification/i)).toBeInTheDocument();
  });
});
