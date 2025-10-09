import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { AboutSection } from "@/components/AboutSection";
import { Possibilities } from "@/components/Possibilities";
import { ValueStack } from "@/components/ValueStack";
import { ContentGrid } from "@/components/ContentGrid";
import { EmotionalBenefits } from "@/components/EmotionalBenefits";
import { Pricing } from "@/components/Pricing";
import { Bonus } from "@/components/Bonus";
import { Testimonials } from "@/components/Testimonials";
import { Guarantee } from "@/components/Guarantee";
import { FAQ } from "@/components/FAQ";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SocialProof />
      <AboutSection />
      <Possibilities />
      <ValueStack />
      <ContentGrid />
      <EmotionalBenefits />
      <Pricing />
      <Bonus />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <StickyMobileCTA />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Index;
