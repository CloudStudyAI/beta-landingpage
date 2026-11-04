import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LEGAL_OPERATOR } from "@/content/legal/v1.1";
import { APP_BASE_URL } from "@/lib/launch-links";

export const metadata: Metadata = {
  title: "Suporte | Cloud Study",
  description: "Fale com o suporte do Cloud Study e resolva acesso, assinatura, reembolso e exclusão de conta.",
};

// Apple handles App Store billing itself: cancelling and refunding those purchases
// never goes through our account tools, so the two paths stay apart on this page.
const topics = [
  {
    title: "Não consigo entrar",
    body: "Peça um link para criar uma senha nova. A mesma conta funciona no site e no app.",
    links: [{ href: `${APP_BASE_URL}/auth/esqueceu-senha`, label: "Redefinir senha" }],
  },
  {
    title: "Cancelar uma assinatura",
    body: "Comprou no site: use as ferramentas da sua conta. Comprou no app para iPhone: cancele nos Ajustes do iPhone, em Assinaturas, pelo menos 24 horas antes da renovação.",
    links: [{ href: "/cancelamento-e-reembolso", label: "Regras de cancelamento" }],
  },
  {
    title: "Pedir reembolso",
    body: "Comprou no site: siga a política de cancelamento e reembolso. Comprou no app para iPhone: o pedido é feito direto à Apple.",
    links: [
      { href: "/cancelamento-e-reembolso", label: "Política de reembolso" },
      { href: "https://reportaproblem.apple.com/", label: "Reembolso pela Apple" },
    ],
  },
  {
    title: "Excluir minha conta",
    body: "No app, abra Conta e toque em Quero excluir minha conta. No site, use as configurações do painel. A exclusão é definitiva e pede sua senha.",
    links: [{ href: "/privacidade", label: "Política de privacidade" }],
  },
] as const;

export default function SupportPage() {
  return (
    <main className="page-shell min-h-screen bg-[#f4f9ff] text-[#0b2a6f]">
      <header className="border-b border-[#e1ecfb] bg-white">
        <div className="section-shell flex min-h-20 items-center justify-between gap-5 py-4">
          <Link href="/" aria-label="Voltar para a página inicial da CloudStudy">
            <Image src="/logo-blue-sem-fundo.png" alt="CloudStudy" width={900} height={600} className="h-auto w-[160px] sm:w-[180px]" priority />
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600 transition hover:text-[#0b2a6f]">
            Voltar ao início
          </Link>
        </div>
      </header>

      <div className="section-shell grid grid-cols-[minmax(0,1fr)] gap-8 py-10 lg:py-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#1479ff]">Suporte</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Como podemos ajudar?</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Veja os casos mais comuns. Se o seu não estiver aqui, fale com a gente por e-mail.
          </p>
        </div>

        <section aria-label="Fale com a gente" data-testid="support-contact" className="rounded-2xl border border-[#e1ecfb] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#1479ff]">Fale com a gente</p>
          <a
            href={`mailto:${LEGAL_OPERATOR.supportEmail}`}
            className="mt-2 inline-flex min-h-11 items-center break-all font-display text-xl font-bold underline decoration-[#8be0ff] underline-offset-4 transition hover:text-[#1479ff] sm:text-2xl"
          >
            {LEGAL_OPERATOR.supportEmail}
          </a>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Escreva do e-mail da sua conta, conte o que aconteceu e diga se usou o site ou o app. Nunca envie sua senha.
          </p>
        </section>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <article key={topic.title} className="grid content-start gap-2 rounded-2xl border border-[#e1ecfb] bg-white p-5">
              <h2 className="font-display text-lg font-bold">{topic.title}</h2>
              <p className="text-sm leading-6 text-slate-600">{topic.body}</p>
              <div className="flex flex-wrap gap-x-4 text-sm font-semibold text-[#1479ff]">
                {topic.links.map((link) => {
                  const external = link.href.startsWith("https://");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
