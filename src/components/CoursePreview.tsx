import { useState, useEffect, useRef } from "react";
import courseThumb from "@/assets/hero-video-thumb.jpg";
import { Play, ShieldCheck, Clock, Award, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CoursePreview = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
      },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  const benefits = [
    { icon: ShieldCheck, text: "Garantia de 7 dias" },
    { icon: Clock, text: "Acesso vitalício" },
    { icon: Award, text: "Certificado incluso" },
    { icon: CreditCard, text: "Parcele em até 12x" },
  ];

  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground">
              Aprenda comigo <span className="text-primary">no seu ritmo</span>
            </h2>
          </div>

          {/* Container do Vídeo */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {!isVideoLoaded ? (
              // Thumbnail com botão de play
              shouldLoadVideo && (
                <div
                  className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={handlePlayClick}
                >
                  <img
                    src={courseThumb}
                    alt="Vídeo apresentando o curso de informática por dentro"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="540"
                  />

                  {/* Botão de Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
              )
            ) : (
              // YouTube iframe
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                <iframe
                  width="960"
                  height="540"
                  src="https://www.youtube.com/embed/6l0dJZUMl6o?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                  title="Aprenda comigo no seu ritmo"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* CTA Destacado com Vantagens */}
          <div className="mt-8 md:mt-12 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 rounded-3xl p-6 md:p-10 text-center relative overflow-hidden">
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl font-bold text-foreground mb-2">
                  🎯 Pronto para transformar sua vida?
                </p>
                <p className="text-muted-foreground mb-6 text-sm md:text-base">
                  Comece hoje mesmo sua jornada rumo à independência digital
                </p>

                {/* Botão Principal Grande */}
                <Button 
                  size="lg"
                  onClick={() => (window as any).openCheckout?.()}
                  className="w-full md:w-auto min-w-[280px] h-16 md:h-20 text-lg md:text-xl font-black rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
                >
                  <span className="flex items-center gap-3">
                    🛒 QUERO COMPRAR AGORA
                  </span>
                </Button>

                {/* Vantagens em Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center gap-2 p-3 bg-background/50 rounded-xl border border-line"
                    >
                      <benefit.icon className="w-6 h-6 text-primary" />
                      <span className="text-xs md:text-sm font-semibold text-foreground text-center">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Garantia destacada */}
                <div className="mt-6 flex items-center justify-center gap-2 text-success">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    Satisfação garantida ou seu dinheiro de volta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
