import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import heroRobot from "../../robos/3.svg";
import { SIGNUP_URL } from "../../lib/launch-links";

const valuePoints = ["Trilha organizada", "Próximo passo visível", "Estudo no seu ritmo"] as const;

export function LaunchHero() {
  return (
    <section id="top" aria-labelledby="launch-hero-title" className="relative isolate overflow-hidden bg-white px-5 pb-16 pt-40 sm:px-8 sm:pb-20 sm:pt-52 lg:pb-24 lg:pt-64">
      <svg aria-hidden="true" viewBox="0 0 1440 260" preserveAspectRatio="none" focusable="false" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 w-full fill-[#1877f2] sm:h-44 lg:h-56">
        <path d="M0 0h1440v220c-270 0-305-100-720-100S270 220 0 220Z" />
      </svg>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 id="launch-hero-title" className="text-balance font-display text-[clamp(2.25rem,10.5vw,2.65rem)] font-bold leading-[1.03] tracking-[-0.06em] text-[#0b2a6f] sm:text-6xl lg:text-[4.5rem]">
            Estude AWS sabendo exatamente o <span className="text-[#1479ff]">próximo passo.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">
            A CloudStudy transforma conteúdo, prática e revisão em uma jornada clara para você avançar sem se perder.
          </p>

          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <a href={SIGNUP_URL} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-7 py-3 text-base font-bold text-white transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              Criar minha conta <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </a>
            <a href="#plataforma" className="inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-7 py-3 text-base font-bold text-[#0b2a6f] transition-colors hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              Conhecer a plataforma
            </a>
          </div>

          <ul className="mt-8 flex flex-col items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold text-slate-600 sm:flex-row sm:flex-wrap sm:items-stretch lg:justify-start">
            {valuePoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} /></span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[31rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-16 bottom-2 h-10 rounded-full bg-[#0b2a6f]/15 blur-xl" />
          <div className="relative min-h-[23rem] sm:min-h-[31rem]">
            <Image src={heroRobot} alt="Nimbo, mentor da CloudStudy, apresentando a jornada de estudos." priority sizes="(min-width: 1024px) 500px, 88vw" className="absolute -bottom-5 left-1/2 h-auto w-[94%] max-w-[31rem] -translate-x-1/2 sm:-bottom-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
