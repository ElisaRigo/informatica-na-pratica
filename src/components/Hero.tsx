import { Button } from "@/components/ui/button";
import { Shield, Award, Zap, Lock, CheckCircle2, Play } from "lucide-react";
import { useState } from "react";
import videoPoster from "@/assets/video-poster-hero.jpg";

export const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-2 md:py-3 lg:py-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,128,187,0.25),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Social Proof Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-card/60 backdrop-blur-sm border border-success/20 px-2 md:px-4 py-1 md:py-2 rounded-full mb-2 md:mb-3">
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
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-2 md:mb-3">
            <span className="text-destructive">Pare de Perder Oportunidades</span><br />
            <span className="text-foreground">Por Não Saber Informática</span>
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 max-w-2xl mx-auto">
            Quantas vagas você já perdeu? <span className="font-bold text-foreground">Isso pode acabar hoje.</span>
          </p>
          
          {/* Vídeo em destaque - Elemento principal da primeira dobra */}
          <div className="relative max-w-2xl mx-auto mb-3 md:mb-4">
            <div className="relative rounded-xl overflow-hidden border-2 border-primary/30 shadow-xl bg-black">
              {!videoLoaded ? (
                <>
                  {/* Capa do vídeo */}
                  <div 
                    className="relative w-full aspect-video cursor-pointer group"
                    onClick={() => setVideoLoaded(true)}
                  >
                    <img 
                      src={videoPoster} 
                      alt="Capa do vídeo - Curso de Informática na Prática" 
                      className="w-full h-full object-cover brightness-110 contrast-105"
                    />
                    {/* Botão de play */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="bg-primary/70 backdrop-blur-sm rounded-full p-3 md:p-4 group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/mSNhsfD5RWA?rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&iv_load_policy=3&playsinline=1&autoplay=1" 
                  title="Vídeo de apresentação do curso de Informática na Prática" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full aspect-video"
                />
              )}
              
              {/* Overlay estratégico com preço - CLICÁVEL */}
              <a 
                href="https://pag.ae/8164tZJTR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-2 right-2 md:top-3 md:right-3 bg-gradient-to-br from-success/95 to-success/90 backdrop-blur-md border-2 border-white/40 rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 shadow-xl animate-pulse hover:scale-105 transition-transform cursor-pointer z-10"
              >
                <p className="text-[9px] md:text-xs font-bold text-white/90">Apenas hoje:</p>
                <p className="text-lg md:text-2xl font-black text-white leading-none mb-0.5">R$ 297</p>
                <div className="bg-destructive text-destructive-foreground rounded px-1.5 py-0.5 inline-block">
                  <p className="text-[10px] md:text-xs font-black">40% OFF</p>
                </div>
              </a>
            </div>
          </div>

          {/* CTA Principal com Preço - Logo após o vídeo para conversão imediata */}
          <div className="mb-3 md:mb-4">
            <Button 
              size="lg" 
              className="text-base md:text-lg font-extrabold px-6 md:px-12 py-5 md:py-6 rounded-xl hover:scale-105 transition-all bg-success hover:bg-success/90 shadow-xl w-full sm:w-auto"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
                ✨ Sim, quero mudar minha vida
              </a>
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 font-semibold">
              💰 Menos de R$ 1 por dia • Acesso imediato
            </p>
          </div>

          {/* Links âncora estratégicos */}
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-3 md:mb-4 text-xs md:text-sm">
            <a href="#sobre" className="font-semibold text-primary hover:underline">
              👩‍🏫 Professora
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#conteudo" className="font-semibold text-primary hover:underline">
              📚 Conteúdo
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#depoimentos" className="font-semibold text-primary hover:underline">
              ⭐ Depoimentos
            </a>
          </div>
          {/* Benefícios Rápidos */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center items-center text-[10px] md:text-xs">
            <div className="flex items-center gap-1 bg-primary/10 border border-primary/30 px-2 py-1 rounded-lg">
              <Zap className="w-3 h-3 text-primary" />
              <span className="font-bold">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-1 bg-card/50 border border-line px-2 py-1 rounded-lg">
              <Shield className="w-3 h-3 text-success" />
              <span className="font-semibold">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-1 bg-card/50 border border-line px-2 py-1 rounded-lg">
              <Award className="w-3 h-3 text-accent" />
              <span className="font-semibold">Certificado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
