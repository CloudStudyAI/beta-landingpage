import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import "./tracking.css";
import { LandingTracking } from "../components/landing-tracking";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Cloud Study | Preparação para certificações AWS",
  description:
    "Prepare-se para certificações AWS com aulas, simulados, flashcards e trilhas de estudo em uma única plataforma.",
  openGraph: {
    title: "Cloud Study | Preparação para certificações AWS",
    description:
      "Prepare-se para certificações AWS com aulas, simulados, flashcards e trilhas de estudo em uma única plataforma.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="facebook-domain-verification" content="457w3x34nzob0ykpl2kgckvmvptjvm" />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
        <LandingTracking />
      </body>
    </html>
  );
}
