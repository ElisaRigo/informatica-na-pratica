import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import videoPoster from "@/assets/hero-poster-free-lesson.png";
import heroVideo from "@/assets/hero-video-free-lesson.mp4";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
export const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load video usando Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
        }
      },
      {
        rootMargin: "50px",
      },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight">
            Quer Aprender <span className="text-primary"> Informática </span> de forma{" "}
            <span className="text-primary"> Rápida </span> e sem <span className="text-primary"> Enrolação?
          </p>

          {/* Vídeo em destaque - Elemento principal da primeira dobra */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto mb-4 md:mb-6">
            {/* Selo de Aula Gratuita - Pulsante */}
            <div className="absolute top-4 right-4 z-20 animate-pulse">
              <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">
                🎁 Prévia do Curso
              </div>
            </div>

            {shouldLoadVideo ? (
              <video
                ref={videoRef}
                className="w-full aspect-video rounded-2xl shadow-2xl"
                playsInline
                preload="metadata"
                poster={videoPoster}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                aria-label="Aula gratuita de informática - Veja como é fácil aprender"
              >
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>
            ) : (
              <div
                className="w-full aspect-video rounded-2xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: `url(${videoPoster})`,
                }}
                role="img"
                aria-label="Capa da aula gratuita de informática"
              />
            )}

            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handlePlayClick}
                role="button"
                aria-label="Reproduzir aula gratuita"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/70 hover:bg-black/60 hover:scale-110 transition-all animate-pulse group-hover:animate-none shadow-2xl">
                  <div className="w-0 h-0 border-l-[18px] md:border-l-[22px] border-l-white border-y-[11px] md:border-y-[14px] border-y-transparent ml-2"></div>
                </div>
              </div>
            )}
          </div>

          {/* Texto abaixo do vídeo */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-tight">
            Do <span className="text-primary font-black">zero ao profissional</span> — aulas{" "}
            <span className="text-primary font-black">simples e práticas</span> pra você dominar{" "}
            <span className="text-primary font-black">Word</span>,{" "}
            <span className="text-primary font-black">Excel</span> e muito mais.
          </p>

          {/* WhatsApp CTA */}
          <WhatsAppCTA text="❓ Tire suas dúvidas com a Professora Elisa" className="mb-6" />

          {/* Preço em destaque */}
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <p className="text-lg md:text-2xl font-black text-foreground">
                💰 De <span className="line-through text-muted-foreground text-base md:text-lg">R$ 497,00</span> por
                apenas <span className="text-primary">R$ 297,00</span>
              </p>
              <p className="text-sm text-muted-foreground font-semibold md:text-base">
                💳 ou parcele em até 12 x R$ 30,22 (no cartão)
              </p>
              <p className="text-sm md:text-base text-accent font-bold mt-2">
                🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
              </p>
            </div>
          </div>

          {/* Benefícios Principais */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-3xl mx-auto mb-6">
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

          {/* CTA Principal DESTAQUE */}
          <div className="max-w-2xl mx-auto">
            <Button
              size="lg"
              className="w-full text-sm md:text-xl font-black px-4 md:px-16 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--accent)/0.4)] bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent border-2 border-accent/30"
              onClick={() => (window as any).openCheckout?.()}
            >
              💻 Quero começar meu curso agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
