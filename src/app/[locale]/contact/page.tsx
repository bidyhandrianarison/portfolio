import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIcon } from "@/components/contact/ContactIcon";
import { contactLinks } from "@/lib/constants/contacts";
import { pageAlternates } from "@/lib/constants/site";
import { homeT } from "@/lib/i18n-server";

const t = {
  fr: {
    title: "Contact",
    heading: "Me contacter",
    description:
      "Envoyez-moi un message pour discuter de votre projet ou d'une collaboration.",
    otherChannels: "Autres canaux",
    channelsDescription: "Retrouvez-moi aussi sur ces plateformes.",
    requiredNote: "* Champs obligatoires",
  },
  en: {
    title: "Contact",
    heading: "Get in touch",
    description:
      "Send me a message to discuss your project or a collaboration.",
    otherChannels: "Other channels",
    channelsDescription: "Find me on these platforms too.",
    requiredNote: "* Required fields",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  return {
    title: i.title,
    description: i.description,
    alternates: pageAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <main>
      <div className="wrap py-14">
        <span className="avail">
          <i aria-hidden="true" />
          {homeT(locale)("avail")}
        </span>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-bold tracking-[-0.04em]">
          {i.heading}
        </h1>
        <div className="head-row">
          <span className="avatar" aria-hidden="true">
            <b>SA</b>
            <Image
              src="/pdp.jpg"
              alt=""
              fill
              sizes="72px"
              className="object-cover"
            />
          </span>
          <p className="text-muted max-w-[52ch] text-lg">{i.description}</p>
        </div>
        <a href={contactLinks[0].href} className="btn btn-primary press mt-5">
          <ContactIcon label="Email" />
          {contactLinks[0].href.replace("mailto:", "")}
        </a>
      </div>
      <section className="wrap pb-14">
        <div className="grid grid-cols-1 items-start gap-6 min-[801px]:grid-cols-[1.4fr_0.8fr]">
          <div className="border-line bg-panel rounded-[20px] border p-6">
            <p className="text-muted mb-5 text-[13px]">{i.requiredNote}</p>
            <ContactForm locale={locale} />
          </div>
          <aside
            aria-labelledby="contact-channels"
            className="border-line bg-panel rounded-[20px] border p-6"
          >
            <h2 id="contact-channels" className="text-lg font-semibold">
              {i.otherChannels}
            </h2>
            <p className="text-muted mt-1 text-sm">{i.channelsDescription}</p>
            <ul className="mt-4">
              {contactLinks
                .filter((link) => link.external)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="border-line text-content hover:text-accent flex items-center justify-between gap-4 border-t py-4 transition-colors"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <ContactIcon label={link.label} />
                        <span className="min-w-0">
                          <b className="block">{link.label}</b>
                          <span className="meta block break-all">
                            {link.label === "GitHub"
                              ? "bidyhandrianarison"
                              : "n-sarobidy-andrianarison"}
                          </span>
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-accent shrink-0 text-xl"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
