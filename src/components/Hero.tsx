import { useState, memo } from "react";
import { Shield, Award, Zap, Play } from "lucide-react";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

// Usar URL direta ao invés de import para a imagem crítica LCP
const HERO_IMAGE_URL = "/capa-hero.png";

export const Hero = memo(() => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="bg-panel py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Texto acima do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight">
            Quer Aprender <span className="text-primary font-black">Informática</span> de Forma <span className="text-primary font-black">Rápida</span> e sem <span className="text-primary font-black">Enrolação</span>?
          </p>
          
          {/* Vídeo do YouTube em destaque */}
          <div className="relative max-w-4xl mx-auto mb-4 md:mb-6">
            <div className="w-full aspect-video rounded-2xl shadow-lg overflow-hidden relative border border-primary/20">
              {!isVideoLoaded ? (
                <div 
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handlePlayClick}
                >
                  <img 
                    src={HERO_IMAGE_URL} 
                    alt="Prévia do curso de informática"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    width={960}
                    height={540}
                  />
                  {/* Botão de play destacado */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/70 shadow-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                  {/* Selo Conheça o Curso */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="bg-primary text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full font-black text-xs md:text-sm shadow-lg">
                      🎓 Conheça o Curso!
                    </div>
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

          {/* WhatsApp CTA */}
          <WhatsAppCTA text="Tire suas Dúvidas com a prof. Elisa" className="mb-6" isPulsing />

          {/* Benefícios Principais - Simplificados */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-card border border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Certificado incluso</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
