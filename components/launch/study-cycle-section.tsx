"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useReducedMotionSafe } from "../../lib/use-reduced-motion-safe";

// Cada passo do ciclo mostra um recorte de tela real do produto (conta de demonstração).
const studySteps = [
  {
    alt: "Tela de aula da CloudStudy comparando GuardDuty, Runtime Monitoring, Macie e filtro de métrica.",
    description: "Entenda os conceitos essenciais sem conteúdo solto.",
    image: "/study-cycle/aprenda.webp",
    title: "Aprenda",
  },
  {
    alt: "Tela de simulado da CloudStudy com uma questão de múltipla escolha.",
    description: "Aplique o que estudou e transforme teoria em entendimento.",
    image: "/study-cycle/pratique.webp",
    title: "Pratique",
  },
  {
    alt: "Tela de exercício corrigido, com acertos em verde, um erro em vermelho e o Nimbo explicando.",
    description: "Volte ao que precisa de atenção no momento certo.",
    image: "/study-cycle/revise.webp",
    title: "Revise",
  },
  {
    alt: "Painel da CloudStudy com prontidão, aulas, simulados, flashcards e progresso da trilha.",
    description: "Acompanhe o que já avançou e mantenha o ritmo de estudo.",
    image: "/study-cycle/evolua.webp",
    title: "Evolua",
  },
] as const;

const STEP_MS = 5200;
const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1479ff] focus-visible:ring-offset-2";

export function StudyCycleSection() {
  const { reduce } = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  // O ciclo avança sozinho só enquanto está na tela e até a pessoa escolher um passo.
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const running = auto && inView && !reduce;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % studySteps.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, active]);

  function choose(index: number) {
    setAuto(false);
    setActive(index);
  }

  const step = studySteps[active];

  return (
    <section id="como-funciona" aria-labelledby="study-cycle-title" className="relative isolate scroll-mt-24 overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <h2 id="study-cycle-title" className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Um ciclo simples para estudar com consistência.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8 md:mx-0">
            Você aprende o conteúdo, pratica, revisa o que precisa de atenção e acompanha sua evolução.
          </p>
        </div>

        <div ref={panelRef} className="mt-8 grid gap-5 sm:mt-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
          <div role="tablist" aria-label="Passos do ciclo de estudo" className="grid grid-cols-4 gap-1.5 lg:grid-cols-1 lg:gap-3">
            {studySteps.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`study-step-${index}`}
                  aria-selected={selected}
                  aria-controls="study-step-panel"
                  onClick={() => choose(index)}
                  className={`relative overflow-hidden rounded-2xl border-2 px-1 py-2.5 text-center transition lg:px-5 lg:py-4 lg:text-left ${focusRing} ${
                    selected ? "border-[#1479ff] bg-white shadow-[0_3px_0_#0b56bd]" : "border-[#e1ecfb] bg-white hover:border-[#9cc3f5]"
                  }`}
                >
                  <span className="flex flex-col items-center gap-1.5 lg:flex-row lg:gap-4">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-[0.06em] transition-colors lg:h-11 lg:w-11 ${selected ? "bg-[#1479ff] text-white" : "bg-[#eef4fc] text-slate-500"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-display text-[0.8125rem] font-bold tracking-[-0.02em] lg:text-xl ${selected ? "text-[#0b2a6f]" : "text-slate-600"}`}>{item.title}</span>
                      <span className={`mt-1 hidden text-sm leading-6 text-slate-600 ${selected ? "lg:block" : ""}`}>{item.description}</span>
                    </span>
                  </span>
                  {selected && running ? (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[#1479ff]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div id="study-step-panel" role="tabpanel" aria-labelledby={`study-step-${active}`} className="relative">
            {/* No celular a descrição do passo fica aqui, acima da tela; no desktop ela está no botão. */}
            <p className="mb-3 min-h-12 text-center text-[0.9375rem] font-semibold leading-6 text-[#0b2a6f] lg:hidden">{step.description}</p>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#1b2a52] bg-[#060b1a] p-1.5 shadow-[0_30px_70px_-36px_rgba(11,42,111,0.75)] sm:rounded-[2rem] sm:p-2.5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.125rem] sm:rounded-[1.5rem]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={step.image}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Image src={step.image} alt={step.alt} width={1600} height={1000} sizes="(min-width: 1024px) 760px, calc(100vw - 52px)" className="h-full w-full object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <Image
              src="/launch-assets/robot-happy.webp"
              alt=""
              width={960}
              height={960}
              sizes="(min-width: 1024px) 144px, 88px"
              className="pointer-events-none absolute -bottom-6 -right-2 h-auto w-[5.5rem] drop-shadow-[0_14px_16px_rgba(11,42,111,0.25)] sm:-bottom-8 sm:-right-5 sm:w-28 lg:w-36"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
