import { MessageCircle, Play, Pause, Volume2, Smartphone, ThumbsUp, Heart } from "lucide-react";
import { CertificateSectionLight } from "./CertificateSectionLight";
import { useState, useRef } from "react";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import avatar8 from "@/assets/avatar-8.jpg";

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

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

const facebookComments = [
  { name: "Luciana M.", text: "Professora maravilhosa! Aprendi em 1 semana o que não consegui em meses 🙌", time: "2 h", likes: 14, hasHeart: true },
  { name: "Tereza S.", text: "Tô conseguindo usar o computador sozinha, muito obrigada! 😍", time: "5 h", likes: 23, hasHeart: false },
  { name: "Carlos A.", text: "Melhor investimento que fiz! Já indiquei pra toda família", time: "1 d", likes: 8, hasHeart: false },
  { name: "Juliana R.", text: "Ganhei uma promoção no trabalho por causa do curso! 🎉", time: "3 d", likes: 31, hasHeart: true },
  { name: "Marcos V.", text: "Achei que era difícil mas a didática é perfeita, parabéns!", time: "1 sem", likes: 12, hasHeart: false },
  { name: "Patrícia S.", text: "Minha mãe de 62 anos aprendeu! Recomendo demais 👏", time: "1 sem", likes: 19, hasHeart: true },
  { name: "Roberto L.", text: "Finalmente consigo fazer planilhas no trabalho. Obrigado! 💪", time: "2 sem", likes: 7, hasHeart: false },
  { name: "Maria G.", text: "Com 68 anos aprendi a mexer no computador. Deus abençoe! 🙏", time: "3 sem", likes: 42, hasHeart: true },
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

      {/* Conteúdo com fundo claro */}
      <section className="py-10 md:py-14 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* WhatsApp Screenshots */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Prints de Conversas</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
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

            {/* Audio Players */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Áudios de Alunos</h3>
              </div>
              <div className="space-y-3">
                {audioTestimonials.map((testimonial, index) => (
                  <AudioPlayer key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Highlight phrase */}
          <div className="text-center my-8 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground leading-snug">
              Se essas pessoas conseguiram, <span className="text-success">você também consegue.</span>
              <br />
              <span className="text-muted-foreground font-medium text-lg md:text-xl">Mesmo começando do zero.</span>
          </p>
          </div>

          {/* Certificate Section */}
          <CertificateSectionLight />

          {/* Facebook-style comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {facebookComments.map((comment, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-border/50">
                <div className="flex gap-2">
                  <img src={avatarImages[index % avatarImages.length]} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" />
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted rounded-2xl px-3 py-2">
                      <p className="text-foreground text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1 px-2">
                      <span className="text-[11px] text-muted-foreground">{comment.time}</span>
                      <span className="text-[11px] text-muted-foreground font-medium cursor-pointer hover:underline">Curtir</span>
                      <span className="text-[11px] text-muted-foreground font-medium cursor-pointer hover:underline">Responder</span>
                      {comment.likes > 0 && (
                        <span className="ml-auto text-[11px] text-muted-foreground flex items-center gap-0.5">
                          <span className="flex items-center -space-x-1">
                            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center z-10"><ThumbsUp className="w-2.5 h-2.5 text-white fill-white" /></span>
                            {comment.hasHeart && <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center z-0"><Heart className="w-2.5 h-2.5 text-white fill-white" /></span>}
                          </span>
                          {comment.likes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10 space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-foreground">Eu também quero aprender!</h3>
            <button onClick={() => (window as any).openCheckout?.()} className="inline-flex items-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-lg md:text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-[0.98]">
              Quero Aprender Informática sem Medo →
            </button>
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">🔒 Pagamento seguro · Garantia de 7 dias · Acesso imediato</p>
          </div>
        </div>
      </section>
    </>
  );
};
