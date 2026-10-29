import { homeT } from "@/lib/i18n-server";
import { contactLinks } from "@/lib/constants/contacts";
import { Reveal } from "@/components/home/Reveal";

const EMAIL = contactLinks.find((link) => link.label === "Email")?.href ?? "";
const LINKEDIN =
  contactLinks.find((link) => link.label === "LinkedIn")?.href ?? "";
const GITHUB = contactLinks.find((link) => link.label === "GitHub")?.href ?? "";

export function ContactBand({ locale }: { locale: string }) {
  const t = homeT(locale);

  return (
    <div className="wrap pb-0">
      <Reveal>
        <div className="border-line bg-panel grid grid-cols-1 items-center gap-6 rounded-[20px] border p-7 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto]">
          <span
            aria-hidden="true"
            className="bg-accent-soft shadow-accent/50 ring-panel relative grid h-[72px] w-[72px] flex-none place-items-center overflow-hidden rounded-full ring-2 ring-offset-0"
          >
            <b className="text-accent text-[1.4rem] font-bold tracking-[-0.04em]">
              SA
            </b>
          </span>
          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] font-bold tracking-[-0.03em]">
              {t("contact.title")}
            </h2>
            <p className="text-muted mt-1">{t("contact.text")}</p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <a
                href={LINKEDIN}
                className="btn press"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact.linkedin")}
              </a>
              <a
                href={GITHUB}
                className="btn press"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact.github")}
              </a>
            </div>
          </div>
          <a
            href={EMAIL}
            className="btn btn-primary press max-sm:justify-self-start"
          >
            bidyhandrianarison@gmail.com
          </a>
        </div>
      </Reveal>
    </div>
  );
}
