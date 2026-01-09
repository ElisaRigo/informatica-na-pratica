import { lazy, Suspense, memo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SupportBanner } from "@/components/SupportBanner";
import { EasyToLearn } from "@/components/EasyToLearn";
import { PriceHighlight } from "@/components/PriceHighlight";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";

// Lazy load componentes não críticos (abaixo da primeira dobra)
const CoursePreview = lazy(() => import("@/components/CoursePreview").then(m => ({ default: m.CoursePreview })));
const CourseContent = lazy(() => import("@/components/CourseContent").then(m => ({ default: m.CourseContent })));
const Authority = lazy(() => import("@/components/Authority").then(m => ({ default: m.Authority })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const Bonus = lazy(() => import("@/components/Bonus").then(m => ({ default: m.Bonus })));
const FreeLessonExcel = lazy(() => import("@/components/FreeLessonExcel").then(m => ({ default: m.FreeLessonExcel })));
const ValueStack = lazy(() => import("@/components/ValueStack").then(m => ({ default: m.ValueStack })));
const Possibilities = lazy(() => import("@/components/Possibilities").then(m => ({ default: m.Possibilities })));
const TargetAudience = lazy(() => import("@/components/TargetAudience").then(m => ({ default: m.TargetAudience })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Guarantee = lazy(() => import("@/components/Guarantee").then(m => ({ default: m.Guarantee })));
const StrategicCTA = lazy(() => import("@/components/StrategicCTA").then(m => ({ default: m.StrategicCTA })));
const AboutSection = lazy(() => import("@/components/AboutSection").then(m => ({ default: m.AboutSection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Loading placeholder otimizado
const LoadingFallback = memo(() => <div className="h-32" aria-hidden="true" />);

const Index = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  
  // Make openCheckout globally accessible
  (window as any).openCheckout = openCheckout;
  
  return (
    <div className="min-h-screen">
      {/* 1️⃣ PRIMEIRA DOBRA - Crítico (não lazy) */}
      <Header />
      <Hero />
      
      {/* SUPORTE - Banner de confiança */}
      <SupportBanner />
      
      {/* VEJA COMO É FÁCIL APRENDER - Tirar medo */}
      <EasyToLearn />
      
      {/* PREÇO EM DESTAQUE */}
      <PriceHighlight />
      
      {/* 2️⃣ CONTEÚDO SECUNDÁRIO - Lazy loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <CoursePreview />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <CourseContent />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Authority />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Bonus />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <FreeLessonExcel />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ValueStack />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Possibilities />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <TargetAudience />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Guarantee />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Comparison />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Guarantee />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
      
      <WhatsAppButton />
      
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default Index;