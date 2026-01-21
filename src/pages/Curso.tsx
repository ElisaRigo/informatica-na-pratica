import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes da nova página
import { HeroV2 } from "@/components/curso/HeroV2";
import { ProblemSection } from "@/components/curso/ProblemSection";
import { TransformationSection } from "@/components/curso/TransformationSection";
import { ContentSectionV2 } from "@/components/curso/ContentSectionV2";
import { InstructorSection } from "@/components/curso/InstructorSection";
import { TestimonialsV2 } from "@/components/curso/TestimonialsV2";
import { PricingV2 } from "@/components/curso/PricingV2";
import { FAQV2 } from "@/components/curso/FAQV2";
import { FinalCTA } from "@/components/curso/FinalCTA";
import { FooterV2 } from "@/components/curso/FooterV2";

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
      
      {/* 3️⃣ TRANSFORMAÇÃO - Mostre o depois */}
      <TransformationSection />
      
      {/* 4️⃣ CONTEÚDO - O que está incluído */}
      <ContentSectionV2 />
      
      {/* 5️⃣ INSTRUTORA - Autoridade */}
      <InstructorSection />
      
      {/* 6️⃣ DEPOIMENTOS - Prova social */}
      <TestimonialsV2 />
      
      {/* 7️⃣ PREÇO - Oferta + Garantia */}
      <PricingV2 />
      
      {/* 8️⃣ FAQ - Quebre objeções */}
      <FAQV2 />
      
      {/* 9️⃣ CTA FINAL - Última chamada */}
      <FinalCTA />
      
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
