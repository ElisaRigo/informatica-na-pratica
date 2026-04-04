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
            Aprenda informática de forma{" "}
            <span className="text-primary">rápida</span>,{" "}
            <span className="text-primary">prática</span> e{" "}
            <span className="text-primary">sem complicação</span>
          </h1>
        </div>

        {/* Trust seals - light theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto mb-5 md:mb-8">
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
