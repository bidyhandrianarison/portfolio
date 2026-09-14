"use client";

export function AnimatedBlob() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="animate-blob bg-primary-400/20 dark:bg-primary-600/10 absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-60 mix-blend-multiply blur-3xl" />
      <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-300/20 opacity-60 mix-blend-multiply blur-3xl dark:bg-orange-600/10" />
      <div className="animate-blob animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/20 opacity-60 mix-blend-multiply blur-3xl dark:bg-amber-600/10" />
    </div>
  );
}
