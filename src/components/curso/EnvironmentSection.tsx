import { useState, useRef, useEffect } from "react";
import { Play, GraduationCap, Clock, Zap, Shield, Award, ArrowRight } from "lucide-react";
import excelThumb from "@/assets/aula-excel-thumb.jpg";

export const EnvironmentSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-8 md:py-12 bg-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={sectionRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2.5 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm md:text-base font-bold mb-3 border border-primary/30">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
              🎓 Aula Grátis para Você Experimentar
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">
              Veja uma <span className="text-primary">Aula de Excel</span> ao Vivo
            </h3>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
              Assista a uma aula real e veja como é fácil aprender comigo. Didática simples, passo a passo, sem complicação!
            </p>
          </div>

          {/* Video da aula */}
          {shouldLoad && (
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10 mb-3">
              {!isPlaying ? (
                <div 
                  className="relative aspect-video cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img 
                    src={excelThumb}
                    alt="Aula gratuita de Excel - Aprenda do zero"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 animate-pulse">
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-sm border-2 border-white/30 shadow-lg">
                      🎬 Aula Real
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/g_F1-d7tdQ0?rel=0&modestbranding=1&autoplay=1"
                    title="Aula de Excel - CNT Informática"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          {/* Benefícios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto mb-6">
            {[
              { icon: Clock, label: "Didática Simples", sublabel: "Passo a passo" },
              { icon: Zap, label: "Aprenda Rápido", sublabel: "Sem enrolação" },
              { icon: Shield, label: "Risco Zero", sublabel: "Teste por 7 dias" },
              { icon: Award, label: "+90 Aulas Assim", sublabel: "Curso completo" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
                <span className="text-white font-bold text-xs md:text-sm">{item.label}</span>
                <span className="text-slate-400 text-[10px] md:text-xs">{item.sublabel}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group relative w-full max-w-xl mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary/25 to-primary/15 backdrop-blur-sm text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl border border-primary/40 hover:border-primary/60 hover:from-primary/35 hover:to-primary/25 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <span className="text-lg animate-pulse">💚</span>
              <span>
                Bora começar essa jornada{" "}
                <span className="text-success font-bold">comigo?</span>
              </span>
              <ArrowRight className="w-4 h-4 text-success group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
