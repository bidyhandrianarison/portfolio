export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="animate-pulse space-y-8">
        {/* Hero skeleton */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="h-44 w-44 shrink-0 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex-1 space-y-4">
            <div className="h-10 w-64 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-5 w-80 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="flex gap-3 pt-2">
              <div className="h-10 w-32 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-10 w-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
        </div>

        {/* Section skeleton */}
        <div className="space-y-4">
          <div className="h-7 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="space-y-3">
                  <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
