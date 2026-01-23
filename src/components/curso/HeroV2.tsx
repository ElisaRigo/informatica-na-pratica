import { Play, Shield, Headphones, Award, Users, BookOpen, GraduationCap } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";

export const HeroV2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-3 md:mb-6">
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 shadow-lg">
              <img src={logo} alt="Informática na Prática" className="h-14 md:h-20 lg:h-24 drop-shadow-lg" />
            </div>
          </div>
          <p className="text-white text-sm md:text-lg lg:text-xl font-medium mt-3 text-center">
            <span className="text-primary font-bold">Informática do zero:</span> simples, prático e para todos
          </p>
        </div>

        {/* Headline principal */}
        <div className="text-center max-w-5xl mx-auto mb-4 md:mb-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2 md:mb-4">
            <span className="block">Domine o Computador</span>
            <span className="block">
              em{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  30 Dias
                </span>
                <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-gradient-to-r from-primary/30 to-accent/30 -skew-x-12" />
              </span>
            </span>
          </h1>
          <p className="text-lg md:text-3xl lg:text-4xl text-slate-300 font-medium">
            Mesmo começando do zero
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto mb-4 md:mb-6">
          {[
            { icon: Headphones, label: "Suporte nas Aulas", sublabel: "Nunca fica sozinho(a)" },
            { icon: Shield, label: "Garantia 7 Dias", sublabel: "Risco zero para você" },
            { icon: Award, label: "Certificado", sublabel: "Reconhecido no mercado" },
            { icon: Users, label: "+15.000 Alunos", sublabel: "Comunidade ativa" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-2 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10">
              <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
              <span className="text-white font-bold text-xs md:text-sm">{item.label}</span>
              <span className="text-slate-400 text-[10px] md:text-xs">{item.sublabel}</span>
            </div>
          ))}
        </div>

        {/* Video Container */}
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

                {/* Badge Assista Agora */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 animate-pulse">
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
          
          {/* Texto de prova social abaixo do vídeo */}
          <p className="text-sm md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed text-center mt-3 px-2">
            O método passo a passo que já transformou a vida de <strong className="text-white">+15.000 alunos</strong> que, 
            assim como você, tinham medo de errar e vergonha de pedir ajuda.
          </p>

        </div>

        {/* Faixa acolhedora acima do preço - Full width */}
        <div className="absolute left-0 right-0 -mx-4 md:-mx-8 lg:-mx-16">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary overflow-hidden border-y border-primary/60">
            <div className="animate-marquee whitespace-nowrap py-3">
              <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
              <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-bold mx-6">
                ✨ Você é capaz de aprender — Venha comigo!
              </span>
            </div>
          </div>
        </div>

        <div className="h-12 md:h-14"></div>

        {/* Preço na Hero */}
        <div className="max-w-xl mx-auto mb-4 md:mb-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
            <p className="text-sm md:text-lg text-slate-400 mb-1">
              De <span className="line-through text-slate-500">R$ 497,00</span> por apenas
            </p>
            <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-success to-accent mb-1">
              R$ 297,00
            </p>
            <p className="text-xs md:text-sm text-slate-400 mb-3 md:mb-5">
              💳 ou parcele em até <strong className="text-white">12x de R$ 30,22</strong> no cartão
            </p>
            
            {/* CTA Principal */}
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-success to-accent text-white font-black text-base md:text-xl px-6 py-4 md:py-5 rounded-full shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">🎯 QUERO COMEÇAR AGORA!</span>
            </button>
            
            <p className="text-slate-500 text-[10px] md:text-xs mt-3">
              🔒 Pagamento 100% seguro • Acesso imediato após a compra
            </p>
          </div>
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
