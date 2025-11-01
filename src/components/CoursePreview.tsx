import { useState } from "react";
import courseThumb from "@/assets/conheca-curso-thumb.jpg";

export const CoursePreview = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-center text-foreground mb-6 md:mb-8">
            Veja o Curso <span className="text-primary">Por Dentro</span>
          </h2>

          {/* Container do Vídeo */}
          <div className="relative max-w-4xl mx-auto">
            {/* Selo Pulsante */}
            <div className="absolute top-4 right-4 z-20 animate-pulse">
              <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">
                🎬 Conheça o Curso
              </div>
            </div>

            {!isVideoLoaded ? (
              // Thumbnail com botão de play
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group" onClick={handlePlayClick}>
                <img
                  src={courseThumb}
                  alt="Vídeo apresentando o curso de informática por dentro"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />

                {/* Botão de Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/70 hover:bg-black/60 hover:scale-110 transition-all animate-pulse group-hover:animate-none shadow-2xl">
                    <div className="w-0 h-0 border-l-[18px] md:border-l-[22px] border-l-white border-y-[11px] md:border-y-[14px] border-y-transparent ml-2"></div>
                  </div>
                </div>
              </div>
            ) : (
              // YouTube iframe
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/2Om_uoeKgU8?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                  title="Aula de Excel - Conheça o Curso por Dentro"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Texto descritivo */}
          <p className="text-center text-base md:text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Assista ao vídeo e veja como o curso funciona na prática — aulas passo a passo para você dominar informática do zero!
          </p>
        </div>
      </div>
    </section>
  );
};
