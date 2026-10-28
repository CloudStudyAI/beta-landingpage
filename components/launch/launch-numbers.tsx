// Totais gerais (as 3 certificações somadas), conferidos no código do app (System_Dashboard):
// 10 simulados completos de 65 questões por certificação = 30 (meta do owner; 9 provas extras + 1 base
// por certificação em api/app/content/simulations e no seed) e ~2.060 questões (1.755 das provas extras
// + 305 dos bancos base: 105 CLF, 120 SAA, 80 AIF). O código NÃO prova o que está publicado em produção:
// confirmar o catálogo retornado pela API do app antes de subir os anúncios e ajustar aqui.
const numbers = [
  { label: "certificações AWS", value: "3" },
  { label: "simulados completos de 65 questões", value: "30" },
  { label: "questões com explicação", value: "+2.000" },
  { label: "para começar, sem cartão", value: "R$ 0" },
] as const;

export function LaunchNumbers() {
  return (
    <section aria-label="A CloudStudy em números" className="px-5 pb-4 pt-28 sm:px-8 sm:pt-36 lg:pt-40">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 rounded-3xl border-2 border-[#e1ecfb] bg-white px-5 py-6 sm:px-9 sm:py-7 lg:grid-cols-4">
        {numbers.map((item) => (
          <div key={item.label}>
            <dd className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[#0b2a6f] sm:text-4xl">{item.value}</dd>
            <dt className="mt-1 text-sm font-bold leading-5 text-slate-600">{item.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
