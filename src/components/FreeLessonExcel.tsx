import { useState } from "react";
import excelThumb from "@/assets/aula-excel-thumb.jpg";
import { WhatsAppCTA } from "./WhatsAppCTA";

export const FreeLessonExcel = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-center text-foreground mb-3 md:mb-4">
            🎁 <span className="text-primary">Aula Gratuita de Excel</span>
          </h2>
          
          <p className="text-center text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Experimente gratuitamente uma aula completa e veja a qualidade do nosso ensino!
          </p>

          {/* Container do Vídeo */}
          <div className="relative max-w-4xl mx-auto mb-6">
            {/* Selo Pulsante */}
            <div className="absolute top-4 right-4 z-20 animate-pulse">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm border-2 border-white/30">
                ✨ 100% Gratuita
              </div>
            </div>

            {!isVideoLoaded ? (
              // Thumbnail com botão de play
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group" onClick={handlePlayClick}>
                <img
                  src={excelThumb}
                  alt="Aula gratuita de Excel - Aprenda do zero"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />

                {/* Botão de Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/70 hover:bg-black/60 hover:scale-110 transition-all animate-pulse group-hover:animate-none">
                    <div className="w-0 h-0 border-l-[18px] md:border-l-[22px] border-l-white border-y-[11px] md:border-y-[14px] border-y-transparent ml-2"></div>
                  </div>
                </div>
              </div>
            ) : (
              // YouTube iframe
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/V6GW8bsOhpU?rel=0&modestbranding=1&playsinline=1&autoplay=1"
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

          {/* CTA Estratégico */}
          <div className="text-center space-y-4">
            <p className="text-lg md:text-xl font-bold text-foreground">
              💚 Gostou? Imagine o curso completo com <span className="text-primary">+50 aulas assim!</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Tire suas dúvidas direto com a Professora Elisa
            </p>
            <WhatsAppCTA 
              text="💬 Falar com a Professora Elisa"
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
