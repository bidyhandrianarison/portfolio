import "@testing-library/jest-dom";
import { metric } from "../metric";

describe("metric", () => {
  it("remplace les espaces par des insécables dans chaque membre de la flèche", () => {
    expect(metric("2 semaines → 2 jours")).toBe(
      "2\u00A0semaines → 2\u00A0jours",
    );
    expect(metric("30 min → 30 s")).toBe("30\u00A0min → 30\u00A0s");
  });

  it("laisse les valeurs sans flèche intactes (hors espaces insécables)", () => {
    expect(metric("86%")).toBe("86%");
    expect(metric("50+ emails/jour")).toBe("50+\u00A0emails/jour");
  });
});
