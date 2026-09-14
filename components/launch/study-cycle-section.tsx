"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import thinkingRobot from "../../robos/4.svg";

const studySteps = [
  { description: "Entenda os conceitos essenciais sem conteúdo solto.", title: "Aprenda" },
  { description: "Aplique o que estudou e transforme teoria em entendimento.", title: "Pratique" },
  { description: "Volte ao que precisa de atenção no momento certo.", title: "Revise" },
  { description: "Acompanhe o que já avançou e mantenha o ritmo de estudo.", title: "Evolua" },
] as const;

const desktopMarkerOffsets = ["lg:top-[5rem]", "lg:top-6", "lg:top-[6.5rem]", "lg:top-11"] as const;
const premiumEase = [0.22, 1, 0.36, 1] as const;
const stepRevealDelay = 0.675;
const stepRevealStagger = 0.225;
const nimboRevealDelay = 2.25;

export function StudyCycleSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="como-funciona" aria-labelledby="study-cycle-title" className="relative isolate scroll-mt-8 overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-10 top-10 -z-10 bg-[#eef5ff]" />
      <div aria-hidden="true" className="absolute -left-[10%] -top-4 -z-10 h-28 w-[120%] rounded-[50%] bg-[#eef5ff] sm:h-32" />
      <div aria-hidden="true" className="absolute -bottom-4 -left-[10%] -z-10 h-28 w-[120%] rounded-[50%] bg-[#eef5ff] sm:h-32" />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 id="study-cycle-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Um ciclo simples para estudar com consistência.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Você aprende o conteúdo, pratica, revisa o que precisa de atenção e acompanha sua evolução.
          </p>
        </div>

        <motion.div
          className="relative mt-12 sm:mt-16 lg:mt-20"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <svg aria-hidden="true" viewBox="0 0 1000 160" preserveAspectRatio="none" className="absolute left-0 right-56 top-0 hidden h-40 w-[calc(100%-14rem)] lg:block">
            <defs>
              <mask id="study-cycle-path-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="160">
                <motion.path
                  d="M125 104C225 104 270 48 375 48s145 80 250 80 145-60 250-60"
                  fill="none"
                  stroke="white"
                  strokeWidth="12"
                  strokeLinecap="round"
                  variants={{
                    hidden: { opacity: 0, pathLength: 0 },
                    visible: { opacity: 1, pathLength: 1, transition: { duration: 2.1, ease: premiumEase } },
                  }}
                />
              </mask>
            </defs>
            <path d="M125 104C225 104 270 48 375 48s145 80 250 80 145-60 250-60" fill="none" stroke="#78adf0" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 13" mask="url(#study-cycle-path-reveal)" />
          </svg>

          <motion.ol className="relative lg:mr-56 lg:grid lg:grid-cols-4 lg:gap-10">
            {studySteps.map((step, index) => (
              <motion.li
                key={step.title}
                className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-12 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-7 sm:pb-14 lg:block lg:grid-cols-none lg:pb-0 lg:text-center"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: stepRevealDelay + index * stepRevealStagger, duration: 0.78, ease: premiumEase },
                  },
                }}
              >
                {index < studySteps.length - 1 ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[21px] top-11 origin-top border-l-2 border-dashed border-[#78adf0] sm:left-[23px] lg:hidden"
                    variants={{
                      hidden: { opacity: 0, scaleY: 0 },
                      visible: {
                        opacity: 1,
                        scaleY: 1,
                        transition: { delay: stepRevealDelay + index * stepRevealStagger, duration: 0.675, ease: premiumEase },
                      },
                    }}
                  />
                ) : null}

                <div className="relative lg:h-40">
                  <span className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[5px] border-[#eef5ff] bg-[#1479ff] text-xs font-bold tracking-[0.06em] text-white shadow-[0_0_0_2px_#8abaf5] sm:h-12 sm:w-12 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-sm ${desktopMarkerOffsets[index]}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="pt-1 lg:mt-6 lg:pt-0">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-[#0b2a6f] sm:text-[1.75rem]">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-[0.9375rem] leading-6 text-slate-600 sm:text-base sm:leading-7 lg:mx-auto">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div
            className="-mt-4 flex justify-end sm:-mt-10 lg:absolute lg:right-0 lg:top-4 lg:mt-0 lg:w-56"
            variants={{
              hidden: { opacity: 0, scale: 0.94, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { delay: nimboRevealDelay, duration: 0.75, ease: premiumEase } },
            }}
          >
            <Image
              src={thinkingRobot}
              alt="Nimbo acompanhando o ciclo de estudo."
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 176px, 144px"
              className="h-auto w-36 drop-shadow-[0_18px_16px_rgba(11,42,111,0.14)] sm:w-44 lg:w-56"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
