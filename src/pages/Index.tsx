import { lazy, Suspense, memo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SupportBanner } from "@/components/SupportBanner";
import { CoursePreview } from "@/components/CoursePreview";
import { AboutSection } from "@/components/AboutSection";
import { Authority } from "@/components/Authority";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { CourseContent } from "@/components/CourseContent";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FreeLessonExcel } from "@/components/FreeLessonExcel";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";

// Lazy load componentes com prefetch
const Bonus = lazy(() => import("@/components/Bonus").then(m => ({
  default: m.Bonus
})));
const ValueStack = lazy(() => import("@/components/ValueStack").then(m => ({
  default: m.ValueStack
})));
const Possibilities = lazy(() => import("@/components/Possibilities").then(m => ({
  default: m.Possibilities
})));
const TargetAudience = lazy(() => import("@/components/TargetAudience").then(m => ({
  default: m.TargetAudience
})));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({
  default: m.Comparison
})));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({
  default: m.Pricing
})));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({
  default: m.FAQ
})));
const Guarantee = lazy(() => import("@/components/Guarantee").then(m => ({
  default: m.Guarantee
})));
const StrategicCTA = lazy(() => import("@/components/StrategicCTA").then(m => ({
  default: m.StrategicCTA
})));

// Loading placeholder otimizado
const LoadingFallback = memo(() => <div className="h-32" />);
const Index = () => {
  const {
    isOpen,
    openCheckout,
    closeCheckout
  } = useCheckoutDialog();

  // Make openCheckout globally accessible
  (window as any).openCheckout = openCheckout;
  return <div className="min-h-screen">
      {/* 1️⃣ PRIMEIRA DOBRA - Vídeo + Promessa + CTA */}
      <Header />
      <Hero />
      
      {/* SUPORTE - Banner de confiança */}
      <SupportBanner />
      
      {/* 2️⃣ VÍDEO - Conheça o Curso por Dentro */}
      <CoursePreview />
      
      {/* 3️⃣ AULA GRATUITA DE EXCEL */}
      <FreeLessonExcel />
      
      {/* 4️⃣ O QUE VOCÊ VAI DOMINAR - Conteúdos principais (única seção combinada) */}
      <CourseContent />
      
      {/* 5️⃣ QUEM É A PROFESSORA ELISA - Autoridade */}
      <Authority />
      
      {/* 6️⃣ BÔNUS - Benefícios extras + Escassez + CTA */}
      <Suspense fallback={<LoadingFallback />}>
        <Bonus />
      </Suspense>
      
      {/* 7️⃣ DEPOIMENTOS - Prova Social */}
      <Testimonials />
      
      {/* 8️⃣ DEPOIS DO CURSO - Capacidades */}
      <Suspense fallback={<LoadingFallback />}>
        <ValueStack />
      </Suspense>
      
      {/* 9️⃣ INVESTIMENTO - Proposta de valor */}
      <Suspense fallback={<LoadingFallback />}>
        <Possibilities />
      </Suspense>
      
      {/* 🔟 PARA QUEM É - Público alvo */}
      <Suspense fallback={<LoadingFallback />}>
        <TargetAudience />
      </Suspense>
      
      {/* 1️⃣1️⃣ OFERTA E PREÇO #1 */}
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
      
      {/* 1️⃣2️⃣ GARANTIA #1 */}
      
      
      {/* 1️⃣3️⃣ ANTES E DEPOIS - Transformação */}
      <Suspense fallback={<LoadingFallback />}>
        <Comparison />
      </Suspense>
      
      {/* 1️⃣4️⃣ QUEM VAI TE ENSINAR - Sobre */}
      <AboutSection />
      
      {/* 1️⃣5️⃣ OFERTA E PREÇO #2 */}
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
      
      {/* 1️⃣6️⃣ PERGUNTAS FREQUENTES */}
      <Suspense fallback={<LoadingFallback />}>
        <FAQ />
      </Suspense>
      
      {/* 1️⃣7️⃣ GARANTIA #2 - Reduzir Risco */}
      <Suspense fallback={<LoadingFallback />}>
        <Guarantee />
      </Suspense>
      
      {/* 1️⃣8️⃣ CTA FINAL ESTRATÉGICO */}
      <Suspense fallback={<LoadingFallback />}>
        <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      </Suspense>
      
      <Footer />
      <WhatsAppButton />
      
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>;
};
export default Index;