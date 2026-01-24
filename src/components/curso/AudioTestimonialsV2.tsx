import { MessageCircle, Play, Pause, Volume2, Smartphone } from "lucide-react";
import { useState, useRef } from "react";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";

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
  {
    image: whatsappTestimonial2,
    description: "Aluno Roberto agradecendo pela didática das aulas de planilha",
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-success/20 border-2 border-success/50 rounded-full px-5 py-2.5 mb-5 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <MessageCircle className="w-5 h-5 text-success animate-pulse" />
            <span className="text-success text-sm md:text-base font-bold uppercase tracking-wide">Direto do WhatsApp</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Ouça e Veja <span className="text-success">Quem Já Transformou Sua Vida</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Alunos que começaram do zero compartilham suas <span className="text-success font-bold">histórias reais</span> de superação
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
            <div className="grid grid-cols-2 gap-3">
              {whatsappScreenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800 rounded-xl p-1.5 shadow-xl"
                >
                  {/* Phone Frame */}
                  <div className="bg-slate-700 rounded-t-lg pt-1.5 pb-0.5 px-3">
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                  <img 
                    src={screenshot.image} 
                    alt={screenshot.description}
                    className="w-full h-auto rounded-b-md"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <span className="text-2xl">💬</span>
            <span className="text-slate-300 text-sm md:text-base font-medium">
              Depoimentos <span className="text-success font-bold">100% reais</span> recebidos no WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
