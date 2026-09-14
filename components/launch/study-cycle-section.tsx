import Image from "next/image";

import thinkingRobot from "../../robos/4.svg";

const studySteps = [
  { description: "Entenda os conceitos essenciais sem conteúdo solto.", title: "Aprenda" },
  { description: "Aplique o que estudou e transforme teoria em entendimento.", title: "Pratique" },
  { description: "Volte ao que precisa de atenção no momento certo.", title: "Revise" },
  { description: "Acompanhe o que já avançou e mantenha o ritmo de estudo.", title: "Evolua" },
] as const;

const stepOffsets = [
  "mr-6 sm:mr-20 lg:mr-0 lg:pt-32",
  "ml-6 sm:ml-12 lg:ml-0 lg:pt-6",
  "mr-4 sm:mr-16 lg:mr-0 lg:pt-36",
  "ml-5 sm:ml-16 lg:ml-0 lg:pt-12",
] as const;

const connectorAngles = ["rotate-[-12deg] sm:rotate-[-18deg]", "rotate-[12deg] sm:rotate-[18deg]", "rotate-[-10deg] sm:rotate-[-22deg]"] as const;

export function StudyCycleSection() {
  return (
    <section id="como-funciona" aria-labelledby="study-cycle-title" className="relative isolate scroll-mt-8 overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-10 top-10 -z-10 bg-[#eef5ff]" />
      <div aria-hidden="true" className="absolute -left-[10%] -top-4 -z-10 h-28 w-[120%] rounded-[50%] bg-[#eef5ff] sm:h-32" />
      <div aria-hidden="true" className="absolute -bottom-4 -left-[10%] -z-10 h-28 w-[120%] rounded-[50%] bg-[#eef5ff] sm:h-32" />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 id="study-cycle-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Um ciclo simples para estudar com consistência.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Você aprende o conteúdo, pratica, revisa o que precisa de atenção e acompanha sua evolução.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-16 lg:mt-20 lg:min-h-[22rem]">
          <svg aria-hidden="true" viewBox="0 0 1080 260" preserveAspectRatio="none" className="absolute bottom-0 left-0 right-44 top-0 hidden h-[19rem] lg:block">
            <path d="M135 165 C235 165 280 55 405 55 S555 185 675 185 S825 80 945 80" fill="none" stroke="#78adf0" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 13" />
          </svg>

          <ol className="relative lg:mr-44 lg:grid lg:grid-cols-4 lg:gap-10">
            {studySteps.map((step, index) => (
              <li key={step.title} className={`relative flex gap-5 pb-12 last:pb-0 sm:gap-7 sm:pb-14 lg:block lg:pb-0 lg:text-center ${stepOffsets[index]}`}>
                {index < studySteps.length - 1 ? <span aria-hidden="true" className={`absolute left-[21px] top-10 h-[calc(100%-1.5rem)] origin-top border-l-2 border-dashed border-[#78adf0] lg:hidden ${connectorAngles[index]}`} /> : null}
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[5px] border-[#eef5ff] bg-[#1479ff] text-xs font-bold tracking-[0.06em] text-white shadow-[0_0_0_2px_#8abaf5] lg:mx-auto lg:h-12 lg:w-12 lg:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pt-1 lg:mt-6 lg:pt-0">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-[#0b2a6f] sm:text-[1.75rem]">{step.title}</h3>
                  <p className={`mt-3 max-w-sm text-[0.9375rem] leading-6 text-slate-600 sm:text-base sm:leading-7 lg:mx-auto ${index === studySteps.length - 1 ? "pr-32 sm:pr-44 lg:pr-0" : ""}`}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <Image
            src={thinkingRobot}
            alt="Nimbo acompanhando o ciclo de estudo."
            sizes="(min-width: 1024px) 224px, (min-width: 640px) 176px, 144px"
            className="absolute bottom-[-1rem] right-[-0.75rem] h-auto w-36 drop-shadow-[0_18px_16px_rgba(11,42,111,0.14)] sm:bottom-[-1.5rem] sm:right-2 sm:w-44 lg:bottom-auto lg:right-[-0.5rem] lg:top-8 lg:w-56"
          />
        </div>
      </div>
    </section>
  );
}
