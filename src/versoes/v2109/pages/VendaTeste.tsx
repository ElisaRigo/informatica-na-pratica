import { lazy, Suspense } from "react";
import { Header } from "@/versoes/v2109/components/Header";
import { Hero } from "@/versoes/v2109/components/Hero";
import { SocialProof } from "@/versoes/v2109/components/SocialProof";
import { AboutSection } from "@/versoes/v2109/components/AboutSection";
import { WhatsAppFloat } from "@/versoes/v2109/components/WhatsAppFloat";
import { WhatsAppButton } from "@/versoes/v2109/components/WhatsAppButton";
import { Footer } from "@/versoes/v2109/components/Footer";
import { Testimonials } from "@/versoes/v2109/components/Testimonials";
import { CheckoutDialog } from "@/versoes/v2109/components/CheckoutDialog";
import { useCheckoutDialog } from "@/versoes/v2109/hooks/useCheckoutDialog";
import { openHotmartCheckout } from "@/versoes/v2109/lib/checkoutTracking";

// Lazy load componentes em blocos separados para carregamento progressivo
const Authority = lazy(() => import("@/components/Authority").then(m => ({ default: m.Authority })));
const TargetAudience = lazy(() => import("@/components/TargetAudience").then(m => ({ default: m.TargetAudience })));
const Possibilities = lazy(() => import("@/components/Possibilities").then(m => ({ default: m.Possibilities })));
const ValueStack = lazy(() => import("@/components/ValueStack").then(m => ({ default: m.ValueStack })));
const ContentGrid = lazy(() => import("@/components/ContentGrid").then(m => ({ default: m.ContentGrid })));
const StrategicCTA = lazy(() => import("@/components/StrategicCTA").then(m => ({ default: m.StrategicCTA })));
const Comparison = lazy(() => import("@/components/Comparison").then(m => ({ default: m.Comparison })));
const EmotionalBenefits = lazy(() => import("@/components/EmotionalBenefits").then(m => ({ default: m.EmotionalBenefits })));
const NotForYou = lazy(() => import("@/components/NotForYou").then(m => ({ default: m.NotForYou })));
const Pricing = lazy(() => import("@/components/Pricing").then(m => ({ default: m.Pricing })));
const Bonus = lazy(() => import("@/components/Bonus").then(m => ({ default: m.Bonus })));
const Guarantee = lazy(() => import("@/components/Guarantee").then(m => ({ default: m.Guarantee })));
const Objections = lazy(() => import("@/components/Objections").then(m => ({ default: m.Objections })));
const FinalTestimonials = lazy(() => import("@/components/FinalTestimonials").then(m => ({ default: m.FinalTestimonials })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));

const VendaTeste = () => {
  // Redirect all checkout buttons to Hotmart with tracking
  (window as any).openCheckout = () => openHotmartCheckout();
  
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      {/* IDENTIFICAÇÃO */}
      <Suspense fallback={<div className="h-32" />}>
        <TargetAudience />
      </Suspense>
      {/* VALOR - O que vai aprender */}
      <Suspense fallback={<div className="h-32" />}>
        <ContentGrid />
      </Suspense>
      {/* PROVA SOCIAL */}
      <Testimonials />
      {/* AUTORIDADE & CREDIBILIDADE */}
      <AboutSection />
      <Suspense fallback={<div className="h-32" />}>
        <Authority />
      </Suspense>
      <SocialProof />
      {/* PERCEPÇÃO DE VALOR */}
      <Suspense fallback={<div className="h-32" />}>
        <ValueStack />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Possibilities />
      </Suspense>
      {/* TRANSFORMAÇÃO */}
      <Suspense fallback={<div className="h-32" />}>
        <EmotionalBenefits />
      </Suspense>
      {/* GATILHO MENTAL */}
      <Suspense fallback={<div className="h-32" />}>
        <StrategicCTA />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Comparison />
      </Suspense>
      {/* QUALIFICAÇÃO */}
      <Suspense fallback={<div className="h-32" />}>
        <NotForYou />
      </Suspense>
      {/* OFERTA COM URGÊNCIA */}
      <Suspense fallback={<div className="h-32" />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Bonus />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Guarantee />
      </Suspense>
      {/* PROVA SOCIAL FINAL */}
      <Suspense fallback={<div className="h-32" />}>
        <FinalTestimonials />
      </Suspense>
      {/* OBJEÇÕES */}
      <Suspense fallback={<div className="h-32" />}>
        <Objections />
      </Suspense>
      {/* FAQ */}
      <Suspense fallback={<div className="h-32" />}>
        <FAQ />
      </Suspense>
      <Footer />
      <WhatsAppFloat />
      <WhatsAppButton />
      
      {/* CHECKOUT - Redirecionando para Hotmart */}
    </div>
  );
};

export default VendaTeste;
