import { Play, Shield, Award, Sparkles, MessageCircle, Footprints, Smile, Rocket, Headphones, Users, Infinity } from "lucide-react";
import { CapableSection } from "./CapableSection";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo-blue.png";
import informaticaOnlineThumb from "@/assets/informatica-online.jpg.asset.json";
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

        {/* Faixa vermelha de dor */}
        <TopFearBanner />

        {/* Selos de acesso vitalício e curso online */}
        <div className="flex items-center justify-center gap-3 mt-2 mb-3">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-primary/40 px-4 py-2 rounded-full shadow-lg">
            <Infinity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-bold text-[10px] md:text-xs text-white tracking-wide whitespace-nowrap">ACESSO VITALÍCIO</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-[#25D366]/40 px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#25D366]" />
            <span className="font-bold text-[10px] md:text-xs text-white tracking-wide whitespace-nowrap">CURSO ONLINE</span>
          </div>
        </div>

        {/* Headline principal */}
        <div className="text-center max-w-5xl mx-auto mb-4 md:mb-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Você sente <span className="text-amber-300">medo</span> ou <span className="text-amber-300">insegurança</span> ao usar o computador?
          </h1>
        </div>

        {/* Video Container com selos sobrepostos na borda inferior */}
        <div className="max-w-4xl mx-auto mb-6 md:mb-8 relative pb-5 md:pb-7">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10">
            {!isPlaying ? (
              <div 
                className="relative aspect-video cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                  <img 
                    src={freeClassThumb}
                    alt="Aula demonstrativa gratuita"
                    className="w-full h-full object-cover"
                    loading="eager"
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
                    title="Aula gratuita"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
              </div>
            )}
          </div>

          {/* Selos sobrepostos no limite inferior do vídeo */}
          <div className="absolute left-2 right-2 md:left-4 md:right-4 -bottom-0 flex justify-between items-center gap-2 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-primary/50 px-3 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg">
              <Infinity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-bold text-[10px] md:text-sm text-white tracking-wide whitespace-nowrap">ACESSO VITALÍCIO</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#25D366] px-3 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="font-bold text-[10px] md:text-sm text-white tracking-wide whitespace-nowrap">+15.000 ALUNOS</span>
            </div>
          </div>
        </div>

        {/* Frase de impacto */}
        <p className="text-center text-xl md:text-3xl lg:text-4xl text-white font-black max-w-4xl mx-auto px-4 mb-4 md:mb-6 leading-tight">
          Aprenda do <span className="text-amber-300">ZERO</span>, no seu ritmo, mesmo que você <span className="text-amber-300">NUNCA</span> tenha ligado um computador.
        </p>

        {/* Selos Suporte e Garantia */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-4 md:mb-6">
          <div className="bg-slate-800/80 border border-white/10 rounded-xl px-4 py-4 text-center">
            <Headphones className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-white font-bold text-sm">Suporte nas Aulas</p>
            <p className="text-gray-400 text-xs mt-1">Com orientação</p>
          </div>
          <div className="bg-slate-800/80 border border-white/10 rounded-xl px-4 py-4 text-center">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-white font-bold text-sm">Garantia 7 Dias</p>
            <p className="text-gray-400 text-xs mt-1">Risco zero para você</p>
          </div>
        </div>

        {/* Frase de impacto em destaque */}
        <div className="max-w-xl mx-auto mb-4 md:mb-6">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-2 border-primary/50 px-4 py-5 md:py-7 text-center shadow-xl shadow-primary/20">
            <p className="text-2xl md:text-4xl font-black text-white leading-tight">
              <span className="text-primary">🎁 Acesso vitalício incluso</span>
            </p>
            <p className="text-lg md:text-2xl font-bold text-white/90 leading-tight mt-2">
              Aprenda com calma e veja as aulas quantas vezes precisar.
            </p>
          </div>
        </div>

        <CapableSection />

        {/* Preço na Hero */}
        <HeroPricing />

        {/* Trust Badges - 2 selos abaixo do preço */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-xl mx-auto mb-6">
          {[
            { icon: Award, label: "Certificado", sublabel: "Reconhecido no mercado" },
            { icon: Users, label: "+15.000 Alunos", sublabel: "+20 anos ensinando" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary mb-1" />
              <span className="text-white font-bold text-xs md:text-sm">{item.label}</span>
              <span className="text-slate-400 text-[10px] md:text-xs">{item.sublabel}</span>
            </div>
          ))}
        </div>


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
