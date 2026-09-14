import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

const t = {
  fr: {
    title: "Contact",
    heading: "Me contacter",
    description:
      "Envoyez-mun message pour discuter de votre projet ou d'une collaboration.",
  },
  en: {
    title: "Contact",
    heading: "Get in touch",
    description:
      "Send me a message to discuss your project or a collaboration.",
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
    </main>
  );
}
