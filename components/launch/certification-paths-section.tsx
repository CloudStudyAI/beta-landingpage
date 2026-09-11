import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SIGNUP_URL } from "../../lib/launch-links";

const launchCertifications = [
  {
    description: "Base de cloud, segurança e custos para começar do zero com clareza.",
    image: "/cert-cloud-practitioner-sem-fundo.png",
    title: "Cloud Practitioner",
  },
  {
    description: "Fundamentos de IA generativa na AWS com foco prático para certificação.",
    image: "/cert-ai-practitioner-sem-fundo.png",
    title: "AI Practitioner",
  },
  {
    description: "Arquitetura de soluções escaláveis, resilientes e prontas para a certificação Associate.",
    image: "/cert-solutions-architect-sem-fundo.png",
    title: "Solutions Architect",
  },
] as const;

export function CertificationPathsSection() {
  return (
    <section id="certificacoes" aria-labelledby="certification-paths-title" className="scroll-mt-8 bg-white px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#102441] px-5 py-12 sm:rounded-[3rem] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-blue-300 sm:text-xs">CERTIFICAÇÕES AWS</p>
          <h2 id="certification-paths-title" className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Escolha a certificação. A CloudStudy guia o caminho.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Cada jornada organiza conteúdo, prática, revisões e simulados em uma sequência clara até a prova.
          </p>
        </div>

        <div className="relative mt-10 lg:mt-16">
          <svg aria-hidden="true" viewBox="0 0 1000 180" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute left-[16.66%] top-10 hidden h-[180px] w-2/3 lg:block">
            <path d="M0 30 C250 30 250 140 500 140 S750 30 1000 30" stroke="#4a6b95" strokeWidth="2" strokeDasharray="4 9" strokeLinecap="round" />
          </svg>
          <ul className="relative grid gap-7 lg:grid-cols-3 lg:items-start lg:gap-8">
            {launchCertifications.map((certification, index) => (
              <li key={certification.title} className={index === 1 ? "lg:pt-12" : ""}>
                <article className="flex flex-col items-center rounded-[2rem] bg-[#f5f8fd] px-5 pb-7 pt-7 text-center sm:px-7 sm:pb-8 lg:rounded-t-[5rem]">
                  <Image src={certification.image} alt={`Badge AWS Certified ${certification.title}`} width={132} height={132} sizes="132px" className="h-[132px] w-[132px] object-contain" />
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.03em] text-[#0b2a6f] sm:text-2xl">{certification.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 lg:min-h-[112px]">{certification.description}</p>
                  <a href={SIGNUP_URL} aria-label={`Explorar jornada: ${certification.title}`} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1479ff] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                    Explorar jornada <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
