import Link from "next/link";
import { homeT } from "@/lib/i18n-server";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { getFeaturedCertifications } from "@/lib/sanity/queries/certifications";
import { resolveLocale } from "@/lib/utils/locale";

export async function CertsRow({ locale }: { locale: string }) {
  const t = homeT(locale);

  let certifications;
  try {
    certifications = await getFeaturedCertifications();
  } catch (error) {
    console.error("[home] certifications failed:", error);
    return <ErrorFallback feature="home-certs" locale={locale} />;
  }

  if (certifications.length === 0) {
    return <ErrorFallback feature="home-certs" locale={locale} />;
  }

  return (
    <div className="wrap">
      <div className="sec-head">
        <h2>{t("certs.title")}</h2>
        <Link href={`/${locale}/skills?tab=certifications`} className="go">
          {t("certs.viewAll")}
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {certifications.map((certification) => (
          <li
            key={certification._id}
            className="border-line bg-panel rounded-[14px] border p-4"
          >
            <span className="meta">
              {resolveLocale(certification.issuer, locale)} ·{" "}
              {certification.date}
            </span>
            <b className="mt-1 block tracking-[-0.01em]">
              {resolveLocale(certification.name, locale)}
            </b>
          </li>
        ))}
      </ul>
    </div>
  );
}
