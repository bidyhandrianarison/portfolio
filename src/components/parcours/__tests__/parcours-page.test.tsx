import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ParcoursPage from "@/app/[locale]/parcours/page";
import { getTimelineEntries } from "@/lib/sanity/queries/timeline";
import { getSettings } from "@/lib/sanity/queries/settings";

jest.mock("@/lib/sanity/image", () => ({ urlFor: jest.fn() }));

jest.mock("@/lib/sanity/queries/timeline", () => ({
  getTimelineEntries: jest.fn(),
}));
jest.mock("@/lib/sanity/queries/settings", () => ({ getSettings: jest.fn() }));

const timeline = jest.mocked(getTimelineEntries);
const settings = jest.mocked(getSettings);

beforeEach(() => {
  jest.resetAllMocks();
  settings.mockResolvedValue({
    cvDownloadUrl: { fr: "/cv-fr.pdf", en: "/cv-en.pdf" },
  } as Awaited<ReturnType<typeof getSettings>>);
});

test.each([
  ["fr", "janv. 2023", "En cours", "/cv-fr.pdf"],
  ["en", "Jan 2023", "Ongoing", "/cv-en.pdf"],
])("affiche les dates et le CV pour %s", async (locale, date, badge, cv) => {
  timeline.mockResolvedValue([
    {
      _id: "one",
      _type: "timeline",
      dateStart: "2023-01-01",
      title: { fr: "Mission", en: "Work" },
      description: { fr: "Description", en: "Description" },
      tags: [],
      section: "professional",
      order: 1,
    },
  ]);
  render(await ParcoursPage({ params: Promise.resolve({ locale }) }));
  expect(screen.getByText(date)).toBeInTheDocument();
  expect(screen.getByText(badge)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /cv/i })).toHaveAttribute("href", cv);
});

test("affiche un état vide", async () => {
  timeline.mockResolvedValue([]);
  render(await ParcoursPage({ params: Promise.resolve({ locale: "fr" }) }));
  expect(screen.getByText("Aucun parcours disponible.")).toBeInTheDocument();
});

test("affiche le fallback si Sanity échoue", async () => {
  timeline.mockRejectedValue(new Error("indisponible"));
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  render(await ParcoursPage({ params: Promise.resolve({ locale: "fr" }) }));
  expect(screen.getByRole("status")).toHaveAttribute(
    "data-feature",
    "parcours",
  );
  error.mockRestore();
});
