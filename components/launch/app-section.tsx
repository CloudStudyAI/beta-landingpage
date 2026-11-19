"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Flame, RefreshCw, Smartphone, Trophy, Zap, type LucideIcon } from "lucide-react";

import { APP_STORE_URL } from "../../lib/launch-links";
import { useReducedMotionSafe } from "../../lib/use-reduced-motion-safe";

// Lançamento do app para iPhone. As telas são capturas reais do app e o
// botão leva ao link de campanha da App Store, que separa os downloads vindos do site.
// No computador os três celulares abrem em leque conforme a rolagem e clicar num lateral traz a
// tela dele para o meio; no celular só o do meio aparece, troca de tela sozinho e as bolinhas
// embaixo deixam escolher.
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8be0ff]";

const perks: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Flame, title: "Sequência de dias e XP", text: "Cada aula e cada revisão contam. Não quebre a sequência." },
  { icon: Trophy, title: "Liga da semana", text: "Quem mais estudou na semana sobe no ranking. Toda segunda zera." },
  { icon: RefreshCw, title: "Mesma conta do site", text: "Comece no computador, continue no ônibus. O progresso é um só." },
];

const SCREENS = {
  aula: { src: "/launch-assets/app-aula.webp", alt: "Tela do app: aula concluída com XP ganho" },
  painel: { src: "/launch-assets/app-painel.webp", alt: "Tela do app: painel com sequência de dias e missões" },
  liga: { src: "/launch-assets/app-liga.webp", alt: "Tela do app: liga da semana com o ranking" },
} as const;
type ScreenName = keyof typeof SCREENS;
const CYCLE: ScreenName[] = ["painel", "aula", "liga"];
const LABELS: Record<ScreenName, string> = { painel: "do painel", aula: "da aula", liga: "da liga" };
type Slots = { left: ScreenName; center: ScreenName; right: ScreenName };

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[2.6rem] bg-gradient-to-b from-[#26365e] to-[#0b1430] p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.9),0_0_0_1px_rgba(139,224,255,.18)]">
      <div className="relative overflow-hidden rounded-[2.2rem]">{children}</div>
    </div>
  );
}

function Screen({ name, priority = false }: { name: ScreenName; priority?: boolean }) {
  const screen = SCREENS[name];
  return (
    <Image src={screen.src} alt={screen.alt} width={620} height={1347} priority={priority} sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 64vw" className="block h-auto w-full" />
  );
}

/** Celular lateral: sai de trás do celular do meio e abre em leque com a rolagem. Clicar nele
 *  troca a tela dele com a do meio. */
function SidePhone({ name, side, progress, reduce, onPick }: { name: ScreenName; side: "left" | "right"; progress: MotionValue<number>; reduce: boolean; onPick: () => void }) {
  const dir = side === "left" ? 1 : -1;
  const x = useTransform(progress, [0, 1], [`${dir * 58}%`, "0%"]);
  const rotate = useTransform(progress, [0, 1], [0, -dir * 8]);
  const opacity = useTransform(progress, [0, 0.35, 1], [0, 0.85, 1]);
  return (
    <motion.div
      className={`absolute top-12 z-10 hidden w-[42%] sm:block ${side === "left" ? "left-0 -rotate-[8deg]" : "right-0 rotate-[8deg]"}`}
      style={reduce ? undefined : { x, rotate, opacity }}
    >
      <motion.div animate={reduce ? undefined : { y: [0, 8, 0] }} transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <motion.button
          type="button"
          onClick={onPick}
          aria-label={`Ver a tela ${LABELS[name]} em destaque`}
          className={`block w-full cursor-pointer rounded-[2.6rem] text-left ${focusRing}`}
          whileHover={reduce ? undefined : { scale: 1.04, y: -6 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          <Frame>
            <FadeScreen name={name} reduce={reduce} />
          </Frame>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/** Tela com troca suave: a imagem nova entra por cima da antiga. */
function FadeScreen({ name, reduce, priority = false }: { name: ScreenName; reduce: boolean; priority?: boolean }) {
  return (
    <>
      <div className="invisible">
        <Screen name="painel" />
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key={name}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Screen name={name} priority={priority} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/** Celular do meio. No celular (sem os laterais) as bolinhas embaixo escolhem a tela. */
function CenterPhone({ name, reduce, showDots, onPick }: { name: ScreenName; reduce: boolean; showDots: boolean; onPick: (name: ScreenName) => void }) {
  return (
    <div className="relative z-20 mx-auto w-[64%] sm:w-[46%]">
      <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <Frame>
          <FadeScreen name={name} reduce={reduce} priority />
        </Frame>
      </motion.div>
      {showDots ? (
        <div className="mt-3 flex justify-center gap-1 sm:hidden">
          {CYCLE.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPick(item)}
              aria-label={`Ver a tela ${LABELS[item]}`}
              aria-pressed={item === name}
              className={`flex h-8 items-center px-1 ${focusRing}`}
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${item === name ? "w-6 bg-[#8be0ff]" : "w-1.5 bg-white/30"}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Sticker({ className, children, delay, reduce }: { className: string; children: ReactNode; delay: number; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute z-30 inline-flex items-center gap-1.5 rounded-full border-2 border-[#0b2a6f] bg-white px-3 py-1.5 font-display text-sm font-extrabold text-[#0b2a6f] shadow-[4px_5px_0_#0b2a6f] sm:text-base ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -12 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ delay, type: "spring", stiffness: 320, damping: 14 }}
    >
      {children}
    </motion.span>
  );
}

/** "+10 XP" que sobe contando quando aparece, como o ganho no fim da aula. */
function XpCount({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const [value, setValue] = useState(reduce ? 10 : 0);
  useEffect(() => {
    if (reduce) {
      setValue(10);
      return;
    }
    if (!inView) return;
    const controls = animate(0, 10, { duration: 0.9, delay: 0.5, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce]);
  return <span ref={ref}>+{value} XP</span>;
}

function useIsSmall(): boolean {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setSmall(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return small;
}

export function AppSection() {
  const { reduce } = useReducedMotionSafe();
  const small = useIsSmall();
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center 55%"] });
  const [slots, setSlots] = useState<Slots>({ left: "aula", center: "painel", right: "liga" });
  // No celular a tela troca sozinha até a pessoa escolher uma pelas bolinhas.
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!small || reduce || touched) return;
    const timer = window.setInterval(() => {
      setSlots((current) => ({ ...current, center: CYCLE[(CYCLE.indexOf(current.center) + 1) % CYCLE.length] }));
    }, 2600);
    return () => window.clearInterval(timer);
  }, [small, reduce, touched]);

  function swap(side: "left" | "right") {
    setSlots((current) => ({ ...current, center: current[side], [side]: current.center }));
  }

  function pick(name: ScreenName) {
    setTouched(true);
    setSlots((current) => ({ ...current, center: name }));
  }

  return (
    <section id="app" aria-labelledby="app-title" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#060b1a] px-5 pb-0 pt-10 sm:rounded-[2.5rem] sm:px-10 sm:pt-14 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-6 lg:px-14 lg:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(20,121,255,.45),transparent_65%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(139,224,255,.18),transparent_65%)]" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8be0ff]/30 bg-[#8be0ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#8be0ff]">
            <Smartphone aria-hidden="true" className="h-3.5 w-3.5" />
            Novo · app para iPhone
          </span>
          <h2 id="app-title" className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#e8f0ff] sm:text-5xl lg:text-[3.4rem]">
            Estudar AWS virou <span className="text-[#8be0ff]">jogo</span>. E cabe no bolso.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-300 sm:text-lg">
            A trilha, os simulados e os flashcards da CloudStudy no seu iPhone, com o Nimbo puxando você todo dia.
          </p>

          <ul className="mt-7 grid gap-4">
            {perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1479ff]/20 text-[#8be0ff]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-extrabold text-[#e8f0ff]">{title}</span>
                  <span className="block text-sm leading-6 text-slate-400">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border-b-4 border-[#0b56bd] bg-[#1479ff] px-6 text-white transition-colors hover:bg-[#0967e5] ${focusRing}`}
            >
              <Smartphone aria-hidden="true" className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/80">Baixe grátis na</span>
                <span className="block font-display text-lg font-extrabold">App Store</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </a>
            <span className="text-sm font-semibold text-slate-400">Grátis para baixar · iPhone · Brasil</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-12 w-full max-w-[34rem] lg:mt-0">
          <div ref={stage} className="relative">
            <SidePhone name={slots.left} side="left" progress={scrollYProgress} reduce={reduce} onPick={() => swap("left")} />
            <CenterPhone name={slots.center} reduce={reduce} showDots={small} onPick={pick} />
            <SidePhone name={slots.right} side="right" progress={scrollYProgress} reduce={reduce} onPick={() => swap("right")} />
            <Sticker className="left-0 top-4 sm:left-[18%] sm:-top-3" delay={0.15} reduce={reduce}>
              <Flame aria-hidden="true" className="h-4 w-4 text-[#f97316]" /> 7 dias
            </Sticker>
            <Sticker className="right-0 top-[38%] sm:right-[10%]" delay={0.45} reduce={reduce}>
              <Zap aria-hidden="true" className="h-4 w-4 text-[#1479ff]" /> <XpCount reduce={reduce} />
            </Sticker>
            <Sticker className="bottom-[14%] left-0 sm:bottom-[22%] sm:left-[6%]" delay={0.75} reduce={reduce}>
              <Trophy aria-hidden="true" className="h-4 w-4 text-[#eab308]" /> 1º na liga
            </Sticker>
          </div>
          <div aria-hidden="true" className="h-8 lg:h-0" />
        </div>
      </div>
    </section>
  );
}
