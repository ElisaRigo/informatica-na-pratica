import { useState, useEffect, useRef } from "react";
import heroVideoThumb from "@/assets/aprenda-comigo-thumb.jpg";
import { Play, CheckCircle } from "lucide-react";

export const EasyToLearn = () => {
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
    <section className="py-10 md:py-14 bg-panel border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              Veja como é <span className="text-primary">fácil aprender!</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista essa aula e descubra que você é capaz de dominar a informática de forma simples e prática.
            </p>
          </div>

          {/* Container do Vídeo */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {!isVideoLoaded ? (
              shouldLoadVideo && (
                <div
                  className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl border-2 border-primary/20"
                  onClick={handlePlayClick}
                >
                  <img
                    src={heroVideoThumb}
                    alt="Aula demonstrativa - Veja como é fácil aprender"
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
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
                <iframe
                  width="960"
                  height="540"
                  src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                  title="Vídeo institucional"
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

          {/* Benefícios abaixo do vídeo */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 md:mt-8">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Linguagem simples</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Passo a passo</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Sem complicação</span>
            </div>
          </div>

          {/* Seção de Preço */}
          <div className="max-w-2xl mx-auto mt-10">
            {/* Frase de impacto */}
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground leading-tight">
                🚀 Invista em você por <span className="text-primary">menos de R$ 1 por dia</span> e transforme sua vida!
              </h3>
            </div>

            {/* Card de Preço Final */}
            <div className="bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success/30 rounded-2xl p-6 md:p-8 text-center shadow-xl">
              <div className="mb-3">
                <span className="text-lg text-muted-foreground line-through mr-2">R$ 497,00</span>
                <span className="text-4xl md:text-5xl font-black text-success">R$ 297,00</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                💳 ou parcele em até <strong>12x de R$ 30,22</strong> no cartão
              </p>
              <p className="text-sm md:text-base font-semibold text-accent mb-5">
                🔥 Aproveite o valor promocional de hoje!
              </p>
              <button
                onClick={() => document.getElementById('price-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-14 md:h-16 text-lg md:text-2xl font-bold rounded-full bg-success text-white shadow-lg hover:shadow-xl hover:bg-success/90 hover:scale-[1.02] transition-all duration-300"
              >
                Quero Aprender Informática sem Medo
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                🔒 Pagamento 100% seguro • Acesso imediato após a compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
