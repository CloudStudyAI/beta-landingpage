import Image from "next/image";

import celebrationRobot from "../../robos/6.svg";
import { LaunchLeadForm } from "../launch-lead-form";

export function FinalCtaSection() {
  return (
    <section id="lista-de-espera" aria-labelledby="final-cta-title" className="relative mt-24 scroll-mt-8 bg-[#1877f2] px-5 pb-8 pt-8 text-white sm:mt-36 sm:px-8 sm:pb-10 lg:mt-44 lg:pt-4">
      <svg aria-hidden="true" viewBox="0 0 1440 180" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -top-[95px] h-24 w-full fill-[#1877f2] sm:-top-[143px] sm:h-36 lg:-top-[175px] lg:h-44">
        <path d="M0 34C270 34 305 158 720 158S1170 34 1440 34V180H0Z" />
      </svg>

      <div className="relative mx-auto grid max-w-5xl items-center gap-4 text-center lg:grid-cols-[1fr_0.58fr] lg:text-left">
        <div className="relative z-10 py-8 sm:py-10 lg:py-16">
          <h2 id="final-cta-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] sm:text-5xl lg:text-[3.5rem]">
            Seu próximo passo pode começar agora.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-blue-50 sm:text-lg sm:leading-8 lg:mx-0">
            Receba novidades, conteúdos e atualizações da CloudStudy.
          </p>
          <div className="mx-auto flex justify-center lg:mx-0 lg:justify-start">
            <LaunchLeadForm />
          </div>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-sm sm:h-80 lg:h-[25rem]">
          <Image src={celebrationRobot} alt="Nimbo celebrando a conclusão de uma jornada de estudos." sizes="(min-width: 1024px) 380px, 82vw" className="absolute -bottom-4 left-1/2 h-auto w-[18rem] -translate-x-1/2 sm:w-[23rem] lg:-bottom-6 lg:w-[25rem]" />
        </div>
      </div>
    </section>
  );
}
