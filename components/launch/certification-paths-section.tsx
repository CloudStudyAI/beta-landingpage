"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import solutionsArchitectMap from "../../mapas/1 (1).svg";
import cloudPractitionerMap from "../../mapas/2 (1).svg";
import aiPractitionerMap from "../../mapas/3 (1).svg";
import solutionsArchitectBadge from "../../mapas/certificações/1 (3).svg";
import cloudPractitionerBadge from "../../mapas/certificações/2 (3).svg";
import aiPractitionerBadge from "../../mapas/certificações/3 (3).svg";
import { SIGNUP_URL } from "../../lib/launch-links";

type CertificationPath = {
  badge: StaticImageData;
  code: string;
  description: string;
  map: StaticImageData;
  title: string;
};

const certificationPaths: readonly CertificationPath[] = [
  {
    badge: cloudPractitionerBadge,
    code: "CLF-C02",
    description: "Construa sua base em cloud, segurança, custos e serviços essenciais da AWS.",
    map: cloudPractitionerMap,
    title: "AWS Certified Cloud Practitioner",
  },
  {
    badge: solutionsArchitectBadge,
    code: "SAA-C03",
    description: "Estude arquitetura de soluções escaláveis e resilientes para a certificação Associate.",
    map: solutionsArchitectMap,
    title: "AWS Certified Solutions Architect – Associate",
  },
  {
    badge: aiPractitionerBadge,
    code: "AIF-C01",
    description: "Entenda fundamentos de IA, IA generativa e serviços relacionados na AWS.",
    map: aiPractitionerMap,
    title: "AWS Certified AI Practitioner",
  },
] as const;

function CertificationPathBlock({ certification, reversed }: { certification: CertificationPath; reversed: boolean }) {
  const mapRef = useRef<HTMLElement>(null);
  const isMapInView = useInView(mapRef, { once: true, amount: 0.35 });
  const gridColumns = reversed ? "lg:grid-cols-[1.22fr_0.78fr]" : "lg:grid-cols-[0.78fr_1.22fr]";
  const textPosition = reversed ? "lg:col-start-2" : "lg:col-start-1";
  const mapPosition = reversed ? "lg:col-start-1" : "lg:col-start-2";
  const hiddenMapPosition = reversed ? "translate-y-6 opacity-0 lg:-translate-x-[72px] lg:translate-y-0" : "translate-y-6 opacity-0 lg:translate-x-[72px] lg:translate-y-0";
  const mapReveal = isMapInView ? "translate-x-0 translate-y-0 opacity-100" : hiddenMapPosition;

  return (
    <li className={`grid gap-x-16 gap-y-8 py-12 first:pt-0 last:pb-0 sm:gap-y-6 lg:py-20 ${gridColumns}`}>
      <div className={`${textPosition} self-end lg:row-start-1`}>
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <Image src={certification.badge} alt="" width={72} height={72} className="h-14 w-14 shrink-0 object-contain sm:h-[72px] sm:w-[72px]" />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1479ff]">{certification.code}</p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0b2a6f] sm:text-3xl">{certification.title}</h3>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-md text-center text-sm leading-7 text-slate-600 sm:mx-0 sm:text-left sm:text-base">{certification.description}</p>
      </div>

      <figure
        ref={mapRef}
        className={`${mapPosition} ${mapReveal} relative w-full self-center rounded-3xl border border-[#cfe1f8] bg-[#f6f9fe] p-1 shadow-[0_3px_0_#0b56bd,0_12px_30px_-22px_rgba(11,42,111,0.38)] transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none sm:p-1.5 sm:shadow-[0_4px_0_#0b56bd,0_12px_30px_-22px_rgba(11,42,111,0.38)] lg:row-span-2 lg:row-start-1`}
      >
        <span aria-hidden="true" className="absolute left-6 top-[-1px] z-10 h-px w-10 bg-[#1479ff] sm:left-8 sm:w-12" />
        <div className="aspect-video overflow-hidden rounded-[1.25rem] bg-white">
          <Image
            src={certification.map}
            alt={`Mapa da trilha ${certification.title} na CloudStudy.`}
            sizes="(min-width: 1024px) 650px, (min-width: 640px) 704px, calc(100vw - 48px)"
            className="h-full w-full object-contain"
          />
        </div>
      </figure>

      <a href={SIGNUP_URL} aria-label={`Explorar jornada ${certification.title}`} className={`${textPosition} inline-flex min-h-12 w-full items-center justify-center gap-2 self-start rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0967e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:w-auto lg:row-start-2`}>
        Explorar jornada <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </li>
  );
}

export function CertificationPathsSection() {
  return (
    <section id="certificacoes" aria-labelledby="certification-paths-title" className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <h2 id="certification-paths-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Escolha sua certificação.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:mx-0">
            Cada trilha transforma o conteúdo da prova em um caminho de estudo dentro da CloudStudy.
          </p>
        </div>

        <ol className="mt-12 sm:mt-16 lg:mt-20">
          {certificationPaths.map((certification, index) => (
            <CertificationPathBlock key={certification.code} certification={certification} reversed={index % 2 === 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
