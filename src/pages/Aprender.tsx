import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes EXCLUSIVOS da página /aprender (independentes da home)
import { HeroV2 } from "@/components/aprender-only/HeroV2";
import { ProblemSection } from "@/components/aprender-only/ProblemSection";
import { AudioTestimonialsV2 } from "@/components/aprender-only/AudioTestimonialsV2";
import { CapableSection } from "@/components/aprender-only/CapableSection";
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
    <div className="min-h-screen theme-aprender bg-background text-foreground">
      {/* 1. HERO — Promessa clara + CTA imediato */}
      <HeroV2 />

      {/* 2. PROBLEMA — Conecta com a dor antes de qualquer coisa */}
      <ProblemSection />

      {/* 3. PROVA SOCIAL ANTECIPADA — Áudios reais quebram objeção logo de cara */}
      <AudioTestimonialsV2 />

      {/* 4. VOCÊ TAMBÉM CONSEGUE — Transição emocional */}
      <CapableSection />

      {/* 5. AUTORIDADE — Quem é a Professora */}
      <InstructorSection />

      {/* 6. TRANSFORMAÇÃO — O que muda na vida do aluno */}
      <TransformationSection />

      {/* CTA 1 — Compromisso antecipado (micro-conversão) */}
      <StrategicCTAV2
        headline="Quero aprender com a Professora Elisa!"
        buttonText="Sim, Quero Garantir Minha Vaga"
        variant="default"
      />

      {/* 7. CONTEÚDO DO CURSO — O que vai aprender */}
      <ContentSectionV2 />

      {/* 8. AMBIENTE DE ESTUDO — Onde estuda */}
      <EnvironmentSection />

      {/* 9. CERTIFICADO — Recompensa tangível */}
      <CertificateSection />

      {/* 10. SUPORTE — Quebra objeção "e se eu travar?" */}
      <SupportBannerV2 />

      {/* CTA 2 — Após ver tudo que recebe */}
      <StrategicCTAV2
        headline="Tudo isso é seu por um único pagamento!"
        buttonText="Quero Aproveitar Esta Oportunidade"
        variant="light"
      />

      {/* 11. DEPOIMENTOS — Prova social reforçada antes do preço */}
      <TestimonialsV2 />

      {/* 12. OFERTA — Preço apresentado após todo o valor construído */}
      <PricingV2 />

      {/* 13. FAQ — Última quebra de objeções */}
      <FAQV2 />

      {/* 14. CTA FINAL — Última chamada com urgência */}
      <FinalCTA />

      <DisclaimerSection />
      <FooterV2 />
      <WhatsAppButton />
    </div>
  );
};

export default Aprender;
