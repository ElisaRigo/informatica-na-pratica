import { Play, Award, Users, Infinity, ShieldCheck, Star, Clock } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/aprender-hero-cover.jpg";
import { HeroPricing } from "./HeroPricing";

export const HeroV2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Faixa superior de urgência */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-center py-2 px-4 font-bold text-xs md:text-sm tracking-wide">
        <span className="inline-flex items-center gap-2">
          <Clock className="w-4 h-4" />
          OFERTA POR TEMPO LIMITADO • R$ 297 À VISTA OU 12X
        </span>
      </div>

      {/* Glow ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-6 md:pt-10 pb-8 md:pb-14 relative z-10">
        {/* Logo + selo de autoridade */}
        <div className="flex flex-col items-center gap-3 mb-6 md:mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
            <img src={logo} alt="Informática na Prática" className="h-10 md:h-14" />
          </div>
          <div className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <Star className="w-4 h-4 fill-primary text-primary" />
            <Star className="w-4 h-4 fill-primary text-primary" />
            <Star className="w-4 h-4 fill-primary text-primary" />
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="ml-1 font-semibold text-foreground">4.9/5</span>
            <span>•</span>
            <span>+15.000 alunos aprovam</span>
          </div>
        </div>

        {/* HEADLINE GIGANTE — núcleo da promessa */}
        <div className="text-center max-w-5xl mx-auto mb-6 md:mb-10">
          <p className="inline-block bg-secondary/60 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-6">
            Curso de Informática 100% Online
          </p>
          <h1 className="font-black text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
            Pare de sentir <span className="text-primary">vergonha</span> do computador.
            <span className="block mt-2 md:mt-3">
              Aprenda do <span className="text-primary">ZERO</span> em poucas semanas.
            </span>
          </h1>
          <p className="mt-5 md:mt-7 text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mesmo que você <strong className="text-foreground">nunca tenha ligado um computador</strong>,
            a Professora Elisa vai te ensinar passo a passo — com paciência, sem termos difíceis.
          </p>
        </div>

        {/* VÍDEO centralizado */}
        <div className="max-w-3xl mx-auto mb-6 md:mb-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 ring-4 ring-primary/10">
            {!isPlaying ? (
              <button
                type="button"
                className="relative aspect-video w-full cursor-pointer group block"
                onClick={() => setIsPlaying(true)}
                aria-label="Assistir vídeo de apresentação"
              >
                <img
                  src={heroVideoThumb}
                  alt="Veja como é fácil aprender informática"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary shadow-2xl shadow-primary/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Play className="w-9 h-9 md:w-11 md:h-11 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm border border-primary/30 text-foreground text-xs md:text-sm font-bold px-3 py-1.5 rounded-full">
                  ▶ Assista 90 segundos
                </div>
              </button>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&autoplay=1"
                  title="Veja como é fácil aprender"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* CTA PRINCIPAL — dourado, alto contraste */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg md:text-2xl px-8 md:px-14 py-5 md:py-6 rounded-xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-[1.02] transition-all duration-300 uppercase tracking-tight"
          >
            QUERO COMEÇAR AGORA
          </button>
          <p className="mt-3 text-sm text-muted-foreground inline-flex items-center justify-center gap-2 flex-wrap">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Pagamento seguro • Garantia 7 dias • Acesso imediato
          </p>
        </div>

        {/* Selos de confiança em linha */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto">
          {[
            { icon: Infinity, label: "Acesso Vitalício", sub: "Estude no seu ritmo" },
            { icon: Award, label: "Certificado", sub: "Reconhecido" },
            { icon: Users, label: "+15.000 alunos", sub: "20 anos ensinando" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 md:p-4 bg-secondary/40 backdrop-blur-sm rounded-xl border border-primary/20">
              <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary mb-1.5" />
              <span className="text-foreground font-bold text-xs md:text-sm leading-tight">{item.label}</span>
              <span className="text-muted-foreground text-[10px] md:text-xs leading-tight">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Preço discreto abaixo */}
        <div className="mt-8 md:mt-10">
          <HeroPricing />
        </div>
      </div>
    </section>
  );
};
