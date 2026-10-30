import Image from "next/image";
import type { Certification } from "@/sanity/types";

export function CertificationPreview({
  image,
  name,
}: {
  image?: Certification["image"];
  name: string;
}) {
  return (
    <div className="relative mb-3 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-white">
      {image?.asset?.url ? (
        <Image
          src={image.asset.url}
          alt={image.alt || name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-2"
        />
      ) : (
        <svg
          data-testid="certification-placeholder"
          aria-hidden="true"
          viewBox="0 0 80 80"
          fill="none"
          className="text-primary-600 h-16 w-16"
        >
          <rect
            x="14"
            y="10"
            width="52"
            height="60"
            rx="6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M25 26h30M25 34h30M25 42h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="52" cy="52" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="m48 58-2 8 6-3 6 3-2-8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
