import { MessageCircle, Play, Pause, Volume2, Smartphone, ThumbsUp, Heart } from "lucide-react";
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

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

const facebookComments = [
  { name: "Luciana M.", text: "Professora maravilhosa! Aprendi em 1 semana o que não consegui em meses 🙌", time: "2 h", likes: 14, hasHeart: true },
  { name: "Tereza S.", text: "Tô conseguindo usar o computador sozinha, muito obrigada! 😍", time: "5 h", likes: 23, hasHeart: false },
  { name: "Carlos A.", text: "Melhor investimento que fiz! Já indiquei pra toda família", time: "1 d", likes: 8, hasHeart: false },
  { name: "Juliana R.", text: "Ganhei uma promoção no trabalho por causa do curso! 🎉", time: "3 d", likes: 31, hasHeart: true },
  { name: "Marcos V.", text: "Achei que era difícil mas a didática é perfeita, parabéns!", time: "1 sem", likes: 12, hasHeart: false },
  { name: "Patrícia S.", text: "Minha mãe de 62 anos aprendeu! Recomendo demais 👏", time: "1 sem", likes: 19, hasHeart: true },
  { name: "Roberto L.", text: "Finalmente consigo fazer planilhas no trabalho. Obrigado! 💪", time: "2 sem", likes: 7, hasHeart: false },
  { name: "Maria G.", text: "Com 68 anos aprendi a mexer no celular e no computador. Deus abençoe! 🙏", time: "3 sem", likes: 42, hasHeart: true },
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
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
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
            Veja como alunos que não sabiam nada <span className="text-success">hoje dominam o computador</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Eles começaram do zero e hoje usam o computador com <span className="text-success font-bold">confiança no dia a dia</span>
          </p>
        </div>

        {/* Two Column Layout: Screenshots first on mobile, Audios + Screenshots side by side on desktop */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* WhatsApp Screenshots + Mini Comments - First on mobile */}
          <div className="order-1 lg:order-2">
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

          {/* Audio Players - Second on mobile (order-2 on mobile, order-1 on lg) */}
          <div className="order-2 lg:order-1">
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
        </div>

        {/* Highlight phrase */}
        <div className="text-center my-8 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-snug">
            Se essas pessoas conseguiram, <span className="text-success">você também consegue.</span>
            <br />
            <span className="text-slate-300 font-medium text-lg md:text-xl">Mesmo começando do zero.</span>
          </p>
        </div>

        {/* Facebook-style comments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
          {facebookComments.map((comment, index) => (
             <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex gap-2">
                <img src={avatarImages[index % avatarImages.length]} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" />
                <div className="flex-1 min-w-0">
                  <div className="bg-slate-100 rounded-2xl px-3 py-2">
                    <p className="text-gray-900 text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
                    <p className="text-gray-700 text-xs leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-2">
                    <span className="text-[11px] text-gray-400">{comment.time}</span>
                    <span className="text-[11px] text-gray-500 font-medium cursor-pointer hover:underline">Curtir</span>
                    <span className="text-[11px] text-gray-500 font-medium cursor-pointer hover:underline">Responder</span>
                    {comment.likes > 0 && (
                      <span className="ml-auto text-[11px] text-gray-400 flex items-center gap-0.5">
                        <span className="flex items-center -space-x-1">
                          <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center z-10">
                            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                          </span>
                          {comment.hasHeart && (
                            <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center z-0">
                              <Heart className="w-2.5 h-2.5 text-white fill-white" />
                            </span>
                          )}
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

        {/* Footer text */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <span className="text-2xl">💬</span>
            <span className="text-slate-300 text-sm md:text-base font-medium">
              Depoimentos <span className="text-success font-bold">100% reais</span> recebidos dos alunos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
