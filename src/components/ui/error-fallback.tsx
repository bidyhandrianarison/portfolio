import { homeT } from "@/lib/i18n-server";

export function ErrorFallback({
  feature,
  locale,
}: {
  feature: string;
  locale: string;
}) {
  return (
    <div
      className="border-line bg-panel-2 text-muted rounded-2xl border p-6"
      role="status"
      data-feature={feature}
    >
      {homeT(locale)("fallback")}
    </div>
  );
}
