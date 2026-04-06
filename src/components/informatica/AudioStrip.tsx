import { Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

const allAudioTestimonials = [
  { name: "Antonio", description: "Experiência com o curso", audioSrc: "/audio/antonio-1.ogg" },
  { name: "Antonio", description: "Continuação", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Amanda", description: "Transformou sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Superou dificuldades", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const AudioPlayerInline = ({ testimonial }: { testimonial: typeof allAudioTestimonials[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => setHasError(true)); }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`bg-slate-800 border rounded-xl p-3 transition-all ${hasError ? 'border-destructive/30 opacity-50' : 'border-slate-700 hover:border-primary/30'}`}>
      <audio ref={audioRef} src={testimonial.audioSrc} onTimeUpdate={() => { if (audioRef.current) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0); }} onEnded={() => { setIsPlaying(false); setProgress(0); }} onError={() => { setHasError(true); setIsPlaying(false); }} preload="auto" />
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} disabled={hasError} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${hasError ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:scale-105'} transition-transform`}>
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-white font-semibold text-xs">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-primary" />
          </div>
          <p className="text-slate-400 text-[11px] mb-1">{hasError ? "Áudio não disponível" : testimonial.description}</p>
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface AudioStripProps {
  name: "Amanda" | "Vanderlei" | "Bruna" | "Antonio";
}

export const AudioStrip = ({ name }: AudioStripProps) => {
  const testimonial = allAudioTestimonials.find(t => t.name === name);
  if (!testimonial) return null;

  return (
    <div className="bg-slate-900 py-3">
      <div className="container mx-auto px-4 max-w-md">
        <AudioPlayerInline testimonial={testimonial} />
      </div>
    </div>
  );
};
