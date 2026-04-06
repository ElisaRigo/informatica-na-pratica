import { useState, useRef, useEffect } from "react";
import { Play, Clock, Zap, Shield, Award, ArrowRight } from "lucide-react";
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
    <section className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-foreground text-center mb-4">
            🎬 Conheça um Pouco Mais
          </h2>

          {shouldLoad && (
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-border mb-3">
              {!isPlaying ? (
                <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img src={environmentThumb} alt="Aula gratuita de Excel" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/80 shadow-xl border-2 border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe src="https://www.youtube.com/embed/g_F1-d7tdQ0?rel=0&modestbranding=1&autoplay=1" title="Aula de Excel" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 max-w-xl mx-auto mb-4">
            {[
              { icon: Clock, label: "Passo a passo" },
              { icon: Zap, label: "Sem enrolação" },
              { icon: Shield, label: "Risco Zero" },
              { icon: Award, label: "+90 Aulas" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2 bg-muted/50 rounded-lg border border-border">
                <item.icon className="w-5 h-5 text-muted-foreground mb-1" />
                <span className="text-foreground font-bold text-[10px] md:text-xs">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => (window as any).openCheckout?.()} className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all">
              💚 Bora começar essa jornada comigo?
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
