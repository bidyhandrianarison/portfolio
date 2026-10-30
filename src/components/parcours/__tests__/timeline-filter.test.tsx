import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Timeline } from "@/sanity/types";
import { TimelineFilterBar } from "../TimelineFilterBar";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({ url: () => "https://cdn.sanity.io/logo.png" }),
    }),
  }),
}));

const entries: Timeline[] = [
  {
    _id: "job",
    _type: "timeline",
    title: { fr: "Mission", en: "Work" },
    description: { fr: "Description", en: "Description" },
    dateStart: "2023-01-01",
    section: "professional",
    tags: [],
    image: { asset: { _ref: "image-logo" } },
    order: 1,
  },
  {
    _id: "study",
    _type: "timeline",
    title: { fr: "Formation", en: "Study" },
    description: { fr: "Description", en: "Description" },
    dateStart: "2020-01-01",
    dateEnd: "2021-01-01",
    section: "academic",
    tags: [],
    order: 2,
  },
];

test("filtre la frise et annonce le nombre de résultats", () => {
  render(<TimelineFilterBar entries={entries} locale="fr" />);
  const all = screen.getByRole("button", { name: /Tous/ });
  const professional = screen.getByRole("button", { name: /Professionnel/ });
  const academic = screen.getByRole("button", { name: /Académique/ });
  expect(all).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("2 entrées")).toBeInTheDocument();
  expect(screen.getByRole("presentation")).toHaveAttribute("alt", "");

  fireEvent.click(academic);
  expect(academic).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Formation")).toBeInTheDocument();
  expect(screen.queryByText("Mission")).not.toBeInTheDocument();
  expect(screen.getByText("1 entrée")).toBeInTheDocument();

  fireEvent.click(professional);
  expect(professional).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Mission")).toBeInTheDocument();
  expect(screen.queryByText("Formation")).not.toBeInTheDocument();

  fireEvent.click(all);
  expect(all).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Formation")).toBeInTheDocument();
  expect(screen.getByText("Mission")).toBeInTheDocument();
  expect(screen.getByText("2 entrées")).toBeInTheDocument();
});
