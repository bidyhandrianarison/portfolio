import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { SkillsTab } from "../SkillsTab";

jest.mock("@/components/visual/GlitchReveal", () => ({
  GlitchReveal: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const skills = [
  {
    _id: "1",
    _type: "skill" as const,
    name: "Python",
    category: "ia" as const,
    proficiency: "expert" as const,
  },
  {
    _id: "2",
    _type: "skill" as const,
    name: "RAG",
    category: "ia" as const,
    proficiency: "expert" as const,
  },
  {
    _id: "3",
    _type: "skill" as const,
    name: "Flutter / Dart",
    category: "mobile" as const,
    proficiency: "expert" as const,
  },
];

describe("SkillsTab", () => {
  it("renders expertise cards grouped by category", () => {
    render(<SkillsTab skills={skills} locale="fr" />);
    expect(screen.getByText("Systèmes IA")).toBeInTheDocument();
    expect(screen.getByText("Applications Mobiles")).toBeInTheDocument();
    const cards = screen.getAllByRole("article");
    expect(within(cards[0]).getByText("Python")).toBeInTheDocument();
  });

  it("links proof skills to projects", () => {
    render(<SkillsTab skills={skills} locale="fr" />);
    const ragLink = screen.getByRole("link", { name: /RAG/ });
    expect(ragLink).toHaveAttribute("href", "/fr/projects/assistant-emails");
  });

  it("renders skills with a proof link as links", () => {
    render(<SkillsTab skills={skills} locale="fr" />);
    const flutter = screen.getAllByText("Flutter / Dart")[0];
    expect(flutter.closest("a")).not.toBeNull();
  });

  it("shows empty state when no skills", () => {
    render(<SkillsTab skills={[]} locale="fr" />);
    expect(screen.getByText(/aucune compétence/i)).toBeInTheDocument();
  });

  it("renders English labels", () => {
    render(<SkillsTab skills={skills} locale="en" />);
    expect(screen.getByText("AI Systems")).toBeInTheDocument();
    expect(screen.getByText("What I Build")).toBeInTheDocument();
  });
});
