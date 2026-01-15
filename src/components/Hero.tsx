import { useState } from "react";
import { Shield, Award, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideoThumb from "@/assets/capa-hero.png";

export const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight">
            Quer Aprender <span className="text-primary font-black">Informática</span> de Forma <span className="text-primary font-black">Rápida</span> e sem <span className="text-primary font-black">Enrolação</span>?
          </p>
          
          {/* Vídeo do YouTube em destaque */}
          <div className="relative max-w-4xl mx-auto mb-4 md:mb-6">
            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden relative border border-primary/20">
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
                  {/* Botão de play destacado */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                  {/* Selo Conheça o Curso - Canto inferior direito */}
                  <div className="absolute bottom-3 right-3 z-20 animate-pulse">
                    <div className="bg-gradient-to-r from-accent to-primary text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">🎓 Conheça o Curso!</div>
                  </div>
                </div>
              ) : (
                <div style={{position: 'relative', paddingTop: '56.25%'}}>
                  <iframe 
                    src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1"
                    title="Vídeo institucional"
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>

          {/* Texto abaixo do vídeo */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-tight">
            Aulas passo a passo, <span className="text-primary font-black">simples</span> <span className="text-primary font-black">e</span> <span className="text-primary font-black">Práticas</span> - Começando do <span className="text-primary font-black">Zero</span><span className="text-primary font-black">!</span>
          </p>

          {/* CTA para seção de preço */}
          <div className="flex justify-center mb-6">
            <Button
              size="lg"
              onClick={() => document.getElementById('price-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-black rounded-full bg-success hover:bg-success/90 text-white shadow-[0_8px_30px_rgba(34,197,94,0.45)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:scale-105 transition-all duration-300 animate-pulse"
            >
              Quero começar a aprender do zero
            </Button>
          </div>

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