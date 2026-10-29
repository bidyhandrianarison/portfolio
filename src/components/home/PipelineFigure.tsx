import { cn } from "@/lib/utils/cn";
import { PipelineLoop } from "@/components/home/PipelineLoop";

/**
 * Figure pipeline (lumières d'étapes + log accentué) — partagée entre la
 * home (Systèmes IA) et le détail des études de cas featured.
 */
export function PipelineFigure({
  caption,
  result,
  stages,
  logs,
  className = "",
}: {
  caption: string;
  result: string;
  stages: { title: string; sub: string }[];
  logs: string[];
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-line bg-panel rounded-2xl border p-[18px]",
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap justify-between gap-3">
        <figcaption className="meta">{caption}</figcaption>
        <span className="meta">{result}</span>
      </div>
      <PipelineLoop stages={stages} logs={logs} />
    </figure>
  );
}
