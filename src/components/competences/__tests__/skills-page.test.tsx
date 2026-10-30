import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import CompetencesPage from "@/app/[locale]/skills/page";
import { getSkills } from "@/lib/sanity/queries/skills";
import { getCertifications } from "@/lib/sanity/queries/certifications";
import type { Certification } from "@/sanity/types";

jest.mock("@/lib/sanity/queries/skills", () => ({ getSkills: jest.fn() }));
jest.mock("@/lib/sanity/queries/certifications", () => ({
  getCertifications: jest.fn(),
}));

const skills = jest.mocked(getSkills);
const certifications = jest.mocked(getCertifications);
const certificate: Certification = {
  _id: "cert",
  _type: "certification",
  name: { fr: "Certificat", en: "Certificate" },
  issuer: { fr: "École", en: "School" },
  slug: { current: "cert" },
  category: "data",
  date: "2024",
  order: 1,
};

beforeEach(() => {
  jest.resetAllMocks();
  window.history.replaceState({}, "", "/fr/skills");
  skills.mockResolvedValue([
    {
      _id: "s",
      _type: "skill",
      name: "Python",
      category: "data",
      proficiency: "expert",
    },
  ]);
  certifications.mockResolvedValue([
    certificate,
    {
      ...certificate,
      _id: "ia",
      name: { fr: "IA", en: "AI" },
      slug: { current: "ia" },
      category: "ia",
    },
    { ...certificate, _id: "hidden", slug: undefined as never },
  ]);
});

test("affiche les domaines et filtre les certifications affichables", async () => {
  render(await CompetencesPage({ params: Promise.resolve({ locale: "fr" }) }));
  const domains = screen.getByTestId("doms");
  expect(screen.getByText("5 domaines · 2 certifications")).toBeInTheDocument();
  expect(within(domains).getAllByRole("article")).toHaveLength(5);
  expect(within(domains).getByText("Python")).toBeInTheDocument();
  expect(within(domains).getByText("Python").closest("a")).toBeNull();
  expect(within(domains).getByText("01")).toBeInTheDocument();
  expect(within(domains).getByText("05")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Certificat/ })).toHaveAttribute(
    "href",
    "/fr/certifications/cert",
  );
  expect(screen.getAllByTestId("certification-placeholder")).toHaveLength(2);
  expect(screen.getByText("2 certifications")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Toutes/ })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /IA/ })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Data/ }));
  expect(screen.getByRole("button", { name: /Data/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByText("Certificat")).toBeInTheDocument();
  expect(screen.queryByText("IA")).not.toBeInTheDocument();
  expect(screen.getByText("1 certification")).toBeInTheDocument();
});

test("affiche l'aperçu du certificat lorsqu'il existe", async () => {
  certifications.mockResolvedValue([
    {
      ...certificate,
      image: {
        asset: { _ref: "image-1", url: "https://cdn.sanity.io/cert.jpg" },
        alt: "Diplôme",
      },
    },
  ]);
  render(await CompetencesPage({ params: Promise.resolve({ locale: "fr" }) }));
  expect(screen.getByRole("img", { name: "Diplôme" })).toBeInTheDocument();
  expect(screen.getByText("École · 2024")).toBeInTheDocument();
});

test("conserve le lien hérité et le contenu français en anglais", async () => {
  window.history.replaceState({}, "", "/en/skills?tab=certifications");
  const scroll = jest.fn();
  Element.prototype.scrollIntoView = scroll;
  certifications.mockResolvedValue([
    { ...certificate, name: { fr: "Certificat", en: "" } },
  ]);
  render(await CompetencesPage({ params: Promise.resolve({ locale: "en" }) }));
  expect(scroll).toHaveBeenCalled();
  expect(screen.getByText("AI Systems")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Certificat/ })).toHaveAttribute(
    "href",
    "/en/certifications/cert",
  );
});

test("affiche l'état vide et le fallback Sanity", async () => {
  certifications.mockResolvedValue([]);
  const page = render(
    await CompetencesPage({ params: Promise.resolve({ locale: "fr" }) }),
  );
  expect(screen.getByText(/aucune certification/i)).toBeInTheDocument();
  page.unmount();
  skills.mockRejectedValue(new Error("indisponible"));
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  render(await CompetencesPage({ params: Promise.resolve({ locale: "fr" }) }));
  expect(screen.getByRole("status")).toHaveAttribute("data-feature", "skills");
  error.mockRestore();
});

test("affiche un état vide si aucune certification n'a de slug", async () => {
  certifications.mockResolvedValue([
    { ...certificate, slug: undefined as never },
  ]);
  render(await CompetencesPage({ params: Promise.resolve({ locale: "fr" }) }));
  expect(screen.getByText(/aucune certification/i)).toBeInTheDocument();
  expect(screen.getByText("0 certifications")).toBeInTheDocument();
});
