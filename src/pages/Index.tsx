import { Header } from "@/components/Header";
import { PromoTimer } from "@/components/PromoTimer";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { AboutSection } from "@/components/AboutSection";
import { TargetAudience } from "@/components/TargetAudience";
import { Possibilities } from "@/components/Possibilities";
import { ValueStack } from "@/components/ValueStack";
import { ContentGrid } from "@/components/ContentGrid";
import { Testimonials } from "@/components/Testimonials";
import { EmotionalBenefits } from "@/components/EmotionalBenefits";
import { Pricing } from "@/components/Pricing";
import { Bonus } from "@/components/Bonus";
import { Guarantee } from "@/components/Guarantee";
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
      <SocialProof />
      <AboutSection />
      <TargetAudience />
      <Possibilities />
      <ValueStack />
      <ContentGrid />
      <Testimonials />
      <EmotionalBenefits />
      <Pricing />
      <Bonus />
      <Guarantee />
      <FinalTestimonials />
      <FAQ />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Index;
