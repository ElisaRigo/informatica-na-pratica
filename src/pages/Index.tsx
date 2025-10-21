import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CourseContent } from "@/components/CourseContent";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";

// Lazy load componentes em blocos separados para carregamento progressivo
const Bonus = lazy(() => import("@/components/Bonus").then(m => ({ default: m.Bonus })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));

const Index = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  
  // Make openCheckout globally accessible
  (window as any).openCheckout = openCheckout;
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 1️⃣ PRIMEIRA DOBRA - Vídeo + Promessa + CTA */}
      <Hero />
      
      {/* 2️⃣ O QUE VOCÊ VAI DOMINAR - Conteúdos principais (seção unificada) */}
      <CourseContent />
      
      {/* 3️⃣ BÔNUS - Benefícios extras + escassez + CTA */}
      <Suspense fallback={<div className="h-32" />}>
        <Bonus />
      </Suspense>
      
      {/* 4️⃣ ANTES E DEPOIS - Transformação */}
      <Suspense fallback={<div className="h-32" />}>
        <Comparison />
      </Suspense>
      
      {/* 5️⃣ DEPOIMENTOS */}
      <Testimonials />
      
      {/* 6️⃣ QUEM VAI TE ENSINAR - Autoridade */}
      <AboutSection />
      
      {/* 7️⃣ OFERTA E PREÇO */}
      <Suspense fallback={<div className="h-32" />}>
        <Pricing />
      </Suspense>
      
      <Footer />
      
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default Index;
