"use client";

import { cn } from "@/lib/utils/cn";

export interface FilterFacet {
  value: string;
  label: string;
  count: number;
}

/**
 * Pills de filtres press, port maquette commun.css (.filters button) :
 * états exclusifs aria-pressed, compte « (n) » mono, facettes à count 0
 * masquées, compteur aria-live pluralisé.
 */
export function FilterPills({
  facets,
  selected,
  onChange,
  allValue,
  allLabel,
  allCount,
  count,
  countOne,
  countMany,
  filtersLabel,
  dataTestId,
}: {
  facets: FilterFacet[];
  selected: string;
  onChange: (value: string) => void;
  allValue: string;
  allLabel: string;
  allCount: number;
  /** Nombre de résultats après filtre — distinct du count de facette (multi-facettes possible). */
  count: number;
  countOne: string;
  countMany: string;
  filtersLabel: string;
  dataTestId?: string;
}) {
  const countLabel = (count === 1 ? countOne : countMany).replace(
    "{n}",
    String(count),
  );

  const pillClass = (pressed: boolean) =>
    cn(
      "press border-line hover:border-accent/50 cursor-pointer rounded-full border px-3 py-[7px] text-[0.8125rem] font-medium",
      pressed
        ? "border-content bg-content text-bg"
        : "bg-panel text-muted hover:text-content",
    );

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <div
        role="group"
        aria-label={filtersLabel}
        data-testid={dataTestId}
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => onChange(allValue)}
          aria-pressed={selected === allValue}
          style={
            selected === allValue
              ? { backgroundColor: "var(--text)", color: "var(--bg)" }
              : undefined
          }
          className={pillClass(selected === allValue)}
        >
          {allLabel} <span className="font-mono">({allCount})</span>
        </button>
        {facets
          .filter((facet) => facet.count > 0)
          .map((facet) => (
            <button
              key={facet.value}
              type="button"
              onClick={() => onChange(facet.value)}
              aria-pressed={selected === facet.value}
              style={
                selected === facet.value
                  ? { backgroundColor: "var(--text)", color: "var(--bg)" }
                  : undefined
              }
              className={pillClass(selected === facet.value)}
            >
              {facet.label} <span className="font-mono">({facet.count})</span>
            </button>
          ))}
      </div>
      <p className="meta" aria-live="polite">
        {countLabel}
      </p>
    </div>
  );
}
