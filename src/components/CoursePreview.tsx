import { useState, useEffect, useRef } from "react";
import courseThumb from "@/assets/course-preview-thumb.jpg";
import { WhatsAppCTA } from "./WhatsAppCTA";

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

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              Aprenda comigo <span className="text-primary">no seu ritmo</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Aulas calmas, simples e didáticas para quem está começando ou quer aprender com segurança.
            </p>
          </div>

          {/* Container do Vídeo */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {/* Selo Pulsante */}
            <div className="absolute top-4 right-4 z-20 animate-pulse">
              <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">
                🎬 Conheça o Curso
              </div>
            </div>

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
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white hover:bg-black/80 hover:scale-110 transition-all animate-pulse group-hover:animate-none shadow-2xl">
                      <div className="w-0 h-0 border-l-[18px] md:border-l-[22px] border-l-white border-y-[11px] md:border-y-[14px] border-y-transparent ml-2"></div>
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
                  src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1"
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

          {/* CTA Estratégico */}
          <div className="text-center space-y-4 mt-8">
            <p className="text-lg md:text-xl font-bold text-foreground">
              ✨ Viu como o curso é completo? <span className="text-primary">Garanta sua vaga agora!</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground">Alguma dúvida? Me chame para conversar!</p>
            <WhatsAppCTA text=" Tirar Dúvidas no WhatsApp" className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
