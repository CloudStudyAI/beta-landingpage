"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { START_URL } from "../../lib/launch-links";

type LevelId = "fundamentos" | "associate" | "professional" | "specialty";

// Os quatro níveis oficiais da AWS. Com muitas trilhas, a seção mostra um nível por vez e um mapa só,
// em vez de um mapa grande para cada certificação.
const levels: readonly { id: LevelId; label: string; hint: string }[] = [
  { id: "fundamentos", label: "Fundamentos", hint: "Para começar do zero na AWS." },
  { id: "associate", label: "Associate", hint: "Para quem já usa AWS no dia a dia." },
  { id: "professional", label: "Professional", hint: "Para quem projeta e opera em escala." },
  { id: "specialty", label: "Specialty", hint: "Para aprofundar uma área, como segurança." },
];

type CertificationPath = {
  badge: string;
  /** Trilha anunciada antes da publicação no app: sem CTA de experiência nem preço. */
  availableFrom?: string;
  code: string;
  description: string;
  level: LevelId;
  map: string;
  /** Aviso que o candidato precisa saber antes de escolher a trilha. */
  note?: string;
  title: string;
};

const certificationPaths: readonly CertificationPath[] = [
  {
    badge: "/launch-assets/badge-clf.webp",
    code: "CLF-C02",
    level: "fundamentos",
    description: "Construa sua base em cloud, segurança, custos e serviços essenciais da AWS.",
    map: "/launch-assets/map-clf.webp",
    title: "AWS Certified Cloud Practitioner",
  },
  {
    badge: "/launch-assets/badge-saa.webp",
    code: "SAA-C03",
    level: "associate",
    description: "Estude arquitetura de soluções escaláveis e resilientes para a certificação Associate.",
    map: "/launch-assets/map-saa.webp",
    title: "AWS Certified Solutions Architect – Associate",
  },
  {
    badge: "/launch-assets/badge-aif.webp",
    code: "AIF-C01",
    level: "fundamentos",
    description: "Entenda fundamentos de IA, IA generativa e serviços relacionados na AWS.",
    map: "/launch-assets/map-aif.webp",
    title: "AWS Certified AI Practitioner",
  },
  {
    badge: "/launch-assets/badge-sap.webp",
    code: "SAP-C03",
    level: "professional",
    description: "Avance para o nível Professional: organizações multi-conta, redes em escala, migração e otimização contínua.",
    map: "/launch-assets/map-sap.webp",
    title: "AWS Certified Solutions Architect – Professional",
  },
  {
    badge: "/launch-assets/badge-dva.webp",
    code: "DVA-C03",
    level: "associate",
    description: "Desenvolva, proteja, teste e otimize aplicações na AWS: Lambda, API Gateway, DynamoDB, CI/CD, observabilidade e IA no ciclo de desenvolvimento.",
    map: "/launch-assets/map-dva.webp",
    title: "AWS Certified Developer – Associate",
  },
  {
    badge: "/launch-assets/badge-dea.webp",
    code: "DEA-C01",
    level: "associate",
    description: "Construa pipelines na AWS, da ingestão à governança: Kinesis, Glue, Redshift, Lake Formation e operação de dados.",
    map: "/launch-assets/map-dea.webp",
    // O guia oficial da DEA-C01 não tem versão em português (conferido em 04/11/2026).
    note: "Conteúdo em português, com os termos da prova em inglês. A prova não tem versão em português.",
    title: "AWS Certified Data Engineer – Associate",
  },
  {
    badge: "/launch-assets/badge-soa.webp",
    code: "SOA-C03",
    level: "associate",
    description: "Opere ambientes na AWS no dia a dia: monitoramento com CloudWatch, automação, recuperação, segurança, redes e otimização de custo.",
    map: "/launch-assets/map-soa.webp",
    title: "AWS Certified CloudOps Engineer – Associate",
  },
  {
    badge: "/launch-assets/badge-dop.webp",
    code: "DOP-C02",
    level: "professional",
    description: "Automatize entrega e operação em escala: pipelines CI/CD, infraestrutura como código, resiliência, observabilidade, resposta a incidentes e segurança.",
    map: "/launch-assets/map-dop.webp",
    // O guia oficial da DOP-C02 não tem versão em português (conferido em 09/11/2026).
    note: "Conteúdo em português, com os termos da prova em inglês. A prova não tem versão em português.",
    title: "AWS Certified DevOps Engineer – Professional",
  },
  {
    badge: "/launch-assets/badge-scs.webp",
    code: "SCS-C03",
    level: "specialty",
    description: "Proteja cargas na AWS: detecção, resposta a incidentes, segurança de infraestrutura, identidade e acesso, proteção de dados e governança.",
    map: "/launch-assets/map-scs.webp",
    // Pagina da certificacao em 09/11/2026: prova em portugues so ate 31/12/2026.
    note: "Conteúdo em português. A prova em português só fica disponível até 31/12/2026.",
    title: "AWS Certified Security – Specialty",
  },
  {
    badge: "/launch-assets/badge-aip.webp",
    code: "AIP-C01",
    level: "professional",
    description: "Coloque IA generativa em produção na AWS: foundation models, RAG, agentes, guardrails, custo, monitoramento e avaliação.",
    map: "/launch-assets/map-aip.webp",
    // O guia oficial da AIP-C01 não tem versão em português (conferido em 10/11/2026).
    note: "Conteúdo em português, com os termos da prova em inglês. A prova não tem versão em português.",
    title: "AWS Certified Generative AI Developer – Professional",
  },
  {
    badge: "/launch-assets/badge-mla.webp",
    code: "MLA-C02",
    level: "associate",
    description: "Prepare dados, treine e implante modelos de ML e IA generativa na AWS, com MLOps, monitoramento, custo e segurança.",
    map: "/launch-assets/map-mla.webp",
    // Pagina da certificacao em 10/11/2026: MLA-C02 em beta, so em ingles.
    note: "Conteúdo em português, com os termos da prova em inglês. A prova não tem versão em português.",
    title: "AWS Certified Machine Learning Engineer – Associate",
  },
] as const;

function CertificationCard({
  certification,
  selected,
  onSelect,
}: {
  certification: CertificationPath;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <div
        className={`flex h-full flex-col rounded-2xl border bg-white p-4 transition-colors sm:p-5 ${
          selected ? "border-[#1479ff] shadow-[0_3px_0_#0b56bd]" : "border-[#e1ecfb] hover:border-[#9cc3f5]"
        }`}
      >
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          aria-label={`Ver o mapa da trilha ${certification.title}`}
          className="flex items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1479ff]"
        >
          <Image src={certification.badge} alt="" width={56} height={56} className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14" />
          <span className="min-w-0">
            <span className="block text-xs font-bold text-[#1479ff]">{certification.code}</span>
            <span className="mt-1 block font-display text-base font-bold leading-snug tracking-[-0.02em] text-[#0b2a6f] sm:text-lg">{certification.title}</span>
          </span>
        </button>
        <p className="mt-3 text-sm leading-6 text-slate-600">{certification.description}</p>
        {certification.note ? <p className="mt-3 rounded-xl bg-[#f4f9ff] px-3 py-2 text-xs leading-5 text-[#0b2a6f] ring-1 ring-inset ring-[#e1ecfb]">{certification.note}</p> : null}
        <div className="mt-auto pt-4">
          {certification.availableFrom ? (
            <p className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border-2 border-dashed border-[#9cc3f5] bg-[#f4f9ff] px-4 text-sm font-bold text-[#0b2a6f]">
              Em breve · {certification.availableFrom}
            </p>
          ) : (
            <a
              href={START_URL}
              data-cta="experimentar"
              data-cta-position={`cert-${certification.code.toLowerCase()}`}
              aria-label={`Iniciar experiência grátis em ${certification.title}`}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1479ff] px-4 text-sm font-bold text-white shadow-[0_3px_0_#0b56bd] transition hover:bg-[#0f6ae6]"
            >
              Experimentar grátis <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export function CertificationPathsSection() {
  const reduceMotion = useReducedMotion();
  const [levelId, setLevelId] = useState<LevelId>("fundamentos");
  const inLevel = certificationPaths.filter((certification) => certification.level === levelId);
  const [selectedCode, setSelectedCode] = useState<string | undefined>(inLevel[0]?.code);
  const selected = inLevel.find((certification) => certification.code === selectedCode) ?? inLevel[0];
  const activeLevel = levels.find((level) => level.id === levelId) ?? levels[0];
  const mapRef = useRef<HTMLElement>(null);

  // No celular o mapa fica acima dos cards; ao escolher outra trilha, rola até ele para a troca ser vista.
  function chooseCertification(code: string) {
    setSelectedCode(code);
    const map = mapRef.current;
    if (!map || window.matchMedia("(min-width: 1024px)").matches) return;
    if (map.getBoundingClientRect().top < 0) map.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function chooseLevel(next: LevelId) {
    setLevelId(next);
    setSelectedCode(certificationPaths.find((certification) => certification.level === next)?.code);
  }

  return (
    <section id="certificacoes" aria-labelledby="certification-paths-title" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <h2 id="certification-paths-title" className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Escolha sua certificação.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:mx-0">
            Cada trilha transforma o conteúdo da prova em um caminho de estudo dentro da CloudStudy.
          </p>
        </div>

        <div role="tablist" aria-label="Nível da certificação" className="mt-10 grid grid-cols-2 gap-1 rounded-2xl bg-[#e8f1fd] p-1 sm:mt-12 sm:inline-grid sm:grid-cols-4">
          {levels.map((level) => {
            const count = certificationPaths.filter((certification) => certification.level === level.id).length;
            const active = level.id === levelId;
            return (
              <button
                key={level.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="certification-level-panel"
                onClick={() => chooseLevel(level.id)}
                className={`min-h-11 whitespace-nowrap rounded-xl px-1 text-[13px] font-bold transition sm:px-5 sm:text-sm ${
                  active ? "bg-white text-[#0b2a6f] shadow-sm" : "text-slate-600 hover:text-[#0b2a6f]"
                }`}
              >
                {level.label}<span className="hidden font-semibold text-slate-400 sm:inline"> {count}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-sm text-slate-600 sm:text-left">{activeLevel.hint}</p>

        <div id="certification-level-panel" role="tabpanel" className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <ul className="grid gap-4 sm:grid-cols-2 lg:order-1">
            {inLevel.map((certification) => (
              <CertificationCard
                key={certification.code}
                certification={certification}
                selected={certification.code === selected?.code}
                onSelect={() => chooseCertification(certification.code)}
              />
            ))}
          </ul>

          {selected ? (
            <figure ref={mapRef} className="order-first scroll-mt-28 rounded-3xl border border-[#cfe1f8] bg-[#f6f9fe] p-1 shadow-[0_3px_0_#0b56bd,0_12px_30px_-22px_rgba(11,42,111,0.45)] lg:order-2 lg:sticky lg:top-28">
              <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selected.code}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selected.map}
                      alt={`Mapa da trilha ${selected.title} na CloudStudy.`}
                      width={1440}
                      height={810}
                      sizes="(min-width: 1024px) 600px, (min-width: 640px) 704px, calc(100vw - 48px)"
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <figcaption className="px-4 py-3 text-sm font-semibold text-[#0b2a6f]">Mapa da trilha {selected.code}</figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
