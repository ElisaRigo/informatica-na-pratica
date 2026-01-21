import { Play, Shield, Clock, Award, Users } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import heroVideoThumb from "@/assets/hero-video-cover.png";

export const HeroV2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Informática na Prática" className="h-16 md:h-24 lg:h-28" />
        </div>

        {/* Badge de urgência */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-warning/20 border border-warning/40 text-warning px-4 py-2 rounded-full text-sm font-bold animate-pulse">
            <span className="w-2 h-2 bg-warning rounded-full animate-ping" />
            🔥 VAGAS LIMITADAS — Oferta especial por tempo limitado
          </div>
        </div>

        {/* Headline principal */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Domine o Computador em{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                30 Dias
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-accent/30 -skew-x-12" />
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl text-slate-300 font-medium mt-4 block">
              Mesmo que você nunca tenha ligado um
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-3 max-w-2xl mx-auto">
            *Resultados podem variar de acordo com a dedicação e ritmo de cada aluno. O prazo de 30 dias é uma estimativa baseada em estudos de 1h por dia.
          </p>
        </div>

        {/* Video Container - Mesmo da Home */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10">
            {!isPlaying ? (
              <div 
                className="relative aspect-video bg-slate-800 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={heroVideoThumb}
                  alt="Prévia do curso de informática"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />
                
                {/* Play Button - Estilo da Home */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                    <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                  </div>
                </div>

                {/* Badge Assista Agora */}
                <div className="absolute top-3 right-3 z-20 animate-pulse">
                  <div className="bg-destructive text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm shadow-lg">
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
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed text-center mt-6">
            O método passo a passo que já transformou a vida de <strong className="text-white">+15.000 alunos</strong> que, 
            assim como você, tinham medo de errar e vergonha de pedir ajuda.
          </p>
        </div>

        {/* Preço na Hero */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-lg text-slate-400 mb-2">
              De <span className="line-through text-slate-500">R$ 497,00</span> por apenas
            </p>
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-success to-accent mb-2">
              R$ 297,00
            </p>
            <p className="text-sm text-slate-400 mb-5">
              💳 ou parcele em até <strong className="text-white">12x de R$ 30,22</strong> no cartão
            </p>
            
            {/* CTA Principal */}
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-success to-accent text-white font-black text-lg md:text-xl px-8 py-5 rounded-full shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">🎯 QUERO COMEÇAR AGORA!</span>
            </button>
            
            <p className="text-slate-500 text-xs mt-4">
              🔒 Pagamento 100% seguro • Acesso imediato após a compra
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Clock, label: "Acesso por 2 Anos", sublabel: "Estude no seu ritmo" },
            { icon: Shield, label: "Garantia 7 Dias", sublabel: "Risco zero para você" },
            { icon: Award, label: "Certificado", sublabel: "Reconhecido no mercado" },
            { icon: Users, label: "+15.000 Alunos", sublabel: "Comunidade ativa" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <item.icon className="w-8 h-8 text-primary mb-2" />
              <span className="text-white font-bold text-sm">{item.label}</span>
              <span className="text-slate-400 text-xs">{item.sublabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
