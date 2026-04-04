import { Play, Shield, Award, Headphones, BookOpen, CheckCircle2, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";
import freeClassThumb from "@/assets/aprenda-comigo-thumb.jpg";

export const HeroInformatica = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFreeClassPlaying, setIsFreeClassPlaying] = useState(false);
  const [shouldLoadFreeClass, setShouldLoadFreeClass] = useState(true);
  const freeClassRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-4 md:mb-6">
          <img src={logo} alt="Informática na Prática" className="h-14 md:h-20 lg:h-24 drop-shadow-md" />
          <p className="text-foreground text-sm md:text-base lg:text-lg font-medium mt-2 text-center">
            Curso de <span className="text-primary font-bold">Informática Online</span> completo - Começando do Zero
          </p>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-5 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            Aprenda Informática de forma{" "}
            <span className="text-primary">Rápida</span> e{" "}
            <span className="text-primary">sem Complicação</span>
          </h1>
        </div>

        {/* Badge acima do primeiro vídeo */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-6 py-3 rounded-lg">
            <span className="text-primary text-base md:text-lg">💡</span>
            <span className="text-primary font-bold text-sm md:text-base text-center">Curso pensado para quem nunca teve facilidade com computador</span>
          </div>
        </div>

        {/* Video da aula gratuita (primeiro) */}
        <div ref={freeClassRef} className="max-w-3xl mx-auto mb-4 md:mb-6">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-border">
            {!isFreeClassPlaying ? (
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => setIsFreeClassPlaying(true)}
              >
                <img
                  src={freeClassThumb}
                  alt="Aula demonstrativa gratuita"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-2xl cursor-pointer">
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
        </div>

        {/* Subheadline */}
        <div className="text-center max-w-3xl mx-auto mb-5 md:mb-8">
          <p className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground leading-snug">
            Mesmo que você <span className="text-primary underline decoration-primary/40 decoration-2 underline-offset-4">nunca tenha mexido</span> em um computador.
          </p>
        </div>

        {/* Faixa animada de conversão */}
        <div className="w-full overflow-hidden bg-primary mb-0" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <div className="animate-marquee whitespace-nowrap py-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                🛑 DOMINE O COMPUTADOR — PARE DE DEPENDER DOS OUTROS
              </span>
            ))}
          </div>
        </div>

        {/* Seção de Preço */}
        <div className="py-6 md:py-8" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <div className="max-w-lg mx-auto px-4 text-center">
            {/* Badges topo */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {[
                { icon: "🎧", label: "Suporte Direto" },
                { icon: "👥", label: "+ 15.000 Alunos" },
              ].map((item, i) => (
                <div key={i} className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm md:text-base font-bold text-primary">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Preço */}
            <p className="text-muted-foreground text-base md:text-xl mb-1">
              De <span className="line-through text-destructive font-bold">R$ 497,00</span> por apenas
            </p>
            <p className="text-3xl md:text-5xl font-black text-primary mb-1">
              12x de R$ 30,72
            </p>
            <p className="text-muted-foreground text-base md:text-lg mb-5">
              ou <span className="font-black text-foreground text-lg md:text-2xl">R$ 297,00</span> à vista
            </p>

            {/* CTA */}
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-lg md:text-xl py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-5"
            >
              🎯 QUERO COMEÇAR AGORA!
            </button>

            {/* Badges abaixo do CTA */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {[
                { icon: "🏆", label: "Certificado Incluso" },
                { icon: "♾️", label: "Acesso Vitalício" },
              ].map((item, i) => (
                <div key={i} className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm md:text-base font-bold text-primary">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Garantia */}
            <div className="max-w-md mx-auto bg-primary/5 border border-primary/20 rounded-xl p-4 mb-3">
              <p className="font-black text-foreground text-sm md:text-base mb-1">
                🛡️ Garantia Incondicional de 7 Dias
              </p>
              <p className="text-muted-foreground text-xs md:text-sm">
                Se você não gostar do curso por qualquer motivo, devolvo <strong className="text-foreground">100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
              </p>
            </div>

            <p className="text-primary font-bold text-sm md:text-base">
              👉 Dê o primeiro passo para novas oportunidades hoje
            </p>
          </div>
        </div>

        {/* Trust seals acima do segundo vídeo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto mb-4 md:mb-6 mt-5 md:mt-8">
          {[
            { icon: Headphones, label: "Suporte nas Aulas", sublabel: "Aprenda com orientação" },
            { icon: Shield, label: "Garantia 7 Dias", sublabel: "Risco zero para você" },
            { icon: Award, label: "Certificado", sublabel: "Reconhecido no mercado" },
            { icon: Users, label: "+15.000 Alunos", sublabel: "+20 anos ensinando" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 md:p-4 bg-primary/5 rounded-xl border border-primary/20">
              <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1.5" />
              <span className="text-foreground font-bold text-xs md:text-sm">{item.label}</span>
              <span className="text-muted-foreground text-[10px] md:text-xs">{item.sublabel}</span>
            </div>
          ))}
        </div>

        {/* Video principal (segundo) */}
        <div className="max-w-3xl mx-auto mb-4 md:mb-6">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-border">
            {!isPlaying ? (
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={heroVideoThumb}
                  alt="Prévia do curso de informática"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
        </div>
      </div>

      {/* Seção Suporte - fundo azul claro */}
      <div className="bg-primary/10 border-y border-primary/20 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-black text-foreground mb-3">
              Você <span className="text-primary">não está sozinho</span> nessa jornada
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-5 max-w-xl mx-auto">
              Durante o curso você tem suporte via WhatsApp para tirar todas as suas dúvidas.{" "}
              <strong className="text-foreground">Aprender é mais fácil quando você tem alguém do seu lado.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 bg-background border border-primary/30 px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary text-lg">👤</span>
                <span className="text-foreground font-bold text-sm">Suporte Humano</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-background border border-primary/30 px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary text-lg">⚡</span>
                <span className="text-foreground font-bold text-sm">Resposta Rápida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
