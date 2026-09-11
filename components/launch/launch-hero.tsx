import Image from "next/image";
import { ArrowRight, BookOpen, Layers3, Play } from "lucide-react";

import { SIGNUP_URL } from "../../lib/launch-links";

export function LaunchHero() {
  return (
    <section id="top" aria-labelledby="launch-hero-title" className="relative isolate overflow-hidden rounded-b-[2rem] bg-[#080f20] px-5 pb-0 pt-12 text-white sm:rounded-b-[3rem] sm:px-8 sm:pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_65%,rgba(20,121,255,0.09),transparent_65%)]" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-bold leading-5 tracking-[0.18em] text-blue-300 sm:text-xs sm:tracking-[0.22em]">
            PREPARAÇÃO GUIADA PARA CERTIFICAÇÕES AWS
          </p>
          <h1 id="launch-hero-title" className="mt-5 text-balance font-display text-[2.4rem] font-bold leading-[1.1] tracking-[-0.055em] sm:text-5xl lg:text-[4.25rem]">
            Estude para sua certificação AWS sabendo o <span className="text-[#539eff]">próximo passo.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            A CloudStudy conecta aulas, prática, revisões e simulados em uma jornada guiada para você avançar com clareza até a prova.
          </p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <a href={SIGNUP_URL} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-[#1479ff] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#0b56bd] transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
              Criar minha conta <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#posicionamento" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
              Conhecer a plataforma
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-9 h-[300px] max-w-3xl sm:mt-10 sm:h-[265px]" aria-label="Nimbo, seu mentor, e exemplos da jornada de estudos">
          <div className="absolute bottom-0 left-1/2 w-[190px] -translate-x-1/2 sm:w-[245px]">
            <p className="mb-2 text-center text-[11px] font-semibold tracking-wide text-blue-200">Nimbo · seu mentor</p>
            <Image src="/robo-novo.png" alt="Nimbo, o mentor da CloudStudy." width={450} height={450} sizes="(min-width: 640px) 245px, 190px" className="h-auto w-full" priority />
          </div>
          <div className="absolute left-0 top-0 rounded-2xl border border-blue-300/15 bg-[#111e34]/95 px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:left-5 sm:top-12 sm:px-4">
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.12em] text-blue-300 sm:text-[10px]">
              <Play aria-hidden="true" className="h-3.5 w-3.5" /> PRÓXIMA AULA
            </div>
            <p className="mt-2 text-xs font-semibold text-white sm:text-sm">Fundamentos da AWS</p>
          </div>
          <div className="absolute right-0 top-0 rounded-2xl border border-blue-300/15 bg-[#111e34]/95 px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:right-6 sm:top-8 sm:px-4">
            <p className="text-[9px] font-bold tracking-[0.12em] text-blue-300 sm:text-[10px]">PROGRESSO</p>
            <p className="mt-2 text-xs font-semibold text-white sm:text-sm">64% da jornada</p>
            <div aria-hidden="true" className="mt-3 h-1 rounded-full bg-white/10"><div className="h-full w-[64%] rounded-full bg-[#539eff]" /></div>
          </div>
          <div className="absolute bottom-7 right-0 hidden rounded-2xl border border-blue-300/15 bg-[#111e34]/95 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:block">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-blue-300">
              <Layers3 aria-hidden="true" className="h-3.5 w-3.5" /> PLANO DE HOJE
            </div>
            <p className="mt-2 text-sm font-semibold text-white">Revisar 18 flashcards</p>
          </div>
        </div>

        {/* Presentation frame awaiting a verified screenshot of the current product. */}
        <div role="img" aria-label="Área de apresentação da CloudStudy, ainda sem captura de tela do produto." className="relative mx-auto max-w-5xl overflow-hidden rounded-t-[1.5rem] border border-b-0 border-blue-200/15 bg-[#0d192c] p-2 shadow-[0_-16px_65px_-30px_rgba(20,121,255,0.25)] sm:rounded-t-[2rem] sm:p-3">
          <div className="flex min-h-[170px] flex-col items-center justify-center rounded-t-[1rem] border border-b-0 border-white/[0.06] bg-[linear-gradient(180deg,#101f35_0%,#0b1526_100%)] px-5 py-10 sm:min-h-[235px]">
            <BookOpen aria-hidden="true" className="h-7 w-7 text-blue-300/70" strokeWidth={1.5} />
            <p className="mt-3 font-display text-xl font-semibold tracking-tight text-white/90">CloudStudy</p>
            <p className="mt-3 text-center text-xs leading-6 tracking-wide text-slate-400 sm:text-sm">Aulas · Prática · Revisões · Simulados</p>
          </div>
        </div>
      </div>
    </section>
  );
}
