import { WhatsAppButton } from "@/versoes/homebackup/components/WhatsAppButton";

// Componentes EXCLUSIVOS da página /aprender (independentes da home)
import { HeroV2 } from "@/versoes/homebackup/components/aprender-only/HeroV2";
import { ProblemSection } from "@/versoes/homebackup/components/aprender-only/ProblemSection";
import { AudioTestimonialsV2 } from "@/versoes/homebackup/components/aprender-only/AudioTestimonialsV2";
import { SupportBannerV2 } from "@/versoes/homebackup/components/aprender-only/SupportBannerV2";
import { TransformationSection } from "@/versoes/homebackup/components/aprender-only/TransformationSection";
import { ContentSectionV2 } from "@/versoes/homebackup/components/aprender-only/ContentSectionV2";
import { InstructorSection } from "@/versoes/homebackup/components/aprender-only/InstructorSection";
import { StrategicCTAV2 } from "@/versoes/homebackup/components/aprender-only/StrategicCTAV2";
import { EnvironmentSection } from "@/versoes/homebackup/components/aprender-only/EnvironmentSection";
import { CertificateSection } from "@/versoes/homebackup/components/aprender-only/CertificateSection";
import { TestimonialsV2 } from "@/versoes/homebackup/components/aprender-only/TestimonialsV2";
import { PricingV2 } from "@/versoes/homebackup/components/aprender-only/PricingV2";
import { FAQV2 } from "@/versoes/homebackup/components/aprender-only/FAQV2";
import { FinalCTA } from "@/versoes/homebackup/components/aprender-only/FinalCTA";
import { FooterV2 } from "@/versoes/homebackup/components/aprender-only/FooterV2";
import { DisclaimerSection } from "@/versoes/homebackup/components/aprender-only/DisclaimerSection";

import { openHotmartCheckout } from "@/versoes/homebackup/lib/checkoutTracking";

const Aprender = () => {
  (window as any).openCheckout = () => openHotmartCheckout();

  return (
    <div className="min-h-screen">
      <HeroV2 />
      <AudioTestimonialsV2 />
      <ProblemSection />
      <CertificateSection />
      <InstructorSection />
      <StrategicCTAV2
        headline="Quero aprender com a Elisa!"
        buttonText="Sim, Quero Ser Aluno(a)"
        variant="light"
      />
      <EnvironmentSection />
      <SupportBannerV2 />
      <TransformationSection />
      <ContentSectionV2 />
      <TestimonialsV2 />
      <PricingV2 />
      <FAQV2 />
      <FinalCTA />
      <DisclaimerSection />
      <FooterV2 />
      <WhatsAppButton />
    </div>
  );
};

export default Aprender;
