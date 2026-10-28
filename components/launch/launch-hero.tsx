"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { START_URL } from "../../lib/launch-links";

const trailSteps = [
  { done: true, label: "Introdução à computação em nuvem" },
  { done: true, label: "Amazon EC2" },
  { current: true, label: "Segurança e conformidade" },
  { label: "Amazon S3" },
] as const;

const areas = [
  { label: "Conceitos de nuvem", tone: "bg-[#1479ff]", width: "78%" },
  { label: "Segurança", tone: "bg-[#5aa9ff]", width: "52%" },
  { label: "Redes", tone: "bg-[#8be0ff]", width: "34%" },
] as const;

const premiumEase = [0.22, 1, 0.36, 1] as const;
const labelClass = "font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#7fb6ff]";
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300";

export function LaunchHero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" aria-labelledby="launch-hero-title" className="relative isolate z-10 flow-root bg-[#060b1a] text-[#e8f0ff]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-14rem] h-[38rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(20,121,255,0.4),transparent)] sm:h-[42rem] sm:w-[64rem]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pt-28 text-center sm:px-8 sm:pt-36 lg:pt-44">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#7fb6ff]/35 px-3.5 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#7fb6ff] sm:text-xs sm:tracking-[0.14em]">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1479ff]" />
          CLF-C02 · SAA-C03 · AIF-C01
        </p>

        <h1 id="launch-hero-title" className="mt-6 max-w-4xl text-balance font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.25rem]">
          Estude AWS sabendo exatamente o{" "}
          <span className="bg-gradient-to-r from-[#5aa9ff] to-[#8be0ff] bg-clip-text text-transparent">próximo passo.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
          Seu estudo se ajusta ao que você erra. Simulados, aulas e flashcards no mesmo lugar, com o Nimbo mostrando o que fazer agora.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:w-auto sm:max-w-none sm:flex-row">
          <a href={START_URL} data-cta="experimentar" data-cta-position="hero" className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-8 py-3 text-base font-bold text-white shadow-[0_14px_40px_-14px_rgba(20,121,255,0.9)] transition-colors hover:bg-[#0967e5] ${focusRing}`}>
            Experimentar grátis <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
          <a href="#como-funciona" className={`inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-white/25 px-7 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 ${focusRing}`}>
            Ver como funciona
          </a>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-400">Sem cartão de crédito. Crie sua conta e escolha uma certificação.</p>
      </div>

      <div className="relative z-10 mx-auto -mb-20 mt-10 max-w-6xl px-3 sm:-mb-28 sm:mt-14 sm:px-8 lg:-mb-32">
        <motion.div
          className="rounded-[1.5rem] border border-white/15 bg-gradient-to-b from-[#0e1a38] to-[#0a1226] shadow-[0_40px_120px_-30px_rgba(20,121,255,0.5)] sm:rounded-[1.75rem]"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase, delay: 0.15 }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2a3556]" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2a3556]" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2a3556]" />
            <span className="ml-2 truncate font-mono text-xs text-slate-400">app.cloudstudy.com.br/dashboard</span>
            <span className="ml-auto shrink-0 rounded-full border border-white/15 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate-400">Exemplo</span>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
            <div className="relative flex items-center justify-center pb-10 pt-8 sm:pb-12 lg:pt-4">
              <Image
                src="/launch-assets/map-clf.webp"
                alt="Mapa do tesouro com os 18 módulos da trilha do Cloud Practitioner, do início da jornada até a certificação."
                width={1440}
                height={810}
                priority
                sizes="(min-width: 1024px) 600px, 92vw"
                className="h-auto w-[94%] -rotate-2 rounded-3xl border-[6px] border-white shadow-[0_36px_70px_-26px_rgba(0,0,0,0.75)]"
              />
              <div className="absolute right-1 top-0 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-extrabold text-[#0b2a6f] shadow-[0_16px_34px_-14px_rgba(0,0,0,0.6)] sm:text-[0.8125rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1479ff]" />
                Você está no módulo 3
              </div>
              <motion.div
                className="absolute -bottom-6 -left-1 w-28 will-change-transform sm:-bottom-8 sm:-left-3 sm:w-40 lg:w-44"
                animate={reduce ? { y: 0 } : { y: [0, -7, 0] }}
                transition={reduce ? { duration: 0 } : { duration: 4.6, ease: "easeInOut", repeat: Infinity }}
              >
                <Image src="/launch-assets/robot-hero.webp" alt="Nimbo, mentor da CloudStudy, apresentando a jornada de estudos." width={960} height={960} priority sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 112px" className="h-auto w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)]" />
              </motion.div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="hidden rounded-[1.125rem] border border-white/10 bg-white/[0.04] p-5 md:block">
                <p className={labelClass}>Trilha · CLF-C02</p>
                <ul className="mt-4 grid gap-3">
                  {trailSteps.map((step) => (
                    <li
                      key={step.label}
                      className={`flex items-center gap-3 text-[0.9375rem] font-bold ${"current" in step ? "-mx-3 rounded-xl border border-[#5aa9ff]/40 bg-[#1479ff]/15 px-3 py-2.5 text-white" : "done" in step ? "text-white" : "text-slate-500"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${"done" in step ? "bg-[#1479ff]" : "current" in step ? "border-2 border-[#5aa9ff]" : "border-2 border-[#2a3556]"}`}
                      >
                        {"done" in step ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
                      </span>
                      {step.label}
                      {"current" in step ? <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#8be0ff]">Agora</span> : null}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-1 flex-col gap-4 rounded-[1.125rem] border border-white/10 bg-white/[0.04] p-5">
                <p className={labelClass}>Desempenho por área</p>
                {areas.map((area, index) => (
                  <div key={area.label}>
                    <p className="text-[0.8125rem] font-bold text-slate-300">{area.label}</p>
                    <div className="mt-1.5 h-2 rounded-full bg-[#16213f]">
                      <motion.div
                        className={`h-2 rounded-full ${area.tone}`}
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: area.width }}
                        transition={{ duration: 0.9, ease: premiumEase, delay: 0.6 + index * 0.12 }}
                      />
                    </div>
                  </div>
                ))}
                <p className="mt-auto rounded-xl border border-[#8be0ff]/35 bg-[#8be0ff]/10 px-3.5 py-3 text-[0.8125rem] font-bold leading-5 text-[#8be0ff]">
                  Você errou 3 questões de Redes. Foco recomendado: módulo 5, Redes e conectividade.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
