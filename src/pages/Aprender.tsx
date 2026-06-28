import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes EXCLUSIVOS da página /aprender (independentes da home)
import { HeroV2 } from "@/components/aprender-only/HeroV2";
import { ProblemSection } from "@/components/aprender-only/ProblemSection";
import { AudioTestimonialsV2 } from "@/components/aprender-only/AudioTestimonialsV2";
import { SupportBannerV2 } from "@/components/aprender-only/SupportBannerV2";
import { TransformationSection } from "@/components/aprender-only/TransformationSection";
import { ContentSectionV2 } from "@/components/aprender-only/ContentSectionV2";
import { InstructorSection } from "@/components/aprender-only/InstructorSection";
import { StrategicCTAV2 } from "@/components/aprender-only/StrategicCTAV2";
import { EnvironmentSection } from "@/components/aprender-only/EnvironmentSection";
import { CertificateSection } from "@/components/aprender-only/CertificateSection";
import { TestimonialsV2 } from "@/components/aprender-only/TestimonialsV2";
import { PricingV2 } from "@/components/aprender-only/PricingV2";
import { FAQV2 } from "@/components/aprender-only/FAQV2";
import { FinalCTA } from "@/components/aprender-only/FinalCTA";
import { FooterV2 } from "@/components/aprender-only/FooterV2";
import { DisclaimerSection } from "@/components/aprender-only/DisclaimerSection";

import { openHotmartCheckout } from "@/lib/checkoutTracking";

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
