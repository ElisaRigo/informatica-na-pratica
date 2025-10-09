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
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,128,187,0.25),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
            Aprenda <span className="text-primary">Informática</span> de Verdade, mesmo começando do <span className="text-primary">zero</span> 💻
          </h1>
          
          <div className="relative max-w-4xl mx-auto mb-8">
            <div className="relative rounded-3xl overflow-hidden border-2 border-line shadow-2xl bg-card">
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
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Do básico ao essencial do dia a dia e do trabalho — com aulas práticas, passo a passo e suporte direto com a professora Elisa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              size="lg" 
              className="text-lg font-extrabold px-8 py-6 rounded-2xl hover:scale-105 transition-transform"
              asChild
            >
              <a href="#preco">Quero aprender agora</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg font-bold px-8 py-6 rounded-2xl border-2 hover:bg-primary/10"
              asChild
            >
              <a href="https://wa.me/+5545988287082?text=Tenho%20uma%20dúvida%20sobre%20o%20curso" target="_blank" rel="noopener noreferrer">
                Tirar dúvida no WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-line px-4 py-2 rounded-xl">
              <Shield className="w-5 h-5 text-success" />
              <span className="font-semibold text-sm">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-line px-4 py-2 rounded-xl">
              <Award className="w-5 h-5 text-accent" />
              <span className="font-semibold text-sm">Certificado incluso</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-line px-4 py-2 rounded-xl">
              <Zap className="w-5 h-5 text-warning" />
              <span className="font-semibold text-sm">Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
