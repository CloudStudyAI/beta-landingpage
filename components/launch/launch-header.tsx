import { LOGIN_URL, START_URL } from "../../lib/launch-links";

const navItems = [
  { href: "#produto", label: "Produto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
] as const;

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300";

export function LaunchHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#0b1430]/85 py-1.5 pl-3.5 pr-2 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md sm:gap-4 sm:py-2.5 sm:pl-6 sm:pr-3">
        <a href="#top" aria-label="CloudStudy — voltar ao início" className={`flex shrink-0 items-center gap-1.5 rounded-lg sm:gap-2 ${focusRing}`}>
          <img src="/brand/cloudstudy-icon.webp" alt="" width={360} height={227} className="h-6 w-auto sm:h-8" />
          <img src="/brand/cloudstudy-wordmark-dark.svg" alt="CloudStudy" width={1495} height={265} className="h-[14px] w-auto sm:h-[19px]" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`rounded-lg text-sm font-bold text-slate-300 transition-colors hover:text-white ${focusRing}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <a href={LOGIN_URL} className={`inline-flex min-h-11 items-center justify-center rounded-xl px-2 text-xs font-bold text-slate-200 transition-colors hover:text-white sm:px-3 sm:text-sm ${focusRing}`}>
            Entrar
          </a>
          <a href={START_URL} data-cta="experimentar" data-cta-position="menu" className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0967e5] sm:px-5 sm:text-sm ${focusRing}`}>
            Experimentar grátis
          </a>
        </div>
      </div>
    </header>
  );
}
