import { useState, useEffect, useRef } from "react";
import heroVideoThumb from "@/assets/aprenda-comigo-thumb.jpg";
import { Play, CheckCircle } from "lucide-react";

export const EasyToLearn = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
      },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="py-10 md:py-14 bg-panel border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-sm md:text-base text-primary font-bold uppercase tracking-wide mb-2">
              Ainda tem medo de não conseguir aprender?
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              Veja como é <span className="text-primary">fácil aprender!</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista essa aula e descubra que você é capaz de dominar a informática de forma simples e prática.
            </p>
          </div>

          {/* Container do Vídeo */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {!isVideoLoaded ? (
              shouldLoadVideo && (
                <div
                  className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl border-2 border-primary/20"
                  onClick={handlePlayClick}
                >
                  <img
                    src={heroVideoThumb}
                    alt="Aula demonstrativa - Veja como é fácil aprender"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="540"
                  />

                  {/* Botão de Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>

                  {/* Selo */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="bg-gradient-to-r from-accent to-primary text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-xs md:text-sm shadow-lg border-2 border-white/30">
                      ▶ Aula Demonstrativa
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
                <iframe
                  width="960"
                  height="540"
                  src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                  title="Vídeo institucional"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Benefícios abaixo do vídeo */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 md:mt-8">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Linguagem simples</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Passo a passo</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">Sem complicação</span>
            </div>
          </div>

          {/* Seção de Vantagens + Preço */}
          <div className="max-w-2xl mx-auto mt-10">
            {/* Título da oferta */}
            <div className="text-center mb-6">
              <p className="text-primary font-bold uppercase tracking-wide text-sm mb-2">
                ✨ Oferta Especial por Tempo Limitado
              </p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground">
                Tudo isso por um valor <span className="text-primary">imperdível!</span>
              </h3>
            </div>

            {/* Lista de Vantagens */}
            <div className="bg-panel border border-border rounded-2xl p-6 md:p-8 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Curso Completo de Informática</p>
                    <p className="text-sm text-muted-foreground">Word, Excel, PowerPoint, Internet e mais</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground line-through">R$ 297</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Acesso Vitalício</p>
                    <p className="text-sm text-muted-foreground">Estude quando e onde quiser, para sempre</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground line-through">R$ 97</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Certificado de Conclusão</p>
                    <p className="text-sm text-muted-foreground">Reconhecido e válido para o mercado</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground line-through">R$ 47</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Suporte Direto com a Professora</p>
                    <p className="text-sm text-muted-foreground">Tire suas dúvidas pelo WhatsApp</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground line-through">R$ 97</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Garantia de 7 Dias</p>
                    <p className="text-sm text-muted-foreground">Se não gostar, devolvemos seu dinheiro</p>
                  </div>
                  <span className="ml-auto text-sm text-primary font-bold">GRÁTIS</span>
                </div>

                {/* Linha divisória */}
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-foreground">Valor Total:</p>
                    <span className="text-lg text-muted-foreground line-through">R$ 538,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Preço Final */}
            <div className="bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success/30 rounded-2xl p-6 md:p-8 text-center shadow-xl">
              <p className="text-sm md:text-base font-semibold text-foreground mb-2">
                🎉 Apenas HOJE você leva tudo isso por:
              </p>
              <div className="mb-3">
                <span className="text-lg text-muted-foreground line-through mr-2">R$ 538,00</span>
                <span className="text-4xl md:text-5xl font-black text-success">R$ 297,00</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                💳 ou parcele em até <strong>12x de R$ 30,22</strong> no cartão
              </p>
              <p className="text-sm md:text-base font-semibold text-accent mb-5">
                🔥 Economize mais de R$ 200 aproveitando agora!
              </p>
              <button
                onClick={() => document.getElementById('price-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-14 md:h-16 text-lg md:text-2xl font-bold rounded-full bg-success text-white shadow-lg hover:shadow-xl hover:bg-success/90 hover:scale-[1.02] transition-all duration-300"
              >
                Quero Aprender Informática sem Medo
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                🔒 Pagamento 100% seguro • Acesso imediato após a compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
