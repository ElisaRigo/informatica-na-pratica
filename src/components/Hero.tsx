import { useState } from "react";
import { Shield, Award, Zap, Play } from "lucide-react";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import heroVideoThumb from "@/assets/hero-video-thumb.jpg";

export const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight">
            Quer Aprender <span className="text-primary">Informática</span> de Forma <span className="text-primary">Rápida</span> e sem <span className="text-primary">Enrolação</span>?
          </p>
          
          {/* Vídeo do YouTube em destaque */}
          <div className="relative max-w-4xl mx-auto mb-4 md:mb-6">
            {/* Selo de Aula Gratuita - Pulsante */}
            <div className="absolute -top-3 right-4 z-20 animate-pulse">
              <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">🎓 Conheça o Curso!</div>
            </div>

            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden">
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
                  {/* Botão de play transparente */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
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
            Aulas passo a passo, <span className="text-primary font-black">simples</span> <span className="text-primary font-black">e</span> <span className="text-primary font-black">Práticas</span> - Começando do <span className="text-primary font-black">Zero</span><span className="text-primary font-black">!</span>
          </p>

          {/* WhatsApp CTA */}
          <WhatsAppCTA text="Tire suas Dúvidas com a prof. Elisa" className="mb-6" isPulsing />

          {/* Benefícios Principais */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Certificado incluso</span>
            </div>
          </div>

        </div>
      </div>
    </section>;
};