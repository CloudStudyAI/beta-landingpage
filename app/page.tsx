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
      <CertificationPathsSection />
      <PreFaqTransitionSection />
      <FaqSection />
      <FinalCtaSection />
      <LaunchFooter />
    </main>
  );
}
