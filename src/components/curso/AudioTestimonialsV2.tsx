import { MessageCircle, Play, Pause, Volume2, Smartphone } from "lucide-react";
import { useState, useRef } from "react";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";

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
  {
    name: "Amanda",
    description: "Como o curso transformou sua rotina",
    audioSrc: "/audio/amanda.mp4",
  },
  {
    name: "Vanderlei",
    description: "Superou as dificuldades com tecnologia",
    audioSrc: "/audio/vanderlei.ogg",
  },
  {
    name: "Bruna",
    description: "Gratidão pelo aprendizado",
    audioSrc: "/audio/bruna.aac",
  },
];

const whatsappScreenshots = [
  {
    image: whatsappTestimonial1,
    description: "Mãe de aluna elogiando o curso e voltando para comprar outro",
  },
];

const AudioPlayer = ({ testimonial }: { testimonial: typeof audioTestimonials[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setHasError(true));
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

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 transition-all ${hasError ? 'border-red-500/30 opacity-50' : 'border-white/10 hover:border-primary/30'}`}>
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        preload="auto"
      />
      
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={hasError}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform shadow-lg ${hasError ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:scale-105'}`}
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
          <p className="text-slate-400 text-xs mb-2">
            {hasError ? "Áudio não disponível" : testimonial.description}
          </p>
          
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
            Ouça e veja quem já transformou sua vida
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Depoimentos reais de alunos que começaram do zero e hoje dominam o computador
          </p>
        </div>

        {/* Two Column Layout: Audios + Screenshots */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Audio Players */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-white">Áudios de Alunos</h3>
            </div>
            <div className="space-y-3">
              {audioTestimonials.map((testimonial, index) => (
                <AudioPlayer key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Right Column: WhatsApp Screenshots */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-white">Prints de Conversas</h3>
            </div>
            <div className="grid gap-4">
              {whatsappScreenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800 rounded-2xl p-2 shadow-xl max-w-[280px] mx-auto lg:mx-0"
                >
                  {/* Phone Frame */}
                  <div className="bg-slate-700 rounded-t-xl pt-2 pb-1 px-4">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-1 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                  <img 
                    src={screenshot.image} 
                    alt={screenshot.description}
                    className="w-full h-auto rounded-b-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-slate-500 text-sm mt-8">
          💬 Depoimentos espontâneos recebidos no WhatsApp
        </p>
      </div>
    </section>
  );
};
