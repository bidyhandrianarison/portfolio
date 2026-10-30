import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { Certification } from "@/sanity/types";
import { CertificationDetail } from "../CertificationDetail";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({ url: () => "https://cdn.sanity.io/certificate.png" }),
    }),
  }),
}));
jest.mock("../CertLightbox", () => ({
  CertLightbox: ({ alt }: { alt: string }) => <button>{alt}</button>,
}));

const certification: Certification = {
  _id: "cert",
  _type: "certification",
  name: { fr: "Certificat", en: "Certificate" },
  slug: { current: "cert" },
  issuer: { fr: "Organisme", en: "Issuer" },
  date: "2026",
  category: "ia",
  order: 1,
  image: {
    asset: { _ref: "image", url: "https://cdn.sanity.io/certificate.png" },
    alt: "Aperçu",
  },
  description: {
    why: { fr: "Apprendre", en: "Learn" },
    what: { fr: "Pratiquer", en: "Practice" },
  },
  url: "https://example.com/verify",
};

test("affiche le certificat, son contexte et le lien de vérification", () => {
  render(<CertificationDetail certification={certification} locale="fr" />);
  expect(screen.getByRole("button", { name: "Aperçu" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Pourquoi" })).toBeInTheDocument();
  expect(screen.getByText("Pratiquer")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Vérifier la certification/ }),
  ).toHaveAttribute("href", certification.url);
});

test("reste lisible sans image ni lien et traduit les contenus", () => {
  render(
    <CertificationDetail
      certification={{ ...certification, image: undefined, url: undefined }}
      locale="en"
    />,
  );
  expect(
    screen.getByRole("heading", { name: "Certificate" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Learn")).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: /Verify certification/ }),
  ).not.toBeInTheDocument();
});
