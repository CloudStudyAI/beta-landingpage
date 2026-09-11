import Image from "next/image";

import logo from "../../Logo-CloudStudy-removebg-cropped.png";
import { LOGIN_URL, SIGNUP_URL } from "../../lib/launch-links";

const navItems = [
  { href: "#sistema", label: "Produto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#posicionamento", label: "Sobre" },
] as const;

export function LaunchHeader() {
  return (
    <header className="relative z-20 bg-[#080f20] px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-white/70 bg-white/95 px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <a href="#top" className="site-header__brand" aria-label="CloudStudy">
            <Image
              src={logo}
              alt="CloudStudy"
              sizes="(min-width: 640px) 138px, 108px"
              className="h-auto w-[108px] sm:w-[138px]"
              priority
            />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <a href={LOGIN_URL} className="inline-flex min-h-11 items-center rounded-lg text-xs font-semibold text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:text-sm">
              Entrar
            </a>
            <a
              href={SIGNUP_URL}
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl bg-[#1479ff] px-3 py-3 text-xs font-bold text-white shadow-[0_3px_0_#0b56bd] transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-5 sm:text-sm"
            >
              Criar minha conta
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
