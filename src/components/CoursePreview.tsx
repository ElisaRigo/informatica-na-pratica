import { useState, useEffect, useRef } from "react";
import courseThumb from "@/assets/hero-video-thumb.jpg";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="py-8 md:py-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 relative overflow-hidden">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-lg">
              Aprenda comigo <span className="text-yellow-300">no seu ritmo</span>
            </h2>
          </div>

          {/* Container do Vídeo */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {!isVideoLoaded ? (
              // Thumbnail com botão de play
              shouldLoadVideo && (
                <div
                  className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                  onClick={handlePlayClick}
                >
                  <img
                    src={courseThumb}
                    alt="Vídeo apresentando o curso de informática por dentro"
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
                </div>
              )
            ) : (
              // YouTube iframe
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="960"
                  height="540"
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

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={() => (window as any).openCheckout?.()}
              className="min-w-[340px] md:min-w-[420px] h-20 md:h-24 text-xl md:text-2xl font-black rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-[0_8px_30px_rgba(250,204,21,0.5)] hover:shadow-[0_12px_40px_rgba(250,204,21,0.6)] hover:scale-105 transition-all duration-300 animate-pulse"
            >
              🚀 Quero começar meu curso agora!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
