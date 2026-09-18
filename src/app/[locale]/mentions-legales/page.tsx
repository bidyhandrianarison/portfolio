import type { Metadata } from "next";

const t = {
  fr: {
    title: "Mentions légales",
    heading: "Mentions légales",
    sections: [
      {
        title: "Éditeur du site",
        content:
          "Ce site est édité par Sarobidy Andrianarison, développeur mobile, ingénieur IA et UI/UX Designer, basé à Madagascar.",
      },
      {
        title: "Hébergeur",
        content:
          "Ce site est hébergé par Netlify, Inc., 44 Montgomery Street, Suite 400, San Francisco, CA 94104, États-Unis.",
      },
      {
        title: "Propriété intellectuelle",
        content:
          "L'ensemble du contenu de ce site (textes, images, vidéos, code source) est la propriété exclusive de Sarobidy Andrianarison, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.",
      },
      {
        title: "Données personnelles",
        content:
          "Ce site ne collecte pas de données personnelles de manière systématique. Le formulaire de contact transmet uniquement les informations saisies (nom, email, message) par email à l'éditeur. Aucune donnée n'est stockée en base de données, vendue ou transmise à des tiers.",
      },
      {
        title: "Cookies",
        content:
          "Ce site n'utilise aucun cookie de tracking ou de publicité. Le seul stockage local utilisé concerne la préférence de thème (clair/sombre), qui reste sur votre appareil et n'est jamais transmis.",
      },
      {
        title: "Mesure d'audience",
        content:
          "Ce site dispose d'un suivi de navigation interne à des fins d'optimisation. Les données collectées sont les pages visitées, la durée de session et les événements d'interaction (clics). Ces données sont anonymisées, ne contiennent aucune information personnelle, et sont conservées temporairement en mémoire serveur sans service analytics tiers. Aucun cookie n'est utilisé pour cette mesure d'audience.",
      },
      {
        title: "Limitation de responsabilité",
        content:
          "L'éditeur s'efforce d'assurer l'exactitude des informations publiées. Toutefois, il ne saurait être tenu responsable des erreurs, omissions ou résultats obtenus par l'utilisation de ces informations.",
      },
    ],
  },
  en: {
    title: "Legal notice",
    heading: "Legal notice",
    sections: [
      {
        title: "Site publisher",
        content:
          "This site is published by Sarobidy Andrianarison, mobile developer, AI engineer and UI/UX Designer, based in Madagascar.",
      },
      {
        title: "Hosting",
        content:
          "This site is hosted by Netlify, Inc., 44 Montgomery Street, Suite 400, San Francisco, CA 94104, United States.",
      },
      {
        title: "Intellectual property",
        content:
          "All content on this site (text, images, videos, source code) is the exclusive property of Sarobidy Andrianarison, unless otherwise stated. Any reproduction, even partial, is prohibited without prior written authorization.",
      },
      {
        title: "Personal data",
        content:
          "This site does not systematically collect personal data. The contact form only transmits the information entered (name, email, message) by email to the publisher. No data is stored in a database, sold, or shared with third parties.",
      },
      {
        title: "Cookies",
        content:
          "This site does not use any tracking or advertising cookies. The only local storage used concerns the theme preference (light/dark), which remains on your device and is never transmitted.",
      },
      {
        title: "Analytics",
        content:
          "This site uses internal navigation tracking for optimization purposes. The data collected includes pages visited, session duration, and interaction events (clicks). This data is anonymized, contains no personal information, and is temporarily stored in server memory without any third-party analytics service. No cookies are used for this analytics.",
      },
      {
        title: "Limitation of liability",
        content:
          "The publisher strives to ensure the accuracy of the information published. However, it cannot be held responsible for errors, omissions, or results obtained through the use of this information.",
      },
    ],
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
    description:
      locale === "fr"
        ? "Mentions légales du site sarobidy-andrianarison.netlify.app"
        : "Legal notice for sarobidy-andrianarison.netlify.app",
    alternates: {
      canonical: `https://sarobidy-andrianarison.netlify.app/${locale}/mentions-legales`,
    },
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i = t[locale as keyof typeof t] ?? t.fr;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">{i.heading}</h1>
      <div className="space-y-8">
        {i.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {section.title}
            </h2>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
