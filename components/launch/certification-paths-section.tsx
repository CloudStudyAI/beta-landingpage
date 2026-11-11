"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { certificationAccents } from "../../lib/certification-accents";
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

const accents = certificationAccents;
const shortTitle = (title: string) => title.replace("AWS Certified ", "");
const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8be0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b1a]";

export function CertificationPathsSection() {
  const reduceMotion = useReducedMotion();
  const [levelId, setLevelId] = useState<LevelId>("fundamentos");
  const inLevel = certificationPaths.filter((certification) => certification.level === levelId);
  const [selectedCode, setSelectedCode] = useState<string | undefined>(inLevel[0]?.code);
  const selected = inLevel.find((certification) => certification.code === selectedCode) ?? inLevel[0];
  const activeLevel = levels.find((level) => level.id === levelId) ?? levels[0];
  const accent = selected ? accents[selected.code] ?? "#1479ff" : "#1479ff";

  function chooseLevel(next: LevelId) {
    setLevelId(next);
    setSelectedCode(certificationPaths.find((certification) => certification.level === next)?.code);
  }

  return (
    <section id="certificacoes" aria-labelledby="certification-paths-title" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
            <h2 id="certification-paths-title" className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
              Escolha sua certificação.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:mx-0">
              Cada trilha transforma o conteúdo da prova em um caminho de estudo dentro da CloudStudy.
            </p>
          </div>
          <div className="shrink-0">
            <div role="tablist" aria-label="Nível da certificação" className="grid grid-cols-2 gap-1 rounded-2xl bg-[#e8f1fd] p-1 sm:inline-grid sm:grid-cols-4">
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
                      active ? "bg-[#0b2a6f] text-white shadow-sm" : "text-slate-600 hover:text-[#0b2a6f]"
                    }`}
                  >
                    {level.label}<span className={`hidden font-semibold sm:inline ${active ? "text-[#8be0ff]" : "text-slate-400"}`}> {count}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-center text-sm text-slate-600 lg:text-right">{activeLevel.hint}</p>
          </div>
        </div>

        <div
          id="certification-level-panel"
          role="tabpanel"
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#1b2a52] bg-[#060b1a] p-3 shadow-[0_30px_80px_-40px_rgba(11,42,111,0.7)] sm:mt-10 sm:p-5 lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-5 lg:p-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: accent }}
          />

          <ul aria-label={`Certificações do nível ${activeLevel.label}`} className="relative grid grid-cols-3 gap-2 lg:grid-cols-1 lg:content-start">
            {inLevel.map((certification) => {
              const active = certification.code === selected?.code;
              return (
                <li key={certification.code}>
                  <button
                    type="button"
                    onClick={() => setSelectedCode(certification.code)}
                    aria-pressed={active}
                    aria-label={`Ver a trilha ${certification.title}`}
                    className={`flex h-full w-full flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition lg:flex-row lg:gap-3 lg:px-3 lg:py-2.5 lg:text-left ${focusRing} ${
                      active ? "border-white/25 bg-white/[0.09]" : "border-transparent hover:bg-white/[0.05]"
                    }`}
                  >
                    <Image src={certification.badge} alt="" width={56} height={56} className={`h-12 w-12 shrink-0 object-contain transition lg:h-12 lg:w-12 ${active ? "" : "opacity-70"}`} />
                    <span className="min-w-0">
                      <span className={`block text-[11px] font-bold tracking-[0.08em] ${active ? "text-[#8be0ff]" : "text-slate-400"}`}>{certification.code}</span>
                      <span className={`mt-0.5 hidden font-display text-sm font-bold leading-snug tracking-[-0.01em] lg:block ${active ? "text-white" : "text-slate-300"}`}>{shortTitle(certification.title)}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={selected.code}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="relative mt-3 rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#0e1a38] to-[#0a1226] p-4 sm:p-6 lg:mt-0"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <Image
                    src={selected.badge}
                    alt=""
                    width={112}
                    height={112}
                    className="h-20 w-20 shrink-0 object-contain sm:h-28 sm:w-28"
                    style={{ filter: `drop-shadow(0 0 26px ${accent}99)` }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-[0.1em] text-[#8be0ff]">{selected.code}</p>
                    <h3 className="mt-1 text-balance font-display text-xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-3xl">{selected.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{selected.description}</p>
                  </div>
                </div>

                <figure className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#04070f]">
                  <div className="relative aspect-video">
                    <Image
                      src={selected.map}
                      alt={`Mapa da trilha ${selected.title} na CloudStudy.`}
                      width={1440}
                      height={810}
                      sizes="(min-width: 1024px) 760px, calc(100vw - 72px)"
                      className="h-full w-full object-cover"
                    />
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#060b1a]/85 px-3 py-1.5 text-xs font-bold text-[#e8f0ff] backdrop-blur">Mapa da trilha {selected.code}</figcaption>
                  </div>
                </figure>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {selected.note ? <p className="max-w-md text-xs leading-5 text-slate-400">{selected.note}</p> : <p className="text-sm text-slate-400">Comece pela experiência grátis. Sem cartão de crédito.</p>}
                  {selected.availableFrom ? (
                    <p className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-white/25 px-5 text-sm font-bold text-white">Em breve · {selected.availableFrom}</p>
                  ) : (
                    <a
                      href={START_URL}
                      data-cta="experimentar"
                      data-cta-position={`cert-${selected.code.toLowerCase()}`}
                      aria-label={`Iniciar experiência grátis em ${selected.title}`}
                      className={`inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-6 text-base font-bold text-white transition hover:bg-[#0f6ae6] sm:w-auto ${focusRing}`}
                    >
                      Experimentar grátis <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          ) : null}
        </div>
      </div>
    </section>
  );
}
