import "@testing-library/jest-dom";
import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
} from "@testing-library/react";

jest.mock("@/lib/sanity/queries/projects", () => ({
  getProjects: jest.fn(),
  getProjectBySlug: jest.fn(),
}));
jest.mock("@/lib/sanity/queries/timeline", () => ({
  getTimelineEntries: jest.fn(async () => []),
}));
jest.mock("@/lib/sanity/queries/skills", () => ({
  getSkills: jest.fn(async () => []),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
  }) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} data-fill={fill ? "true" : undefined} />
  ),
}));

const { getProjects } = jest.requireMock("@/lib/sanity/queries/projects") as {
  getProjects: jest.Mock;
};

const labels = {
  title: "Applications mobiles",
  viewProject: "Voir le projet →",
  prev: "Application précédente",
  next: "Application suivante",
  hint: "glisser, cliquer ou ← →",
};

function mockMatchMedia(matches: boolean) {
  jest.spyOn(window, "matchMedia").mockImplementation(((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia);
}

function intersectionInstances() {
  return (IntersectionObserver as unknown as { instances: unknown[] })
    .instances;
}

function lastIntersectionObserver() {
  const instances = intersectionInstances();
  return instances[instances.length - 1] as {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    options?: { rootMargin?: string };
    targets: Element[];
  };
}

function pointEvent(
  el: Element,
  type: string,
  props: Partial<{
    pointerId: number;
    button: number;
    clientX: number;
    clientY: number;
    timeStamp: number;
  }>,
) {
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, "pointerId", { value: props.pointerId ?? 1 });
  Object.defineProperty(event, "button", { value: props.button ?? 0 });
  Object.defineProperty(event, "clientX", { value: props.clientX ?? 0 });
  Object.defineProperty(event, "clientY", { value: props.clientY ?? 0 });
  Object.defineProperty(event, "timeStamp", { value: props.timeStamp ?? 0 });
  el.dispatchEvent(event);
}

beforeEach(() => {
  intersectionInstances().length = 0;
  mockMatchMedia(false);
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const { Reveal } = jest.requireActual("@/components/home/Reveal");

describe("Reveal", () => {
  it("pose le rootMargin -8% de la maquette et ajoute `in` une seule fois", () => {
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValue({ top: 2000 } as DOMRect);
    const { container } = render(
      <Reveal className="sheet">
        <p>contenu</p>
      </Reveal>,
    );

    const io = lastIntersectionObserver();
    expect(io.options?.rootMargin).toBe("0px 0px -8% 0px");
    // contenu SSR visible : la capture ne se produit qu'au mount
    expect((container.firstElementChild as HTMLElement).style.opacity).toBe(
      "0",
    );

    act(() => io.callback([{ isIntersecting: true }]));
    expect(container.firstElementChild).toHaveClass("in");
    expect((container.firstElementChild as HTMLElement).style.opacity).toBe(
      "1",
    );
    // one-shot : l'élément est unobserved après l'apparition
    expect(io.targets).toHaveLength(0);
  });

  it("fondu sans translation sous prefers-reduced-motion", () => {
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValue({ top: 2000 } as DOMRect);
    mockMatchMedia(true);
    const { container } = render(
      <Reveal>
        <p>fondu</p>
      </Reveal>,
    );
    expect(container.firstElementChild).toHaveStyle({ opacity: "0" });
    expect((container.firstElementChild as HTMLElement).style.transform).toBe(
      "",
    );

    const io = lastIntersectionObserver();
    act(() => io.callback([{ isIntersecting: true }]));
    expect(container.firstElementChild).toHaveClass("in");
    expect((container.firstElementChild as HTMLElement).style.opacity).toBe(
      "1",
    );
  });

  it("ne masque pas ce qui démarre au-dessus de la flottaison", () => {
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValue({ top: 0 } as DOMRect);
    const { container } = render(
      <Reveal>
        <p>déjà visible</p>
      </Reveal>,
    );
    expect((container.firstElementChild as HTMLElement).style.opacity).toBe("");
    expect(intersectionInstances()).toHaveLength(0);
  });
});

const { ClockTick } = jest.requireActual("@/components/home/ClockTick");

describe("ClockTick", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T10:04:30Z"));
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("tick immédiat de l'heure Antananarivo puis toutes les 30000 ms", () => {
    render(<ClockTick locale="fr" />);
    // 10:04:30Z → 13:04 à Antananarivo
    expect(screen.getByText("13:04")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(30000);
    });
    expect(screen.getByText("13:05")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(29 * 60000);
    });
    expect(screen.getByText("13:34")).toBeInTheDocument();
  });
});

const { AiSystems } = jest.requireActual("@/components/home/AiSystems");

describe("PipelineLoop via AiSystems", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    getProjects.mockResolvedValue([
      {
        _id: "p1",
        slug: { current: "assistant-emails" },
        title: {
          fr: "Assistant de traitement d'emails",
          en: "Email assistant",
        },
        period: "2025 – 2026",
        tags: ["#ia"],
        metrics: [
          {
            value: { fr: "2h → 25 min", en: "2h → 25 min" },
            label: { fr: "temps", en: "time" },
          },
        ],
      },
    ]);
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  const stage = (title: string) => screen.getByText(title).closest("li");

  it("tourne à 1400ms : `on` séquentiel, `done` derrière, log qui suit", async () => {
    render(await AiSystems({ locale: "fr" }));

    expect(stage("Email entrant")).toHaveClass("on");
    expect(screen.getByText(/email reçu/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2800);
    });
    expect(stage("Extraction")).toHaveClass("on");
    expect(stage("Email entrant")).toHaveClass("done");
    expect(stage("Classification")).toHaveClass("done");
    expect(stage("Email entrant")).not.toHaveClass("on");
    expect(screen.getByTestId("pipeline-log")).toHaveTextContent(
      /infos utiles/,
    );

    // boucle : 3 ticks de plus → retour à l'étape 01
    act(() => {
      jest.advanceTimersByTime(4200);
    });
    expect(stage("Email entrant")).toHaveClass("on");
    expect(stage("Email entrant")).not.toHaveClass("done");
    expect(stage("Validation")).not.toHaveClass("done");
    expect(screen.getByText(/email reçu/)).toBeInTheDocument();
  });

  it("met l'interval en pause quand l'onglet passe en arrière-plan", async () => {
    render(await AiSystems({ locale: "fr" }));

    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
      jest.advanceTimersByTime(5600);
    });
    expect(stage("Email entrant")).toHaveClass("on");

    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
      jest.advanceTimersByTime(1400);
    });
    expect(stage("Classification")).toHaveClass("on");
  });

  it("reduced-motion : état final figé, aucune boucle", async () => {
    mockMatchMedia(true);
    render(await AiSystems({ locale: "fr" }));

    expect(stage("Validation")).toHaveClass("on");
    expect(stage("Email entrant")).toHaveClass("done");
    expect(stage("Extraction")).toHaveClass("done");
    expect(screen.getByText(/validé par l'humain/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2800);
    });
    expect(stage("Validation")).toHaveClass("on");
    expect(stage("Email entrant")).toHaveClass("done");
  });
});

const { CarouselInteractive } = jest.requireActual(
  "@/components/home/CarouselInteractive",
);

const apps = [
  { slug: "alpha", name: "Alpha", role: "Dev", year: "2024", tags: ["#a"] },
  { slug: "bravo", name: "Bravo", role: "Dev", year: "2025", tags: ["#b"] },
  { slug: "charlie", name: "Charlie", role: "Dev", year: "2026", tags: ["#c"] },
];

describe("CarouselInteractive", () => {
  const trackEl = () => screen.getByTestId("carousel-track");
  const viewportEl = () => screen.getByTestId("carousel-viewport");
  const card = (name: string) =>
    screen
      .getAllByTestId("carousel-card")
      .find((node) => node.getAttribute("data-slug") === name)!;
  const caption = () => screen.getByRole("heading", { name: /.+/ });
  const dots = () => screen.getByTestId("carousel-dots");

  it("défile automatiquement et permet de mettre en pause puis de reprendre", () => {
    jest.useFakeTimers();
    render(<CarouselInteractive locale="fr" apps={apps} labels={labels} />);
    act(() => jest.advanceTimersByTime(3000));
    expect(caption()).toHaveTextContent("Bravo");
    fireEvent.click(screen.getByRole("button", { name: labels.prev }));
    act(() => jest.advanceTimersByTime(12000));
    expect(caption()).toHaveTextContent("Alpha");
    fireEvent.scroll(window);
    act(() => jest.advanceTimersByTime(3000));
    expect(caption()).toHaveTextContent("Bravo");
    jest.useRealTimers();
  });

  it("flèches, dots et caption restent synchrones avec l'index actif", () => {
    render(<CarouselInteractive locale="fr" apps={apps} labels={labels} />);
    expect(caption()).toHaveTextContent("Alpha");
    expect(trackEl().children[0]).not.toHaveClass("opacity-50");
    expect(trackEl().children[1]).toHaveClass("opacity-50");

    fireEvent.click(
      screen.getByRole("button", { name: "Application suivante" }),
    );
    expect(caption()).toHaveTextContent("Bravo");
    expect(trackEl().children[0]).toHaveClass("opacity-50");
    expect(dots().children[1]).toHaveClass("bg-accent", "w-[22px]");

    fireEvent.click(
      screen.getByRole("button", { name: "Application précédente" }),
    );
    expect(caption()).toHaveTextContent("Alpha");
    expect(dots().children[1]).toHaveClass("bg-line", "w-[7px]");
  });

  it("flèches clavier sur le viewport tabbable", () => {
    render(<CarouselInteractive locale="fr" apps={apps} labels={labels} />);
    fireEvent.keyDown(viewportEl(), { key: "ArrowRight" });
    expect(caption()).toHaveTextContent("Bravo");
    fireEvent.keyDown(viewportEl(), { key: "ArrowRight" });
    expect(caption()).toHaveTextContent("Charlie");
    fireEvent.keyDown(viewportEl(), { key: "ArrowLeft" });
    expect(caption()).toHaveTextContent("Bravo");
  });

  it("flèches clampées 0..len-1 — le carrousel reste utilisable avec < 2 cartes", () => {
    render(
      <CarouselInteractive locale="fr" apps={[apps[0]]} labels={labels} />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Application suivante" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Application précédente" }),
    );
    expect(caption()).toHaveTextContent("Alpha");
  });

  it("clic sur une carte inactive l'active (caption suit)", () => {
    render(<CarouselInteractive locale="fr" apps={apps} labels={labels} />);
    fireEvent.click(card("bravo"));
    expect(caption()).toHaveTextContent("Bravo");
  });

  it("drag vertical ≥10px : la main est rendue au scroll de la page, pas de suppression de clic", () => {
    render(<CarouselInteractive locale="fr" apps={apps} labels={labels} />);
    pointEvent(trackEl(), "pointerdown", {
      clientX: 100,
      clientY: 100,
      timeStamp: 0,
    });
    pointEvent(trackEl(), "pointermove", {
      clientX: 102,
      clientY: 150,
      timeStamp: 50,
    });
    pointEvent(trackEl(), "pointerup", {});
    expect(trackEl()).not.toHaveClass("dragging");
    // pas de suppression de clic après drag vertical
    fireEvent.click(card("bravo"));
    expect(caption()).toHaveTextContent("Bravo");
  });

  it("drag horizontal : clic après le lancer supprimé une seule fois", () => {
    render(<CarouselInteractive locale="fr" apps={apps} labels={labels} />);
    pointEvent(trackEl(), "pointerdown", {
      clientX: 100,
      clientY: 100,
      timeStamp: 0,
    });
    pointEvent(trackEl(), "pointermove", {
      clientX: 60,
      clientY: 102,
      timeStamp: 60,
    });
    pointEvent(trackEl(), "pointerup", {});
    expect(trackEl()).not.toHaveClass("dragging");

    // le clic post-drag est supprimé : la carte bravo ne s'active pas
    fireEvent.click(card("bravo"));
    expect(caption()).toHaveTextContent("Alpha");
    // suppression une seule fois : le clic suivant s'applique
    fireEvent.click(card("bravo"));
    expect(caption()).toHaveTextContent("Bravo");
  });

  it("lancer projeté : la vitesse du flick intègre l'index cible (d=0.99)", () => {
    const { container } = render(
      <CarouselInteractive locale="fr" apps={apps} labels={labels} />,
    );
    const cards = container.querySelectorAll('[data-testid="carousel-card"]');
    Object.defineProperty(cards[0], "offsetLeft", { value: 0 });
    Object.defineProperty(cards[1], "offsetLeft", { value: 288 });
    // swipe rapide de -150px sur 100ms → vel ≈ -1500px/s → projection ≈ -148px
    // target = round(-(-150 - 148.5)/288) = 1 → la carte Bravo
    act(() => {
      pointEvent(trackEl(), "pointerdown", {
        clientX: 100,
        clientY: 100,
        timeStamp: 0,
      });
      pointEvent(trackEl(), "pointermove", {
        clientX: 40,
        clientY: 102,
        timeStamp: 80,
      });
      pointEvent(trackEl(), "pointermove", {
        clientX: -50,
        clientY: 104,
        timeStamp: 100,
      });
      pointEvent(trackEl(), "pointerup", {});
    });
    expect(caption()).toHaveTextContent("Bravo");
  });
});
