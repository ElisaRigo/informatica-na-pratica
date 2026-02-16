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
  // Redirect all checkout buttons to Hotmart
  (window as any).openCheckout = () => {
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };
  
  return (
    <div className="min-h-screen">
      {/* 1️⃣ HERO - Headline forte + Vídeo + CTA */}
      <HeroV2 />
      
      {/* 2️⃣ PROBLEMA - Identifique a dor */}
      <ProblemSection />
      
      {/* 2.5️⃣ ÁUDIOS DE DEPOIMENTOS - Prova social auditiva */}
      <AudioTestimonialsV2 />
      
      {/* 🎯 CTA ESTRATÉGICO 1 - Após depoimentos em áudio */}
      <StrategicCTAV2 
        headline="Eu também quero aprender!"
        buttonText="Quero Aprender Informática sem Medo"
      />
      
      {/* 📜 CERTIFICADO - Prova tangível de conquista */}
      <CertificateSection />
      
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
