"use client";

import { LOGIN_URL, SIGNUP_URL } from "../../lib/launch-links";

const footerGroups = [
  {
    links: [
      { href: "#plataforma", label: "Sobre" },
      { href: "#como-funciona", label: "Como funciona" },
      { href: "#certificacoes", label: "Certificações" },
    ],
    title: "CloudStudy",
  },
  {
    links: [
      { href: SIGNUP_URL, label: "Criar conta" },
      { href: LOGIN_URL, label: "Entrar" },
    ],
    title: "Plataforma",
  },
  {
    links: [
      { href: "#faq", label: "Dúvidas" },
      { href: "mailto:contato@cloudstudy.com.br", label: "Contato" },
    ],
    title: "Suporte",
  },
  {
    links: [
      { href: "/termos", label: "Termos de uso" },
      { href: "/privacidade", label: "Privacidade" },
      { href: "/cancelamento-e-reembolso", label: "Cancelamento e reembolso" },
    ],
    title: "Legal",
  },
  {
    links: [
      { href: "https://www.linkedin.com/company/cloudstudy-ai/posts/?feedView=all", label: "LinkedIn" },
      { href: "https://www.instagram.com/cloudstudy.ai/", label: "Instagram" },
      { href: "https://chat.whatsapp.com/Lsuexbkt1oELAGX8nCH2La?mode=gi_t", label: "Comunidade no WhatsApp" },
    ],
    title: "Social",
  },
] as const;

export function LaunchFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#1250b0] to-[#0b2a6f] px-5 pb-8 pt-10 text-white sm:px-8 sm:pb-10 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 text-center md:grid-cols-5 md:justify-items-stretch md:gap-8 md:text-left">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-7 items-center rounded text-sm font-semibold leading-5 text-blue-50/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {group.title === "Legal" ? (
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("cloudstudy:marketing-preferences"))}
                  className="mt-3 rounded text-sm font-semibold leading-5 text-blue-50/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Preferências de marketing
                </button>
              ) : null}
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/15 pt-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <img src="/brand/cloudstudy-icon.webp" alt="" width={360} height={227} className="h-8 w-auto brightness-0 invert" />
              <img src="/brand/cloudstudy-wordmark-white.svg" alt="CloudStudy" width={1495} height={265} className="h-[19px] w-auto" />
            </div>
            <p className="mt-1 text-sm text-blue-50/75">Conhecimento que eleva</p>
          </div>
          <p className="text-xs text-blue-50/70">© 2026 CloudStudy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
