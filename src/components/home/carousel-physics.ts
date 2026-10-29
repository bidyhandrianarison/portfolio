/**
 * Maths du carrousel — port verbatim de _bmad-output/maquettes-portfolio/07-synthese.html :
 * projection de lancer d = 0.99, rubberband c = 0.55, ressort k/c dérivés de damping + response.
 */

export type SpringOptions = { damping?: number; response?: number };

export function project(velocity: number, d = 0.99): number {
  return (velocity / 1000) * (d / (1 - d));
}

export function rubberband(over: number, dim: number, c = 0.55): number {
  return (over * dim * c) / (dim + c * Math.abs(over));
}

export function spring({ damping = 1, response = 0.4 }: SpringOptions = {}) {
  const k = ((2 * Math.PI) / response) ** 2;
  const c = 2 * damping * ((2 * Math.PI) / response);
  return { k, c };
}
