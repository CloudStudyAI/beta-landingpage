"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { START_URL } from "../../lib/launch-links";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const cardBase = "rounded-[1.75rem] p-6 sm:p-8";
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

const pathNodes = [
  { state: "done", label: "1" },
  { state: "done", label: "2" },
  { state: "current", label: "3" },
  { state: "todo", label: "4" },
  { state: "todo", label: "5" },
] as const;

export function ProductInsideSection() {
  const reduce = useReducedMotion();
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    transition: { delay, duration: 0.7, ease: premiumEase },
    viewport: { amount: 0.2, once: true },
    whileInView: { opacity: 1, y: 0 },
  });

  return (
    <section id="produto" aria-labelledby="product-inside-title" className="scroll-mt-24 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl text-center md:text-left">
          <h2 id="product-inside-title" className="text-balance font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Trilha e simulados no mesmo lugar em que você estuda.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3">
          <motion.div className={`${cardBase} border-2 border-[#e1ecfb] bg-white lg:col-span-2`} {...reveal(0)}>
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0b2a6f]">Ela se ajusta ao seu ritmo e ao que você erra</h3>
            <ol aria-label="Exemplo de progresso na trilha" className="mt-6 flex items-center sm:gap-x-2">
              {pathNodes.map((node, index) => (
                <li key={node.label} className={`flex items-center gap-1.5 sm:gap-2 ${index < pathNodes.length - 1 ? "flex-1 sm:flex-none" : ""}`}>
                  <span
                    className={
                      node.state === "done"
                        ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-b-4 border-[#0b56bd] bg-[#1479ff] text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base"
                        : node.state === "current"
                          ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#1479ff] bg-white font-bold text-[#1479ff] shadow-[0_0_0_6px_#e3f0ff] sm:h-16 sm:w-16 sm:shadow-[0_0_0_8px_#e3f0ff]"
                          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef4fc] text-sm font-bold text-slate-500 sm:h-12 sm:w-12 sm:text-base"
                    }
                  >
                    {node.label}
                  </span>
                  {index < pathNodes.length - 1 ? <span aria-hidden="true" className={`h-1.5 min-w-2 flex-1 rounded-full sm:w-9 sm:flex-none ${node.state === "done" ? "bg-[#1479ff]" : "bg-[#cfe0f7]"}`} /> : null}
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">Dias da semana, minutos por semana e desempenho nos simulados definem o que vem a seguir.</p>
          </motion.div>

          <motion.div role="group" aria-label="Exemplo: flashcard 3 de 12" className="[perspective:1200px]" {...reveal(0.08)}>
            <div
              className={`relative min-h-[14rem] w-full transition-transform ${reduce ? "" : "duration-500"} [transform-style:preserve-3d] ${flashcardFlipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
              <div className={`${cardBase} absolute inset-0 flex h-full flex-col gap-4 border border-[#5aa9ff]/30 bg-[#060b1a] text-[#e8f0ff] [backface-visibility:hidden]`}>
                <p className="font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em]">Qual serviço AWS armazena objetos com alta durabilidade?</p>
                <button
                  type="button"
                  onClick={() => setFlashcardFlipped(true)}
                  aria-label="Virar cartão para mostrar a resposta"
                  className={`mt-2 inline-flex self-start rounded-xl border-b-[3px] border-[#0b56bd] bg-[#1479ff] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0967e5] lg:mt-auto ${focusRing}`}
                >
                  Mostrar resposta
                </button>
              </div>
              <div className={`${cardBase} absolute inset-0 flex h-full flex-col gap-4 border border-[#5aa9ff]/30 bg-[#060b1a] text-[#e8f0ff] [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
                <p className="font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em]">Amazon S3</p>
                <p className="text-sm leading-6 text-[#b7c8ea]">Armazenamento de objetos da AWS, feito para alta durabilidade.</p>
                <button
                  type="button"
                  onClick={() => setFlashcardFlipped(false)}
                  aria-label="Virar cartão de volta para a pergunta"
                  className={`mt-2 inline-flex self-start rounded-xl border border-[#3a5a96] px-4 py-2.5 text-sm font-bold text-[#e8f0ff] transition-colors hover:bg-white/5 lg:mt-auto ${focusRing}`}
                >
                  Mostrar pergunta
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div className={`${cardBase} flex flex-col gap-3 border-2 border-[#e1ecfb] bg-white`} {...reveal(0)}>
            <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.03em] text-[#0b2a6f]">Diagnóstico de 10 questões</h3>
            <p className="text-[0.9375rem] leading-6 text-slate-600">Descubra seus pontos fracos antes de estudar.</p>
            <div role="img" aria-label="Exemplo: questão 6 de 10" className="mt-3 h-3 rounded-full bg-[#e3f0ff] lg:mt-auto">
              <div className="h-3 w-3/5 rounded-full bg-[#1479ff]" />
            </div>
            <p className="text-sm font-bold text-slate-500">Questão 6 de 10</p>
          </motion.div>

          <motion.div className={`${cardBase} flex flex-col items-center gap-5 border-2 border-[#e1ecfb] bg-gradient-to-br from-[#e3f0ff] to-white text-center sm:flex-row sm:text-left lg:col-span-2`} {...reveal(0.08)}>
            <Image src="/launch-assets/robot-thinking.webp" alt="Nimbo pensando em qual conteúdo revisar." width={960} height={960} sizes="(min-width: 640px) 150px, 128px" className="h-auto w-32 shrink-0 sm:w-[9.5rem]" />
            <div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0b2a6f]">O Nimbo recomenda o que revisar</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">Errou em Redes? O mentor leva você de volta ao ponto certo antes do próximo simulado.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center sm:mt-10">
          <a href={START_URL} data-cta="experimentar" data-cta-position="produto" className={`inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#0967e5] sm:w-auto ${focusRing}`}>
            Experimentar grátis <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
