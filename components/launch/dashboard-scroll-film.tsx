"use client";

import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

// Sequencia de quadros do video do painel (dados de exemplo de uma conta de demonstracao).
// Quadros em vez de <video>: rebobinar video pelo scroll trava no Safari do iPhone; desenhar
// imagens num canvas e o que mantem o movimento liso nos dois.
const FRAME_COUNT = 138;
const STATIC_FRAME = 66; // painel montado, usado quando o usuario pede menos movimento
const frameSrc = (size: "lg" | "sm", index: number) => `/dashboard-scroll/${size}/f-${String(index + 1).padStart(3, "0")}.webp`;

// Ordem de carga: primeiro um quadro a cada 8, depois preenche. Assim o scroll ja funciona
// (com saltos) antes de tudo baixar, e fica liso conforme o resto chega.
function loadOrder(count: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(count - 1)) order.push(count - 1);
  return order;
}

const EDGE_FADE = "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)";

const captions = [
  { range: [-1, -0.5, 0.2, 0.26], title: "Veja por dentro.", body: "O painel real da CloudStudy, do jeito que o aluno usa." },
  { range: [0.3, 0.36, 0.46, 0.52], title: "Tudo o que importa numa tela só.", body: "Prontidão, aulas, simulados, flashcards e a próxima ação recomendada." },
  { range: [0.56, 0.62, 0.74, 0.8], title: "Troque de prova em um clique.", body: "As 11 certificações ficam no mesmo painel, cada uma com seu progresso." },
] as const;

function Caption({ progress, range, title, body }: { progress: MotionValue<number>; range: readonly number[]; title: string; body: string }) {
  const opacity = useTransform(progress, [...range], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1], range[2], range[3]], [18, 0, 0, -18]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 mx-auto max-w-2xl px-5 text-center">
      <h2 className="text-balance font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600 sm:text-lg">{body}</p>
    </motion.div>
  );
}

export function DashboardScrollFilm() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Quadros prontos para desenhar (ja decodificados); null enquanto nao chegam.
  const framesRef = useRef<(CanvasImageSource | null)[]>([]);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const drawnKeyRef = useRef("");
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);

  // scrollYProgress: posicao real da secao (0 quando o topo encosta no topo da tela, 1 quando o
  // fim encosta no fim). shownProgress: a mesma posicao suavizada, que o canvas e as legendas
  // seguem. Sem a suavizacao cada tique da roda pula 2 ou 3 quadros de uma vez.
  const scrollYProgress = useMotionValue(0);
  const shownProgress = useMotionValue(0);

  const nearestReady = (index: number) => {
    const frames = framesRef.current;
    for (let d = 0; d < FRAME_COUNT; d += 1) {
      if (frames[index - d]) return index - d;
      if (frames[index + d]) return index + d;
    }
    return -1;
  };

  // Desenha a posicao fracionaria: o quadro de baixo inteiro e o seguinte por cima, com
  // opacidade igual a fracao. Da movimento continuo entre dois quadros sem baixar mais imagens.
  const draw = (progress: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const exact = progress * (FRAME_COUNT - 1);
    const base = nearestReady(Math.floor(exact));
    if (base < 0) return;
    const next = Math.min(base + 1, FRAME_COUNT - 1);
    const fraction = framesRef.current[next] && next !== base ? Math.min(Math.max(exact - base, 0), 1) : 0;
    const key = `${base}:${Math.round(fraction * 24)}`;
    if (key === drawnKeyRef.current) return;
    drawnKeyRef.current = key;
    // Quadros com fundo transparente: limpa antes, senao o desenho anterior fica por baixo.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.drawImage(framesRef.current[base]!, 0, 0, canvas.width, canvas.height);
    if (fraction > 0.04) {
      context.globalAlpha = fraction;
      context.drawImage(framesRef.current[next]!, 0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;
    }
  };

  const tick = (now: number) => {
    const dt = lastTickRef.current ? Math.min(now - lastTickRef.current, 64) : 16;
    lastTickRef.current = now;
    const gap = targetRef.current - shownRef.current;
    shownRef.current = Math.abs(gap) < 0.0004 ? targetRef.current : shownRef.current + gap * (1 - Math.exp(-dt / 90));
    shownProgress.set(shownRef.current);
    draw(shownRef.current);
    if (shownRef.current !== targetRef.current) rafRef.current = requestAnimationFrame(tick);
    else {
      rafRef.current = null;
      lastTickRef.current = 0;
    }
  };
  const wake = () => {
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (reduce) return undefined;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      targetRef.current = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0;
      scrollYProgress.set(targetRef.current);
      wake();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, scrollYProgress]);

  useEffect(() => {
    if (reduce) return undefined;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;
    const size = window.matchMedia("(min-width: 768px)").matches ? "lg" : "sm";
    const [width, height] = size === "lg" ? [1280, 960] : [800, 600];
    canvas.width = width;
    canvas.height = height;
    framesRef.current = Array.from({ length: FRAME_COUNT }, () => null);
    let cancelled = false;

    const start = () => {
      for (const index of loadOrder(FRAME_COUNT)) {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          // Decodifica fora da rolagem: desenhar uma imagem ainda comprimida trava o quadro.
          const ready = typeof createImageBitmap === "function" ? createImageBitmap(image).catch(() => image) : image.decode().then(() => image, () => image);
          void ready.then((frame) => {
            if (cancelled) return;
            framesRef.current[index] = frame;
            if (Math.abs(index - shownRef.current * (FRAME_COUNT - 1)) <= 8 || !drawnKeyRef.current) {
              drawnKeyRef.current = "";
              draw(shownRef.current);
            }
          });
        };
        image.src = frameSrc(size, index);
      }
    };
    // Os quadros so baixam depois que a pagina carregou e quando a secao chega perto da tela,
    // para nao disputar banda com o topo da pagina.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { rootMargin: "60% 0px" },
    );
    const observe = () => observer.observe(section);
    if (document.readyState === "complete") observe();
    else window.addEventListener("load", observe, { once: true });
    return () => {
      window.removeEventListener("load", observe);
      cancelled = true;
      observer.disconnect();
      // Zera a marca do loop: se ficar com o id cancelado, wake() acha que ja esta rodando
      // e a animacao nunca mais religa (acontece quando o React remonta o componente).
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = 0;
    };
  }, [reduce]);

  if (reduce) {
    return (
      <section aria-labelledby="dashboard-film-title" className="bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 id="dashboard-film-title" className="text-balance font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">Veja por dentro.</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600">Prontidão, aulas, simulados e flashcards das 11 certificações num painel só.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={frameSrc("lg", STATIC_FRAME)} alt="Painel da CloudStudy com prontidão, aulas, simulados e flashcards de uma conta de exemplo" width={1280} height={960} loading="lazy" className="mx-auto mt-10 h-auto w-full" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="dashboard-film-title" className="relative h-[340vh] bg-white sm:h-[380vh]">
      <h2 id="dashboard-film-title" className="sr-only">Veja por dentro o painel da CloudStudy</h2>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-6 pt-24 sm:pt-28">
        <div className="relative h-[8.5rem] w-full sm:h-[11.75rem]" aria-hidden="true">
          {captions.map((caption) => (
            <Caption key={caption.title} progress={shownProgress} {...caption} />
          ))}
        </div>
        <canvas
          ref={canvasRef}
          // Bordas esfumacadas: no zoom o painel encosta no limite do canvas e viraria um quadrado.
          style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
          role="img"
          aria-label="Animação do painel da CloudStudy num notebook: prontidão, aulas, simulados, flashcards e troca entre certificações, com dados de exemplo"
          className="mt-2 aspect-[4/3] max-h-[calc(100svh-15rem)] w-auto max-w-full sm:max-h-[calc(100svh-18.75rem)] sm:max-w-[min(100%,72rem)]"
        />
      </div>
    </section>
  );
}
