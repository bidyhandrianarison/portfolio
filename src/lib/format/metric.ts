/**
 * Port de chiffre() des maquettes : « 2 semaines → 2 jours » — si le chiffre
 * passe à la ligne, il coupe après la flèche, jamais au milieu d'un terme
 * (espaces remplacés par des espaces insécables dans chaque membre).
 */
export function metric(value: string): string {
  return value
    .split(" → ")
    .map((part) => part.replace(/ /g, "\u00A0"))
    .join(" → ");
}
