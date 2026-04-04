import { Play, Shield, Clock, Award, Users } from "lucide-react";
import { useState, useRef } from "react";

export const HeroV2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
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
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            O método passo a passo que já transformou a vida de <strong className="text-white">+2.000 alunos</strong> que, 
            assim como você, tinham medo de errar e vergonha de pedir ajuda.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10">
            {/* Video Thumbnail or Embed */}
            {!isPlaying ? (
              <div 
                className="relative aspect-video bg-slate-800 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src="https://img.youtube.com/vi/tsmVK7T59bc/maxresdefault.jpg"
                  alt="Apresentação do curso"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-destructive text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  ▶ ASSISTA AGORA
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  ref={videoRef}
                  src="https://www.youtube.com/embed/tsmVK7T59bc?autoplay=1&rel=0"
                  title="Apresentação do curso"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* CTA Principal */}
        <div className="text-center mb-10">
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-success text-white font-black text-lg md:text-2xl px-8 md:px-16 py-5 md:py-6 rounded-full shadow-2xl shadow-accent/40 hover:shadow-accent/60 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">QUERO COMEÇAR AGORA</span>
          </button>
          
          <p className="text-slate-400 text-sm mt-4">
            Acesso imediato • Garantia de 7 dias • Pagamento seguro
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Clock, label: "Acesso por 2 Anos", sublabel: "Estude no seu ritmo" },
            { icon: Shield, label: "Garantia 7 Dias", sublabel: "Risco zero para você" },
            { icon: Award, label: "Certificado", sublabel: "Reconhecido no mercado" },
            { icon: Users, label: "+2.000 Alunos", sublabel: "Comunidade ativa" },
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
