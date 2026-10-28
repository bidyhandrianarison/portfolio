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

export function SectionSkeleton() {
  return (
    <div className="wrap">
      <div className="mb-6 space-y-3">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Skeleton className="h-36 rounded-[20px]" />
        <Skeleton className="h-36 rounded-[20px]" />
      </div>
    </div>
  );
}
