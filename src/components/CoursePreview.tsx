import { useState, useEffect, useRef } from "react";
import courseThumb from "@/assets/hero-video-thumb.jpg";
import { Play } from "lucide-react";

export const CoursePreview = () => {
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
    <section className="py-6 md:py-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 max-w-6xl mx-auto">
          {/* Texto do Banner */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-2">
              Aprenda comigo <span className="text-primary">no seu ritmo</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto lg:mx-0">
              Assista uma prévia do curso e veja como as aulas são simples e didáticas
            </p>
          </div>

          {/* Vídeo Compacto */}
          <div ref={containerRef} className="flex-1 w-full max-w-md lg:max-w-lg">
            {!isVideoLoaded ? (
              shouldLoadVideo && (
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow"
                  onClick={handlePlayClick}
                >
                  <img
                    src={courseThumb}
                    alt="Vídeo apresentando o curso de informática por dentro"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/80 shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary ml-0.5" />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="640"
                  height="360"
                  src="https://www.youtube.com/embed/6l0dJZUMl6o?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                  title="Aprenda comigo no seu ritmo"
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
        </div>
      </div>
    </section>
  );
};
