import type { Metadata } from "next";
import Link from "next/link";

import { LEGAL_OPERATOR } from "../../../content/legal/v1.1";

export const metadata: Metadata = {
  title: "Medição de marketing | Cloud Study",
  description: "Como o Cloud Study mede campanhas mediante consentimento opcional.",
};

export default function MarketingPrivacyNotice() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 text-slate-800 sm:py-20">
      <Link href="/privacidade" className="text-sm font-semibold text-blue-700 underline">Política de Privacidade</Link>
      <h1 className="mt-8 text-3xl font-bold text-slate-950 sm:text-4xl">Medição de marketing</h1>
      <p className="mt-3 text-sm text-slate-600">Aviso complementar publicado em 25 de outubro de 2026.</p>
      <div className="mt-9 space-y-7 text-base leading-7">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Escolha opcional</h2>
          <p className="mt-2">O aceite de marketing é separado dos Termos de Uso. Você pode recusar sem perder a experiência gratuita ou o acesso contratado. O Pixel desta landing e os eventos da sua conta têm escolhas independentes: altere a primeira em Preferências de marketing na landing e a segunda em Configurações da conta no aplicativo.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Pixel na landing</h2>
          <p className="mt-2">Após o aceite, o Pixel da Meta mede visitas à página e cliques em Criar conta ou Experimentar. Não enviamos conteúdo de formulários ou a URL completa; a conexão com a Meta pode expor dados técnicos, como o endereço IP.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Origem da visita</h2>
          <p className="mt-2">Após o aceite, conservamos no navegador por até 30 dias apenas utm_source, utm_medium, utm_campaign, utm_content e utm_id válidos, com a data de captura. Sem aceite, os parâmetros válidos da página atual podem acompanhar o link de cadastro sem armazenamento persistente. Valores que pareçam e-mail, telefone ou URL são descartados.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Conversões do aplicativo</h2>
          <p className="mt-2">O cadastro oferece uma escolha própria de marketing, desmarcada inicialmente. Com seu aceite, a API pode enviar à Meta eventos de cadastro confirmado, início efetivo da experiência gratuita, checkout criado e primeira compra aprovada. Compras pendentes, renovações e liberações administrativas não são contabilizadas como primeira compra. Identificadores de correspondência são protegidos por hash; o evento de compra inclui valor e moeda pagos. O token da API de Conversões fica somente no servidor.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Revogação e contato</h2>
          <p className="mt-2">Recusar o Pixel aqui interrompe novos eventos desta landing, mas não revoga o aceite dado separadamente no cadastro. Para parar os eventos da conta, revogue em Configurações no aplicativo. A revogação não desfaz eventos já transmitidos. Para dúvidas sobre privacidade, escreva para <a className="text-blue-700 underline" href={`mailto:${LEGAL_OPERATOR.privacyEmail}`}>{LEGAL_OPERATOR.privacyEmail}</a>.</p>
        </section>
      </div>
    </main>
  );
}
