import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { PromoTimer } from "@/components/PromoTimer";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { AboutSection } from "@/components/AboutSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CheckoutForm } from "@/components/CheckoutForm";

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
  return (
    <div className="min-h-screen">
        <Header />
        <PromoTimer />
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
        <StrategicCTA context="vendo todo o valor que você vai receber" />
      </Suspense>
      {/* AUMENTAR VALOR PERCEBIDO */}
      <Suspense fallback={<div className="h-32" />}>
        <Bonus />
      </Suspense>
      {/* OFERTA COM URGÊNCIA */}
      <Suspense fallback={<div className="h-32" />}>
        <Pricing />
      </Suspense>
      {/* REDUZIR RISCO */}
      <Suspense fallback={<div className="h-32" />}>
        <Guarantee />
      </Suspense>
      {/* QUEBRAR OBJEÇÕES */}
      <Suspense fallback={<div className="h-32" />}>
        <Objections />
      </Suspense>
      {/* REFORÇAR CONFIANÇA */}
      <Suspense fallback={<div className="h-32" />}>
        <FinalTestimonials />
      </Suspense>
      {/* ESCLARECER DÚVIDAS */}
      <Suspense fallback={<div className="h-32" />}>
        <FAQ />
      </Suspense>
      {/* FECHAMENTO FINAL */}
      <Suspense fallback={<div className="h-32" />}>
        <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      </Suspense>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default VendaTeste;
