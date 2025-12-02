import { lazy, Suspense, memo, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { useHotmart, openHotmartCheckout } from "@/hooks/useHotmart";

// Lazy load de TODOS os componentes abaixo da primeira dobra para melhorar LCP/FID
const FreeLessonExcel = lazy(() => import("@/components/FreeLessonExcel").then(m => ({ default: m.FreeLessonExcel })));
const CourseContent = lazy(() => import("@/components/CourseContent").then(m => ({ default: m.CourseContent })));
const Authority = lazy(() => import("@/components/Authority").then(m => ({ default: m.Authority })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const AboutSection = lazy(() => import("@/components/AboutSection").then(m => ({ default: m.AboutSection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));
const Bonus = lazy(() => import("@/components/Bonus").then(m => ({ default: m.Bonus })));
const ValueStack = lazy(() => import("@/components/ValueStack").then(m => ({ default: m.ValueStack })));
const Possibilities = lazy(() => import("@/components/Possibilities").then(m => ({ default: m.Possibilities })));
const TargetAudience = lazy(() => import("@/components/TargetAudience").then(m => ({ default: m.TargetAudience })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Guarantee = lazy(() => import("@/components/Guarantee").then(m => ({ default: m.Guarantee })));
const StrategicCTA = lazy(() => import("@/components/StrategicCTA").then(m => ({ default: m.StrategicCTA })));

// Loading placeholder minimalista para evitar CLS
const LoadingFallback = memo(() => <div className="min-h-[100px]" aria-hidden="true" />);

const Index = () => {
  // Initialize Hotmart checkout
  useHotmart();
  
  // Make openCheckout globally accessible
  useEffect(() => {
    (window as any).openCheckout = openHotmartCheckout;
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* 1️⃣ PRIMEIRA DOBRA - Vídeo + Promessa + CTA */}
      <Header />
      <Hero />
      
      {/* 2️⃣ AULA GRATUITA DE EXCEL */}
      <Suspense fallback={<LoadingFallback />}>
        <FreeLessonExcel />
      </Suspense>
      
      {/* 3️⃣ O QUE VOCÊ VAI DOMINAR - Conteúdos principais (única seção combinada) */}
      <Suspense fallback={<LoadingFallback />}>
        <CourseContent />
      </Suspense>
      
      {/* 4️⃣ QUEM É A PROFESSORA ELISA - Autoridade */}
      <Suspense fallback={<LoadingFallback />}>
        <Authority />
      </Suspense>
      
      {/* 5️⃣ DEPOIMENTOS - Prova Social */}
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
      
      {/* 6️⃣ DEPOIS DO CURSO - Capacidades */}
      <Suspense fallback={<LoadingFallback />}>
        <ValueStack />
      </Suspense>
      
      {/* 7️⃣ INVESTIMENTO - Proposta de valor */}
      <Suspense fallback={<LoadingFallback />}>
        <Possibilities />
      </Suspense>
      
      {/* 8️⃣ PARA QUEM É - Público alvo */}
      <Suspense fallback={<LoadingFallback />}>
        <TargetAudience />
      </Suspense>
      
      {/* 9️⃣ BÔNUS - Benefícios extras + Escassez + CTA */}
      <Suspense fallback={<LoadingFallback />}>
        <Bonus />
      </Suspense>
      
      {/* 🔟 OFERTA E PREÇO #1 */}
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
      
      {/* 1️⃣1️⃣ GARANTIA #1 */}
      <Suspense fallback={<LoadingFallback />}>
        <Guarantee />
      </Suspense>
      
      {/* 1️⃣2️⃣ ANTES E DEPOIS - Transformação */}
      <Suspense fallback={<LoadingFallback />}>
        <Comparison />
      </Suspense>
      
      {/* 1️⃣3️⃣ QUEM VAI TE ENSINAR - Sobre */}
      <Suspense fallback={<LoadingFallback />}>
        <AboutSection />
      </Suspense>
      
      {/* 1️⃣4️⃣ OFERTA E PREÇO #2 */}
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
      
      {/* 1️⃣5️⃣ PERGUNTAS FREQUENTES */}
      <Suspense fallback={<LoadingFallback />}>
        <FAQ />
      </Suspense>
      
      {/* 1️⃣6️⃣ GARANTIA #2 - Reduzir Risco */}
      <Suspense fallback={<LoadingFallback />}>
        <Guarantee />
      </Suspense>
      
      {/* 1️⃣7️⃣ CTA FINAL ESTRATÉGICO */}
      <Suspense fallback={<LoadingFallback />}>
        <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      </Suspense>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </div>
  );
};

export default Index;
