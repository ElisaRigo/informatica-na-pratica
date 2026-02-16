import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { AboutSection } from "@/components/AboutSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";

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
  (window as any).openCheckout = () => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'BRL', value: 297.00,
        items: [{ item_id: 'curso-informatica', item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 297.00, currency: 'BRL', content_name: 'Curso Informática na Prática', content_ids: ['curso-informatica'], num_items: 1
      });
    }
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };
  
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
