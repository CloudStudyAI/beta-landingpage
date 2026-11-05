// Totais gerais (as 6 certificações publicadas somadas). Base: banco local novo, migrado até
// 20261105_0061 e com seed, em 05/11/2026 (simulation_sets full_exam e questions publicadas):
// CLF 10/720, SAA 10/705, AIF 10/665, SAP 10/930, DVA 10/651, DEA 10/650 = 60 provas completas e
// 4.321 questões. A SAP usa provas de 75 questões, por isso o rótulo não cita 65. O código NÃO
// prova o que está publicado em produção: a SAP-C03 só vale depois do deploy da 0061 na master do
// app; confirmar o catálogo da API antes de anúncios.
const numbers = [
  { label: "certificações AWS", value: "6" },
  { label: "simulados completos no formato da prova", value: "60" },
  { label: "questões com explicação", value: "+4.300" },
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
