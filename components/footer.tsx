import { Globe } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { footerLinks, socialLinks } from "@/lib/data";

const socialIcons = {
  LinkedIn: Globe,
  X: Globe,
  Github: Globe,
} as const;

export function Footer() {
  return (
    <footer className="px-3 pb-10 md:px-6 md:pb-14">
      <div className="section-shell border-t border-[var(--color-border-soft)] pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <BrandMark />
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
              CloudStudy ajuda voce a passar na certificacao AWS com trilha guiada,
              simulados inteligentes e suporte de IA contextual.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-[var(--color-text-soft)]">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.label as keyof typeof socialIcons];

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={`${item.label} placeholder`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-surface)] text-[var(--color-text-soft)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-sm text-[var(--color-muted-subtle)]">
          Copyright 2026 Certificloud. CloudStudy e o product mark da plataforma.
        </div>
      </div>
    </footer>
  );
}
