import { lazy, Suspense } from "react";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Componentes críticos (above the fold) - carregamento imediato
import { HeroV2 } from "@/components/curso/HeroV2";
import { ProblemSection } from "@/components/curso/ProblemSection";

// Componentes lazy (below the fold) - carregamento sob demanda
const AudioTestimonialsV2 = lazy(() => import("@/components/curso/AudioTestimonialsV2").then(m => ({ default: m.AudioTestimonialsV2 })));
const SupportBannerV2 = lazy(() => import("@/components/curso/SupportBannerV2").then(m => ({ default: m.SupportBannerV2 })));
const TransformationSection = lazy(() => import("@/components/curso/TransformationSection").then(m => ({ default: m.TransformationSection })));
const ContentSectionV2 = lazy(() => import("@/components/curso/ContentSectionV2").then(m => ({ default: m.ContentSectionV2 })));
const InstructorSection = lazy(() => import("@/components/curso/InstructorSection").then(m => ({ default: m.InstructorSection })));
const StrategicCTAV2 = lazy(() => import("@/components/curso/StrategicCTAV2").then(m => ({ default: m.StrategicCTAV2 })));
const TestimonialsV2 = lazy(() => import("@/components/curso/TestimonialsV2").then(m => ({ default: m.TestimonialsV2 })));
const PricingV2 = lazy(() => import("@/components/curso/PricingV2").then(m => ({ default: m.PricingV2 })));
const FAQV2 = lazy(() => import("@/components/curso/FAQV2").then(m => ({ default: m.FAQV2 })));
const FinalCTA = lazy(() => import("@/components/curso/FinalCTA").then(m => ({ default: m.FinalCTA })));
const DisclaimerSection = lazy(() => import("@/components/curso/DisclaimerSection").then(m => ({ default: m.DisclaimerSection })));
const FooterV2 = lazy(() => import("@/components/curso/FooterV2").then(m => ({ default: m.FooterV2 })));

// Fallback mínimo para evitar layout shift
const SectionFallback = () => <div className="min-h-[100px]" />;

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
      <Suspense fallback={<SectionFallback />}>
        <AudioTestimonialsV2 />
      </Suspense>
      
      {/* 🎯 CTA ESTRATÉGICO 1 - Após depoimentos em áudio */}
      <Suspense fallback={<SectionFallback />}>
        <StrategicCTAV2 
          headline="Eu também quero aprender!"
          buttonText="Quero Aprender Informática sem Medo"
        />
      </Suspense>
      
      {/* 3️⃣ SUPORTE - Você não está sozinho */}
      <Suspense fallback={<SectionFallback />}>
        <SupportBannerV2 />
      </Suspense>
      
      {/* 4️⃣ TRANSFORMAÇÃO - Mostre o depois */}
      <Suspense fallback={<SectionFallback />}>
        <TransformationSection />
      </Suspense>
      
      {/* 5️⃣ CONTEÚDO - O que está incluído */}
      <Suspense fallback={<SectionFallback />}>
        <ContentSectionV2 />
      </Suspense>
      
      {/* 6️⃣ INSTRUTORA - Autoridade */}
      <Suspense fallback={<SectionFallback />}>
        <InstructorSection />
      </Suspense>
      
      {/* 🎯 CTA ESTRATÉGICO 3 - Após conhecer a professora */}
      <Suspense fallback={<SectionFallback />}>
        <StrategicCTAV2 
          headline="Quero aprender com a Elisa!"
          buttonText="Sim, Quero Ser Aluno(a)"
          variant="light"
        />
      </Suspense>
      
      {/* 8️⃣ DEPOIMENTOS - Prova social */}
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsV2 />
      </Suspense>
      
      {/* 9️⃣ PREÇO - Oferta + Garantia */}
      <Suspense fallback={<SectionFallback />}>
        <PricingV2 />
      </Suspense>
      
      {/* 🔟 FAQ - Quebre objeções */}
      <Suspense fallback={<SectionFallback />}>
        <FAQV2 />
      </Suspense>
      
      {/* 1️⃣1️⃣ CTA FINAL - Última chamada */}
      <Suspense fallback={<SectionFallback />}>
        <FinalCTA />
      </Suspense>
      
      {/* 1️⃣2️⃣ DISCLAIMER - Proteção legal sobre o prazo (última seção) */}
      <Suspense fallback={<SectionFallback />}>
        <DisclaimerSection />
      </Suspense>
      
      {/* FOOTER */}
      <Suspense fallback={<SectionFallback />}>
        <FooterV2 />
      </Suspense>
      
      {/* ELEMENTOS FLUTUANTES */}
      <WhatsAppButton />
      
      {/* CHECKOUT MODAL */}
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default Curso;
