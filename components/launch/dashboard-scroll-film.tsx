"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useReducedMotionSafe } from "../../lib/use-reduced-motion-safe";
import type { FilmScene } from "./dashboard-scroll-scene";

// Notebook 3D com o painel da CloudStudy (telas reais de uma conta de demonstracao), desenhado
// ao vivo conforme o scroll. Ao vivo, e nao em sequencia de imagens: imagem pronta anda em
// passos e pesava 8 MB; a cena calcula cada instante e baixa menos de 1 MB.
const POSTER = "/dashboard-scroll/poster.webp";
const EDGE_FADE = "linear-gradient(to right, transparent, black 2.5%, black 97.5%, transparent), linear-gradient(to bottom, transparent, black 2.5%, black 97.5%, transparent)";

// Cada legenda acompanha uma parada da camera (ver KEYS em dashboard-scroll-scene.ts).
const captions = [
  { range: [-1, -0.5, 0.19, 0.24], title: "Veja por dentro.", body: "O painel real da CloudStudy, do jeito que o aluno usa." },
  { range: [0.26, 0.29, 0.355, 0.385], title: "Tudo o que importa numa tela só.", body: "Prontidão, aulas, simulados e flashcards, sempre atualizados." },
  { range: [0.395, 0.42, 0.535, 0.56], title: "Aula que faz você praticar.", body: "Nada de só assistir: você responde a cada passo." },
  { range: [0.575, 0.6, 0.655, 0.68], title: "Errou? O Nimbo explica.", body: "Na hora, com o porquê de cada resposta." },
  { range: [0.695, 0.72, 0.85, 0.89], title: "Simulado com o relógio correndo.", body: "Treine no ritmo da prova e analise seus erros no final." },
] as const;

function Caption({ progress, range, title, body }: { progress: MotionValue<number>; range: readonly number[]; title: string; body: string }) {
  const opacity = useTransform(progress, [...range], [0, 1, 1, 0]);
  const y = useTransform(progress, [...range], [16, 0, 0, -16]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 mx-auto max-w-2xl px-5 text-center">
      <h2 className="text-balance font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600 sm:text-lg">{body}</p>
    </motion.div>
  );
}

export function DashboardScrollFilm() {
  const { reduce } = useReducedMotionSafe();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<FilmScene | null>(null);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  // Posicao suavizada da rolagem: a cena e as legendas seguem este valor, entao um tique seco
  // da roda do mouse vira um movimento curto e continuo.
  const shownProgress = useMotionValue(0);

  useEffect(() => {
    if (reduce || failed) return undefined;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;
    let cancelled = false;

    const tick = (now: number) => {
      const dt = lastTickRef.current ? Math.min(now - lastTickRef.current, 64) : 16;
      lastTickRef.current = now;
      const gap = targetRef.current - shownRef.current;
      shownRef.current = Math.abs(gap) < 0.0002 ? targetRef.current : shownRef.current + gap * (1 - Math.exp(-dt / 110));
      shownProgress.set(shownRef.current);
      sceneRef.current?.render(shownRef.current);
      if (shownRef.current !== targetRef.current) rafRef.current = requestAnimationFrame(tick);
      else {
        rafRef.current = null;
        lastTickRef.current = 0;
      }
    };
    const wake = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };
    const update = () => {
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      targetRef.current = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0;
      wake();
    };
    const onResize = () => {
      sceneRef.current?.resize();
      update();
      sceneRef.current?.render(shownRef.current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);

    // O 3D so e baixado depois que a pagina carregou e quando a secao chega perto da tela.
    const start = async () => {
      try {
        const { createFilmScene } = await import("./dashboard-scroll-scene");
        const scene = await createFilmScene(canvas, window.matchMedia("(min-width: 768px)").matches ? "lg" : "sm");
        if (cancelled) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
        scene.render(shownRef.current);
        setReady(true);
      } catch {
        if (!cancelled) setFailed(true); // sem WebGL: mostra a imagem parada
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void start();
        }
      },
      { rootMargin: "80% 0px" },
    );
    const observe = () => observer.observe(section);
    if (document.readyState === "complete") observe();
    else window.addEventListener("load", observe, { once: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("load", observe);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      // Zera a marca do loop: com o id cancelado preso, wake() acharia que ja esta rodando.
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = 0;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [reduce, failed, shownProgress]);

  if (reduce || failed) {
    return (
      <section aria-labelledby="dashboard-film-title" className="bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 id="dashboard-film-title" className="text-balance font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">Veja por dentro.</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600">Prontidão, aulas, simulados e flashcards das 11 certificações num painel só.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={POSTER} alt="Notebook com o painel da CloudStudy: prontidão, aulas, simulados e flashcards de uma conta de exemplo" width={1280} height={960} loading="lazy" className="mx-auto mt-6 h-auto w-full max-w-3xl" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="dashboard-film-title" className="relative h-[560vh] bg-white sm:h-[640vh]">
      <h2 id="dashboard-film-title" className="sr-only">Veja por dentro o painel da CloudStudy</h2>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-6 pt-24 sm:pt-28">
        <div className="relative h-[8.5rem] w-full sm:h-[11.75rem]" aria-hidden="true">
          {captions.map((caption) => (
            <Caption key={caption.title} progress={shownProgress} {...caption} />
          ))}
        </div>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Animação de um notebook abrindo com o painel da CloudStudy: prontidão, uma aula com exercício corrigido pelo Nimbo e um simulado cronometrado, com dados de exemplo"
          // Bordas esfumacadas: quando a camera entra na tela, o painel encosta no limite do canvas.
          style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, maskComposite: "intersect", WebkitMaskComposite: "source-in", opacity: ready ? 1 : 0, transition: "opacity .5s ease" }}
          className="mt-2 aspect-[4/3] rounded-[1.75rem] w-[min(100%,calc((100svh-15rem)*4/3))] sm:w-[min(100%,72rem,calc((100svh-18.75rem)*4/3))]"
        />
      </div>
    </section>
  );
}
