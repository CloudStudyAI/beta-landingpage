import Image from "next/image";
import { BookOpen, ClipboardCheck, Layers, Target } from "lucide-react";

const studySteps = [
  { number: "01", label: "APRENDA", title: "Aulas que vão direto ao ponto.", description: "Entenda o conceito antes de avançar.", icon: BookOpen },
  { number: "02", label: "PRATIQUE", title: "Transforme conteúdo em prática.", description: "Resolva questões e aplique o que acabou de aprender.", icon: Target },
  { number: "03", label: "REVISE", title: "Reforce antes de esquecer.", description: "Flashcards e revisões entram no momento certo.", icon: Layers },
  { number: "04", label: "SIMULE", title: "Teste sua preparação.", description: "Use simulados para identificar os últimos pontos de melhoria.", icon: ClipboardCheck },
] as const;

export function StudyCycleSection() {
  return (
    <section id="como-funciona" aria-labelledby="study-cycle-title" className="scroll-mt-8 overflow-hidden bg-[#f5f8fd] px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-blue-700 sm:text-xs">COMO FUNCIONA</p>
            <h2 id="study-cycle-title" className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#0b2a6f] sm:text-4xl lg:text-5xl">
              Seu ciclo de estudo, do início à aprovação.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              A CloudStudy organiza cada etapa para você saber o que estudar, praticar e revisar até chegar preparado à prova.
            </p>
          </div>
          <div className="relative flex shrink-0 items-center justify-center lg:mr-12">
            <div aria-hidden="true" className="absolute inset-3 rounded-full bg-[#e8f1ff]" />
            <Image src="/robo-novo.png" alt="Nimbo acompanha sua jornada de estudo." width={450} height={450} sizes="(min-width: 1024px) 190px, 130px" className="relative h-auto w-[130px] lg:w-[190px]" />
          </div>
        </div>

        <div className="relative mt-10 lg:mt-14">
          <svg aria-hidden="true" viewBox="0 0 1000 190" preserveAspectRatio="none" className="pointer-events-none absolute left-[12.5%] top-0 hidden h-[190px] w-3/4 lg:block" fill="none">
            <path d="M0 40 C165 40 168 136 333 136 S500 40 667 40 S835 136 1000 136" stroke="#c9dcf7" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
            {studySteps.map((step, index) => (
              <li key={step.number} className={`relative grid grid-cols-[64px_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 sm:gap-x-7 lg:block lg:pb-0 lg:text-center ${index % 2 === 1 ? "lg:pt-24" : ""}`}>
                {index < studySteps.length - 1 ? <span aria-hidden="true" className="absolute bottom-0 left-[31px] top-16 w-0.5 bg-[#c9dcf7] lg:hidden" /> : null}
                <div className={`relative flex h-16 w-16 items-center justify-center rounded-[1.5rem] border-b-4 font-display text-2xl font-bold lg:mx-auto lg:h-20 lg:w-20 lg:rounded-[1.8rem] lg:text-3xl ${index === 3 ? "border-[#071c4a] bg-[#0b2a6f] text-white" : "border-[#a8c9f5] bg-[#e3eeff] text-[#0b2a6f]"}`}>
                  <span className="sr-only">Etapa </span>{step.number}
                </div>
                <div className="min-w-0 pt-1 lg:mt-6 lg:pt-0">
                  <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-blue-700 lg:justify-center">
                    <step.icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />{step.label}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.025em] text-[#0b2a6f]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
