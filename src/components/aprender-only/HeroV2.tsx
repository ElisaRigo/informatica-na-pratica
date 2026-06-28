import { Play, Shield, Award, Sparkles, MessageCircle, Footprints, Smile, Rocket, Headphones, Users, Infinity, BookOpen } from "lucide-react";
import { CapableSection } from "./CapableSection";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo-blue.png";
import informaticaOnlineThumb from "@/assets/informatica-online.jpg.asset.json";
import heroVideoThumbAsset from "@/assets/aprender-hero-cover-v3.jpg.asset.json";
const heroVideoThumb = heroVideoThumbAsset.url;
import freeClassThumbAsset from "@/assets/aprender-hero-cover-v2.jpg.asset.json";
const freeClassThumb = freeClassThumbAsset.url;
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
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 border border-white/20 shadow-lg">
              <img src={logo} alt="Informática na Prática" className="h-12 md:h-20 lg:h-24" />
            </div>
          </div>
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold text-left md:text-center leading-tight">
            <span className="block md:inline">Curso de <span className="text-sky-300">Informática Online</span></span>
            <span className="hidden md:inline"> — </span>
            <span className="block md:inline">Simples e para Todos.</span>
          </p>
        </div>


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
            Você sente <span className="text-[#fae614]">medo</span> ou <span className="text-[#fae614]">insegurança</span> ao usar o computador?
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
                    src={heroVideoThumb}
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
                    src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1"
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

        {/* Frase abaixo do vídeo */}
        <p className="text-center text-2xl md:text-5xl lg:text-6xl text-white font-black max-w-4xl mx-auto px-4 mt-5 mb-5 md:mb-7 leading-tight">
          Aprenda a usar Word, Excel, internet e muito mais com aulas <span className="text-[#fae614]">simples</span> e <span className="text-[#fae614]">fáceis</span>.
        </p>





        {/* Faixa neon acima da sessão de valor */}
        <TopFearBanner />

        {/* Mini sessão de valor - sem container */}
        <div className="max-w-xl mx-auto mb-5 md:mb-7 px-2 text-center">

          <p className="text-white/90 text-base md:text-lg mt-4">
            de <span className="line-through text-lg md:text-2xl">R$ 497,00</span> por apenas
          </p>
          <p className="text-[#25D366] font-black text-3xl md:text-4xl leading-tight mt-1">
            Só 12x de R$ 30,72
          </p>
          <p className="text-white/90 text-base md:text-lg mt-1">
            ou <span className="font-bold text-lg md:text-2xl">R$ 297,00</span> à vista
          </p>
          <p className="inline-flex items-center justify-center gap-1.5 text-slate-400 text-xs md:text-sm mt-2">
            <Shield className="w-3.5 h-3.5" /> Pagamento 100% seguro · Acesso imediato
          </p>
          <a
            href="#oferta"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#1a9e4c] hover:bg-[#157a3a] transition-colors text-white font-black text-base md:text-lg py-3.5 md:py-4 rounded-xl"
          >
            <Rocket className="w-5 h-5" /> Quero perder o medo do computador
          </a>

          {/* Selos de benefícios - 3x2 */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { icon: Play, label: "+90 Videoaulas" },
              { icon: Infinity, label: "Acesso Vitalício" },
              { icon: Headphones, label: "Suporte Direto" },
              { icon: Users, label: "+15.000 Alunos" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-1.5 bg-slate-900/60 border border-white/10 rounded-full px-2 py-2">
                <item.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-white font-semibold text-[10px] md:text-xs whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Garantia 7 dias */}
          <div className="mt-4 rounded-xl border-2 border-[#25D366]/50 bg-[#25D366]/15 px-5 py-4 text-center shadow-lg shadow-[#25D366]/10">
            <p className="flex flex-row items-center justify-center gap-1.5 text-[#25D366] font-black text-sm md:text-lg">
              <Shield className="w-5 h-5" /> <span className="whitespace-nowrap">GARANTIA INCONDICIONAL DE 7 DIAS</span>
            </p>
            <p className="text-white text-sm md:text-base mt-1.5 leading-snug">
              <span className="text-[#fae614] font-bold">RISCO ZERO!</span> Se não gostar, devolvo <span className="text-[#25D366] font-bold whitespace-nowrap">100% do seu dinheiro.</span>
            </p>
          </div>
        </div>



        <CapableSection />



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
