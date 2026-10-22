import { WhatsAppButton } from "@/versoes/v1305/components/WhatsAppButton";

// Componentes EXCLUSIVOS da página /aprender (independentes da home)
import { HeroV2 } from "@/versoes/v1305/components/aprender-only/HeroV2";
import { ProblemSection } from "@/versoes/v1305/components/aprender-only/ProblemSection";
import { AudioTestimonialsV2 } from "@/versoes/v1305/components/aprender-only/AudioTestimonialsV2";
import { SupportBannerV2 } from "@/versoes/v1305/components/aprender-only/SupportBannerV2";
import { TransformationSection } from "@/versoes/v1305/components/aprender-only/TransformationSection";
import { ContentSectionV2 } from "@/versoes/v1305/components/aprender-only/ContentSectionV2";
import { InstructorSection } from "@/versoes/v1305/components/aprender-only/InstructorSection";
import { StrategicCTAV2 } from "@/versoes/v1305/components/aprender-only/StrategicCTAV2";
import { EnvironmentSection } from "@/versoes/v1305/components/aprender-only/EnvironmentSection";
import { CertificateSection } from "@/versoes/v1305/components/aprender-only/CertificateSection";
import { TestimonialsV2 } from "@/versoes/v1305/components/aprender-only/TestimonialsV2";
import { PricingV2 } from "@/versoes/v1305/components/aprender-only/PricingV2";
import { FAQV2 } from "@/versoes/v1305/components/aprender-only/FAQV2";
import { FinalCTA } from "@/versoes/v1305/components/aprender-only/FinalCTA";
import { FooterV2 } from "@/versoes/v1305/components/aprender-only/FooterV2";
import { DisclaimerSection } from "@/versoes/v1305/components/aprender-only/DisclaimerSection";

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
