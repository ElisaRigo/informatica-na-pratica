import { Smartphone, Play, Pause, Volume2 } from "lucide-react";
import { CertificateSectionLight } from "./CertificateSectionLight";
import { FacebookComment, facebookComments, avatarImages } from "./FacebookComments";
import { useState, useRef } from "react";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";

const audioTestimonials = [
  { name: "Antonio", description: "Experiência com o curso", audioSrc: "/audio/antonio-1.ogg" },
  { name: "Antonio", description: "Continuação", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Amanda", description: "Transformou sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Superou dificuldades", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const whatsappScreenshots = [
  { image: whatsappTestimonial1, description: "Mãe de aluna elogiando o curso" },
  { image: whatsappTestimonial2, description: "Aluno Roberto agradecendo" },
];

const AudioPlayer = ({ testimonial }: { testimonial: typeof audioTestimonials[0] }) => {
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
    <div className={`bg-primary/5 border rounded-xl p-3 transition-all ${hasError ? 'border-destructive/30 opacity-50' : 'border-border hover:border-primary/30'}`}>
      <audio ref={audioRef} src={testimonial.audioSrc} onTimeUpdate={() => { if (audioRef.current) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0); }} onEnded={() => { setIsPlaying(false); setProgress(0); }} onError={() => { setHasError(true); setIsPlaying(false); }} preload="auto" />
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} disabled={hasError} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${hasError ? 'bg-muted cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:scale-105'} transition-transform`}>
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-foreground font-semibold text-xs">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-primary" />
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AudioTestimonialsLight = () => {
  return (
    <>
      {/* Header */}
      <div className="bg-white py-4 md:py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-3 border border-border/60 rounded-full px-4 py-1.5 bg-muted/30">
            <div className="flex -space-x-2">
              {avatarImages.slice(0, 5).map((av, i) => (
                <img key={i} src={av} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="text-foreground text-xs font-bold">+15.000 alunos</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-foreground leading-tight">
            Veja o que dizem os alunos que <span className="text-primary">saíram do zero</span>
          </h2>
        </div>
      </div>

      {/* Content */}
      <section className="py-6 md:py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          {/* WhatsApp Screenshots */}
          <div className="max-w-lg mx-auto mb-4">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <Smartphone className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Prints de Conversas</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {whatsappScreenshots.map((s, i) => (
                <div key={i} className="bg-white rounded-lg p-1 shadow-sm border border-border">
                  <img src={s.image} alt={s.description} className="w-full h-auto rounded" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* 2 comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl mx-auto mb-3">
            {facebookComments.slice(0, 2).map((comment, index) => (
              <FacebookComment key={index} comment={comment} avatarSrc={avatarImages[index]} />
            ))}
          </div>

          {/* 2 audios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl mx-auto mb-4">
            {audioTestimonials.slice(0, 2).map((t, i) => (
              <AudioPlayer key={i} testimonial={t} />
            ))}
          </div>

          {/* Highlight */}
          <div className="text-center my-4">
            <p className="text-lg md:text-xl font-black text-foreground">
              Se essas pessoas conseguiram, <span className="text-success">você também consegue.</span>
              <br />
              <span className="text-muted-foreground font-medium text-sm">Mesmo começando do zero.</span>
            </p>
          </div>

          <CertificateSectionLight />
        </div>
      </section>
    </>
  );
};
