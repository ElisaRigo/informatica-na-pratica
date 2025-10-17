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
      {/* OFERTA COM CHECKOUT */}
      <section id="checkout" className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Suspense fallback={<div className="h-96" />}>
              <Pricing />
            </Suspense>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center md:text-left">
                Complete seus dados para finalizar
              </h2>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default VendaTeste;
