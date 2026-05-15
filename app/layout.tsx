import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

import { IntroGate } from "../components/IntroGate";

import "./globals.css";

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
  title: "CloudStudy",
  description:
    "Landing page pre-launch da CloudStudy para captar interessados em trilhas inteligentes de certificacoes AWS guiadas por IA.",
  icons: {
    icon: "/favicon-cloudstudy.png",
    shortcut: "/favicon-cloudstudy.png",
    apple: "/favicon-cloudstudy.png",
  },
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
