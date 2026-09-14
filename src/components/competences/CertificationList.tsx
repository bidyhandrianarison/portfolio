import Link from "next/link";
import type { Certification } from "@/sanity/types";

interface CertificationListProps {
  certifications: Certification[];
}

export function CertificationList({ certifications }: CertificationListProps) {
  return (
    <ul className="space-y-4">
      {certifications.map((cert) => (
        <li
          key={cert._id}
          className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
        >
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">
              {cert.name}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {cert.issuer} — {cert.date}
            </p>
          </div>
          {cert.url && (
            <Link
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 shrink-0 text-sm font-medium hover:underline"
            >
              Vérifier →
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
