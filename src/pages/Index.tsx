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
      
      {/* 4️⃣ ANTES E DEPOIS - Transformação */}
      <Suspense fallback={<div className="h-32" />}>
        <Comparison />
      </Suspense>
      
      {/* 5️⃣ DEPOIMENTOS - Prova Social */}
      <Testimonials />
      
      {/* 6️⃣ QUEM VAI TE ENSINAR - Autoridade */}
      <AboutSection />
      
      {/* 7️⃣ OFERTA E PREÇO */}
      <Suspense fallback={<div className="h-32" />}>
        <Pricing />
      </Suspense>
      
      {/* 8️⃣ PERGUNTAS FREQUENTES */}
      <Suspense fallback={<div className="h-32" />}>
        <FAQ />
      </Suspense>
      
      {/* 9️⃣ GARANTIA - Reduzir Risco */}
      <Suspense fallback={<div className="h-32" />}>
        <Guarantee />
      </Suspense>
      
      {/* 🔟 CTA FINAL ESTRATÉGICO */}
      <Suspense fallback={<div className="h-32" />}>
        <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      </Suspense>
      
      <Footer />
      
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default Index;
