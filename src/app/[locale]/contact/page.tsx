import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactLinks } from "@/lib/constants/contacts";

const t = {
  fr: {
    title: "Contact",
    heading: "Me contacter",
    description:
      "Envoyez-moi un message pour discuter de votre projet ou d'une collaboration.",
    otherChannels: "Autres canaux",
  },
  en: {
    title: "Contact",
    heading: "Get in touch",
    description:
      "Send me a message to discuss your project or a collaboration.",
    otherChannels: "Other channels",
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
    <main className="mx-auto max-w-2xl px-4 py-16">
      <section>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">{i.heading}</h1>
        <p className="mb-10 text-neutral-600 dark:text-neutral-400">
          {i.description}
        </p>
        <ContactForm locale={locale} />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">{i.otherChannels}</h2>
        <ul className="flex flex-col gap-3">
          {contactLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
