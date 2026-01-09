import { useState, useEffect, useRef, memo } from "react";
import { WhatsAppCTA } from "./WhatsAppCTA";

// Usar thumbnail do YouTube diretamente
const YOUTUBE_VIDEO_ID = "V6GW8bsOhpU";
const YOUTUBE_THUMB_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

export const FreeLessonExcel = memo(() => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="py-4 md:py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-center text-foreground mb-4 md:mb-6">
            🎁 <span className="text-primary">Aula gratuita: veja como é fácil aprender!</span>
          </h2>

          {/* Container do Vídeo */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto mb-4">
            {/* Selo Pulsante */}
            {isInView && (
              <div className="absolute top-4 right-4 z-20 animate-pulse">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm border-2 border-white/30 shadow-lg">
                  🎬 Aula Real
                </div>
              </div>
            )}

            {isInView && !isVideoLoaded && (
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group"
                onClick={handlePlayClick}
              >
                <img
                  src={YOUTUBE_THUMB_URL}
                  alt="Aula gratuita de Excel - Aprenda do zero"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={540}
                />

                {/* Botão de Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white hover:bg-black/80 hover:scale-110 transition-all animate-pulse group-hover:animate-none shadow-2xl">
                    <div className="w-0 h-0 border-l-[18px] md:border-l-[22px] border-l-white border-y-[11px] md:border-y-[14px] border-y-transparent ml-2"></div>
                  </div>
                </div>
              </div>
            )}
            
            {isVideoLoaded && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                <iframe
                  width={960}
                  height={540}
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
                  title="Aula Gratuita de Excel"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
            
            {!isInView && <div className="w-full aspect-video bg-muted rounded-2xl" />}
          </div>

          {/* CTA Estratégico */}
          <div className="text-center space-y-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 md:p-8">
            <p className="text-xl md:text-2xl font-black text-foreground">
              😍 Gostou? Imagine o curso completo com <span className="text-primary">+90 aulas assim!</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-semibold">📱 Tire suas Dúvidas Comigo!</p>
            <WhatsAppCTA text="💬 Quero Falar com a Professora" className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
});

FreeLessonExcel.displayName = "FreeLessonExcel";
