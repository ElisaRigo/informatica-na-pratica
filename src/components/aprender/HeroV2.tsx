import { Play, Shield, Award, Sparkles, MessageCircle, Footprints, Smile, Rocket, Headphones, Users, Infinity, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/aprender-hero-cover.jpg";
import freeClassThumb from "@/assets/aprenda-comigo-thumb.jpg";
import { HeroPricing } from "./HeroPricing";
import { TopFearBanner } from "./TopFearBanner";

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
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 md:flex-col md:gap-4 mb-3 md:mb-6">
          <div className="relative group shrink-0">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 border border-white/20 shadow-lg">
              <img src={logo} alt="Informática na Prática" className="h-12 md:h-20 lg:h-24 drop-shadow-lg" />
            </div>
          </div>
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold text-left md:text-center leading-tight">
            <span className="block md:inline">Curso de <span className="text-primary">Informática Online</span></span>
            <span className="hidden md:inline"> — </span>
            <span className="block md:inline">Simples e para Todos.</span>
          </p>
        </div>

        {/* Headline principal */}
        <div className="text-center max-w-5xl mx-auto mb-4 md:mb-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Domine o <span className="text-primary">computador</span> em poucas semanas, mesmo sem saber nada
          </h1>
        </div>

        {/* Video Container com selos embutidos */}
        <div className="max-w-4xl mx-auto mb-4 md:mb-6">
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

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                    <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
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

          {/* Selos embutidos sobre a borda inferior do vídeo */}
          <div className="relative -mt-4 md:-mt-6 flex justify-between items-center px-2 md:px-6 z-20">
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-slate-900 border-2 border-primary px-3 py-1.5 md:px-5 md:py-2.5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Infinity className="w-4 h-4 md:w-5 md:h-5 text-primary" strokeWidth={2.5} />
              <span className="font-black text-[11px] md:text-sm text-white tracking-wide">ACESSO VITALÍCIO</span>
            </div>
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-slate-900 border-2 border-success px-3 py-1.5 md:px-5 md:py-2.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)]">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-success" strokeWidth={2.5} />
              <span className="font-black text-[11px] md:text-sm text-white tracking-wide">+15.000 ALUNOS</span>
            </div>
          </div>

          {/* Frase de impacto abaixo do vídeo */}
          <p className="text-center text-base md:text-2xl text-slate-200 font-medium max-w-3xl mx-auto px-4 mt-4 md:mt-6">
            Use o <span className="text-primary font-bold">computador</span> com <span className="text-primary font-bold">confiança</span> no seu dia a dia — <strong className="text-white">sem depender de outras pessoas</strong>
          </p>
        </div>

        {/* Trust Badges - 2 selos */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-3xl mx-auto mb-4 md:mb-6">
          {[
            { icon: Headphones, label: "Suporte nas Aulas" },
            { icon: Shield, label: "Garantia 7 Dias" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 md:p-5 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10">
              <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
              <span className="text-white font-bold text-xs md:text-base">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Seção Aula Gratuita - Acima da faixa azul */}
        <div ref={freeClassRef} className="max-w-4xl mx-auto mb-4">
          <div className="text-center mb-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
              Sim, você também consegue <span className="text-primary">aprender!</span>
            </h3>
          </div>

          {/* Video da aula gratuita */}
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
                  
                  {/* Play Button */}
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

          {/* Frase de autoridade */}
          <p className="text-center text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-3 md:mb-4 leading-relaxed px-2">
            Aprenda com quem já ensinou mais de <strong className="text-white">15.000 alunos</strong> e tem mais de <strong className="text-white">20 anos de experiência</strong>. Agora é a <strong className="text-primary">sua vez</strong> de dominar o computador.
          </p>

          {/* Selos de benefícios - mesmo formato dos selos de confiança */}
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


        {/* Faixa acolhedora acima do preço - Full width */}
        <div className="absolute left-0 right-0 -mx-4 md:-mx-8 lg:-mx-16">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary overflow-hidden border-y border-primary/60">
          <div className="animate-marquee whitespace-nowrap py-3">
              <span className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
            </div>
          </div>
        </div>

        <div className="h-16 md:h-20"></div>

        {/* Preço na Hero */}
        <HeroPricing />


      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
