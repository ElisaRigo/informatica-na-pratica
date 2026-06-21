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

const Aprender = () => {
  (window as any).openCheckout = () => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: 297.00,
        items: [{ item_id: 'curso-informatica', item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 297.00, currency: 'BRL', content_name: 'Curso Informática na Prática', content_ids: ['curso-informatica'], num_items: 1
      });
    }
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };

  return (
    <div className="min-h-screen">
      <HeroV2 />
      <CapableSection />
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
