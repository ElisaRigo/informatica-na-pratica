import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import videoPoster from "@/assets/video-poster-hero.jpg";
import heroVideo from "@/assets/hero-video-main.mp4";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo */}
          <p className="text-xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight px-2">
            Aprenda <span className="text-primary">Informática de Verdade</span> e conquiste <span className="text-primary">Novas Oportunidades</span>.
          </p>
          
          {/* Vídeo em destaque */}
          <div className="relative max-w-4xl mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
            <video 
              controls
              poster={videoPoster}
              className="w-full aspect-video"
              preload="metadata"
            >
              <source src={heroVideo} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>

          {/* Texto abaixo do vídeo */}
          <p className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground mb-8 max-w-3xl mx-auto leading-tight px-2">
            Do <span className="text-primary">Zero ao Profissional</span>, com aulas <span className="text-primary">Simples e Práticas</span> de Word, Excel e muito mais — pra você se destacar no <span className="text-primary">Mercado de Trabalho</span> e usar o computador com <span className="text-primary">Confiança</span>.
          </p>

          {/* CTA Principal DESTAQUE */}
          <div className="mb-6 max-w-2xl mx-auto px-4">
            <Button 
              size="lg" 
              className="w-full text-sm md:text-lg lg:text-xl font-black px-6 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--accent)/0.4)] bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent border-2 border-accent/30 leading-tight"
              onClick={() => (window as any).openCheckout?.()}
            >
              ✨ Sim, Quero Dominar Informática
            </Button>
            <div className="text-center mt-4 space-y-2">
              <p className="text-2xl md:text-4xl font-black text-foreground">
                R$ 297,00
              </p>
              <p className="text-xs md:text-base text-muted-foreground font-semibold">
                Acesso completo por 2 anos • Certificado incluso
              </p>
            </div>
          </div>

          {/* Benefícios Principais */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center max-w-3xl mx-auto px-2">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-3 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-primary flex-shrink-0" />
              <span className="font-bold text-xs md:text-base text-foreground whitespace-nowrap">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-3 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-primary flex-shrink-0" />
              <span className="font-bold text-xs md:text-base text-foreground whitespace-nowrap">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-3 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Award className="w-4 h-4 md:w-6 md:h-6 text-primary flex-shrink-0" />
              <span className="font-bold text-xs md:text-base text-foreground whitespace-nowrap">Certificado incluso</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
