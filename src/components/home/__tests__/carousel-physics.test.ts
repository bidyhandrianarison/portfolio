const { project, rubberband, spring } = jest.requireActual(
  "@/components/home/carousel-physics",
);

describe("carousel-physics (port commun.js / 07-synthese.html)", () => {
  it("projette un lancer avec d=0.99 (~ une carte pour une vitesse de flick)", () => {
    expect(project(0)).toBe(0);
    expect(project(1000)).toBeCloseTo(99);
    expect(project(2600)).toBeCloseTo(257.4);
  });

  it("applique un rubberband c=0.55 borné au retour", () => {
    expect(rubberband(0, 800)).toBe(0);
    expect(rubberband(10, 800)).toBeGreaterThan(0);
    expect(rubberband(10, 800)).toBeLessThan(10);
    // l'excursion reste limitée : jamais au-delà de la moitié du dépassement fort
    expect(rubberband(800, 800)).toBeLessThan(800);
    expect(rubberband(800, 800)).toBeCloseTo(
      (800 * 800 * 0.55) / (800 + 0.55 * 800),
    );
  });

  it("dérive k/c du ressort depuis damping et response", () => {
    const standard = spring({ damping: 1, response: 0.4 });
    expect(standard.k).toBeCloseTo(((2 * Math.PI) / 0.4) ** 2);
    expect(standard.c).toBeCloseTo(2 * ((2 * Math.PI) / 0.4));

    const sketchy = spring({ damping: 0.8, response: 0.35 });
    expect(sketchy.k).toBeCloseTo(((2 * Math.PI) / 0.35) ** 2);
    expect(sketchy.c).toBeCloseTo(2 * 0.8 * ((2 * Math.PI) / 0.35));
  });
});
