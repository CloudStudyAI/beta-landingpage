"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Database, Play, RotateCcw, Server, Zap, type LucideIcon } from "lucide-react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

import {
  BOARD_BUDGET,
  BOARD_DEMO_INITIAL,
  BOARD_PIECES,
  FILM_CAPTIONS,
  NIGHT,
  boardDemoGoals,
  boardView,
  filmScene,
  filmView,
  type BoardDemoState,
  type BoardPieceId,
  type DemoCheck,
  type LabView,
} from "../../lib/labs-demo";
import { START_URL } from "../../lib/launch-links";
import { useReducedMotionSafe } from "../../lib/use-reduced-motion-safe";

// Cabine do Nimbo: a seção é a cabeça do mascote (casco pérola, orelhas azuis) e o laboratório
// acontece no vidro do visor. Primeiro um filme guiado pela rolagem conta a noite da Black
// Friday dando errado e depois dando certo; em seguida a pessoa joga a mesma noite.
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7ef0ff]";
const PIECE_ICONS: Record<BoardPieceId, LucideIcon> = { server: Server, replica: Database, cache: Zap };

function Eyes({ mood }: { mood: LabView["mood"] }) {
  const base = "block transition-all duration-300";
  const eye =
    mood === "happy"
      ? `${base} h-3 w-6 rounded-t-full border-[4px] border-b-0 border-[#7ef0ff] drop-shadow-[0_0_10px_#7ef0ff] sm:h-4 sm:w-8`
      : mood === "alarm"
        ? `${base} h-3 w-7 rounded-full bg-[#ff6f8f] shadow-[0_0_24px_#ff6f8f] sm:h-4 sm:w-10`
        : mood === "worried"
          ? `${base} h-4 w-7 rounded-full bg-[#ffd58a] shadow-[0_0_24px_rgba(255,213,138,.9)] sm:h-6 sm:w-10`
          : `labs-eye ${base} h-5 w-4 rounded-full bg-[#7ef0ff] shadow-[0_0_24px_#7ef0ff] sm:h-7 sm:w-6`;
  const tilt = mood === "worried" || mood === "alarm";
  return (
    <span aria-hidden="true" className="flex h-5 items-center gap-10 sm:h-7 sm:gap-14">
      <span className={`${eye} ${tilt ? "rotate-[16deg]" : ""}`} />
      <span className={`${eye} ${tilt ? "-rotate-[16deg]" : ""}`} />
    </span>
  );
}

function Node({ name, detail, icon: Icon, tone }: { name: string; detail: string; icon: LucideIcon; tone: "fixed" | "dead" | "pearl" | "hot" }) {
  const styles = {
    fixed: "border border-[#87c6fa]/45 bg-[#101b2e] text-[#f4f8fc]",
    hot: "border border-[#ffd58a] bg-[#2a2113] text-[#fff3dc] shadow-[0_0_28px_rgba(255,213,138,.35)]",
    dead: "border border-[#ff6f8f]/35 bg-[#150d18] text-[#e8c6cf] opacity-60 saturate-50",
    pearl: "bg-gradient-to-b from-white to-[#dbe3ec] text-[#0f1a2a] shadow-[0_4px_0_#87c6fa,0_0_30px_rgba(126,240,255,.35)]",
  }[tone];
  const icon = tone === "pearl" ? "bg-[#599ad5]/20 text-[#3c73ab]" : tone === "dead" ? "bg-[#ff6f8f]/15 text-[#ff9db3]" : tone === "hot" ? "bg-[#ffd58a]/20 text-[#ffd58a]" : "bg-[#87c6fa]/15 text-[#87c6fa]";
  return (
    <div className={`flex min-h-[3.625rem] flex-col justify-center rounded-2xl p-2.5 transition-all duration-500 sm:min-h-[7rem] sm:justify-end sm:p-3.5 ${styles}`}>
      <span className={`mb-auto hidden h-9 w-9 items-center justify-center rounded-lg sm:flex ${icon}`}>
        <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
      <span className="block font-display text-[0.8125rem] font-extrabold leading-tight sm:mt-2 sm:text-base">{name}</span>
      <span className={`block text-[0.6875rem] font-semibold sm:text-xs ${tone === "pearl" ? "text-[#4b5d73]" : "opacity-70"}`}>{detail}</span>
    </div>
  );
}

function Slot({ hint }: { hint: string }) {
  return (
    <div className="flex min-h-[3.625rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#7ef0ff]/70 bg-[#7ef0ff]/[0.06] p-2 text-center sm:min-h-[7rem]">
      <span className="font-display text-[0.8125rem] font-extrabold text-[#7ef0ff] sm:text-base">Encaixe livre</span>
      <span className="text-[0.6875rem] text-[#9fdfe8] sm:text-xs">{hint}</span>
    </div>
  );
}

/** Fluxo de pedidos até cada zona: pontos que correm pela linha, coloridos pelo resultado. */
function Flow({ tone, side }: { tone: "ok" | "bad" | "off"; side: "a" | "b" }) {
  if (tone === "off") return <span className="h-1 flex-1" />;
  const color = tone === "ok" ? "#7ef0ff" : "#ff6f8f";
  return (
    <span aria-hidden="true" className={`labs-flow relative h-1 flex-1 overflow-hidden rounded-full ${side === "a" ? "labs-flow-left" : ""}`} style={{ background: `${color}22`, color }}>
      <span className="labs-flow-dots absolute inset-0" />
    </span>
  );
}

/** O visor: tudo que a cena mostra num instante. */
function Visor({ view, children }: { view: LabView; children?: React.ReactNode }) {
  const replicaTone = view.zoneADown ? "dead" : "fixed";
  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      <span aria-hidden="true" className="absolute -top-6 left-[9%] hidden h-24 w-11 -rotate-[24deg] rounded-t-[60%] bg-gradient-to-b from-[#b9dcfb] to-[#599ad5] shadow-[0_0_30px_rgba(135,198,250,.5)] sm:block" />
      <span aria-hidden="true" className="absolute -top-6 right-[9%] hidden h-24 w-11 rotate-[24deg] rounded-t-[60%] bg-gradient-to-b from-[#b9dcfb] to-[#599ad5] shadow-[0_0_30px_rgba(135,198,250,.5)] sm:block" />
      <span aria-hidden="true" className="absolute -left-2 top-[38%] hidden h-36 w-7 rounded-2xl bg-gradient-to-b from-[#b9dcfb] via-[#599ad5] to-[#3c73ab] shadow-[0_0_34px_rgba(135,198,250,.65)] sm:block" />
      <span aria-hidden="true" className="absolute -right-2 top-[38%] hidden h-36 w-7 rounded-2xl bg-gradient-to-b from-[#b9dcfb] via-[#599ad5] to-[#3c73ab] shadow-[0_0_34px_rgba(135,198,250,.65)] sm:block" />

      <div className="relative rounded-[2.25rem] bg-gradient-to-b from-white via-[#fafcfd] to-[#cdd7e3] p-2.5 shadow-[0_50px_110px_rgba(0,0,0,.6),inset_0_-14px_26px_rgba(60,115,171,.28)] sm:mx-4 sm:rounded-[5.5rem] sm:p-5">
        <div
          className={`relative overflow-hidden rounded-[1.75rem] bg-[radial-gradient(700px_340px_at_50%_0%,rgba(89,154,213,.26),transparent_70%),linear-gradient(180deg,#101c30_0%,#070d19_55%,#04080f_100%)] px-3 pb-2.5 pt-3 shadow-[inset_0_0_70px_rgba(0,0,0,.85)] transition-shadow duration-500 sm:rounded-[4.25rem] sm:px-12 sm:pb-8 sm:pt-8 ${
            view.live === "alarm" ? "labs-alarm" : ""
          }`}
        >
          <div aria-hidden="true" className="labs-visor-grid pointer-events-none absolute inset-0" />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-[0.625rem] font-extrabold uppercase tracking-[0.14em] text-[#8496ab] sm:text-xs">
                <span className={`h-2 w-2 rounded-full ${view.live === "idle" ? "bg-[#87c6fa]" : "labs-live bg-[#ff6f8f] shadow-[0_0_12px_#ff6f8f]"}`} />
                {view.hud}
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] text-white tabular-nums sm:text-4xl">{view.clock}</p>
            </div>
            <div className="text-right">
              <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.14em] text-[#8496ab] sm:text-xs">custo por mês</p>
              <p className={`mt-1 font-display text-xl font-extrabold tabular-nums sm:text-3xl ${view.cost > BOARD_BUDGET ? "text-[#ff9db3]" : "text-[#49d6a0]"}`}>
                R$ {view.cost} <span className="text-xs font-bold text-[#8496ab] sm:text-sm">/ {BOARD_BUDGET}</span>
              </p>
            </div>
          </div>

          <div className="relative -mt-2 flex flex-col items-center gap-3 sm:-mt-6">
            <Eyes mood={view.mood} />
            {/* No celular o balão reserva duas linhas: a fala muda a cada cena e não pode empurrar as zonas (tremida). */}
            <p
              role="status"
              aria-live="polite"
              className={`flex min-h-[3.375rem] max-w-xl items-center justify-center rounded-2xl border px-3.5 py-2 text-center text-[0.8125rem] font-bold leading-snug sm:block sm:min-h-0 sm:text-[0.9375rem] ${
                view.mood === "alarm"
                  ? "border-[#ff6f8f]/50 bg-[#ff6f8f]/10 text-[#ffd3dc]"
                  : view.mood === "worried"
                    ? "border-[#ffd58a]/40 bg-[#ffd58a]/[0.08] text-[#ffe9bf]"
                    : view.mood === "happy"
                      ? "border-[#7ef0ff]/45 bg-[#7ef0ff]/[0.08] text-[#d8fbff]"
                      : "border-[#87c6fa]/25 bg-[#87c6fa]/[0.06] text-[#e8f0ff]"
              }`}
            >
              <span className="sr-only">Nimbo: </span>
              {view.caption}
            </p>
          </div>

          <div className="relative mt-3 flex flex-wrap justify-center gap-2 sm:mt-5">
            <span className={`rounded-xl border px-3 py-1.5 font-display text-xs font-extrabold sm:text-sm ${view.intensity === "peak" ? "border-[#ffd58a] bg-[#ffd58a]/10 text-[#ffe9bf]" : "border-[#87c6fa]/50 bg-[#101b2e] text-[#f4f8fc]"}`}>
              Clientes <span className="font-semibold tabular-nums text-[#8496ab]">{view.demand.toLocaleString("pt-BR")}/min</span>
            </span>
            <span className="hidden rounded-xl border border-[#87c6fa]/50 bg-[#101b2e] px-3 py-1.5 font-display text-xs font-extrabold text-[#f4f8fc] sm:inline-flex sm:text-sm">Balanceador</span>
            {view.errorPercent !== null ? (
              <span className={`rounded-xl px-3 py-1.5 font-display text-xs font-extrabold tabular-nums sm:text-sm ${view.errorPercent > 0 ? "bg-[#ff6f8f] text-[#1a0710]" : "bg-[#49d6a0] text-[#04170f]"}`}>
                {view.errorPercent > 0 ? `${view.errorPercent}% com erro` : "tudo passando"}
              </span>
            ) : null}
          </div>

          <div className="relative mt-3 flex items-center gap-3 px-[12%] sm:mt-4">
            <Flow tone={view.flowA} side="a" />
            <Flow tone={view.flowB} side="b" />
          </div>

          <div className="relative mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-6">
            <div className={`rounded-2xl p-2 transition-all duration-500 sm:rounded-[1.75rem] sm:p-4 ${view.zoneADown ? "labs-zone-down border-2 border-[#ff6f8f]/60" : "border-2 border-[#87c6fa]/25"}`}>
              <p className="flex items-center justify-between text-[0.625rem] font-extrabold uppercase tracking-[0.16em] text-[#8496ab] min-h-[1.125rem] sm:min-h-5 sm:text-xs">
                <span className={view.zoneADown ? "text-[#ff6f8f]" : ""}>Zona A</span>
                {view.zoneADown ? (
                  <span className="whitespace-nowrap rounded-full bg-[#ff6f8f] px-2 py-0.5 text-[0.5625rem] tracking-[0.08em] text-[#1a0710] sm:text-[0.625rem] sm:tracking-[0.16em]">
                    <span className="sm:hidden">caiu</span>
                    <span className="hidden sm:inline">fora do ar</span>
                  </span>
                ) : null}
              </p>
              <div className="mt-2 grid gap-2 sm:mt-3 sm:grid-cols-2 sm:gap-3">
                <Node name="Servidor 1" detail="EC2" icon={Server} tone={view.zoneADown ? "dead" : view.serverHot ? "hot" : "fixed"} />
                <Node name="Banco principal" detail="RDS" icon={Database} tone={replicaTone} />
              </div>
            </div>
            <div className={`rounded-2xl border-2 p-2 transition-all duration-500 sm:rounded-[1.75rem] sm:p-4 ${view.placed.server || view.placed.replica ? "border-[#7ef0ff]/60 shadow-[0_0_44px_rgba(126,240,255,.14)]" : "border-dashed border-[#87c6fa]/25"}`}>
              <p className="flex items-center text-[0.625rem] font-extrabold uppercase tracking-[0.16em] text-[#7ef0ff] min-h-[1.125rem] sm:min-h-5 sm:text-xs">Zona B</p>
              <div className="mt-2 grid gap-2 sm:mt-3 sm:grid-cols-2 sm:gap-3">
                {view.placed.server ? <Node name="Servidor" detail="EC2" icon={Server} tone="pearl" /> : <Slot hint="cabe um servidor" />}
                {view.placed.replica ? <Node name="Réplica do banco" detail="RDS Multi-AZ" icon={Database} tone="pearl" /> : <Slot hint="cabe a réplica" />}
              </div>
            </div>
          </div>
          {view.placed.cache ? (
            <div className="relative mx-auto mt-2.5 max-w-xs sm:mt-4">
              <Node name="Cache" detail="ElastiCache · na frente do banco" icon={Zap} tone="pearl" />
            </div>
          ) : null}

          <ol className="relative mt-3 grid grid-cols-4 gap-1.5 sm:mt-6 sm:gap-2.5" aria-label="Linha da noite">
            {NIGHT.map((moment, index) => {
              const status = view.ticks[index];
              return (
                <li
                  key={moment.id}
                  className={`flex items-center gap-1.5 rounded-xl border px-2 py-1.5 transition-all duration-300 sm:gap-2 sm:px-3 sm:py-2 ${
                    status === "bad"
                      ? "border-[#ff6f8f] bg-[#ff6f8f]/10"
                      : status === "now"
                        ? "border-[#7ef0ff] bg-[#7ef0ff]/[0.08]"
                        : status === "ok"
                          ? "border-[#49d6a0]/40 bg-[#0d1626]"
                          : "border-[#87c6fa]/15 bg-[#0d1626] opacity-50"
                  }`}
                >
                  <span className="font-display text-xs font-extrabold text-white sm:text-base">{moment.id}</span>
                  <span className="hidden text-xs font-semibold text-[#b4c0cf] md:inline">{moment.title}</span>
                  <span className="sr-only">{status === "bad" ? "com erro" : status === "ok" ? "passou" : status === "now" ? "agora" : "ainda não"}</span>
                  {status === "ok" || status === "bad" ? (
                    <span aria-hidden="true" className={`ml-auto flex h-4 w-4 items-center justify-center rounded-full text-[0.625rem] font-extrabold text-[#06101d] sm:h-5 sm:w-5 ${status === "ok" ? "bg-[#49d6a0]" : "bg-[#ff6f8f]"}`}>
                      {status === "ok" ? "✓" : "✕"}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
          {children}
        </div>
      </div>
    </div>
  );
}

function FilmCaption({ progress, range, title, body }: { progress: MotionValue<number>; range: readonly number[]; title: string; body: string }) {
  const opacity = useTransform(progress, [...range], [0, 1, 1, 0]);
  const y = useTransform(progress, [...range], [16, 0, 0, -16]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 mx-auto max-w-3xl px-5 text-center">
      <h3 className="text-balance font-display text-[1.75rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#b4c0cf] sm:mt-3 sm:text-lg">{body}</p>
    </motion.div>
  );
}

/** Primeira parte: o filme guiado pela rolagem, no esquema do filme do notebook. */
function LabsFilm() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const value = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0;
      progress.set(value);
      setScene(filmScene(value));
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [progress]);

  return (
    <div ref={sectionRef} className="relative h-[480vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-start overflow-hidden px-3 pb-4 pt-[5.5rem] sm:justify-center sm:px-8 sm:pt-28">
        <div className="relative h-[8rem] w-full shrink-0 sm:h-[9.5rem]" aria-hidden="true">
          {FILM_CAPTIONS.map((caption) => (
            <FilmCaption key={caption.title} progress={progress} {...caption} />
          ))}
        </div>
        <div className="w-full origin-top scale-[0.96] sm:scale-100 [@media(max-height:820px)]:scale-[0.82] [@media(max-height:700px)]:scale-[0.72]">
          <Visor view={filmView(scene)} />
        </div>
      </div>
    </div>
  );
}

function GoalList({ goals }: { goals: DemoCheck[] }) {
  return (
    <ul className="relative mt-4 grid gap-2 sm:grid-cols-3">
      {goals.map((goal) => (
        <li key={goal.id} className={`flex items-start gap-2.5 rounded-xl border p-3 ${goal.passed ? "border-[#49d6a0]/40 bg-[#49d6a0]/[0.06]" : "border-[#ff6f8f]/40 bg-[#ff6f8f]/[0.06]"}`}>
          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-extrabold text-[#06101d] ${goal.passed ? "bg-[#49d6a0]" : "bg-[#ff6f8f]"}`}>{goal.passed ? "✓" : "✕"}</span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-[#f4f8fc]">
              {goal.label} <span className="sr-only">{goal.passed ? "cumprida" : "falta"}</span>
            </span>
            <span className="block text-[0.8125rem] leading-5 text-[#b4c0cf]">{goal.feedback}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Segunda parte: a mesma noite, agora jogada pela pessoa. */
function LabsPlay() {
  const { reduce } = useReducedMotionSafe();
  const [board, setBoard] = useState<BoardDemoState>(BOARD_DEMO_INITIAL);
  const [at, setAt] = useState<number | "done" | null>(null);
  const timers = useRef<number[]>([]);
  const running = typeof at === "number";

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  function stop() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }
  function toggle(id: BoardPieceId) {
    stop();
    setBoard((current) => ({ ...current, [id]: !current[id] }));
    setAt(null); // mexeu: o resultado antigo não descreve mais o que está no visor
  }
  function run() {
    stop();
    if (reduce) {
      setAt("done");
      return;
    }
    NIGHT.forEach((_, index) => timers.current.push(window.setTimeout(() => setAt(index), index * 1100)));
    timers.current.push(window.setTimeout(() => setAt("done"), NIGHT.length * 1100));
  }
  function reset() {
    stop();
    setBoard(BOARD_DEMO_INITIAL);
    setAt(null);
  }

  const view = boardView(board, at);
  const goals = at === "done" ? boardDemoGoals(board) : null;

  return (
    <div className="px-3 pb-6 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-balance font-display text-[1.75rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-white sm:text-[2.75rem]">Agora é com você.</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#b4c0cf] sm:text-lg">Encaixe as peças na Zona B e rode a noite. Dá para errar à vontade: nada é cobrado.</p>
      </div>
      <div className="mt-8 sm:mt-10">
        <Visor view={view}>{goals ? <GoalList goals={goals} /> : null}</Visor>
      </div>

      {/* No celular a bandeja fica presa no pé da tela, como no app: o visor segue à vista enquanto a pessoa joga. */}
      <div className="sticky bottom-0 z-20 -mx-3 mt-6 border-t border-[#87c6fa]/20 bg-[#04070f]/90 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:static sm:mx-0 sm:mt-10 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
      <div className="mx-auto grid max-w-[1000px] grid-cols-3 gap-2 sm:grid-cols-[1fr_1fr_1fr_1.3fr] sm:gap-4">
        {BOARD_PIECES.map((piece) => {
          const Icon = PIECE_ICONS[piece.id];
          const used = board[piece.id];
          return (
            <button
              key={piece.id}
              type="button"
              disabled={running}
              onClick={() => toggle(piece.id)}
              aria-pressed={used}
              aria-label={`${piece.name}, ${piece.service}, R$ ${piece.cost} por mês, ${used ? "encaixada: toque para tirar" : "toque para encaixar"}`}
              className={`relative rounded-[1rem_1rem_0.75rem_0.75rem] px-2.5 py-1.5 text-left transition sm:rounded-[1.25rem_1.25rem_0.875rem_0.875rem] sm:p-4 ${focusRing} disabled:cursor-wait ${
                used
                  ? "border-2 border-dashed border-[#87c6fa]/35 text-[#8496ab]"
                  : "bg-gradient-to-b from-white to-[#dbe3ec] text-[#0f1a2a] shadow-[0_6px_0_#87c6fa,0_20px_36px_rgba(0,0,0,.5)] hover:-translate-y-0.5"
              }`}
            >
              {used ? null : <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rounded-t-lg bg-gradient-to-b from-[#b9dcfb] to-[#599ad5]" />}
              <span className="flex items-center gap-2">
                <span className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:flex ${used ? "bg-[#87c6fa]/10 text-[#87c6fa]" : "bg-[#599ad5]/20 text-[#3c73ab]"}`}>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xs font-extrabold leading-tight sm:text-base">{piece.name}</span>
                  <span className={`hidden text-[0.6875rem] font-semibold sm:block ${used ? "" : "text-[#4b5d73]"}`}>{piece.service}</span>
                </span>
              </span>
              <span className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-2 font-display text-sm font-extrabold sm:mt-3 sm:text-lg">
                {used ? "encaixada" : `R$ ${piece.cost}`}
                <span className={`hidden text-[0.625rem] font-bold uppercase tracking-[0.08em] sm:inline ${used ? "" : "text-[#4b5d73]"}`}>{used ? "tirar" : "por mês"}</span>
              </span>
            </button>
          );
        })}
        <div className="col-span-3 mt-0.5 flex gap-2.5 sm:col-span-1 sm:mt-0 sm:flex-col">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className={`flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-[1.25rem] sm:min-h-14 bg-gradient-to-b from-white via-[#cfe7fc] to-[#87c6fa] font-display text-base sm:text-lg font-extrabold tracking-[-0.02em] text-[#0f1a2a] shadow-[0_6px_0_#3c73ab,0_0_50px_rgba(135,198,250,.45)] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
          >
            <Play aria-hidden="true" className="h-5 w-5 fill-current" />
            {running ? "Rodando..." : at === "done" ? "Rodar de novo" : "Rodar a noite"}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Recomeçar o exemplo"
            className={`flex min-h-12 w-14 items-center justify-center rounded-[1.25rem] border border-[#87c6fa]/30 text-[#b4c0cf] transition hover:bg-[#87c6fa]/10 sm:w-auto ${focusRing}`}
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            <span className="ml-2 hidden text-sm font-bold sm:inline">Recomeçar</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export function LabsSection() {
  const { reduce, mounted } = useReducedMotionSafe();

  return (
    <section id="laboratorios" aria-labelledby="labs-title" className="relative isolate scroll-mt-24 overflow-x-clip bg-[#04070f] text-[#e8f0ff]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_460px_at_50%_18%,rgba(89,154,213,.3),transparent_70%),radial-gradient(700px_380px_at_50%_92%,rgba(126,240,255,.1),transparent_70%)]" />
      <div aria-hidden="true" className="labs-stars pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-3xl px-5 pt-16 text-center sm:pt-24">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#7ef0ff]">Novo · Laboratórios</p>
        <h2 id="labs-title" className="mt-3 text-balance font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:text-[3.4rem]">
          Pratique AWS sem conta e sem medo da fatura.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#b4c0cf] sm:text-lg">
          Um ambiente simulado dentro da CloudStudy. Você monta a arquitetura, o Nimbo roda a noite e mostra o que caiu.
        </p>
      </div>

      {/* Com movimento reduzido o filme sai e fica só a parte jogável. */}
      {mounted && !reduce ? <LabsFilm /> : <div className="h-12 sm:h-16" />}
      <LabsPlay />

      <div className="mx-auto max-w-[1000px] px-5 pb-16 pt-6 sm:px-8 sm:pb-24">
        <div className="flex flex-col items-center gap-5 text-center">
          <ul className="flex flex-wrap justify-center gap-2 text-sm font-semibold text-[#f4f8fc]">
            {["Sem conta na AWS", "Nada é cobrado", "Conferência na hora, salva no seu progresso"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 text-left rounded-full border border-[#87c6fa]/25 bg-[#87c6fa]/[0.08] px-3 py-1.5">
                <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#7ef0ff]" strokeWidth={3} /> {item}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl text-sm leading-6 text-[#b4c0cf]">
            Já no <strong className="text-white">Cloud Practitioner (CLF-C02)</strong> e no <strong className="text-white">Solutions Architect (SAA-C03)</strong>, com console de treino e tabuleiro de arquitetura. As outras certificações recebem os seus aos poucos. Ambiente simulado próprio da CloudStudy: não é o console da AWS.
          </p>
          <a
            href={START_URL}
            data-cta="experimentar"
            data-cta-position="laboratorios"
            className={`inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#0967e5] ${focusRing}`}
          >
            Experimentar grátis <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
          <p className="text-xs text-[#8496ab]">O teste grátis dessas duas certificações inclui 1 laboratório.</p>
        </div>
      </div>
    </section>
  );
}
