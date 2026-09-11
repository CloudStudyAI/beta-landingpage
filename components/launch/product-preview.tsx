export function ProductPreview() {
  return (
    <div role="img" aria-label="Representação ilustrativa da plataforma CloudStudy: próxima aula Fundamentos da AWS, progresso de 64%, 18 flashcards para revisão, 2 simulados e plano de hoje: continuar, revisar e melhorar." className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-slate-900 shadow-[0_16px_50px_-30px_rgba(11,42,111,0.25)] sm:rounded-[2rem]">
      <div className="border-b border-white/10 bg-[#0b172b] px-6 py-5 sm:px-9">
        <p className="font-display text-xl font-bold tracking-tight text-white">Cloud<span className="text-[#539eff]">Study</span></p>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 p-6 sm:p-9 lg:p-10">
          <p className="text-[11px] font-bold tracking-[0.16em] text-blue-700">PRÓXIMA AULA</p>
          <p className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#0b2a6f] sm:text-3xl">Continue exatamente de onde parou</p>
          <p className="mt-3 text-base text-slate-600">Fundamentos da AWS</p>

          <div className="mt-9 sm:mt-12">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-slate-600">Progresso da trilha</span>
              <span className="font-bold text-[#0b2a6f]">64%</span>
            </div>
            <div aria-hidden="true" className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[64%] rounded-full bg-[#1479ff]" />
            </div>
          </div>

          <div className="mt-9 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-500">REVISÃO PENDENTE</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-[#0b2a6f]">18 flashcards</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-slate-500">PRÁTICA DISPONÍVEL</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-[#0b2a6f]">2 simulados</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-[#f5f8fd] p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-8">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#0b2a6f]">PLANO DE HOJE</p>
          <ol className="mt-6 space-y-5 text-sm font-semibold text-slate-600">
            <li className="flex items-center gap-3 text-blue-700"><span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#1479ff]" />Continuar</li>
            <li className="flex items-center gap-3"><span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-slate-300" />Revisar</li>
            <li className="flex items-center gap-3"><span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-slate-300" />Melhorar</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
