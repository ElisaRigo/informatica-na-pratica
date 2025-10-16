import { Button } from "@/components/ui/button";
import { Shield, Award, Zap, Lock, CheckCircle2 } from "lucide-react";
import heroVideo from "@/assets/hero-video-optimized.mp4";
import videoPoster from "@/assets/video-poster-hero.jpg";
import { useRef } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-4 md:py-8 lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,128,187,0.25),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Social Proof Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-4 bg-card/60 backdrop-blur-sm border border-success/20 px-3 md:px-6 py-1.5 md:py-3 rounded-full mb-3 md:mb-6">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span className="font-bold text-[10px] md:text-sm">+20 anos</span>
            </div>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold text-[10px] md:text-sm">+15.000 alunos</span>
            </div>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span className="font-bold text-[10px] md:text-sm">Garantia 7 Dias</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6 md:mb-8">
            <span className="text-destructive">Chega de perder oportunidades!</span>
          </h1>
          
          {/* Vídeo em destaque - Elemento principal da primeira dobra */}
          <div className="relative max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl bg-transparent">
              <video
                ref={videoRef}
                controls
                preload="none"
                poster={videoPoster}
                className="w-full aspect-video bg-transparent"
                playsInline
                aria-label="Vídeo de apresentação do curso de Informática na Prática"
              >
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              
              {/* Overlay estratégico com preço - CLICÁVEL */}
              <a 
                href="https://pag.ae/8164tZJTR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-br from-success/95 to-success/90 backdrop-blur-md border-2 border-white/40 rounded-xl md:rounded-2xl px-3 md:px-5 py-2 md:py-3 shadow-2xl animate-pulse hover:scale-105 transition-transform cursor-pointer"
              >
                <p className="text-[10px] md:text-xs font-bold text-white/90 mb-0.5">Apenas hoje:</p>
                <p className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-none mb-1">R$ 297</p>
                <div className="bg-destructive text-destructive-foreground rounded-md px-2 py-0.5 inline-block">
                  <p className="text-xs md:text-sm font-black">40% OFF</p>
                </div>
              </a>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-6 md:mb-8">
            Aprenda <span className="text-primary">Word, Excel e mais...</span><br />
            Mesmo Começando do Zero 💻
          </h2>

          {/* CTA Principal com Preço - Logo após o vídeo para conversão imediata */}
          <div className="mb-5 md:mb-6 max-w-3xl mx-auto">
            <Button 
              size="lg" 
              className="text-sm md:text-xl font-extrabold px-6 md:px-16 py-6 md:py-8 rounded-xl md:rounded-2xl hover:scale-105 transition-all bg-success hover:bg-success/90 shadow-2xl w-full sm:w-auto leading-tight"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
                🚀 Começar por R$ 297 (40% OFF)
              </a>
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 font-semibold">
              ⏰ Oferta por tempo limitado • Garanta sua vaga
            </p>
          </div>

          <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-5 md:mb-6 max-w-3xl mx-auto px-2">
            Curso de informática online do básico ao mercado de trabalho, com aulas práticas, passo a passo e suporte direto comigo, professora Elisa 💻
          </p>

          {/* Destaque: Promessa de Resultado */}
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-2 border-primary/40 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 mb-5 md:mb-6 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-primary">
              Conquiste o Emprego que Você Merece
            </p>
          </div>
          {/* Benefícios Rápidos */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center px-2">
            <div className="flex items-center gap-1.5 md:gap-2 bg-primary/10 backdrop-blur-sm border border-primary/30 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-bold text-xs md:text-sm">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-success" />
              <span className="font-semibold text-xs md:text-sm">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <span className="font-semibold text-xs md:text-sm">Certificado incluso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
