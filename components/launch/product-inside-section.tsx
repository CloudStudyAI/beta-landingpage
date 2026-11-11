"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Check, Layers3, Sparkles, Target, Timer, X } from "lucide-react";
import { motion } from "framer-motion";

import { START_URL } from "../../lib/launch-links";
import { useReducedMotionSafe } from "../../lib/use-reduced-motion-safe";

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

// Tudo nesta secao e demonstracao clicavel: nada e salvo nem enviado. Os conteudos sao
// perguntas reais do estilo da plataforma, com resposta conferida.
const weekDays = [
  { label: "S", name: "Segunda" },
  { label: "T", name: "Terça" },
  { label: "Q", name: "Quarta" },
  { label: "Q", name: "Quinta" },
  { label: "S", name: "Sexta" },
  { label: "S", name: "Sábado" },
  { label: "D", name: "Domingo" },
] as const;
const minuteOptions = [15, 30, 45, 60] as const;

const flashcards = [
  { question: "Qual serviço AWS armazena objetos com alta durabilidade?", answer: "Amazon S3", detail: "Armazenamento de objetos da AWS, feito para alta durabilidade." },
  { question: "Qual serviço distribui o tráfego entre várias instâncias?", answer: "Elastic Load Balancing", detail: "Reparte as requisições entre os destinos saudáveis." },
  { question: "Qual serviço entrega credenciais temporárias para uma role?", answer: "AWS STS", detail: "Credenciais com prazo curto, sem chave de longa duração." },
] as const;
const ratings = ["Errei", "Difícil", "Acertei"] as const;

const quiz = [
  { topic: "Identidade e acesso", question: "O que ajuda a remover permissões que uma identidade nunca usa?", options: ["Região padrão da conta", "Último acesso por serviço", "Tamanho da política"], correct: 1 },
  { topic: "Responsabilidade compartilhada", question: "Quem configura as regras dos grupos de segurança?", options: ["A AWS", "O provedor de internet", "O cliente"], correct: 2 },
  { topic: "Proteção de dados", question: "Qual serviço encontra dados pessoais em buckets do S3?", options: ["Amazon Macie", "Amazon Inspector", "AWS Shield"], correct: 0 },
] as const;
const letters = ["A", "B", "C"] as const;

function Eyebrow({ icon: Icon, children, dark = false }: { icon: typeof Target; children: string; dark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] ${dark ? "text-[#8be0ff]" : "text-[#1479ff]"}`}>
      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${dark ? "bg-white/10" : "bg-[#e3f0ff]"}`}>
        <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
      {children}
    </p>
  );
}

export function ProductInsideSection() {
  const { reduce } = useReducedMotionSafe();
  const [days, setDays] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const [minutes, setMinutes] = useState<number>(30);
  const [cardIndex, setCardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  // Ultima resposta do diagnostico: e o que o Nimbo comenta no card ao lado.
  const [lastResult, setLastResult] = useState<{ topic: string; right: boolean } | null>(null);

  const reveal = (delay: number) => ({
    // Mesmo estado inicial do servidor; com movimento reduzido o card so aparece, sem animar.
    initial: { opacity: 0, y: 22 },
    transition: reduce ? { duration: 0 } : { delay, duration: 0.7, ease: premiumEase },
    viewport: { amount: 0.2, once: true },
    whileInView: { opacity: 1, y: 0 },
  });
  const activeDays = days.filter(Boolean).length;
  const weeklyMinutes = activeDays * minutes;
  // Com mais tempo por semana, o exemplo da trilha avanca mais rapido: 1 passo a cada 75 min.
  const reached = Math.min(pathNodes.length, Math.max(1, Math.floor(weeklyMinutes / 75) + 1));
  const card = flashcards[cardIndex];
  const question = quiz[quizIndex];
  const flashFace = `${cardBase} absolute inset-0 flex h-full flex-col gap-4 overflow-hidden border border-[#5aa9ff]/30 bg-gradient-to-br from-[#0e1a38] to-[#060b1a] text-[#e8f0ff] [backface-visibility:hidden]`;

  function toggleDay(index: number) {
    setDays((current) => {
      const next = current.map((on, i) => (i === index ? !on : on));
      return next.some(Boolean) ? next : current; // pelo menos um dia
    });
  }
  function rateCard() {
    setFlashcardFlipped(false);
    // troca o conteudo so depois de o cartao voltar, para a resposta seguinte nao aparecer no giro
    window.setTimeout(() => setCardIndex((current) => (current + 1) % flashcards.length), reduce ? 0 : 260);
  }
  function answer(index: number) {
    if (picked !== null) return;
    setPicked(index);
    setLastResult({ topic: question.topic, right: index === question.correct });
  }
  function nextQuestion() {
    setPicked(null);
    setQuizIndex((current) => (current + 1) % quiz.length);
  }

  return (
    <section id="produto" aria-labelledby="product-inside-title" className="scroll-mt-24 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl text-center md:text-left">
          <h2 id="product-inside-title" className="text-balance font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Trilha e simulados no mesmo lugar em que você estuda.
          </h2>
          <p className="mt-3 text-sm font-bold text-[#1479ff]">Experimente: os cards abaixo são clicáveis.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
          <motion.div className={`${cardBase} relative overflow-hidden border-2 border-[#e1ecfb] bg-gradient-to-br from-white to-[#f1f7ff] lg:col-span-2`} {...reveal(0)}>
            <Eyebrow icon={CalendarDays}>Trilha personalizada</Eyebrow>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-[#0b2a6f]">Ela se ajusta ao seu ritmo e ao que você erra</h3>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div role="group" aria-label="Dias de estudo na semana" className="flex gap-1.5">
                {weekDays.map((day, index) => (
                  <button
                    key={day.name}
                    type="button"
                    onClick={() => toggleDay(index)}
                    aria-pressed={days[index]}
                    aria-label={day.name}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${focusRing} ${days[index] ? "border-b-[3px] border-[#0b56bd] bg-[#1479ff] text-white" : "bg-[#eef4fc] text-slate-400 hover:bg-[#dfeafa]"}`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Minutos por dia" className="flex items-center gap-1 rounded-full border border-[#cfe0f7] bg-white p-1">
                <Timer aria-hidden="true" className="ml-2 h-4 w-4 text-[#1479ff]" />
                {minuteOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMinutes(option)}
                    aria-pressed={minutes === option}
                    aria-label={`${option} minutos por dia`}
                    className={`min-h-9 rounded-full px-3 text-sm font-bold transition ${focusRing} ${minutes === option ? "bg-[#0b2a6f] text-white" : "text-slate-600 hover:bg-[#eef4fc]"}`}
                  >
                    {option}
                  </button>
                ))}
                <span className="pr-3 text-sm font-bold text-slate-500">min</span>
              </div>
            </div>

            <ol aria-label="Exemplo de avanço na trilha em uma semana" className="mt-6 flex items-center sm:gap-x-2">
              {pathNodes.map((node, index) => {
                const state = index + 1 < reached ? "done" : index + 1 === reached ? "current" : "todo";
                return (
                  <li key={node.label} className={`flex items-center gap-1.5 sm:gap-2 ${index < pathNodes.length - 1 ? "flex-1 sm:flex-none" : ""}`}>
                    <span
                      className={`flex shrink-0 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                        state === "done"
                          ? "h-10 w-10 border-b-4 border-[#0b56bd] bg-[#1479ff] text-sm text-white sm:h-12 sm:w-12 sm:text-base"
                          : state === "current"
                            ? "h-12 w-12 border-4 border-[#1479ff] bg-white text-[#1479ff] shadow-[0_0_0_6px_#e3f0ff] sm:h-16 sm:w-16 sm:shadow-[0_0_0_8px_#e3f0ff]"
                            : "h-10 w-10 bg-[#eef4fc] text-sm text-slate-500 sm:h-12 sm:w-12 sm:text-base"
                      }`}
                    >
                      {node.label}
                    </span>
                    {index < pathNodes.length - 1 ? <span aria-hidden="true" className={`h-1.5 min-w-2 flex-1 rounded-full transition-colors duration-300 sm:w-12 sm:flex-none ${state === "done" ? "bg-[#1479ff]" : "bg-[#cfe0f7]"}`} /> : null}
                  </li>
                );
              })}
            </ol>
            <p aria-live="polite" className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              <strong className="text-[#0b2a6f]">{activeDays} {activeDays === 1 ? "dia" : "dias"} × {minutes} min = {weeklyMinutes} min por semana.</strong> Seu ritmo e seu desempenho nos simulados definem o que vem a seguir.
            </p>
          </motion.div>

          <motion.div role="group" aria-label={`Flashcard ${cardIndex + 3} de 12`} className="[perspective:1200px]" {...reveal(0.08)}>
            <div className={`relative min-h-[18rem] w-full transition-transform ${reduce ? "" : "duration-500"} [transform-style:preserve-3d] lg:h-full ${flashcardFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
              <div className={flashFace} aria-hidden={flashcardFlipped}>
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#1479ff]/35 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <Eyebrow icon={Layers3} dark>Flashcard</Eyebrow>
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.6875rem] font-bold text-slate-300">{cardIndex + 3} de 12</span>
                </div>
                <p className="relative font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em]">{card.question}</p>
                <button
                  type="button"
                  onClick={() => setFlashcardFlipped(true)}
                  tabIndex={flashcardFlipped ? -1 : 0}
                  aria-label="Virar cartão para mostrar a resposta"
                  className={`relative mt-auto inline-flex self-start rounded-xl border-b-[3px] border-[#0b56bd] bg-[#1479ff] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0967e5] ${focusRing}`}
                >
                  Mostrar resposta
                </button>
              </div>
              <div className={`${flashFace} [transform:rotateY(180deg)]`} aria-hidden={!flashcardFlipped}>
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#35c08f]/30 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <Eyebrow icon={Layers3} dark>Resposta</Eyebrow>
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.6875rem] font-bold text-slate-300">{cardIndex + 3} de 12</span>
                </div>
                <p className="relative font-display text-[1.75rem] font-bold leading-tight tracking-[-0.03em]">{card.answer}</p>
                <p className="relative text-sm leading-6 text-[#b7c8ea]">{card.detail}</p>
                <div className="relative mt-auto">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-slate-400">Como foi?</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={rateCard}
                        tabIndex={flashcardFlipped ? 0 : -1}
                        className={`min-h-10 rounded-xl border px-2 text-sm font-bold transition-colors ${focusRing} ${rating === "Acertei" ? "border-[#35c08f]/60 text-[#7fe3bd] hover:bg-[#35c08f]/15" : rating === "Errei" ? "border-[#ef5b7f]/60 text-[#ff9db3] hover:bg-[#ef5b7f]/15" : "border-[#3a5a96] text-[#e8f0ff] hover:bg-white/5"}`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className={`${cardBase} flex flex-col gap-3 border-2 border-[#e1ecfb] bg-white`} {...reveal(0)}>
            <Eyebrow icon={Target}>Diagnóstico grátis</Eyebrow>
            <h3 className="mt-1 font-display text-[1.375rem] font-bold tracking-[-0.03em] text-[#0b2a6f]">Diagnóstico de 10 questões</h3>
            <p className="text-[0.9375rem] leading-6 text-slate-600">Descubra seus pontos fracos antes de estudar.</p>
            <div role="group" aria-label={`Exemplo: questão ${quizIndex + 6} de 10`} className="mt-3 rounded-2xl bg-[#060b1a] p-4 lg:mt-auto">
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full bg-[#1479ff] transition-all duration-300" style={{ width: `${(quizIndex + 6) * 10}%` }} />
                </div>
                <span className="text-[0.6875rem] font-bold text-slate-300">{quizIndex + 6} de 10</span>
              </div>
              <p className="mt-3 min-h-10 text-sm font-bold leading-5 text-white">{question.question}</p>
              <div className="mt-3 grid gap-1.5">
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correct;
                  const show = picked !== null && (isCorrect || index === picked);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => answer(index)}
                      disabled={picked !== null}
                      className={`flex min-h-9 items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs font-bold transition-colors ${focusRing} ${
                        show ? (isCorrect ? "border-[#35c08f] bg-[#35c08f]/15 text-white" : "border-[#ef5b7f] bg-[#ef5b7f]/15 text-white") : picked !== null ? "border-white/10 text-slate-500" : "border-white/10 text-slate-200 hover:border-[#8be0ff]/60 hover:bg-white/5"
                      }`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[0.625rem] ${show ? (isCorrect ? "bg-[#35c08f] text-[#060b1a]" : "bg-[#ef5b7f] text-[#060b1a]") : "bg-white/10"}`}>
                        {show ? isCorrect ? <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3.5} /> : <X aria-hidden="true" className="h-3 w-3" strokeWidth={3.5} /> : letters[index]}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex min-h-9 items-center justify-between gap-2">
                <p aria-live="polite" className={`text-xs font-bold ${picked === null ? "text-slate-400" : picked === question.correct ? "text-[#7fe3bd]" : "text-[#ff9db3]"}`}>
                  {picked === null ? "Escolha uma alternativa." : picked === question.correct ? "Certo!" : "Quase. A certa está em verde."}
                </p>
                {picked !== null ? (
                  <button type="button" onClick={nextQuestion} className={`min-h-9 rounded-lg bg-[#1479ff] px-3 text-xs font-bold text-white transition-colors hover:bg-[#0967e5] ${focusRing}`}>
                    Próxima
                  </button>
                ) : null}
              </div>
            </div>
          </motion.div>

          <motion.div className={`${cardBase} relative flex flex-col items-center gap-5 overflow-hidden border-2 border-[#e1ecfb] bg-gradient-to-br from-[#e3f0ff] to-white text-center sm:flex-row sm:text-left lg:col-span-2`} {...reveal(0.08)}>
            <Image
              key={lastResult?.right ? "happy" : "thinking"}
              src={lastResult?.right ? "/launch-assets/robot-happy.webp" : "/launch-assets/robot-thinking.webp"}
              alt={lastResult?.right ? "Nimbo comemorando o acerto." : "Nimbo pensando em qual conteúdo revisar."}
              width={960}
              height={960}
              sizes="(min-width: 640px) 176px, 128px"
              className="h-auto w-32 shrink-0 sm:w-44"
            />
            <div className="min-w-0">
              <Eyebrow icon={Sparkles}>Mentor Nimbo</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-[#0b2a6f]">O Nimbo recomenda o que revisar</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">Errou em Redes? O mentor leva você de volta ao ponto certo antes do próximo simulado.</p>
              <div aria-live="polite" className="mt-4 flex min-h-10 flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                {lastResult === null ? (
                  <span className="rounded-full border border-dashed border-[#9cc3f5] bg-white/70 px-3 py-1.5 text-sm font-bold text-[#0b2a6f]">Responda o diagnóstico ao lado e veja o Nimbo reagir.</span>
                ) : lastResult.right ? (
                  <>
                    <span className="rounded-full border border-[#a8e5cc] bg-[#eafaf3] px-3 py-1.5 text-sm font-bold text-[#0f7a52]">Acertou {lastResult.topic}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90 text-slate-400 sm:rotate-0" />
                    <span className="rounded-full border-b-[3px] border-[#0b56bd] bg-[#1479ff] px-3 py-1.5 text-sm font-bold text-white">Seguir para o próximo passo da trilha</span>
                  </>
                ) : (
                  <>
                    <span className="rounded-full border border-[#f6c1cb] bg-[#fff1f3] px-3 py-1.5 text-sm font-bold text-[#b4233c]">Errou {lastResult.topic}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90 text-slate-400 sm:rotate-0" />
                    <span className="rounded-full border-b-[3px] border-[#0b56bd] bg-[#1479ff] px-3 py-1.5 text-sm font-bold text-white">Revisar {lastResult.topic} antes do simulado</span>
                  </>
                )}
              </div>
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
