import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { CursoCheckoutDialog } from "@/components/curso/CursoCheckoutDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes da nova página
import { HeroV2 } from "@/components/curso/HeroV2";
import { ProblemSection } from "@/components/curso/ProblemSection";
import { AudioTestimonialsV2 } from "@/components/curso/AudioTestimonialsV2";
import { SupportBannerV2 } from "@/components/curso/SupportBannerV2";
import { TransformationSection } from "@/components/curso/TransformationSection";
import { ContentSectionV2 } from "@/components/curso/ContentSectionV2";
import { InstructorSection } from "@/components/curso/InstructorSection";
import { StrategicCTAV2 } from "@/components/curso/StrategicCTAV2";
import { EnvironmentSection } from "@/components/curso/EnvironmentSection";
import { CertificateSection } from "@/components/curso/CertificateSection";

import { TestimonialsV2 } from "@/components/curso/TestimonialsV2";
import { PricingV2 } from "@/components/curso/PricingV2";
import { FAQV2 } from "@/components/curso/FAQV2";
import { FinalCTA } from "@/components/curso/FinalCTA";
import { FooterV2 } from "@/components/curso/FooterV2";
import { DisclaimerSection } from "@/components/curso/DisclaimerSection";


const Index = () => {
  // Redirect all checkout buttons to Hotmart with tracking
  (window as any).openCheckout = () => {
    // GA4 begin_checkout
    if ((window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: 297.00,
        items: [{ item_id: 'curso-informatica', item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
      });
    }
    // Meta Pixel InitiateCheckout
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 297.00, currency: 'BRL', content_name: 'Curso Informática na Prática', content_ids: ['curso-informatica'], num_items: 1
      });
    }
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };
  
  return (
    <div className="min-h-screen">
      {/* 1️⃣ HERO - Headline forte + Vídeo + CTA */}
      <HeroV2 />
      
      {/* 2️⃣ ÁUDIOS DE DEPOIMENTOS - Prova social auditiva */}
      <AudioTestimonialsV2 />
      
      {/* 📜 CERTIFICADO - Prova tangível de conquista */}
      <CertificateSection />
      
      {/* 3️⃣ PROBLEMA - Identifique a dor */}
      <ProblemSection />
      
      {/* 🏠 AMBIENTE DE AULA - Antes do suporte */}
      <EnvironmentSection />
      
      {/* 3️⃣ SUPORTE - Você não está sozinho */}
      <SupportBannerV2 />
      
      {/* 4️⃣ TRANSFORMAÇÃO - Mostre o depois */}
      <TransformationSection />
      
      {/* 5️⃣ CONTEÚDO - O que está incluído */}
      <ContentSectionV2 />
      
      {/* 6️⃣ INSTRUTORA - Autoridade */}
      <InstructorSection />
      
      {/* 🎯 CTA ESTRATÉGICO 3 - Após conhecer a professora */}
      <StrategicCTAV2 
        headline="Quero aprender com a Elisa!"
        buttonText="Sim, Quero Ser Aluno(a)"
        variant="light"
      />
      
      {/* 8️⃣ DEPOIMENTOS - Prova social */}
      <TestimonialsV2 />
      
      {/* 9️⃣ PREÇO - Oferta + Garantia */}
      <PricingV2 />
      
      {/* 🔟 FAQ - Quebre objeções */}
      <FAQV2 />
      
      {/* 1️⃣1️⃣ CTA FINAL - Última chamada */}
      <FinalCTA />
      
      {/* 1️⃣2️⃣ DISCLAIMER - Proteção legal sobre o prazo (última seção) */}
      <DisclaimerSection />
      
      {/* FOOTER */}
      <FooterV2 />
      
      {/* ELEMENTOS FLUTUANTES */}
      <WhatsAppButton />
      
      {/* CHECKOUT - Redirecionando para Hotmart */}
    </div>
  );
};

export default Index;
