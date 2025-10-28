import { useState } from "react";
import { Play } from "lucide-react";

export const VideoLesson = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Texto chamativo */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground">
              Veja na Prática Como É Fácil Aprender Comigo!
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Quero que você tenha certeza que meu curso é para você. Assista a aula gratuita e veja como ensino de forma simples e prática — você vai se surpreender!
            </p>
          </div>

          {/* Video Player */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-4 border-primary/20">
            {!isPlaying ? (
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 aspect-video flex items-center justify-center">
                {/* Thumbnail placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                
                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 group"
                  aria-label="Assista a aula gratuita"
                >
                  <div className="relative">
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 bg-primary/30 rounded-2xl animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] scale-110"></div>
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] scale-125 animation-delay-150"></div>
                    
                    {/* Button */}
                    <div className="relative bg-primary/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-[0_0_40px_rgba(var(--primary),0.5)]">
                      <Play className="w-12 h-12 md:w-16 md:h-16 text-white fill-white" />
                    </div>
                  </div>
                  
                  {/* Text below button */}
                  <div className="mt-6 text-center">
                    <span className="text-xl md:text-2xl font-black text-foreground bg-background/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                      ▶️ Assista a Aula Gratuita
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src="https://iframe.mediadelivery.net/embed/492757/38d0f06a-a739-470f-9211-8e918933578a?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: "100%",
                  }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen={true}
                  title="Aula gratuita - Como salvar arquivos no Word"
                ></iframe>
              </div>
            )}
          </div>

          {/* Call to action após o vídeo */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-lg md:text-xl text-muted-foreground">
              <strong className="text-foreground">Nesta aula:</strong> Você vai aprender como salvar arquivos no Word de forma profissional — uma das habilidades essenciais que ensino no curso completo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
