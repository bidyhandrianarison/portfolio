/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    localeDetection: false,
  },
  localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : undefined,
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
