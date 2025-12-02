import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import { useState, useRef } from "react";
import videoPoster from "@/assets/hero-poster-free-lesson.png";
import heroVideo from "@/assets/hero-video-free-lesson.mp4";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
export const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handlePlayClick = () => {
    if (!videoLoaded) {
      setVideoLoaded(true);
    }
    // Wait for video to be ready then play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.controls = true;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };
  return <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo - Impactante */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 md:mb-10 leading-[1.1] tracking-tight">
            <span className="text-destructive font-black text-5xl">Pare de Perder Oportunidades</span>
            <br />
            <span className="text-foreground text-5xl">Por Não Saber Informática</span>
          </h1>
          
          {/* Vídeo em destaque - Elemento principal da primeira dobra (LCP) */}
          <div className="relative max-w-4xl mx-auto mb-6 md:mb-10">
            {/* Selo de Aula Gratuita - Pulsante */}
            <div className="absolute top-4 right-4 z-20 animate-pulse">
              <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">
                🎁 Prévia do Curso
              </div>
            </div>

            {videoLoaded ? <video ref={videoRef} className="w-full aspect-video rounded-2xl shadow-2xl" playsInline preload="auto" poster={videoPoster} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} aria-label="Aula gratuita de informática - Veja como é fácil aprender">
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video> : <img src={videoPoster} alt="Capa da aula gratuita de informática - Curso de Word, Excel e PowerPoint" className="w-full aspect-video rounded-2xl object-cover shadow-2xl" width="960" height="540" fetchPriority="high" decoding="async" />}
            
            {!isPlaying && <div className="absolute inset-0 flex items-center justify-center cursor-pointer group" onClick={handlePlayClick} role="button" aria-label="Reproduzir aula gratuita">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/70 hover:bg-black/60 hover:scale-110 transition-all animate-pulse group-hover:animate-none shadow-2xl">
                  <div className="w-0 h-0 border-l-[18px] md:border-l-[22px] border-l-white border-y-[11px] md:border-y-[14px] border-y-transparent ml-2"></div>
                </div>
              </div>}
          </div>

          {/* Texto abaixo do vídeo - Impactante */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 md:mb-8 max-w-4xl mx-auto leading-tight">
            Domine <span className="text-primary">Word, Excel e mais...</span>
            <br />
            <span className="text-foreground">Mesmo Começando do Zero</span>
          </h2>

          {/* CTA Principal DESTAQUE */}
          <div className="max-w-2xl mx-auto mb-4">
            <Button size="lg" className="w-full text-base md:text-2xl font-black px-6 md:px-16 py-7 md:py-9 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--success)/0.5)] bg-success hover:bg-success/90 text-white border-0" onClick={() => (window as any).openCheckout?.()}>
              ✨ Quero Começar Agora
            </Button>
            
            {/* Preço em destaque - logo abaixo do CTA */}
            <div className="text-center space-y-2 mt-4">
              <p className="text-lg md:text-2xl font-black text-foreground">
                💰 De <span className="line-through text-muted-foreground text-base md:text-lg">R$ 497,00</span> por apenas <span className="text-accent font-black text-2xl md:text-3xl">R$ 297,00</span>
              </p>
              <p className="text-sm text-muted-foreground font-semibold md:text-base">💳 ou parcele em até 12 x R$ 30,22 (no cartão)</p>
              <p className="text-sm md:text-base text-primary font-bold mt-2">
                🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
              </p>
            </div>
          </div>

          {/* Benefícios Principais - Acima do WhatsApp */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-3xl mx-auto mb-6">
            <div className="flex items-center gap-2 bg-card border-2 border-border px-4 md:px-6 py-2 md:py-3 rounded-full shadow-sm">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 bg-card border-2 border-border px-4 md:px-6 py-2 md:py-3 rounded-full shadow-sm">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card border-2 border-border px-4 md:px-6 py-2 md:py-3 rounded-full shadow-sm">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Certificado incluso</span>
            </div>
          </div>

          {/* WhatsApp CTA - Abaixo dos badges */}
          <WhatsAppCTA text="❓ Tire suas dúvidas com a Professora Elisa" className="mb-6" />
        </div>
      </div>
    </section>;
};