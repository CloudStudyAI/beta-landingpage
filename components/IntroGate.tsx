"use client";

import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { CloudStudyIntro } from "./CloudStudyIntro";

const SESSION_KEY = "cloudstudy-intro-played";

type IntroPhase = "checking" | "playing" | "complete";

export function IntroGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("checking");
  const prefersReducedMotion = useReducedMotion();
  const isContentVisible = phase === "complete";
  const shouldShowIntro = phase !== "complete";

  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    let timer: number | undefined;
    let alreadyPlayed: string | null = null;

    try {
      alreadyPlayed = sessionStorage.getItem(SESSION_KEY);
    } catch {
      alreadyPlayed = SESSION_KEY;
    }

    if (alreadyPlayed) {
      setPhase("complete");

      return () => {
        root.style.overflow = previousHtmlOverflow;
        body.style.overflow = previousBodyOverflow;
      };
    }

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    setPhase("playing");

    timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Sem armazenamento disponivel, apenas fecha a intro.
      }
      setPhase("complete");
      root.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    }, prefersReducedMotion ? 700 : 1700);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
      root.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <noscript>
        <style>{`.cloudstudy-intro-overlay{display:none !important}.cloudstudy-intro-content{opacity:1 !important;pointer-events:auto !important}`}</style>
      </noscript>
      {shouldShowIntro ? <CloudStudyIntro /> : null}
      <div
        className={`cloudstudy-intro-content transition-opacity duration-500 ${
          isContentVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isContentVisible}
      >
        {children}
      </div>
    </>
  );
}
