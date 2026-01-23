import { MessageCircle, Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

const audioTestimonials = [
  {
    name: "Antonio",
    description: "Depoimento sobre sua experiência com o curso",
    audioSrc: "/audio/antonio-1.ogg",
  },
  {
    name: "Antonio",
    description: "Continuação do depoimento",
    audioSrc: "/audio/antonio-2.ogg",
  },
];

const AudioPlayer = ({ testimonial }: { testimonial: typeof audioTestimonials[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all">
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>

        {/* Info and Progress */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold text-sm">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-primary" />
          </div>
          <p className="text-slate-400 text-xs mb-2">{testimonial.description}</p>
          
          {/* Progress Bar */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AudioTestimonialsV2 = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Direto do WhatsApp</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
            Ouça quem já transformou sua vida
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Áudios reais de alunos que começaram do zero e hoje dominam o computador
          </p>
        </div>

        {/* Audio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {audioTestimonials.map((testimonial, index) => (
            <AudioPlayer key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Footer text */}
        <p className="text-center text-slate-500 text-sm mt-8">
          💬 Depoimentos espontâneos recebidos no WhatsApp
        </p>
      </div>
    </section>
  );
};
