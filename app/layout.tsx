import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";

import { IntroGate } from "../components/IntroGate";

import "./globals.css";

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CloudStudy",
  description:
    "Landing page pre-launch da CloudStudy para captar interessados em trilhas inteligentes de certificacoes AWS guiadas por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <IntroGate>{children}</IntroGate>
      </body>
    </html>
  );
}
