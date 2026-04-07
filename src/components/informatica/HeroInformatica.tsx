import { Play, Shield, Award, Headphones, Infinity as InfinityIcon, Sparkles, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";
import freeClassThumb from "@/assets/aprenda-comigo-thumb.jpg";
import testimonialMaria from "@/assets/testimonial-new-1.jpg";

export const HeroInformatica = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFreeClassPlaying, setIsFreeClassPlaying] = useState(false);
  const freeClassRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-2 md:mb-4">
          <img src={logo} alt="Informática na Prática" className="h-14 md:h-20 lg:h-24 drop-shadow-md" />
          <p className="text-slate-200 text-sm md:text-base lg:text-lg font-medium mt-1 text-center leading-relaxed">
            Curso de <span className="text-primary font-bold">Informática Online</span> completo
            <br />
            <span className="text-slate-400">Mesmo começando do Zero</span>
          </p>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-3 md:mb-5">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            Aprenda Informática de forma{" "}
            <span className="text-primary">Rápida</span> e{" "}
            <span className="text-primary">sem Complicação</span>
          </h1>
        </div>

        {/* Sub-frase */}
        <p className="text-center text-sm md:text-base text-slate-300 mb-2">
          Para quem nunca teve facilidade
        </p>

        {/* Selos acima do vídeo */}
        <div className="flex justify-center gap-3 mb-2 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 p-2 px-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <Headphones className="w-4 h-4 text-primary" />
            <span className="text-white font-bold text-xs">Suporte nas Aulas</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 px-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-white font-bold text-xs">+15.000 Alunos</span>
          </div>
        </div>

        {/* Video principal */}
        <div className="max-w-3xl mx-auto mb-3 md:mb-4">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-slate-700">
            {!isPlaying ? (
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                <img src={heroVideoThumb} alt="Prévia do curso de informática" className="w-full h-full object-cover" loading="eager" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-2xl cursor-pointer">
                    <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 animate-pulse">
                  <div className="bg-destructive text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-sm shadow-lg">
                    ▶ ASSISTA AGORA
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1" title="Veja como é fácil aprender" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
            )}
          </div>
        </div>

        {/* Subheadline */}
        <div className="text-center max-w-3xl mx-auto mb-2 md:mb-3">
          <p className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-snug">
            Mesmo que você <span className="text-primary underline decoration-primary/40 decoration-2 underline-offset-4">nunca tenha mexido</span> em um computador.
          </p>
        </div>

        {/* Seção de Preço */}
        <div className="py-2 md:py-3" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <div className="max-w-lg mx-auto px-4 text-center">
            {/* Destaque Acesso Vitalício */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-primary/20 border border-primary/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                <InfinityIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="font-bold text-xs md:text-sm text-primary">ACESSO VITALÍCIO</span>
              </div>
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-accent/20 border border-accent/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                <span className="font-bold text-xs md:text-sm text-accent">CURSO ONLINE</span>
              </div>
            </div>

            {/* Micro-depoimento estratégico */}
            <div className="flex items-center justify-center gap-2.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 max-w-sm mx-auto mb-4">
              <img 
                src={testimonialMaria} 
                alt="Maria Helena" 
                className="w-9 h-9 rounded-full object-cover border-2 border-accent/50 flex-shrink-0"
                loading="eager"
              />
              <p className="text-slate-200 text-[11px] md:text-xs italic leading-snug text-left">
                "Eu não sabia nem ligar o computador… <strong className="text-white">hoje já faço tudo sozinha!</strong>"
                <span className="text-slate-400 not-italic"> — Maria H., 58 anos</span>
              </p>
            </div>

            {/* Preço */}
            <p className="text-white text-base md:text-xl mb-1">
              De <span className="line-through font-bold">R$ 497,00</span> por apenas
            </p>
            <p className="text-3xl md:text-5xl font-black text-accent mb-1">
              12x de R$ 30,72
            </p>
            <p className="text-white text-base md:text-lg mb-4">
              ou <span className="font-black text-lg md:text-2xl">R$ 297,00</span> à vista
            </p>

            {/* CTA */}
            <button onClick={() => (window as any).openCheckout?.()} className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-lg md:text-xl py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-2">
              🎯 QUERO COMEÇAR AGORA!
            </button>

            <p className="text-slate-400 text-xs md:text-sm mb-3">
              🔒 Pagamento 100% seguro · Acesso imediato
            </p>

            {/* Trust Badges */}
            <div className="flex justify-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 p-2 px-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-white font-bold text-xs">Garantia 7 Dias</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 px-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-white font-bold text-xs">Certificado</span>
              </div>
            </div>

            {/* Urgência */}
            <p className="text-yellow-400/90 font-semibold text-xs md:text-sm mb-4">
              ⚠️ Essa condição pode acabar a qualquer momento.
            </p>

            {/* Garantia */}
            <div className="max-w-md mx-auto bg-primary/20 border-2 border-primary/40 rounded-xl p-4 shadow-lg shadow-primary/5">
              <p className="font-black text-white text-sm md:text-base mb-1">
                🛡️ Garantia Incondicional de 7 Dias
              </p>
              <p className="text-slate-400 text-xs md:text-sm">
                Se você não gostar do curso por qualquer motivo, devolvo <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </div>

        {/* Título acima do segundo vídeo */}
        <div className="max-w-3xl mx-auto text-center mt-4 md:mt-6 mb-4 md:mb-5">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white">
            Veja como é <span className="text-primary">fácil aprender!</span>
          </h2>
        </div>

        {/* Video da aula gratuita */}
        <div ref={freeClassRef} className="max-w-3xl mx-auto mb-4 md:mb-6">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-slate-700">
            {!isFreeClassPlaying ? (
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsFreeClassPlaying(true)}>
                <img src={freeClassThumb} alt="Aula demonstrativa gratuita" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-2xl cursor-pointer">
                    <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1" title="Aula gratuita" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suporte */}
      <div className="bg-primary/15 border-y border-primary/30 py-4 md:py-5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base md:text-lg font-black text-white">
            Você <span className="text-primary">não está sozinho(a)</span> — suporte direto via WhatsApp durante todo o curso
          </p>
        </div>
      </div>
    </section>
  );
};
