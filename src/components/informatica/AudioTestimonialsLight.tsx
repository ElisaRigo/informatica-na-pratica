import { MessageCircle, Play, Pause, Volume2, Smartphone } from "lucide-react";
import { CertificateSectionLight } from "./CertificateSectionLight";
import { FacebookComment, facebookComments, avatarImages } from "./FacebookComments";
import { useState, useRef } from "react";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";

const audioTestimonials = [
  { name: "Antonio", description: "Depoimento sobre sua experiência com o curso", audioSrc: "/audio/antonio-1.ogg" },
  { name: "Antonio", description: "Continuação do depoimento", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Amanda", description: "Como o curso transformou sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Superou as dificuldades com tecnologia", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const whatsappScreenshots = [
  { image: whatsappTestimonial1, description: "Mãe de aluna elogiando o curso" },
  { image: whatsappTestimonial2, description: "Aluno Roberto agradecendo pela didática" },
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className={`bg-primary/5 border rounded-xl p-4 transition-all ${hasError ? 'border-destructive/30 opacity-50' : 'border-border hover:border-primary/30'}`}>
      <audio ref={audioRef} src={testimonial.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={() => { setIsPlaying(false); setProgress(0); }} onError={() => { setHasError(true); setIsPlaying(false); }} preload="auto" />
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} disabled={hasError} className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform shadow-md ${hasError ? 'bg-muted cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:scale-105'}`}>
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-foreground font-semibold text-sm">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-primary" />
          </div>
          <p className="text-muted-foreground text-xs mb-2">{hasError ? "Áudio não disponível" : testimonial.description}</p>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
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
      <div className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4 border border-border/60 rounded-full px-5 py-2 bg-muted/30">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {avatarImages.slice(0, 5).map((av, i) => (
                    <img key={i} src={av} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <span className="text-foreground text-sm font-bold ml-1">+15.000 alunos</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-lg">★</span>)}
                <span className="text-foreground text-sm font-semibold ml-1">4.9/5</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-2 leading-tight">
              Veja o que dizem os alunos que <span className="text-primary">saíram do zero</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
              Histórias reais de pessoas que <span className="text-foreground font-bold">não sabiam nem ligar o computador</span> — e hoje usam com total confiança
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="py-8 md:py-10 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* WhatsApp Screenshots */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Prints de Conversas</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
              {whatsappScreenshots.map((screenshot, index) => (
                <div key={index} className="bg-white rounded-xl p-1.5 shadow-md border border-border">
                  <div className="bg-muted rounded-t-lg pt-1.5 pb-0.5 px-3">
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-border rounded-full"></div>
                    </div>
                  </div>
                  <img src={screenshot.image} alt={screenshot.description} className="w-full h-auto rounded-b-md" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* 2 comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-4">
            {facebookComments.slice(0, 2).map((comment, index) => (
              <FacebookComment key={index} comment={comment} avatarSrc={avatarImages[index]} />
            ))}
          </div>

          {/* 2 audio players */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-6">
            {audioTestimonials.slice(0, 2).map((testimonial, index) => (
              <AudioPlayer key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Highlight phrase */}
          <div className="text-center my-6 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground leading-snug">
              Se essas pessoas conseguiram, <span className="text-success">você também consegue.</span>
              <br />
              <span className="text-muted-foreground font-medium text-lg md:text-xl">Mesmo começando do zero.</span>
            </p>
          </div>

          {/* Certificate Section */}
          <CertificateSectionLight />
        </div>
      </section>
    </>
  );
};
