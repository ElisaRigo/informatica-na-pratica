import { useState } from "react";
import { Play } from "lucide-react";
import heroVideoThumb from "@/assets/hero-video-cover.png";

export const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-2 md:py-4">
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
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Aprenda informática do <span className="text-primary font-black">"ZERO"</span>, <span className="text-primary font-black">sem medo!</span>
          </p>
        </div>
      </div>
    </section>
  );
};