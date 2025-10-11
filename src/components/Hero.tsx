import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-12 md:py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,128,187,0.25),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-destructive/90 text-white px-4 py-2 rounded-full mb-4 animate-pulse">
            <span className="text-lg">🔥</span>
            <span className="font-extrabold text-sm md:text-base">Últimas vagas com 40% OFF</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6 md:mb-8">
            Domine <span className="text-primary">Word, Excel e PowerPoint</span> em 30 dias Mesmo Começando do Zero 💻
          </h1>
          
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="relative rounded-2xl overflow-hidden border-2 border-line shadow-2xl bg-card">
              <video
                ref={videoRef}
                controls
                preload="metadata"
                className="w-full aspect-video object-cover"
                playsInline
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  video.currentTime = 0;
                }}
              >
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <Button 
                  size="sm"
                  variant="secondary"
                  className="text-xs font-semibold px-4 py-2 rounded-full opacity-90 hover:opacity-100 transition-opacity pointer-events-auto shadow-lg"
                  asChild
                >
                  <a href="#about">Ver detalhes do curso</a>
                </Button>
              </div>
            </div>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-2">
            Curso de informática online do básico ao mercado de trabalho, com aulas práticas, passo a passo e suporte direto comigo, professora Elisa 💻
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-10 px-4">
            <Button 
              size="lg" 
              className="text-base md:text-lg font-extrabold px-6 md:px-8 py-5 md:py-6 rounded-2xl hover:scale-105 transition-transform"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">Garantir 40% OFF agora</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base md:text-lg font-bold px-6 md:px-8 py-5 md:py-6 rounded-2xl border-2 hover:bg-primary/10"
              asChild
            >
              <a href="https://wa.me/5545988287082" target="_blank" rel="noopener noreferrer">
                Tirar dúvida no WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center px-2">
            <div className="flex items-center gap-1.5 md:gap-2 bg-primary/10 backdrop-blur-sm border border-primary/30 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-bold text-xs md:text-sm">100% Online</span>
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
