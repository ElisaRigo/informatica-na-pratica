import { useState, useRef, useEffect } from "react";
import { Play, GraduationCap, Clock, Zap, Shield, Award, ArrowRight } from "lucide-react";
import environmentThumb from "@/assets/environment-thumb.jpg";

export const EnvironmentSectionLight = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShouldLoad(true); observer.disconnect(); } },
      { rootMargin: "100px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div ref={sectionRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2.5 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm md:text-base font-bold mb-3 border border-primary/20">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
              🎬 Conheça um Pouco Mais
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-2">
              Veja como é <span className="text-primary">uma aula real</span> do curso
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Essa é uma das +90 aulas do curso completo. Assista e sinta a didática simples, passo a passo, feita pra você!
            </p>
          </div>

          {shouldLoad && (
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-border mb-3">
              {!isPlaying ? (
                <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img src={environmentThumb} alt="Aula gratuita de Excel" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white cursor-pointer">
                      <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 animate-pulse">
                    <div className="bg-destructive text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-sm shadow-lg">🎬 Aula Real</div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe src="https://www.youtube.com/embed/g_F1-d7tdQ0?rel=0&modestbranding=1&autoplay=1" title="Aula de Excel" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto mb-6">
            {[
              { icon: Clock, label: "Didática Simples", sublabel: "Passo a passo" },
              { icon: Zap, label: "Aprenda Rápido", sublabel: "Sem enrolação" },
              { icon: Shield, label: "Risco Zero", sublabel: "Teste por 7 dias" },
              { icon: Award, label: "+90 Aulas Assim", sublabel: "Curso completo" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2 md:p-4 bg-primary/5 rounded-lg md:rounded-xl border border-primary/10">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
                <span className="text-foreground font-bold text-xs md:text-sm">{item.label}</span>
                <span className="text-muted-foreground text-[10px] md:text-xs">{item.sublabel}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => (window as any).openCheckout?.()} className="group relative w-full max-w-xl mx-auto flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-lg">💚</span>
              <span>Bora começar essa jornada <span className="font-bold">comigo?</span></span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
