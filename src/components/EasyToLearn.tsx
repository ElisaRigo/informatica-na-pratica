import { useState, useEffect, useRef } from "react";
import heroVideoThumb from "@/assets/aprenda-comigo-thumb.jpg";
import { Play, CheckCircle, Zap, Shield } from "lucide-react";

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
    <section className="py-10 md:py-14 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
              Você também pode aprender, <span className="text-primary">mesmo começando do zero</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
              Mesmo que você nunca tenha mexido em computador, aqui você aprende <strong className="text-white">passo a passo</strong>, de forma simples e sem complicação.
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
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Linguagem simples</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Passo a passo</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Sem complicação</span>
            </div>
          </div>

          {/* Bloco de decisão antes do CTA */}
          <div className="max-w-2xl mx-auto mt-8 md:mt-10 relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-primary/60 rounded-2xl p-6 md:p-8 text-center shadow-2xl shadow-primary/20 ring-1 ring-primary/20">
            <p className="text-lg md:text-xl text-white font-black leading-snug mb-3">
              Você já tentou aprender e <span className="text-primary">não conseguiu?</span>
            </p>
            <div className="w-12 h-0.5 bg-primary/60 mx-auto my-3" />
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-2">
              Aqui você não fica perdido — é tudo explicado com calma, como se fosse <strong className="text-white">presencial</strong>.
            </p>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Em poucos dias você já vai <strong className="text-primary">sentir a diferença</strong>.
            </p>
          </div>

          {/* Reforço de CTA */}
          <div className="max-w-2xl mx-auto mt-5 md:mt-6 text-center">
            <div className="flex justify-center">
              <button
                onClick={() => (window as any).openCheckout?.()}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-success to-green-600 hover:from-green-500 hover:to-green-700 text-white font-black text-base md:text-lg tracking-wide px-10 py-3 md:px-14 md:py-3.5 rounded-xl border-b-4 border-green-700 hover:border-green-800 active:border-b-0 active:mt-1 hover:scale-[1.01] transition-all duration-200 cursor-pointer leading-tight"
              >
                🎯 Quero Aprender Agora
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-3">
              <div className="flex items-center gap-1.5 border border-primary/40 rounded-full px-3 py-1.5 bg-primary/15 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-white">Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1.5 border border-primary/40 rounded-full px-3 py-1.5 bg-primary/15 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-white">Garantia 7 dias</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
