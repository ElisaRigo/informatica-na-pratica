import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes independentes da página /aprender
import { HeroV2 } from "@/components/aprender/HeroV2";
import { ProblemSection } from "@/components/aprender/ProblemSection";
import { AudioTestimonialsV2 } from "@/components/aprender/AudioTestimonialsV2";
import { SupportBannerV2 } from "@/components/aprender/SupportBannerV2";
import { TransformationSection } from "@/components/aprender/TransformationSection";
import { ContentSectionV2 } from "@/components/aprender/ContentSectionV2";
import { InstructorSection } from "@/components/aprender/InstructorSection";
import { StrategicCTAV2 } from "@/components/aprender/StrategicCTAV2";
import { EnvironmentSection } from "@/components/aprender/EnvironmentSection";
import { CertificateSection } from "@/components/aprender/CertificateSection";
import { TestimonialsV2 } from "@/components/aprender/TestimonialsV2";
import { PricingV2 } from "@/components/aprender/PricingV2";
import { FAQV2 } from "@/components/aprender/FAQV2";
import { FinalCTA } from "@/components/aprender/FinalCTA";
import { FooterV2 } from "@/components/aprender/FooterV2";
import { DisclaimerSection } from "@/components/aprender/DisclaimerSection";

const Aprender = () => {
  // Redirect all checkout buttons to Hotmart with tracking
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
