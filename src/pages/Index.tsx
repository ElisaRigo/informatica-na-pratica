import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { CourseContent } from "@/components/CourseContent";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";

// Lazy load componentes otimizados para conversão
const Bonus = lazy(() => import("@/components/Bonus").then(m => ({ default: m.Bonus })));
const ValueStack = lazy(() => import("@/components/ValueStack").then(m => ({ default: m.ValueStack })));
const Possibilities = lazy(() => import("@/components/Possibilities").then(m => ({ default: m.Possibilities })));
const TargetAudience = lazy(() => import("@/components/TargetAudience").then(m => ({ default: m.TargetAudience })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Guarantee = lazy(() => import("@/components/Guarantee").then(m => ({ default: m.Guarantee })));
const StrategicCTA = lazy(() => import("@/components/StrategicCTA").then(m => ({ default: m.StrategicCTA })));

const Index = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  
  // Make openCheckout globally accessible
  (window as any).openCheckout = openCheckout;
  
  return (
    <div className="min-h-screen">
      {/* 1️⃣ PRIMEIRA DOBRA - Vídeo + Promessa + CTA */}
      <Header />
      <Hero />
      
      {/* 2️⃣ O QUE VOCÊ VAI DOMINAR - Conteúdos principais (única seção combinada) */}
      <CourseContent />
      
      {/* 3️⃣ BÔNUS - Benefícios extras + Escassez + CTA */}
      <Suspense fallback={<div className="h-32" />}>
        <Bonus />
      </Suspense>
      
      {/* 4️⃣ DEPOIS DO CURSO - Capacidades */}
      <Suspense fallback={<div className="h-32" />}>
        <ValueStack />
      </Suspense>
      
      {/* 5️⃣ INVESTIMENTO - Proposta de valor */}
      <Suspense fallback={<div className="h-32" />}>
        <Possibilities />
      </Suspense>
      
      {/* 6️⃣ PARA QUEM É - Público alvo */}
      <Suspense fallback={<div className="h-32" />}>
        <TargetAudience />
      </Suspense>
      
      {/* 7️⃣ OFERTA E PREÇO #1 */}
      <Suspense fallback={<div className="h-32" />}>
        <Pricing />
      </Suspense>
      
      {/* 8️⃣ GARANTIA #1 */}
      <Suspense fallback={<div className="h-32" />}>
        <Guarantee />
      </Suspense>
      
      {/* 9️⃣ ANTES E DEPOIS - Transformação */}
      <Suspense fallback={<div className="h-32" />}>
        <Comparison />
      </Suspense>
      
      {/* 🔟 DEPOIMENTOS - Prova Social */}
      <Testimonials />
      
      {/* 1️⃣1️⃣ QUEM VAI TE ENSINAR - Autoridade */}
      <AboutSection />
      
      {/* 1️⃣2️⃣ OFERTA E PREÇO #2 */}
      <Suspense fallback={<div className="h-32" />}>
        <Pricing />
      </Suspense>
      
      {/* 1️⃣3️⃣ PERGUNTAS FREQUENTES */}
      <Suspense fallback={<div className="h-32" />}>
        <FAQ />
      </Suspense>
      
      {/* 1️⃣4️⃣ GARANTIA #2 - Reduzir Risco */}
      <Suspense fallback={<div className="h-32" />}>
        <Guarantee />
      </Suspense>
      
      {/* 1️⃣5️⃣ CTA FINAL ESTRATÉGICO */}
      <Suspense fallback={<div className="h-32" />}>
        <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      </Suspense>
      
      <Footer />
      
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default Index;
