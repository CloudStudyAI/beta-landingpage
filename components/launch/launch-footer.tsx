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
      { href: "https://www.linkedin.com/company/cloudstudy-ai/", label: "LinkedIn" },
    ],
    title: "Social",
  },
] as const;

export function LaunchFooter() {
  return (
    <footer className="bg-[#1877f2] px-5 pb-8 pt-10 text-white sm:px-8 sm:pb-10 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-8">
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
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold tracking-[-0.03em]">CloudStudy</p>
            <p className="mt-1 text-sm text-blue-50/75">Preparação guiada para certificações AWS.</p>
          </div>
          <p className="text-xs text-blue-50/70">© 2026 CloudStudy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
