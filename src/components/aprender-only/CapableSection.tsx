import { MessageCircle, Footprints, Smile, Rocket, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import aprendaComigoThumb from "@/assets/aprenda-comigo-thumb.jpg";

export const CapableSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-slate-900 pt-4 md:pt-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-4xl mx-auto mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
              💻 Veja como é fácil aprender informática de um jeito simples, tranquilo!
            </h2>
          </div>

          {shouldLoad && (
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10 mb-3">
              {!isPlaying ? (
                <div
                  className="relative aspect-video cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={aprendaComigoThumb}
                    alt="Prévia do curso de informática"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                    title="Veja como é fácil aprender"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          <p className="text-center text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed px-2">
            Aprenda com quem já ensinou mais de <strong className="text-white">15.000 alunos</strong> e tem mais de <strong className="text-white">20 anos de experiência</strong>. Agora é a <strong className="text-primary">sua vez</strong> de dominar o computador.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto">
            {[
              { icon: MessageCircle, label: "Linguagem Simples", sublabel: "Fácil de entender" },
              { icon: Footprints, label: "Passo a Passo", sublabel: "Sem pular etapas" },
              { icon: Smile, label: "Sem Complicação", sublabel: "Direto ao ponto" },
              { icon: Rocket, label: "Do Zero ao Mercado", sublabel: "Preparação completa" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
                <span className="text-white font-bold text-xs md:text-sm">{item.label}</span>
                <span className="text-slate-400 text-[10px] md:text-xs">{item.sublabel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary overflow-hidden border-y border-primary/60">
            <div className="animate-marquee whitespace-nowrap py-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                  ✨ Você é capaz de aprender — Venha comigo!
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
