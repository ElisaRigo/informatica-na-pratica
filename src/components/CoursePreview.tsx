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

          {/* CTA Simples e Direto */}
          <div className="mt-10 md:mt-14 text-center">
            {/* Botão Principal Gigante */}
            <Button 
              size="lg"
              onClick={() => (window as any).openCheckout?.()}
              className="w-full md:w-auto min-w-[320px] h-16 md:h-20 text-lg md:text-2xl font-black rounded-full bg-success hover:bg-success/90 text-white shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.5)] hover:scale-105 transition-all duration-300"
            >
              🛒 QUERO COMPRAR AGORA
            </Button>

            {/* Badges de confiança em linha */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">Garantia 7 dias</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Acesso vitalício</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">12x no cartão</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
