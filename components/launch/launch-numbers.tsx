// Totais gerais (as 12 certificações somadas). Base: specs e bancos publicados no
// System_Dashboard (feature/publish-scs-aip-mla, cadeia ate 20261110_0082), em 10/11/2026:
// CLF 10/720, SAA 10/705, AIF 10/665, SAP 10/930, DVA 10/651, DEA 10/650, SOA 10/650, DOP 10/750,
// SCS 10/650, AIP 10/750, MLA 10/650 = 110 provas completas e 7.771 questões; mais a AIB-C01
// (feature/aib-c01, 14/11/2026) com 8/520 = 118 provas e 8.291 questões. SAP, DOP e AIP usam
// provas de 75 questões, por isso o rótulo não cita 65. Publicar só depois que a API de produção
// listar as 12 certificações; confirmar de novo antes de anúncios.
const numbers = [
  { label: "certificações AWS", value: "12" },
  { label: "simulados completos no formato da prova", value: "118" },
  { label: "questões com explicação", value: "+8.200" },
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
