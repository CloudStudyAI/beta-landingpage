import Image from "next/image";

import logo from "../../Logo-CloudStudy-removebg-cropped.png";
import { LOGIN_URL } from "../../lib/launch-links";

const navItems = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#faq", label: "Dúvidas" },
] as const;

export function LaunchHeader() {
  return (
    <header className="relative z-30 bg-white px-3 pb-6 pt-3 sm:px-6 sm:pb-7 sm:pt-4">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-4">
        <a href="#top" aria-label="CloudStudy — voltar ao início" className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          <Image src={logo} alt="CloudStudy" sizes="(min-width: 640px) 148px, 104px" className="h-auto w-[104px] sm:w-[148px]" priority />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-lg text-sm font-bold text-slate-600 transition-colors hover:text-[#1479ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <a href={LOGIN_URL} className="inline-flex min-h-11 items-center justify-center rounded-xl px-1 text-xs font-bold text-[#0b2a6f] transition-colors hover:text-[#1479ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-3 sm:text-sm">
            Entrar
          </a>
          <a href="#lista-de-espera" className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-2.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-5 sm:text-sm">
            Quero participar
          </a>
        </div>
      </div>
    </header>
  );
}
