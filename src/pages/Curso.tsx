import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes da nova página
import { HeroV2 } from "@/components/curso/HeroV2";
import { ProblemSection } from "@/components/curso/ProblemSection";
import { AudioTestimonialsV2 } from "@/components/curso/AudioTestimonialsV2";
import { SupportBannerV2 } from "@/components/curso/SupportBannerV2";
import { TransformationSection } from "@/components/curso/TransformationSection";
import { ContentSectionV2 } from "@/components/curso/ContentSectionV2";
import { InstructorSection } from "@/components/curso/InstructorSection";
import { EasyToLearnV2 } from "@/components/curso/EasyToLearnV2";
import { TestimonialsV2 } from "@/components/curso/TestimonialsV2";
import { PricingV2 } from "@/components/curso/PricingV2";
import { FAQV2 } from "@/components/curso/FAQV2";
import { FinalCTA } from "@/components/curso/FinalCTA";
import { FooterV2 } from "@/components/curso/FooterV2";
import { DisclaimerSection } from "@/components/curso/DisclaimerSection";

const Curso = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  
  // Make openCheckout globally accessible
  (window as any).openCheckout = openCheckout;
  
  return (
    <div className="min-h-screen">
      {/* 1️⃣ HERO - Headline forte + Vídeo + CTA */}
      <HeroV2 />
      
      {/* 2️⃣ PROBLEMA - Identifique a dor */}
      <ProblemSection />
      
      {/* 2.5️⃣ ÁUDIOS DE DEPOIMENTOS - Prova social auditiva */}
      <AudioTestimonialsV2 />
      
      {/* 3️⃣ SUPORTE - Você não está sozinho */}
      <SupportBannerV2 />
      
      {/* 4️⃣ TRANSFORMAÇÃO - Mostre o depois */}
      <TransformationSection />
      
      {/* 5️⃣ CONTEÚDO - O que está incluído */}
      <ContentSectionV2 />
      
      {/* 6️⃣ INSTRUTORA - Autoridade */}
      <InstructorSection />
      
      {/* 7️⃣ MEDO DE APRENDER - Prova que é fácil */}
      <EasyToLearnV2 />
      
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
      
      {/* CHECKOUT MODAL */}
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default Curso;
