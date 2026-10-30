import Image from "next/image";
import Link from "next/link";
import { homeT } from "@/lib/i18n-server";

export function HomeHero({ locale }: { locale: string }) {
  const t = homeT(locale);

  return (
    <div className="wrap grid grid-cols-1 items-center gap-7 py-14 md:grid-cols-[1.3fr_0.7fr] md:gap-14">
      <div>
        <span className="avail">
          <i aria-hidden="true" />
          {t("avail")}
        </span>
        <h1 className="mt-4 mb-4 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.04em]">
          {t("hero.titleLead")}{" "}
          <em className="text-accent not-italic">{t("hero.titleAccent")}</em>
        </h1>
        <p className="text-muted max-w-[52ch] text-lg">
          <b className="text-content font-semibold">Sarobidy Andrianarison</b>
          <br />
          {t("hero.roles")}
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link href={`/${locale}/projects`} className="btn btn-primary press">
            {t("hero.viewProjects")}
          </Link>
          <Link href={`/${locale}/contact`} className="btn press">
            {t("hero.contact")}
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[220px] justify-self-start max-md:order-first md:max-w-[380px] md:justify-self-end">
        <div className="bg-panel-2 ring-accent/45 shadow-deep relative aspect-4/5 w-full overflow-hidden rounded-[32px] ring-1">
          <span
            aria-hidden="true"
            className="text-accent absolute inset-0 grid place-items-center text-[4.5rem] font-bold tracking-[-0.05em]"
          >
            SA
          </span>
          <Image
            src="/pdp.jpg"
            alt="Portrait de Sarobidy Andrianarison"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 900px) 384px, 380px"
          />
        </div>
      </div>
    </div>
  );
}
