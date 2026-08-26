import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Star,
  Award,
  PlayCircle,
  Play,
  Pause,
  Volume2,

  Monitor,
  Mail,
  FileText,
  Globe,
  Presentation,
  Keyboard,
  GraduationCap,
  Infinity as InfinityIcon,
  ChevronDown,
  ArrowRight,
  Heart,
  Headphones,
  X,
  Gift,
  Clock,
  ThumbsUp,

} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import logo from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import certificado from "@/assets/certificado-exemplo.png";
import homeVideoThumbAsset from "@/assets/aprender-hero-cover-v3.jpg.asset.json";
const homeVideoThumb = homeVideoThumbAsset.url;
import aulaGratisThumbAsset from "@/assets/capa-aula-demonstrativa.jpg.asset.json";
const aulaGratisThumb = aulaGratisThumbAsset.url;
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import fbAvatar1 from "@/assets/avatar-1.jpg";
import fbAvatar2 from "@/assets/avatar-2.jpg";
import fbAvatar3 from "@/assets/avatar-3.jpg";
import fbAvatar4 from "@/assets/avatar-4.jpg";
import fbAvatar5 from "@/assets/avatar-5.jpg";
import fbAvatar6 from "@/assets/avatar-6.jpg";
import fbAvatar7 from "@/assets/avatar-7.jpg";
import fbAvatar8 from "@/assets/avatar-8.jpg";

import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

import { openHotmartCheckout } from "@/lib/checkoutTracking";

const openCheckout = () => openHotmartCheckout();

const WHATS =
  "https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica";

/* ───────────────────────── CTA ───────────────────────── */
const CTA = ({
  children = "Quero aprender do meu jeito",
  hint = "Acesso imediato • Garantia de 7 dias",
}: {
  children?: React.ReactNode;
  hint?: string | null;
}) => (
  <div className="w-full">
    <button
      onClick={openCheckout}
      className="group w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-95 active:scale-[.99] text-white font-black rounded-xl px-5 py-4 md:px-8 md:py-5 text-lg md:text-2xl leading-tight shadow-[0_10px_30px_-8px_rgba(37,211,102,.6)] transition-all"
    >
      {children}
    </button>
    {hint && (
      <p className="mt-2 text-center text-xs md:text-sm text-stone-500">{hint}</p>
    )}
  </div>
);

/* ───────────────────────── Video block ───────────────────────── */
const VideoBox = ({
  id,
  thumb,
  label,
}: {
  id: string;
  thumb: string;
  label?: string;
}) => {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative rounded-2xl overflow-hidden border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(28,25,23,1)] bg-stone-900">
      {!play ? (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="relative block w-full aspect-video group"
          aria-label="Assistir vídeo"
        >
          <img src={thumb} alt="Aula do curso de informática" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <PlayCircle className="w-11 h-11 md:w-14 md:h-14 text-stone-900" strokeWidth={1.5} />
            </span>
          </span>
          {label && (
            <span className="absolute bottom-2 left-2 bg-amber-400 text-stone-900 text-[11px] md:text-sm font-black px-2.5 py-1 rounded-md">
              {label}
            </span>
          )}
        </button>
      ) : (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&controls=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1`}
            title="Aula do curso"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── Header ───────────────────────── */
const TopBar = () => (
  <header className="bg-stone-900 text-white">
    <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3">
      <img src={logo} alt="Informática na Prática" className="h-9 md:h-11 bg-white rounded-lg p-1" />
      <p className="text-sm md:text-lg font-bold leading-tight">
        Informática na Prática <span className="text-amber-400">• aulas com calma, do zero</span>
      </p>
    </div>
  </header>
);

/* ───────────────────────── Hero ───────────────────────── */
const Hero = () => (
  <section className="bg-[#FBF6EF]">
    <div className="container mx-auto px-4 pt-6 pb-8 md:pt-10 md:pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-amber-400 text-stone-900 font-black text-xs md:text-base px-3 py-1.5 rounded-full">
          <Heart className="w-4 h-4" /> PARA QUEM ACHA QUE "NÃO LEVA JEITO"
        </span>

        <h1 className="mt-4 text-[30px] leading-[1.12] md:text-[54px] md:leading-[1.06] font-black text-stone-900 tracking-tight">
          Você não é ruim de computador.
          <br />
          <span className="bg-amber-300 px-1.5 box-decoration-clone">
            Você só nunca teve alguém com paciência pra te ensinar.
          </span>
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-stone-700 leading-snug">
          Aulas curtas, do zero, comigo explicando devagar e repetindo quantas vezes você precisar.
        </p>

        <div className="mt-5 md:mt-7">
          <VideoBox id="0kFjFZX5c9I" thumb={homeVideoThumb} label="Assista 1 minuto" />
        </div>

        <div className="mt-6">
          <CTA>Quero aprender computador do zero</CTA>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm font-semibold text-stone-600">
          <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#25D366]" /> Compra segura</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#25D366]" /> 7 dias de garantia</span>
          <span className="flex items-center gap-1.5"><InfinityIcon className="w-4 h-4 text-[#25D366]" /> Acesso vitalício</span>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Identificação ───────────────────────── */
const pains = [
  "Fico com medo de clicar e estragar alguma coisa.",
  "Preciso pedir ajuda pro meu filho ou neto toda hora.",
  "Perdi vaga de emprego porque pediam Word e Excel.",
  "Já tentei aprender no YouTube, mas me perdi no meio.",
  "Tenho vergonha de perguntar como se faz algo simples.",
];

const Identificacao = () => (
  <section className="bg-white border-y-4 border-stone-900">
    <div className="container mx-auto px-4 py-8 md:py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-stone-900 text-center leading-tight">
          Você se identifica com alguma <span className="underline decoration-amber-400 decoration-8 underline-offset-2">destas situações?</span>
        </h2>
        <ul className="mt-6 space-y-3">
          {pains.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 bg-[#FBF6EF] border-2 border-stone-900 rounded-xl p-3.5 md:p-4"
            >
              <X className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <span className="text-base md:text-xl font-semibold text-stone-800 leading-snug">{p}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-lg md:text-2xl font-bold text-stone-900">
          Se você marcou 1 ou mais, este curso foi feito exatamente pra você.
        </p>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Método ───────────────────────── */
const steps = [
  { n: "1", t: "Você assiste uma aula curta", d: "De 5 a 12 minutos, sem pressa e sem palavra difícil." },
  { n: "2", t: "Você faz junto no seu computador", d: "Eu mostro a tela e você repete o mesmo passo." },
  { n: "3", t: "Você repete quantas vezes quiser", d: "Pode voltar a aula mil vezes. Ninguém vai te apressar." },
  { n: "4", t: "Você usa na vida real", d: "Currículo, planilha, e-mail, pesquisa, foto, impressão." },
];

const Metodo = () => (
  <section className="bg-stone-900 text-white">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-center leading-tight">
          O método é simples porque <span className="text-amber-400">você é adulto, não é criança</span>
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4 bg-stone-800 rounded-2xl p-4 md:p-5 border border-stone-700">
              <span className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-amber-400 text-stone-900 font-black text-xl md:text-2xl flex items-center justify-center">
                {s.n}
              </span>
              <div>
                <p className="font-black text-lg md:text-xl leading-tight">{s.t}</p>
                <p className="text-stone-300 text-sm md:text-lg mt-1 leading-snug">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Aula real ───────────────────────── */
const AulaReal = () => (
  <section className="bg-[#FBF6EF]">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-stone-900 text-amber-400 font-black text-xs md:text-base px-3 py-1.5 rounded-full">
          <PlayCircle className="w-4 h-4" /> AULA REAL DO CURSO
        </span>
        <h2 className="mt-3 text-2xl md:text-4xl font-black text-stone-900 leading-tight">
          Antes de decidir, assista uma aula de verdade
        </h2>
        <p className="mt-2 text-base md:text-xl text-stone-700">
          Repare no ritmo: devagar, explicando cada clique. É assim o curso inteiro.
        </p>
        <div className="mt-5">
          <VideoBox id="_0OPLnEiMHk" thumb={aulaGratisThumb} label="Aula liberada" />
        </div>
        <div className="mt-6">
          <CTA>Gostei da aula, quero o curso completo</CTA>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── O que você vai saber fazer ───────────────────────── */
const skills = [
  { icon: windowsIcon, t: "Windows", d: "Ligar, mexer no mouse, salvar e achar seus arquivos." },
  { icon: wordIcon, t: "Word", d: "Escrever currículo, carta e documentos bonitos." },
  { icon: excelIcon, t: "Excel", d: "Montar planilha de gastos e fazer contas sozinho." },
  { icon: powerpointIcon, t: "PowerPoint", d: "Fazer apresentação para trabalho ou igreja." },
  { icon: internetIcon, t: "Internet e e-mail", d: "Pesquisar, baixar, imprimir e enviar anexos." },
  { icon: typingIcon, t: "Digitação", d: "Digitar mais rápido, sem procurar letra por letra." },
];

const Habilidades = () => (
  <section className="bg-white border-y-4 border-stone-900">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-stone-900 text-center leading-tight">
          Em poucas semanas você vai fazer isso <span className="bg-amber-300 px-1">sem pedir ajuda</span>
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.t} className="bg-[#FBF6EF] border-2 border-stone-900 rounded-2xl p-4 md:p-5 shadow-[4px_4px_0_0_rgba(28,25,23,1)]">
              <img src={s.icon} alt={s.t} className="w-11 h-11 md:w-12 md:h-12 object-contain" loading="lazy" />
              <p className="mt-3 font-black text-lg md:text-xl text-stone-900">{s.t}</p>
              <p className="text-stone-700 text-sm md:text-lg leading-snug mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Professora ───────────────────────── */
const Professora = () => (
  <section className="bg-[#FBF6EF]">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-[280px_1fr] items-center">
        <img
          src={elisa}
          alt="Professora Elisa, do curso Informática na Prática"
          className="w-full max-w-[320px] h-auto mx-auto md:w-full object-cover rounded-2xl border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(251,191,36,1)]"
          loading="lazy"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black text-stone-900 leading-tight">
            Eu sou a professora Elisa
          </h2>
          <p className="mt-3 text-base md:text-xl text-stone-700 leading-snug">
            Eu ensino informática para adultos que estão começando do zero. Nada de termo técnico:
            é a mesma explicação que eu daria sentada ao seu lado, com calma, repetindo quantas vezes
            for preciso.
          </p>
          <p className="mt-3 text-base md:text-xl font-bold text-stone-900">
            E se travar em alguma aula, você chama no WhatsApp e recebe ajuda de gente de verdade.
          </p>
          <a
            href={WHATS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-bold text-stone-900 underline decoration-amber-400 decoration-4 underline-offset-4"
          >
            <Headphones className="w-5 h-5" /> Falar comigo antes de comprar
          </a>
        </div>
      </div>
    </div>
    {/* Situação da professora */}
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-2 rounded-2xl border-4 border-stone-900 bg-amber-400 px-6 py-5 shadow-[8px_8px_0_0_rgba(28,25,23,1)]">
        <p className="text-center text-lg md:text-2xl font-black text-stone-900 leading-snug">
          "o problema nunca foi a pessoa — era o jeito que ensinavam"
        </p>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Provas ───────────────────────── */
const fbAvatars = [fbAvatar1, fbAvatar2, fbAvatar3, fbAvatar4, fbAvatar5, fbAvatar6, fbAvatar7, fbAvatar8];

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

const audioTestimonials = [
  { name: "Antonio", description: "Depoimento sobre sua experiência com o curso", audioSrc: "/audio/antonio-1.ogg" },
  { name: "Antonio", description: "Continuação do depoimento", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Amanda", description: "Como o curso transformou sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Superou as dificuldades com tecnologia", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const AudioDepoimento = ({ testimonial }: { testimonial: (typeof audioTestimonials)[0] }) => {
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

  return (
    <div className={`bg-stone-800 border-2 rounded-xl p-4 ${hasError ? "border-red-400/40 opacity-60" : "border-amber-400/40"}`}>
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        preload="none"
        onTimeUpdate={() => {
          if (audioRef.current) {
            const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(p || 0);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          disabled={hasError}
          aria-label={`Ouvir depoimento de ${testimonial.name}`}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform ${hasError ? "bg-stone-600 cursor-not-allowed" : "bg-amber-400 hover:scale-105"}`}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-stone-900" /> : <Play className="w-5 h-5 text-stone-900 ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-amber-400" />
          </div>
          <p className="text-stone-300 text-xs mb-2">{hasError ? "Áudio não disponível" : testimonial.description}</p>
          <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};



const Provas = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleComments = showAll ? facebookComments : facebookComments.slice(0, 3);
  return (
  <section className="bg-stone-900 text-white">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
              <img key={i} src={a} alt="" className="w-10 h-10 rounded-full border-2 border-stone-900 object-cover" loading="lazy" />
            ))}
          </div>
          <div className="text-left">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm md:text-base font-bold">Alunos que começaram igual você</p>
          </div>
        </div>

        <h2 className="mt-6 text-2xl md:text-4xl font-black text-center leading-tight">
          Mensagens que eu <span className="text-amber-400">recebo todo dia</span>
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-4">
            <img src={whatsappTestimonial2} alt="Depoimento de aluna no WhatsApp" className="w-full rounded-2xl border-4 border-amber-400" loading="lazy" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black">Áudios de alunos</h3>
            </div>
            <div className="grid gap-3">
              {audioTestimonials.map((t, i) => (
                <AudioDepoimento key={i} testimonial={t} />
              ))}
            </div>
          </div>
        </div>



        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {visibleComments.map((comment, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex gap-2">
                <img src={fbAvatars[index % fbAvatars.length]} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="bg-slate-100 rounded-2xl px-3 py-2">
                    <p className="text-slate-900 text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
                    <p className="text-slate-700 text-sm leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-2">
                    <span className="text-[11px] text-slate-400">{comment.time}</span>
                    <span className="text-[11px] text-slate-500 font-medium">Curtir</span>
                    <span className="text-[11px] text-slate-500 font-medium">Responder</span>
                    {comment.likes > 0 && (
                      <span className="ml-auto text-[11px] text-slate-400 flex items-center gap-0.5">
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

        {facebookComments.length > 3 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="mt-4 mx-auto flex items-center gap-2 text-amber-400 font-bold text-base md:text-lg hover:text-amber-300 transition-colors"
          >
            {showAll ? "Ver menos" : "Ver mais depoimentos"}
            <ChevronDown className={`w-5 h-5 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}

      </div>
    </div>
  </section>
  );
};

/* ───────────────────────── Certificado ───────────────────────── */
const Certificado = () => (
  <section className="bg-white border-y-4 border-stone-900">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 items-center">
        <img src={certificado} alt="Exemplo de certificado do curso" className="w-full rounded-xl border-2 border-stone-900" loading="lazy" />
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-stone-900 leading-tight">
            No final, você recebe seu certificado
          </h2>
          <p className="mt-3 text-base md:text-xl text-stone-700 leading-snug">
            Um documento para anexar no currículo e provar que você sabe usar o computador.
            Muita gente consegue a primeira entrevista justamente por causa dele.
          </p>
          <ul className="mt-4 space-y-2">
            {["Emitido em nome do aluno", "Pode imprimir ou enviar por e-mail", "Sem prova difícil: é só concluir as aulas"].map((i) => (
              <li key={i} className="flex items-start gap-2 text-base md:text-lg font-semibold text-stone-800">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Oferta ───────────────────────── */
const included = [
  { icon: Monitor, t: "Curso completo do zero ao avançado" },
  { icon: FileText, t: "Word, Excel, PowerPoint e Windows" },
  { icon: Globe, t: "Internet, e-mail, downloads e impressão" },
  { icon: Keyboard, t: "Treino de digitação passo a passo" },
  { icon: Award, t: "Certificado de conclusão" },
  { icon: Headphones, t: "Suporte no WhatsApp com a equipe" },
  { icon: InfinityIcon, t: "Acesso vitalício, sem mensalidade" },
  { icon: Gift, t: "Hoje você leva 4 bônus exclusivos" },
];

const Oferta = () => (
  <section id="oferta" className="bg-amber-400">
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-stone-900 text-center leading-tight">
          Uma aula particular custa mais de R$ 80. <br className="hidden md:block" />
          O curso inteiro custa menos que isso por mês.
        </h2>

        <div className="mt-6 bg-white border-4 border-stone-900 rounded-2xl p-5 md:p-8 shadow-[10px_10px_0_0_rgba(28,25,23,1)]">
          <ul className="space-y-2.5">
            {included.map((i) => (
              <li key={i.t} className="flex items-start gap-3">
                <i.icon className="w-5 h-5 md:w-6 md:h-6 text-stone-900 shrink-0 mt-0.5" />
                <span className="text-base md:text-lg font-semibold text-stone-800 leading-snug">{i.t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center border-t-2 border-dashed border-stone-300 pt-5">
            <p className="text-base md:text-lg text-stone-500 font-bold">
              De <span className="line-through">R$ 497,00</span> por apenas
            </p>
            <p className="text-5xl md:text-6xl font-black text-stone-900 leading-none mt-1">
              R$ 297
            </p>
            <p className="mt-2 text-base md:text-xl font-bold text-stone-700">
              à vista ou em até 12x no cartão
            </p>
            <p className="mt-1 text-sm md:text-base text-stone-500">
              Pagamento único. Você nunca mais paga nada.
            </p>

            <div className="mt-5">
              <CTA hint={null}>QUERO COMEÇAR AGORA</CTA>
            </div>

            <div className="mt-4 flex items-start gap-3 bg-[#FBF6EF] border-2 border-stone-900 rounded-xl p-3.5 text-left">
              <ShieldCheck className="w-8 h-8 text-[#25D366] shrink-0" />
              <p className="text-sm md:text-base font-semibold text-stone-800 leading-snug">
                <b>Garantia de 7 dias.</b> Entre, assista as aulas e, se achar que não é pra você,
                devolvemos todo o dinheiro. O risco é nosso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Duas escolhas ───────────────────────── */
const Escolhas = () => (
  <section className="bg-[#FBF6EF]">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-stone-900 text-center leading-tight">
          Daqui a 30 dias você vai estar em um destes dois lugares
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="bg-white border-2 border-stone-300 rounded-2xl p-5">
            <p className="font-black text-lg md:text-xl text-stone-500">Se não fizer nada</p>
            <ul className="mt-3 space-y-2 text-stone-600 text-base md:text-lg">
              <li className="flex gap-2"><X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Continua pedindo ajuda pra tudo.</li>
              <li className="flex gap-2"><X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Continua evitando vagas que pedem computador.</li>
              <li className="flex gap-2"><X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Continua com aquela vergonha calada.</li>
            </ul>
          </div>
          <div className="bg-stone-900 text-white border-4 border-stone-900 rounded-2xl p-5 shadow-[8px_8px_0_0_rgba(251,191,36,1)]">
            <p className="font-black text-lg md:text-xl text-amber-400">Se começar hoje</p>
            <ul className="mt-3 space-y-2 text-base md:text-lg">
              <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /> Digita seu currículo sozinho.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /> Manda e-mail e resolve suas coisas.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /> Senta no computador com confiança.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── FAQ ───────────────────────── */
const faqs = [
  {
    q: "Eu não sei quase nada. Vou conseguir acompanhar?",
    a: "Sim. O curso começa do absoluto zero: ligar o computador, usar o mouse, salvar arquivo. Nada é pulado.",
  },
  {
    q: "Preciso ter computador?",
    a: "Sim, o curso é todo feito no computador ou notebook, porque é ali que você vai praticar cada aula.",
  },
  {
    q: "Por quanto tempo tenho acesso?",
    a: "Para sempre. É pagamento único, sem mensalidade, e você pode rever as aulas quantas vezes quiser.",
  },
  {
    q: "Em quanto tempo eu aprendo?",
    a: "Estudando um pouco por dia, a maioria dos alunos já se sente segura no primeiro mês. Cada pessoa segue no seu ritmo.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias para pedir o reembolso total, sem precisar explicar nada.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Logo após o pagamento aprovado você recebe o acesso por e-mail e já pode assistir a primeira aula.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white border-t-4 border-stone-900">
      <div className="container mx-auto px-4 py-9 md:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-stone-900 text-center leading-tight">
            Dúvidas que quase todo aluno tem
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-stone-900 rounded-xl overflow-hidden bg-[#FBF6EF]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 text-left p-4"
                >
                  <span className="font-black text-base md:text-xl text-stone-900 leading-snug">{f.q}</span>
                  <ChevronDown className={`w-6 h-6 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <p className="px-4 pb-4 text-base md:text-lg text-stone-700 leading-snug">{f.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-7 text-center">
            <p className="text-base md:text-xl font-bold text-stone-900">Ficou com outra dúvida?</p>
            <a
              href={WHATS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 bg-stone-900 text-white font-bold px-5 py-3 rounded-xl"
            >
              <Headphones className="w-5 h-5" /> Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── Fechamento ───────────────────────── */
const Fechamento = () => (
  <section className="bg-stone-900 text-white">
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <GraduationCap className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="mt-3 text-2xl md:text-4xl font-black leading-tight">
          Nunca é tarde para aprender. <span className="text-amber-400">Só é cedo demais pra desistir.</span>
        </h2>
        <p className="mt-3 text-base md:text-xl text-stone-300">
          Comece hoje, no seu ritmo, comigo, que tenho paciência de te ensinar de verdade.
        </p>
        <div className="mt-6">
          <CTA>Quero começar meu curso hoje</CTA>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Barra fixa ───────────────────────── */
const StickyBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-900/97 backdrop-blur border-t-4 border-amber-400 px-3 py-2.5">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="hidden sm:block shrink-0 text-white leading-tight">
          <p className="text-xs text-stone-400 line-through">R$ 497</p>
          <p className="font-black text-xl">R$ 297</p>
        </div>
        <button
          onClick={openCheckout}
          className="flex-1 bg-[#25D366] text-white font-black rounded-xl py-3.5 text-base md:text-xl shadow-lg active:scale-[.99]"
        >
          QUERO COMEÇAR AGORA
        </button>
      </div>
    </div>
  );
};

/* ───────────────────────── Footer ───────────────────────── */
const Footer = () => (
  <footer className="bg-[#FBF6EF] border-t-2 border-stone-300">
    <div className="container mx-auto px-4 py-6 text-center text-xs md:text-sm text-stone-500 space-y-1">
      <p className="font-bold text-stone-700">Informática na Prática LTDA</p>
      <p>Curso 100% online de informática para computador.</p>
      <p>© {new Date().getFullYear()} — Todos os direitos reservados.</p>
    </div>
  </footer>
);

/* ───────────────────────── Página ───────────────────────── */
const VendasNovo = () => {
  useEffect(() => {
    document.title = "Curso de Informática do Zero | Aprenda sem Medo — Informática na Prática";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "Curso de informática do zero para adultos: Windows, Word, Excel, internet e e-mail com aulas calmas, certificado, acesso vitalício e garantia de 7 dias.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <TopBar />
      <Hero />
      <Identificacao />
      <Metodo />
      <AulaReal />
      <Habilidades />
      <Professora />
      <Provas />
      <Certificado />
      <Oferta />
      <Escolhas />
      <FAQ />
      <Fechamento />
      <Footer />
      <StickyBar />
      <WhatsAppButton />
    </div>
  );
};

export default VendasNovo;
