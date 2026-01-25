import { useState } from "react";
import { Shield, Award, Zap, Play, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideoThumb from "@/assets/hero-video-cover.png";

export const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

    return <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-2 md:py-4">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Texto acima do vídeo */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 md:mb-5 leading-tight">
            Chega de <span className="text-primary font-black">"perder oportunidades"</span> por não saber usar o <span className="text-primary font-black">computador</span>
          </h1>
          
          {/* Vídeo do YouTube em destaque */}
          <div className="relative max-w-4xl mx-auto mb-3 md:mb-4">
            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden relative border border-primary/20">
              {!isVideoLoaded ? (
                <div 
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handlePlayClick}
                >
                  <img 
                    src={heroVideoThumb} 
                    alt="Prévia do curso de informática"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Botão de play destacado */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-7 h-7 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                  {/* Selo Conheça o Curso - Canto inferior direito */}
                  <div className="absolute bottom-3 right-3 z-20 animate-pulse">
                    <div className="bg-gradient-to-r from-accent to-primary text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full font-black text-xs md:text-sm shadow-lg border-2 border-white/30">🎓 Conheça o Curso!</div>
                  </div>
                </div>
              ) : (
                <div style={{position: 'relative', paddingTop: '56.25%'}}>
                  <iframe 
                    src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1"
                    title="Veja como é fácil aprender"
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>

          {/* Texto abaixo do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-5 max-w-3xl mx-auto leading-tight">
            Aprenda informática do <span className="text-primary font-black">"ZERO"</span>, <span className="text-primary font-black">sem medo!</span>
          </p>

          {/* Seção de Preço - Sem Container */}
          <div className="max-w-xl mx-auto mb-4">
            {/* Card de destaque */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 mb-3 inline-block">
              <p className="text-sm md:text-base font-semibold text-primary">
                💡 Curso pensado para quem nunca teve facilidade com computador
              </p>
            </div>

            {/* Destaque Acesso Vitalício */}
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 px-4 py-2.5 rounded-full animate-pulse">
                <span className="text-xl">♾️</span>
                <span className="font-black text-sm md:text-base text-primary">ACESSO VITALÍCIO</span>
                <span className="text-xs md:text-sm text-foreground/80">— Seu para sempre!</span>
              </div>
            </div>

            {/* Benefícios */}
            <div className="flex flex-wrap gap-2 justify-center items-center mb-3">
              <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-semibold text-xs md:text-sm text-foreground">Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-semibold text-xs md:text-sm text-foreground">Garantia 7 dias</span>
              </div>
              <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-semibold text-xs md:text-sm text-foreground">Certificado incluso</span>
              </div>
              <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
                <Headphones className="w-4 h-4 text-primary" />
                <span className="font-semibold text-xs md:text-sm text-foreground">Suporte ao aluno</span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center gap-2">
              <a
                href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Tirar dúvidas com a professora
              </a>
              <p className="text-sm text-muted-foreground">
                👉 Sem compromisso. Eu te explico com calma no WhatsApp 😊
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>;
};