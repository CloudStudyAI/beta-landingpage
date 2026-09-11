import { ProductPreview } from "./product-preview";

export function StudyContinuitySection() {
  return (
    <section id="posicionamento" aria-labelledby="study-continuity-title" className="scroll-mt-8 bg-white px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-blue-700 sm:text-xs">A PLATAFORMA EM USO</p>
            <h2 id="study-continuity-title" className="mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#0b2a6f] sm:text-4xl lg:text-5xl">
              Seu estudo continua de onde parou.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Ao entrar, você encontra a próxima aula, o progresso da jornada e o que precisa revisar ou praticar.
          </p>
        </div>

        <div className="mt-9 sm:mt-12">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
