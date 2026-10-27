import { ArrowRight, Check } from "lucide-react";

import { SIGNUP_URL, START_URL } from "../../lib/launch-links";
import { ALL_ACCESS_MONTHLY_CENTS, LIFETIME_PRICES_CENTS, formatBrl } from "../../lib/launch-pricing";

const freeFeatures = [
  "Aulas selecionadas da certificação",
  "12 flashcards para fixar o conteúdo",
  "Diagnóstico de 10 questões",
  "Escolha CLF-C02, SAA-C03 ou AIF-C01",
] as const;

const allAccessFeatures = [
  "Trilhas, aulas, simulados, flashcards e desempenho",
  "As três certificações e as próximas adições ao catálogo",
  "Cartão com renovação mensal ou Pix de 30 dias, sem renovação automática",
  "Cancele quando quiser",
] as const;

const lifetimeOffers = [
  { code: "CLF-C02", name: "Cloud Practitioner", cents: LIFETIME_PRICES_CENTS["CLF-C02"] },
  { code: "AIF-C01", name: "AI Practitioner", cents: LIFETIME_PRICES_CENTS["AIF-C01"] },
  { code: "SAA-C03", name: "Solutions Architect", cents: LIFETIME_PRICES_CENTS["SAA-C03"] },
] as const;

const cardBase = "relative flex flex-col rounded-3xl border-2 bg-white p-6 sm:p-7";
const checkClass = "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700";

export function PricingSection() {
  const lifetimeFrom = Math.min(...lifetimeOffers.map((offer) => offer.cents));

  return (
    <section id="planos" aria-labelledby="pricing-title" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#1479ff]">Planos</p>
          <h2 id="pricing-title" className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl mt-3">
            Comece grátis. Libere tudo quando quiser.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Experimente uma amostra de cada certificação sem cartão de crédito e escolha o plano só depois de conhecer a plataforma.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          <article className={`${cardBase} border-slate-200`}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1479ff]">Para começar</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#0b2a6f]">Experiência grátis</h3>
            <p className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] text-[#0b2a6f]">{formatBrl(0)}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">por certificação, sem cartão</p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className={checkClass}><Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} /></span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a
                href={START_URL}
                data-cta="experimentar"
                data-cta-position="planos-gratis"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                Experimentar grátis <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>

          <article className={`${cardBase} border-[#1479ff] shadow-[0_18px_40px_-28px_rgba(20,121,255,0.55)]`}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1479ff]">Todas as certificações</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#0b2a6f]">All Access</h3>
            <p className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] text-[#0b2a6f]">
              {formatBrl(ALL_ACCESS_MONTHLY_CENTS)}
              <span className="ml-1.5 text-base font-semibold tracking-normal text-slate-500">/ mês</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">uma assinatura, todo o catálogo</p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">
              {allAccessFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className={checkClass}><Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} /></span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a
                href={SIGNUP_URL}
                data-cta="criar_conta"
                data-cta-position="planos-all-access"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#1479ff] bg-white px-5 py-3 text-sm font-bold text-[#0b2a6f] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                Criar conta para assinar <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>

          <article className={`${cardBase} border-slate-200`}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1479ff]">Pagamento único</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[#0b2a6f]">Acesso vitalício</h3>
            <p className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] text-[#0b2a6f]">
              <span className="mr-1.5 text-base font-semibold tracking-normal text-slate-500">a partir de</span>
              {formatBrl(lifetimeFrom)}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">por certificação, sem renovação</p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">
              {lifetimeOffers.map((offer) => (
                <li key={offer.code} className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span>
                    <span className="font-bold text-[#0b2a6f]">{offer.name}</span>
                    <span className="ml-2 text-xs font-semibold text-slate-500">{offer.code}</span>
                  </span>
                  <span className="shrink-0 font-bold text-[#0b2a6f]">{formatBrl(offer.cents)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a
                href={SIGNUP_URL}
                data-cta="criar_conta"
                data-cta-position="planos-vitalicio"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#0b2a6f] transition-colors hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                Criar conta para comprar <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-500 sm:text-sm">
          Valores em reais. Veja as condições na{" "}
          <a href="/cancelamento-e-reembolso" className="font-semibold text-[#0b56bd] underline underline-offset-2">Política de Cancelamento e Reembolso</a>.
        </p>
      </div>
    </section>
  );
}
