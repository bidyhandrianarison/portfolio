import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Sarobidy Andrianarison — Mobile Dev · IA Engineer · UI/UX Designer",
    template: "%s — Sarobidy Andrianarison",
  },
  description:
    "Hybrid engineer building mobile apps, AI systems, and design systems. Freelance & hiring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
