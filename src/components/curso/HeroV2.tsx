import { Play, Shield, Award, Sparkles, Headphones, Users, Infinity } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";
import freeClassThumb from "@/assets/aprenda-comigo-thumb.jpg";
import { HeroPricing } from "./HeroPricing";

export const HeroV2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFreeClassPlaying, setIsFreeClassPlaying] = useState(false);
  const [shouldLoadFreeClass, setShouldLoadFreeClass] = useState(false);
  const freeClassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadFreeClass(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    if (freeClassRef.current) {
      observer.observe(freeClassRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 rounded-2xl blur-xl opacity-60" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <img src={logo} alt="Informática na Prática" className="h-12 md:h-16 lg:h-20 drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Headline — curta e direta na dor */}
        <div className="text-center max-w-4xl mx-auto mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            Cansada de <span className="text-destructive">depender dos outros</span>{" "}
            para usar o computador?
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Chega de se sentir travada. Vou te ensinar a usar o computador{" "}
            <strong className="text-white">com confiança</strong> e abrir portas para{" "}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              novas oportunidades
            </strong>.
          </p>
        </div>

        {/* Trust Badges — compactos */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto mb-4 md:mb-6">
          {[
            { icon: Users, label: "+15.000 Alunos" },
            { icon: Infinity, label: "Acesso Vitalício" },
            { icon: Award, label: "Certificado" },
            { icon: Shield, label: "Garantia 7 Dias" },
            { icon: Headphones, label: "Suporte nas Aulas" },
          ].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2"
            >
              <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
              <span className="text-white text-[11px] md:text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Vídeo Principal */}
        <div className="max-w-4xl mx-auto mb-3 md:mb-5">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10">
            {!isPlaying ? (
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={heroVideoThumb}
                  alt="Prévia do curso de informática"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70">
                    <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 animate-pulse">
                  <div className="bg-destructive text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-sm shadow-lg">
                    ▶ ASSISTA AGORA
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1"
                  title="Veja como é fácil aprender"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Prova social — uma linha limpa */}
          <p className="text-sm md:text-base text-slate-400 text-center mt-3">
            <strong className="text-white">+15.000 alunos</strong> já conquistaram independência no computador
          </p>
        </div>

        {/* Seção Aula Gratuita */}
        <div ref={freeClassRef} className="max-w-4xl mx-auto mb-4">
          <div className="text-center mb-3">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white">
              Veja como é <span className="text-primary">fácil aprender</span>
            </h3>
          </div>

          {shouldLoadFreeClass && (
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10 mb-3">
              {!isFreeClassPlaying ? (
                <div
                  className="relative aspect-video cursor-pointer group"
                  onClick={() => setIsFreeClassPlaying(true)}
                >
                  <img
                    src={freeClassThumb}
                    alt="Aula demonstrativa gratuita"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70">
                      <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                    title="Aula gratuita"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Faixa motivacional */}
        <div className="absolute left-0 right-0 -mx-4 md:-mx-8 lg:-mx-16">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary border-y border-primary/60 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap py-2.5">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                  ✨ Você é capaz de aprender — Venha comigo!
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-14 md:h-18"></div>

        {/* Preço */}
        <HeroPricing />
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
