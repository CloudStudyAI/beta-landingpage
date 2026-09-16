"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const faqItems = [
  {
    answer: "Para quem quer organizar a preparação para uma certificação AWS, desde quem está começando em cloud até quem já trabalha com tecnologia e busca uma trilha mais clara.",
    question: "Para quem é a CloudStudy?",
  },
  {
    answer: "Não. A jornada pode começar pelos fundamentos e avançar de forma progressiva, sem exigir experiência anterior com a plataforma AWS.",
    question: "Preciso já conhecer AWS?",
  },
  {
    answer: "Ao clicar em criar conta, você segue para a aplicação da CloudStudy, onde faz seu cadastro e acessa a experiência disponível.",
    question: "Como começo a estudar?",
  },
  {
    answer: "A plataforma organiza o próximo passo para facilitar sessões curtas ou mais longas. Você retoma de onde parou conforme a sua rotina.",
    question: "Funciona para quem tem pouco tempo?",
  },
  {
    answer: "A proposta é conectar conteúdo, prática e revisão em uma sequência visível, reduzindo a necessidade de decidir sozinho o que fazer a cada sessão.",
    question: "O que muda em relação ao estudo solto?",
  },
  {
    answer: "Não. A CloudStudy é uma plataforma independente de preparação educacional e não é afiliada, patrocinada ou endossada pela AWS.",
    question: "A CloudStudy é um produto oficial da AWS?",
  },
] as const;

const premiumEase = [0.22, 1, 0.36, 1] as const;

function FaqItem({ answer, initiallyOpen, question }: { answer: string; initiallyOpen: boolean; question: string }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const prefersReducedMotion = useReducedMotion();
  const uniqueId = useId();
  const buttonId = `faq-button-${uniqueId}`;
  const responseId = `faq-response-${uniqueId}`;
  const openDuration = prefersReducedMotion ? 0.01 : 0.65;
  const closeDuration = prefersReducedMotion ? 0.01 : 0.5;
  const iconDuration = prefersReducedMotion ? 0.01 : 0.35;

  return (
    <div className={`rounded-2xl border-2 px-4 py-1 sm:px-6 ${isOpen ? "border-blue-200 bg-white" : "border-slate-100 bg-[#f8fbff]"}`}>
      <button
        id={buttonId}
        type="button"
        aria-controls={responseId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex min-h-16 w-full items-center justify-between gap-3 py-4 text-left font-display text-base font-bold text-[#0b2a6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:gap-4 sm:text-lg"
      >
        {question}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: iconDuration, ease: premiumEase }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#1479ff]"
        >
          <Plus className="h-[18px] w-[18px]" strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={responseId}
            role="region"
            aria-labelledby={buttonId}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: openDuration, ease: premiumEase },
                opacity: { delay: prefersReducedMotion ? 0 : 0.08, duration: prefersReducedMotion ? 0.01 : 0.45, ease: premiumEase },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: closeDuration, ease: premiumEase },
                opacity: { duration: prefersReducedMotion ? 0.01 : 0.3, ease: premiumEase },
              },
            }}
          >
            <motion.p
              className="max-w-3xl pb-5 pr-1 text-sm leading-7 text-slate-600 sm:pr-10 sm:text-base"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: prefersReducedMotion ? 0 : 0.08, duration: prefersReducedMotion ? 0.01 : 0.5, ease: premiumEase } }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 6, transition: { duration: prefersReducedMotion ? 0.01 : 0.3, ease: premiumEase } }}
            >
              {answer}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-8 bg-white px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="faq-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Tire suas dúvidas e comece com clareza.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">O essencial para decidir se a CloudStudy faz sentido para o seu momento.</p>
        </div>

        <div className="mt-10 grid gap-3 sm:mt-12">
          {faqItems.map((item, index) => (
            <FaqItem key={item.question} answer={item.answer} initiallyOpen={index === 0} question={item.question} />
          ))}
        </div>
      </div>
    </section>
  );
}
