import { homeT } from "@/lib/i18n-server";
import { Reveal } from "@/components/home/Reveal";

export function Bridge({ locale }: { locale: string }) {
  const t = homeT(locale);

  return (
    <Reveal className="wrap py-6 pt-6 pb-2 text-center">
      <span className="meta">{t("bridge.meta")}</span>
      <p className="mx-auto mt-3 max-w-[24ch] text-[clamp(1.4rem,3.2vw,2.2rem)] leading-[1.15] font-bold tracking-[-0.035em]">
        {t("bridge.prefix")}{" "}
        <em className="text-accent not-italic">{t("bridge.simple")}</em>,{" "}
        <em className="text-accent not-italic">{t("bridge.useful")}</em>{" "}
        {t("bridge.join")}{" "}
        <em className="text-accent not-italic">{t("bridge.intelligent")}</em>.
      </p>
    </Reveal>
  );
}
