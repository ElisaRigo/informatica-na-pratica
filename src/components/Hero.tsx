import { useState } from "react";
import { Shield, Award, Zap, Play } from "lucide-react";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import heroVideoThumb from "@/assets/hero-video-thumb.jpg";

export const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative overflow-x-hidden overflow-y-visible py-8 md:py-12 lg:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-panel via-background to-background" />
      
      {/* Decorative glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight">
            Quer Aprender <span className="text-gradient">Informática</span> de Forma <span className="text-accent">Rápida</span> e sem <span className="text-primary">Enrolação</span>?
          </p>
          
          {/* Vídeo do YouTube em destaque */}
          <div className="relative max-w-4xl mx-auto mb-4 md:mb-6">
            {/* Selo de Aula Gratuita - Pulsante com glow */}
            <div className="absolute -top-3 right-4 z-20 animate-float">
              <div className="bg-gradient-to-r from-accent to-warning text-accent-foreground px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-accent/50 glow-accent">
                🎁 Prévia do Curso
              </div>
            </div>

            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden border-2 border-primary/30 glow-primary">
              {!isVideoLoaded ? (
                <div 
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handlePlayClick}
                >
                  <img 
                    src={heroVideoThumb} 
                    alt="Prévia do curso de informática"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Botão de play com glow */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/90 backdrop-blur-sm border-4 border-accent flex items-center justify-center transition-all duration-300 group-hover:scale-110 glow-accent">
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-accent-foreground fill-accent-foreground ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/6l0dJZUMl6o?rel=0&modestbranding=1&controls=1&showinfo=0&autoplay=1" 
                  title="YouTube video player"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Texto abaixo do vídeo */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-tight">
            Aulas passo a passo, <span className="text-accent font-black">simples</span> <span className="text-foreground font-black">e</span> <span className="text-primary font-black">Práticas</span> - Começando do <span className="text-gradient-warm font-black">Zero!</span>
          </p>

          {/* WhatsApp CTA */}
          <WhatsAppCTA text="Tire suas Dúvidas com a prof. Elisa" className="mb-6" isPulsing />

          {/* Benefícios Principais */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-card border-2 border-primary/40 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg hover:border-primary transition-all hover:scale-105">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              <span className="font-bold text-sm md:text-base text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 bg-card border-2 border-primary/40 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg hover:border-primary transition-all hover:scale-105">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-success" />
              <span className="font-bold text-sm md:text-base text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card border-2 border-primary/40 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg hover:border-primary transition-all hover:scale-105">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-warning" />
              <span className="font-bold text-sm md:text-base text-foreground">Certificado incluso</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
