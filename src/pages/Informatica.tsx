import { WhatsAppButton } from "@/components/WhatsAppButton";

import { HeroInformatica } from "@/components/informatica/HeroInformatica";
import { AudioTestimonialsLight } from "@/components/informatica/AudioTestimonialsLight";
import { ProblemSection } from "@/components/curso/ProblemSection";
import { CertificateSectionLight } from "@/components/informatica/CertificateSectionLight";
import { InstructorSection } from "@/components/curso/InstructorSection";
import { StrategicCTAV2 } from "@/components/curso/StrategicCTAV2";
import { EnvironmentSectionLight } from "@/components/informatica/EnvironmentSectionLight";
import { TransformationSectionLight } from "@/components/informatica/TransformationSectionLight";
import { ContentSectionLight } from "@/components/informatica/ContentSectionLight";
import { TestimonialsLight } from "@/components/informatica/TestimonialsLight";
import { PricingV2 } from "@/components/curso/PricingV2";
import { FAQV2 } from "@/components/curso/FAQV2";
import { FinalCTALight } from "@/components/informatica/FinalCTALight";
import { DisclaimerSection } from "@/components/curso/DisclaimerSection";
import { FooterLight } from "@/components/informatica/FooterLight";

const Informatica = () => {
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
    <div className="min-h-screen bg-background">
      <HeroInformatica />
      <AudioTestimonialsLight />
      <ProblemSection />
      <CertificateSectionLight />
      <InstructorSection />
      <StrategicCTAV2 
        headline="Quero aprender com a Elisa!"
        buttonText="Sim, Quero Ser Aluno(a)"
        variant="light"
      />
      <EnvironmentSectionLight />
      <TransformationSectionLight />
      <ContentSectionLight />
      <TestimonialsLight />
      <PricingV2 />
      <FAQV2 />
      <FinalCTALight />
      <DisclaimerSection />
      <FooterLight />
      <WhatsAppButton />
    </div>
  );
};

export default Informatica;
