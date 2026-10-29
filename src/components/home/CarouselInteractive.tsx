"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  project,
  rubberband,
  spring,
  type SpringOptions,
} from "./carousel-physics";

export type CarouselApp = {
  slug: string;
  name: string;
  role: string;
  year: string;
  tags: string[];
};

export type CarouselLabels = {
  title: string;
  viewProject: string;
  prev: string;
  next: string;
  hint: string;
};

export function PhoneMock({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="bg-phone shadow-deep h-[532px] w-[260px] rounded-[44px] p-2.5">
      <div className="bg-panel text-content relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[35px] p-4 pt-11">
        <span
          aria-hidden="true"
          className="bg-phone absolute top-2.5 left-1/2 h-6 w-[84px] -translate-x-1/2 rounded-[20px]"
        />
        <div>
          <div className="text-2xl font-bold tracking-[-0.04em]">{title}</div>
          <div className="text-muted font-mono text-[0.6875rem] font-medium">
            {sub}
          </div>
        </div>
        <div className="border-accent/35 bg-accent-soft h-32 rounded-[20px] border" />
        <div className="flex gap-2">
          <div className="bg-accent h-[26px] flex-1 rounded-[13px]" />
          <div className="bg-panel-2 h-[26px] flex-1 rounded-[13px]" />
          <div className="bg-panel-2 h-[26px] flex-1 rounded-[13px]" />
        </div>
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-panel-2 flex items-center gap-2.5 rounded-[14px] p-2"
          >
            <div className="border-accent/30 bg-accent-soft h-[42px] w-[42px] flex-none rounded-xl border" />
            <div className="grid flex-1 gap-1.5">
              <span className="bg-content/18 block h-[7px] rounded-[4px]" />
              <span className="bg-content/18 block h-[7px] w-3/5 rounded-[4px]" />
            </div>
          </div>
        ))}
        <div className="bg-panel-2 mt-auto flex h-[50px] items-center justify-around rounded-[18px]">
          <b className="bg-accent h-5 w-5 rounded-[7px]" />
          <b className="bg-content/20 h-5 w-5 rounded-[7px]" />
          <b className="bg-content/20 h-5 w-5 rounded-[7px]" />
          <b className="bg-content/20 h-5 w-5 rounded-[7px]" />
        </div>
      </div>
    </div>
  );
}

type Drag = {
  id: number;
  grab: number;
  startX: number;
  startY: number;
  locked: boolean;
  hist: { x: number; t: number }[];
};

/**
 * Carrousel interactif — port verbatim de 07-synthese.html : drag 1 axe
 * (lock horizontal ≥10px, vertical relâché au scroll de la page), rubberband
 * aux bornes, lancer projeté d=0.99, ressort 4 sous-pas dt≤1/30, click-activer,
 * flèches clin + flèches clavier, snap au resize, reduce → saut instantané.
 */
export function CarouselInteractive({
  locale,
  apps,
  labels,
}: {
  locale: string;
  apps: CarouselApp[];
  labels: CarouselLabels;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const xRef = useRef(0);
  const vRef = useRef(0);
  const rafRef = useRef(0);
  const dragRef = useRef<Drag | null>(null);
  const suppressClickRef = useRef(false);
  const reduceRef = useRef(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  }, []);

  const render = useCallback(() => {
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${xRef.current}px,0,0)`;
  }, []);

  const activate = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(apps.length - 1, n));
      indexRef.current = next;
      setIndex(next);
    },
    [apps.length],
  );

  const springTo = useCallback(
    (target: number, opts?: SpringOptions) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      if (reduceRef.current) {
        xRef.current = target;
        vRef.current = 0;
        render();
        return;
      }
      const { k, c } = spring(opts);
      let last = performance.now();
      let x = xRef.current;
      let v = vRef.current;
      const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 1 / 30);
        last = now;
        for (let n = 0; n < 4; n++) {
          const h = dt / 4;
          v += (-k * (x - target) - c * v) * h;
          x += v * h;
        }
        xRef.current = x;
        vRef.current = v;
        render();
        if (Math.abs(x - target) > 0.3 || Math.abs(v) > 5)
          rafRef.current = requestAnimationFrame(tick);
        else {
          xRef.current = target;
          vRef.current = 0;
          render();
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [render],
  );

  const goTo = useCallback(
    (n: number, opts?: SpringOptions) => {
      activate(n);
      springTo(-indexRef.current * step(), opts);
    },
    [activate, springTo, step],
  );

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const minX = () => -step() * (apps.length - 1);
    const withBand = (raw: number) => {
      const dim = viewport.clientWidth;
      if (raw > 0) return rubberband(raw, dim);
      if (raw < minX()) return minX() - rubberband(minX() - raw, dim);
      return raw;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      suppressClickRef.current = false;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      dragRef.current = {
        id: e.pointerId,
        grab: e.clientX - xRef.current,
        startX: e.clientX,
        startY: e.clientY,
        locked: false,
        hist: [{ x: e.clientX, t: e.timeStamp }],
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (!drag.locked) {
        if (Math.hypot(dx, dy) < 10) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          dragRef.current = null;
          return;
        }
        drag.locked = true;
        if (typeof track.setPointerCapture === "function")
          track.setPointerCapture(e.pointerId);
        track.classList.add("dragging");
      }
      xRef.current = withBand(e.clientX - drag.grab);
      render();
      drag.hist.push({ x: e.clientX, t: e.timeStamp });
      if (drag.hist.length > 6) drag.hist.shift();
    };

    const release = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || e.pointerId !== drag.id) return;
      dragRef.current = null;
      track.classList.remove("dragging");
      if (!drag.locked) {
        if (!rafRef.current && xRef.current !== -indexRef.current * step())
          goTo(indexRef.current);
        return;
      }
      const a = drag.hist[0];
      const b = drag.hist[drag.hist.length - 1];
      const vel = b.t > a.t ? ((b.x - a.x) / (b.t - a.t)) * 1000 : 0;
      vRef.current = vel;
      const gridStep = step();
      const target =
        gridStep > 0
          ? Math.round(-(xRef.current + project(vel)) / gridStep)
          : indexRef.current;
      goTo(
        target,
        Math.abs(vel) > 300
          ? { damping: 0.8, response: 0.35 }
          : { damping: 1, response: 0.4 },
      );
      suppressClickRef.current = true;
    };

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      xRef.current = -indexRef.current * step();
      vRef.current = 0;
      render();
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);
    window.addEventListener("resize", onResize);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", release);
      track.removeEventListener("pointercancel", release);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [apps.length, goTo, render, step]);

  if (apps.length === 0) return null;

  const app = apps[index];

  return (
    <>
      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label={labels.title}
        aria-roledescription="carrousel"
        className="overflow-hidden pt-7 pb-2"
        data-testid="carousel-viewport"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(indexRef.current + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(indexRef.current - 1);
          }
        }}
      >
        <div
          ref={trackRef}
          data-testid="carousel-track"
          className={cn(
            "flex cursor-grab touch-pan-y gap-7 pl-[calc(50%-130px)] select-none",
          )}
          style={{ transform: "translate3d(0px,0,0)" }}
          onClickCapture={(e) => {
            if (!suppressClickRef.current) return;
            suppressClickRef.current = false;
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {apps.map((item, k) => (
            <article
              key={item.slug}
              data-slug={item.slug}
              data-testid="carousel-card"
              className={cn(
                "w-[260px] flex-none transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)]",
                k !== index && "[transform:scale(.9)] opacity-50",
              )}
              onClick={() => {
                if (k !== indexRef.current) goTo(k);
              }}
            >
              <PhoneMock title={item.name} sub={item.role} />
            </article>
          ))}
        </div>
      </div>
      <div className="min-h-[110px] pt-6 pb-4 text-center" aria-live="polite">
        <p className="meta">{app.year}</p>
        <h3 className="mt-1 text-[1.75rem] leading-[1.1] tracking-[-0.035em]">
          {app.name}
        </h3>
        <p className="text-muted mt-1 text-[0.9375rem]">{app.role}</p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
          {app.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/${locale}/projects/${app.slug}`}
          className="go mt-3 inline-block"
        >
          {labels.viewProject}
        </Link>
      </div>
      <div className="mt-4.5 flex items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={() => goTo(indexRef.current - 1)}
          aria-label={labels.prev}
          className="border-line bg-panel text-content press h-11 w-11 cursor-pointer rounded-[10px] border text-xl"
        >
          ←
        </button>
        <div
          aria-hidden="true"
          data-testid="carousel-dots"
          className="flex gap-1.5 transition-all duration-300 [&>i]:rounded-[4px] [&>i]:transition-all [&>i]:duration-300"
        >
          {apps.map((item, k) => (
            <i
              key={item.slug}
              className={cn(
                "h-[7px]",
                k === index ? "bg-accent w-[22px]" : "bg-line w-[7px]",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(indexRef.current + 1)}
          aria-label={labels.next}
          className="border-line bg-panel text-content press h-11 w-11 cursor-pointer rounded-[10px] border text-xl"
        >
          →
        </button>
      </div>
      <p className="meta mt-2.5 text-center">{labels.hint}</p>
    </>
  );
}
