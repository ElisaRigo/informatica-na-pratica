import { Header } from "@/components/Header";
import { PromoTimer } from "@/components/PromoTimer";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { AboutSection } from "@/components/AboutSection";
import { Authority } from "@/components/Authority";
import { TargetAudience } from "@/components/TargetAudience";
import { Possibilities } from "@/components/Possibilities";
import { ValueStack } from "@/components/ValueStack";
import { ContentGrid } from "@/components/ContentGrid";
import { Testimonials } from "@/components/Testimonials";
import { StrategicCTA } from "@/components/StrategicCTA";
import { Comparison } from "@/components/Comparison";
import { EmotionalBenefits } from "@/components/EmotionalBenefits";
import { NotForYou } from "@/components/NotForYou";
import { Pricing } from "@/components/Pricing";
import { Bonus } from "@/components/Bonus";
import { Guarantee } from "@/components/Guarantee";
import { Objections } from "@/components/Objections";
import { FinalTestimonials } from "@/components/FinalTestimonials";
import { FAQ } from "@/components/FAQ";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PromoTimer />
      <Hero />
      <AboutSection />
      <Authority />
      <SocialProof />
      <StrategicCTA context="depois de conhecer minha história" />
      <TargetAudience />
      <Possibilities />
      <ValueStack />
      <Testimonials />
      <Comparison />
      <ContentGrid />
      <EmotionalBenefits />
      <StrategicCTA context="sabendo de tudo que você vai aprender" />
      <NotForYou />
      <Bonus />
      <Pricing />
      <Guarantee />
      <Objections />
      <FinalTestimonials />
      <FAQ />
      <StrategicCTA context="com todas as suas dúvidas esclarecidas" />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Index;
