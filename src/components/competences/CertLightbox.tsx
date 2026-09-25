"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function CertLightbox({ src, alt }: { src: string; alt: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
        aria-label={`${alt} — agrandir`}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </button>
      <dialog
        ref={dialogRef}
        className="m-auto max-h-[90vh] max-w-[90vw] rounded-xl border-0 bg-transparent p-0 backdrop:bg-black/80"
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
        />
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          aria-label="Fermer"
        >
          ✕
        </button>
      </dialog>
    </>
  );
}
