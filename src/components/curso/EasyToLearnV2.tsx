import { useState, useEffect, useRef } from "react";
import heroVideoThumb from "@/assets/aprenda-comigo-thumb.jpg";
import { Play, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export const EasyToLearnV2 = () => {
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
      { rootMargin: "100px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  const handleCTAClick = () => {
    document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4 border border-accent/30">
              <Sparkles className="w-4 h-4" />
              Ainda tem medo de não conseguir?
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Veja como é <span className="text-primary">fácil aprender!</span>
            </h2>
            
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto">
              Assista essa aula e descubra que <strong className="text-white">você é capaz</strong> de 
              dominar a informática de forma simples e prática.
            </p>
          </div>

          {/* Video Container */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto mb-8">
            {!isVideoLoaded ? (
              shouldLoadVideo && (
                <div
                  className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-primary/20 border-2 border-primary/30"
                  onClick={handlePlayClick}
                >
                  <img
                    src={heroVideoThumb}
                    alt="Aula demonstrativa - Veja como é fácil aprender"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="540"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/50 rounded-full blur-xl scale-150 animate-pulse" />
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-white/20">
                      ▶ Aula Demonstrativa Gratuita
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-primary/30">
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

          {/* Benefits below video */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center mb-10">
            {["Linguagem simples", "Passo a passo", "Sem complicação", "Do zero ao avançado"].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base font-medium text-white">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-primary/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-primary/10">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                🚀 Invista em você por <span className="text-primary">menos de R$ 1 por dia</span>
              </h3>
              
              <div className="mb-5">
                <span className="text-lg text-slate-400 line-through mr-3">R$ 497,00</span>
                <span className="text-4xl md:text-5xl font-black text-primary">R$ 297,00</span>
              </div>
              
              <p className="text-sm md:text-base text-slate-300 mb-6">
                💳 ou parcele em até <strong className="text-white">12x de R$ 30,22</strong> no cartão
              </p>
              
              <button
                onClick={handleCTAClick}
                className="group w-full h-14 md:h-16 text-lg md:text-xl font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Quero Aprender Informática
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-xs text-slate-400 mt-4">
                🔒 Pagamento 100% seguro • Acesso imediato após a compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
