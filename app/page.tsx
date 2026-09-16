import { CertificationPathsSection } from "../components/launch/certification-paths-section";
import { FaqSection } from "../components/launch/faq-section";
import { FinalCtaSection } from "../components/launch/final-cta-section";
import { LaunchFooter } from "../components/launch/launch-footer";
import { LaunchHeader } from "../components/launch/launch-header";
import { LaunchHero } from "../components/launch/launch-hero";
import { PreFaqTransitionSection } from "../components/launch/pre-faq-transition-section";
import { StudyContinuitySection } from "../components/launch/study-continuity-section";
import { StudyCycleSection } from "../components/launch/study-cycle-section";

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen overflow-x-clip bg-white text-[var(--color-text)]">
      <LaunchHeader />
      <LaunchHero />
      <StudyContinuitySection />
      <StudyCycleSection />
      <div className="relative isolate overflow-x-clip bg-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 260 1800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -left-10 top-24 z-0 hidden h-[42%] w-20 fill-[#1877f2] sm:block md:-left-8 md:h-[46%] md:w-24 lg:-left-10 lg:h-1/2 lg:w-32 xl:-left-2 xl:h-[55%] xl:w-36"
        >
          <path d="M0 0c76 31 164 104 181 221 18 124-79 201-42 331 33 117 116 172 94 305-20 124-120 207-91 349 25 124 117 210 82 344-27 104-112 203-224 250V0Z" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 260 1500"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -right-10 top-[34%] z-0 hidden h-[35%] w-20 fill-[#1877f2] sm:block md:-right-8 md:top-[32%] md:h-[38%] md:w-24 lg:-right-10 lg:top-[30%] lg:h-[42%] lg:w-32 xl:-right-2 xl:top-[28%] xl:h-[46%] xl:w-36"
        >
          <path d="M260 0c-71 39-158 112-177 225-21 123 67 209 28 338-36 119-105 183-80 314 23 121 113 190 91 324-19 115-86 225 138 299Z" />
        </svg>

        <div className="relative z-10">
          <CertificationPathsSection />
          <PreFaqTransitionSection />
        </div>
      </div>
      <FaqSection />
      <FinalCtaSection />
      <LaunchFooter />
    </main>
  );
}
