import { WhatsAppButton } from "@/components/WhatsAppButton";

import { HeroInformatica } from "@/components/informatica/HeroInformatica";
import { AudioTestimonialsLight } from "@/components/informatica/AudioTestimonialsLight";
import { ProblemBanner } from "@/components/informatica/ProblemBanner";
import { InstructorSection } from "@/components/curso/InstructorSection";
import { EnvironmentSectionLight } from "@/components/informatica/EnvironmentSectionLight";
import { TransformationSectionLight } from "@/components/informatica/TransformationSectionLight";
import { ContentSectionLight } from "@/components/informatica/ContentSectionLight";
import { ValueComparison } from "@/components/informatica/ValueComparison";
import { FAQV2 } from "@/components/curso/FAQV2";
import { FinalCTALight } from "@/components/informatica/FinalCTALight";
import { FooterLight } from "@/components/informatica/FooterLight";
import { CommentsStrip } from "@/components/informatica/FacebookComments";
import { AudioStrip } from "@/components/informatica/AudioStrip";

const Index = () => {
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
    <div className="min-h-screen bg-slate-900">
      <HeroInformatica />
      <AudioTestimonialsLight />
      <ProblemBanner />
      <InstructorSection variant="dark" />
      <AudioStrip name="Amanda" />
      <CommentsStrip startIndex={2} count={2} />
      <EnvironmentSectionLight />
      <AudioStrip name="Vanderlei" />
      <CommentsStrip startIndex={4} count={2} />
      <TransformationSectionLight />
      <ContentSectionLight />
      <AudioStrip name="Bruna" />
      <CommentsStrip startIndex={6} count={2} />
      <ValueComparison />
      <FAQV2 variant="dark" />
      <FinalCTALight />
      <FooterLight />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
