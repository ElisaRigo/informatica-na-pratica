import { Play, Shield, Zap, Award } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import windowsIcon from "@/assets/windows-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

const Informatica = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  (window as any).openCheckout = () => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: 297.00,
        items: [{ item_id: 'curso-informatica', item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 297.00, currency: 'BRL', content_name: 'Curso Informática na Prática', content_ids: ['curso-informatica'], num_items: 1
      });
    }
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-4 border-b border-border">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <img src={logo} alt="Informática na Prática" className="h-14 md:h-16" />
          <p className="text-foreground text-sm md:text-base mt-2 text-center font-medium">
            Curso de <span className="text-primary font-bold">Informática Online</span> completo do zero ao <span className="font-bold">Profissional</span>
          </p>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Headline */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground text-center mb-8 leading-tight">
            Curso de <span className="text-primary">INFORMÁTICA</span> para <span className="text-primary">INICIANTE</span>
          </h1>

          {/* Video com ícones flutuantes */}
          <div className="relative max-w-2xl mx-auto mb-8">
            {/* Ícones flutuantes - lado esquerdo */}
            <img src={wordIcon} alt="Word" className="absolute -left-4 md:-left-12 top-[10%] w-10 h-10 md:w-14 md:h-14 drop-shadow-lg z-10 hidden sm:block" />
            <img src={excelIcon} alt="Excel" className="absolute -left-4 md:-left-12 top-[45%] w-10 h-10 md:w-14 md:h-14 drop-shadow-lg z-10 hidden sm:block" />
            <img src={powerpointIcon} alt="PowerPoint" className="absolute -left-4 md:-left-12 top-[75%] w-10 h-10 md:w-14 md:h-14 drop-shadow-lg z-10 hidden sm:block" />

            {/* Ícones flutuantes - lado direito */}
            <img src={windowsIcon} alt="Windows" className="absolute -right-4 md:-right-12 top-[10%] w-10 h-10 md:w-14 md:h-14 drop-shadow-lg z-10 hidden sm:block" />
            <img src={internetIcon} alt="Internet" className="absolute -right-4 md:-right-12 top-[45%] w-10 h-10 md:w-14 md:h-14 drop-shadow-lg z-10 hidden sm:block" />
            <img src={typingIcon} alt="Digitação" className="absolute -right-4 md:-right-12 top-[75%] w-10 h-10 md:w-14 md:h-14 drop-shadow-lg z-10 hidden sm:block" />

            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-border">
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/70 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
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

          {/* Texto abaixo do vídeo */}
          <p className="text-lg md:text-2xl text-foreground text-center mb-8 max-w-2xl mx-auto leading-relaxed">
            Do <span className="text-primary font-bold">zero ao profissional</span> – aulas <strong>simples e práticas</strong>{" "}
            pra você dominar <strong>Word, Excel</strong> e muito mais.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group relative inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-black text-lg md:text-xl px-10 md:px-14 py-4 md:py-5 rounded-full shadow-2xl shadow-success/30 hover:shadow-success/50 hover:scale-[1.02] transition-all duration-300"
            >
              📚 Quero começar agora
            </button>
          </div>

          {/* Preço */}
          <div className="text-center mb-6">
            <p className="text-base md:text-lg text-foreground">
              🔥 De{" "}
              <span className="line-through text-muted-foreground font-bold">R$ 497,00</span>{" "}
              por apenas{" "}
              <span className="text-foreground font-black text-2xl md:text-3xl">R$ 297,00</span>
            </p>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              💳 ou parcele em até 12x no cartão
            </p>
            <p className="text-sm md:text-base text-destructive font-semibold mt-2">
              🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-white shadow-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-white shadow-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-white shadow-sm">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Certificado incluso</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Informatica;
