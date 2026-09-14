import { ProductPreview } from "./product-preview";

export function StudyContinuitySection() {
  return (
    <section id="plataforma" aria-labelledby="study-continuity-title" className="scroll-mt-8 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <h2 id="study-continuity-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Abra a plataforma e continue de onde parou.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:mx-0">
            Próxima aula, progresso, revisões e prática aparecem organizados em um só lugar.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12"><ProductPreview /></div>
      </div>
    </section>
  );
}
