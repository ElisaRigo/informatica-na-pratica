import { Button } from "@/components/ui/button";
import { Shield, Award, Zap, Lock, CheckCircle2, Play } from "lucide-react";
import { useState } from "react";
import videoPoster from "@/assets/video-poster-hero.jpg";

export const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-3 md:py-4 lg:py-6">
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
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 md:mb-6">
            <span className="text-destructive">Pare de Perder Oportunidades</span><br />
            <span className="text-foreground">Por Não Saber Informática</span>
          </h1>
          
          {/* Vídeo em destaque - Elemento principal da primeira dobra */}
          <div className="relative max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl bg-black">
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
            className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-br from-success/95 to-success/90 backdrop-blur-md border-2 border-white/40 rounded-xl md:rounded-2xl px-3 md:px-5 py-2 md:py-3 shadow-2xl animate-pulse hover:scale-105 transition-transform cursor-pointer z-10"
          >
            <p className="text-[10px] md:text-xs font-bold text-white/90 mb-0.5">Apenas hoje:</p>
            <p className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-none mb-1">R$ 297</p>
            <div className="bg-destructive text-destructive-foreground rounded-md px-2 py-0.5 inline-block">
              <p className="text-xs md:text-sm font-black">40% OFF</p>
            </div>
          </a>
        </div>
        
        {/* Texto destacado abaixo do vídeo */}
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-3 md:mb-4 max-w-3xl mx-auto font-black leading-tight">
          Domine <span className="text-[#00D4FF]">Word, Excel e mais....</span><br />
          Mesmo Começando do Zero 💻
        </p>

        {/* Benefícios Rápidos */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center px-2 mb-4 md:mb-5">
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

      <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-5 max-w-3xl mx-auto px-2">
        Quantas vagas de emprego você já perdeu? Quantas vezes pediu ajuda para fazer algo simples no computador? <span className="font-bold text-foreground">Isso pode acabar hoje.</span>
      </p>

      {/* Links âncora estratégicos */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-3 md:mb-4">
        <a 
          href="#sobre" 
          className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line hover:border-primary/50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all hover:scale-105"
        >
          <span className="text-base md:text-lg">👩‍🏫</span>
          <span className="font-semibold text-xs md:text-sm">Conhecer a Professora</span>
        </a>
        <a 
          href="#conteudo" 
          className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line hover:border-primary/50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all hover:scale-105"
        >
          <span className="text-base md:text-lg">📚</span>
          <span className="font-semibold text-xs md:text-sm">Ver Conteúdo Completo</span>
        </a>
        <a 
          href="#depoimentos" 
          className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line hover:border-primary/50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all hover:scale-105"
        >
          <span className="text-base md:text-lg">⭐</span>
          <span className="font-semibold text-xs md:text-sm">Ler Depoimentos</span>
        </a>
      </div>

      {/* CTA Principal com Preço - Logo após o vídeo para conversão imediata */}
      <div className="mb-3 md:mb-4 max-w-3xl mx-auto">
        <Button 
          size="lg" 
          className="text-sm md:text-lg font-extrabold px-6 md:px-12 py-5 md:py-6 rounded-xl hover:scale-105 transition-all bg-success hover:bg-success/90 shadow-2xl w-full sm:w-auto leading-tight"
          asChild
        >
          <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
            ✨ Sim, quero mudar minha vida
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-2 font-semibold">
          💰 Investimento: Menos de R$ 1 por dia nos próximos 12 meses
        </p>
      </div>

        </div>
      </div>
    </section>
  );
};
