import { CertificationPathsSection } from "../components/launch/certification-paths-section";
import { FaqSection } from "../components/launch/faq-section";
import { FinalCtaSection } from "../components/launch/final-cta-section";
import { LaunchFooter } from "../components/launch/launch-footer";
import { LaunchHeader } from "../components/launch/launch-header";
import { LaunchHero } from "../components/launch/launch-hero";
import { LaunchNumbers } from "../components/launch/launch-numbers";
import { PricingSection } from "../components/launch/pricing-section";
import { ProductInsideSection } from "../components/launch/product-inside-section";
import { SideWave } from "../components/launch/side-wave";
import { StudyCycleSection } from "../components/launch/study-cycle-section";
import { TestimonialsSection } from "../components/launch/testimonials-section";

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen overflow-x-clip bg-white text-[var(--color-text)]">
      <LaunchHeader />
      <LaunchHero />
      <LaunchNumbers />
      <ProductInsideSection />
      <div id="plataforma" className="relative isolate scroll-mt-24 overflow-x-clip overflow-y-visible bg-white">
        <SideWave id="wave-a" side="left" className="top-8 z-0 h-[68rem] md:top-10 md:h-[82rem] lg:top-12 lg:h-[clamp(58rem,72vw,74rem)]" />

        <SideWave id="wave-b" side="right" className="top-[88rem] z-0 h-[64rem] md:top-[104rem] md:h-[70rem] lg:top-[clamp(72rem,82vw,80rem)] lg:h-[clamp(52rem,58vw,60rem)]" />

        <div className="relative z-10">
          <StudyCycleSection />
          <CertificationPathsSection />
        </div>
      </div>
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <LaunchFooter />
    </main>
  );
}
