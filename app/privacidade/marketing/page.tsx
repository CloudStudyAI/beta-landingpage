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
      <p className="mt-3 text-sm text-slate-600">Aviso complementar atualizado em 27 de outubro de 2026.</p>
      <div className="mt-9 space-y-7 text-base leading-7">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Escolha opcional</h2>
          <p className="mt-2">O aceite de marketing é separado dos Termos de Uso. Você pode recusar sem perder a experiência gratuita ou o acesso contratado. Há uma única escolha, feita no aviso de privacidade desta landing: ela vale para a medição da landing e para os eventos do cadastro feito em seguida no aplicativo, no mesmo navegador. Antes do cadastro, altere em Preferências de marketing na landing; depois, a escolha da conta fica em Configurações no aplicativo.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Pixel na landing</h2>
          <p className="mt-2">Após o aceite, o Pixel da Meta mede visitas à página e cliques em Criar conta ou Experimentar e grava os cookies próprios da Meta _fbp (identificador do navegador) e, se você chegou por um anúncio, _fbc (identificador do clique). Não enviamos conteúdo de formulários; a conexão com a Meta pode expor dados técnicos, como o endereço IP.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Origem da visita</h2>
          <p className="mt-2">Após o aceite, conservamos no navegador por até 30 dias apenas utm_source, utm_medium, utm_campaign, utm_content e utm_id válidos, com a data de captura, e os identificadores _fbc e _fbp no formato da Meta, que acompanham o link de cadastro no aplicativo. Sem aceite, os parâmetros válidos da página atual podem acompanhar o link de cadastro sem armazenamento persistente. Valores que pareçam e-mail, telefone ou URL são descartados.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Conversões do aplicativo</h2>
          <p className="mt-2">Se você aceitou neste aviso antes de se cadastrar, a API pode enviar à Meta eventos de cadastro confirmado, início efetivo da experiência gratuita, checkout criado e primeira compra aprovada. Compras pendentes, renovações e liberações administrativas não são contabilizadas como primeira compra. E-mail e identificador da conta são enviados protegidos por hash; os identificadores _fbc e _fbp vão no formato da Meta, sem hash, para ligar o evento ao anúncio. O evento de compra inclui valor e moeda pagos. O token da API de Conversões fica somente no servidor. Se você recusou, ou se cadastrou sem ter feito essa escolha no mesmo navegador, nenhum evento da conta é enviado.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Revogação e contato</h2>
          <p className="mt-2">Recusar aqui interrompe novos eventos desta landing e, se feito antes do cadastro, impede os eventos da conta. Depois do cadastro, mudar a preferência na landing não altera a conta: para parar os eventos da conta, revogue em Configurações no aplicativo. A revogação não desfaz eventos já transmitidos. Para dúvidas sobre privacidade, escreva para <a className="text-blue-700 underline" href={`mailto:${LEGAL_OPERATOR.privacyEmail}`}>{LEGAL_OPERATOR.privacyEmail}</a>.</p>
        </section>
      </div>
    </main>
  );
}
