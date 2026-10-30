import Link from "next/link";
import type { Certification } from "@/sanity/types";
import { resolveLocale } from "@/lib/utils/locale";
import { CertificationPreview } from "./CertificationPreview";

interface CertificationCardProps {
  certification: Certification;
  locale: string;
}

export function CertificationCard({
  certification,
  locale,
}: CertificationCardProps) {
  const name = resolveLocale(certification.name, locale);
  const issuer = resolveLocale(certification.issuer, locale);

  if (!certification.slug?.current) return null;

  return (
    <Link
      href={`/${locale}/certifications/${certification.slug.current}`}
      className="cert border-line bg-panel hover:border-accent block rounded-[14px] border p-4 transition-colors"
    >
      <CertificationPreview image={certification.image} name={name} />
      <span className="meta">
        {issuer} · {certification.date}
      </span>
      <h2 className="mt-1 block font-bold tracking-[-0.01em]">{name}</h2>
    </Link>
  );
}
