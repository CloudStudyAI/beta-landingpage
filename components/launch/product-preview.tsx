import { BookOpen, BrainCircuit, Check, RotateCcw } from "lucide-react";

const planItems = [
  { icon: BookOpen, label: "Próxima aula", value: "Responsabilidade compartilhada" },
  { icon: RotateCcw, label: "Revisão pendente", value: "Reforce os conceitos anteriores" },
  { icon: BrainCircuit, label: "Prática", value: "Questões do módulo atual" },
] as const;

function PreviewHeader() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 sm:px-6">
      <p className="font-display text-base font-bold tracking-tight text-[#0b2a6f] sm:text-lg">
        Cloud<span className="text-[#1479ff]">Study</span>
      </p>
      <p className="text-xs font-bold text-slate-500">Prévia da plataforma</p>
    </div>
  );
}

function PreviewNavigation() {
  return (
    <aside className="hidden w-48 shrink-0 border-r border-slate-200 bg-[#f8fbff] p-5 md:block">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Estudo</p>
      <ul className="mt-5 space-y-1 text-sm font-bold text-slate-500">
        <li className="border-l-2 border-[#1479ff] py-2 pl-3 text-[#0b2a6f]">Início</li>
        <li className="py-2 pl-[14px]">Jornada</li>
        <li className="py-2 pl-[14px]">Revisões</li>
        <li className="py-2 pl-[14px]">Prática</li>
      </ul>
    </aside>
  );
}

function JourneyProgress() {
  return (
    <div className="mt-7 border-y border-slate-200 py-5">
      <div className="flex items-center justify-between gap-4 text-sm font-bold text-[#0b2a6f]">
        <span>Progresso da jornada</span>
        <span className="text-[#1479ff]">Em andamento</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
        <div className="h-full w-[58%] rounded-full bg-[#1479ff]" />
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700">
        <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={3} /> Fundamentos da AWS concluídos
      </p>
    </div>
  );
}

function CurrentLesson() {
  return (
    <div className="min-w-0 flex-1 p-5 sm:p-7 lg:p-9">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1479ff]">Cloud Practitioner</p>
      <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0b2a6f] sm:text-3xl">
        Continue sua próxima aula
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
        Retome o módulo sobre segurança exatamente do ponto em que parou.
      </p>

      <JourneyProgress />
      <span className="mt-6 inline-flex min-h-11 items-center rounded-xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-5 py-2 text-sm font-bold text-white">
        Continuar aula
      </span>
    </div>
  );
}

function DailyPlan() {
  return (
    <div className="border-t border-slate-200 bg-[#f8fbff] p-5 sm:p-7 lg:w-[22rem] lg:border-l lg:border-t-0 lg:p-8">
      <h3 className="font-display text-xl font-bold text-[#0b2a6f]">Plano de hoje</h3>
      <ol className="mt-4 divide-y divide-slate-200">
        {planItems.map((item) => (
          <li key={item.label} className="flex gap-3 py-4 first:pt-2 last:pb-0">
            <item.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#1479ff]" strokeWidth={2} />
            <span className="min-w-0">
              <span className="block text-xs font-bold text-slate-500">{item.label}</span>
              <span className="mt-1 block text-sm font-bold leading-5 text-[#0b2a6f]">{item.value}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProductPreview() {
  return (
    <div role="img" aria-label="Prévia da CloudStudy com próxima aula, progresso da jornada, revisão pendente e prática." className="overflow-hidden rounded-[1.75rem] border border-slate-300/80 bg-white text-slate-900 shadow-[0_22px_48px_-38px_rgba(11,42,111,0.32)]">
      <PreviewHeader />
      <div className="flex">
        <PreviewNavigation />
        <div className="min-w-0 flex-1 lg:flex">
          <CurrentLesson />
          <DailyPlan />
        </div>
      </div>
    </div>
  );
}
