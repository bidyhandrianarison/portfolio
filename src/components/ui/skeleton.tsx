import { cn } from "@/lib/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <Skeleton className="mb-2 h-5 w-2/3" />
      <Skeleton className="mb-3 h-4 w-1/2" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>
    </div>
  );
}

function ProjectListSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="mb-2 h-5 w-1/2" />
        <Skeleton className="mb-2 h-4 w-1/3" />
        <div className="flex gap-1">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero skeleton */}
      <section className="mb-20 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-2/3" />
        <Skeleton className="mx-auto mb-2 h-6 w-1/2" />
        <Skeleton className="mx-auto h-5 w-1/3" />
      </section>

      {/* Featured skeleton */}
      <section className="mb-20">
        <Skeleton className="mb-8 h-7 w-40" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </section>

      {/* Others skeleton */}
      <section className="mb-20">
        <Skeleton className="mb-8 h-7 w-36" />
        <div className="flex flex-col gap-3">
          <ProjectListSkeleton />
          <ProjectListSkeleton />
          <ProjectListSkeleton />
        </div>
      </section>

      {/* CTA skeleton */}
      <section className="rounded-2xl bg-neutral-100 p-8 text-center dark:bg-neutral-900">
        <Skeleton className="mx-auto mb-2 h-7 w-48" />
        <Skeleton className="mx-auto h-5 w-64" />
      </section>
    </main>
  );
}
