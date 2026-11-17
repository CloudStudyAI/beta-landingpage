import { CertificationPathsSection } from "../components/launch/certification-paths-section";
import { DashboardScrollFilm } from "../components/launch/dashboard-scroll-film";
import { FaqSection } from "../components/launch/faq-section";
import { FinalCtaSection } from "../components/launch/final-cta-section";
import { LabsSection } from "../components/launch/labs-section";
import { LaunchFooter } from "../components/launch/launch-footer";
import { LaunchHeader } from "../components/launch/launch-header";
import { LaunchHero } from "../components/launch/launch-hero";
import { LaunchNumbers } from "../components/launch/launch-numbers";
import { PricingSection } from "../components/launch/pricing-section";
import { TestimonialsSection } from "../components/launch/testimonials-section";

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen overflow-x-clip bg-white text-[var(--color-text)]">
      <LaunchHeader />
      <LaunchHero />
      <LaunchNumbers />
      <DashboardScrollFilm />
      <LabsSection />
      <div id="plataforma" className="scroll-mt-24 bg-white">
        <CertificationPathsSection />
      </div>
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <LaunchFooter />
    </main>
  );
}
