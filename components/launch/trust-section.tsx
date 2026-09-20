import { Check } from "lucide-react";

const productFacts = [
  "Trilhas para três certificações AWS",
  "Conteúdo dividido em módulos e aulas",
  "Progresso da trilha visível na plataforma",
  "Revisão e prática reunidas no plano de estudo",
] as const;

export function TrustSection() {
  return (
    <section
      id="confianca"
      aria-labelledby="trust-title"
      className="scroll-mt-8 bg-[#f3f7fc] px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
        <div className="max-w-xl">
          <h2
            id="trust-title"
            className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl"
          >
            Feita para estudar de verdade.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            A CloudStudy conecta conteúdo, prática, revisão e progresso em uma experiência construída para certificações AWS.
          </p>
        </div>

        <ul className="divide-y divide-blue-200/80 border-y border-blue-200/80">
          {productFacts.map((fact) => (
            <li key={fact} className="flex items-center gap-4 py-4 text-sm font-bold leading-6 text-[#16345f] sm:py-5 sm:text-base">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1479ff] text-white"
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
