import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Star,
  Award,
  PlayCircle,
  Monitor,
  FileText,
  Globe,
  Keyboard,
  GraduationCap,
  Infinity as InfinityIcon,
  ChevronDown,
  Heart,
  Headphones,
  X,
  Gift,
  Play,
  Pause,
  Volume2,
  Users,
  CalendarDays,
  Quote,
  ThumbsUp,
  MessageCircle,
  Smartphone,
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
  hint = "Acesso imediato • Acesso vitalício",
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
    {hint && <p className="mt-2 text-center text-xs md:text-sm text-stone-500">{hint}</p>}
  </div>
);

/* ───────────────────────── Video ───────────────────────── */
const VideoBox = ({ id, thumb, label }: { id: string; thumb: string; label?: string }) => {
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

/* ───────────────────────── Barra de credibilidade ───────────────────────── */
const CredBar = () => (
  <div className="bg-amber-400 border-b-4 border-stone-900">
    <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-stone-900 font-black text-xs md:text-base">
      <span className="flex items-center gap-1.5">
        <Users className="w-4 h-4 md:w-5 md:h-5" /> +15.000 alunos
      </span>
      <span className="flex items-center gap-1.5">
        <CalendarDays className="w-4 h-4 md:w-5 md:h-5" /> 20 anos de experiência
      </span>
      <span className="flex items-center gap-1.5">
        <Star className="w-4 h-4 md:w-5 md:h-5 fill-stone-900" /> 4,9 de 5
      </span>
    </div>
  </div>
);

/* ───────────────────────── Hero ───────────────────────── */
const Hero = () => (
  <section className="bg-[#FBF6EF]">
    <div className="container mx-auto px-4 pt-6 pb-8 md:pt-10 md:pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 bg-stone-900 text-amber-400 font-black text-xs md:text-base px-3 py-1.5 rounded-full">
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
          Aulas curtas, do zero, com a professora explicando devagar e repetindo quantas vezes você precisar.
        </p>

        <div className="mt-5 md:mt-7">
          <VideoBox id="0kFjFZX5c9I" thumb={homeVideoThumb} label="Assista 1 minuto" />
        </div>

        <div className="mt-6">
          <CTA>Quero aprender computador do zero</CTA>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm font-semibold text-stone-600">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#25D366]" /> Compra segura
          </span>
          <span className="flex items-center gap-1.5">
            <InfinityIcon className="w-4 h-4 text-[#25D366]" /> Acesso vitalício
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#25D366]" /> Com certificado
          </span>
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
          Marque quantas dessas frases{" "}
          <span className="underline decoration-amber-400 decoration-8 underline-offset-2">são a sua vida hoje</span>
        </h2>
        <ul className="mt-6 space-y-3">
          {pains.map((p) => (
            <li key={p} className="flex items-start gap-3 bg-[#FBF6EF] border-2 border-stone-900 rounded-xl p-3.5 md:p-4">
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
  { n: "2", t: "Você faz junto no seu computador", d: "A professora mostra a tela e você repete o mesmo passo." },
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
      </div>
    </div>
  </section>
);

/* ───────────────────────── Módulos ───────────────────────── */
const modules = [
  { icon: windowsIcon, t: "Windows e Organização", d: "Ligar, usar o mouse, salvar e achar seus arquivos sem medo." },
  { icon: wordIcon, t: "Word Profissional", d: "Currículo, carta e documentos bem feitos, prontos para imprimir." },
  { icon: excelIcon, t: "Excel na Prática", d: "Planilha de gastos, contas e fórmulas explicadas com calma." },
  { icon: powerpointIcon, t: "PowerPoint", d: "Apresentações bonitas para o trabalho, escola ou igreja." },
  { icon: internetIcon, t: "Internet e E-mail", d: "Pesquisar, baixar, imprimir e enviar anexos com segurança." },
  { icon: typingIcon, t: "Digitação", d: "Digitar mais rápido, sem procurar letra por letra." },
];

const Modulos = () => (
  <section className="bg-white border-y-4 border-stone-900">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-stone-900 text-center leading-tight">
          Os módulos do curso — e o que você sai fazendo{" "}
          <span className="bg-amber-300 px-1">sem pedir ajuda</span>
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((s) => (
            <div
              key={s.t}
              className="bg-[#FBF6EF] border-2 border-stone-900 rounded-2xl p-4 md:p-5 shadow-[4px_4px_0_0_rgba(28,25,23,1)]"
            >
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
          className="w-44 h-44 md:w-full md:h-auto mx-auto object-cover rounded-2xl border-4 border-stone-900 shadow-[8px_8px_0_0_rgba(251,191,36,1)]"
          loading="lazy"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black text-stone-900 leading-tight">
            Quem vai te ensinar é a professora Elisa
          </h2>
          <p className="mt-3 text-base md:text-xl text-stone-700 leading-snug">
            São <b>20 anos ensinando informática</b> e mais de <b>15.000 alunos</b> que começaram exatamente
            como você. Nada de termo técnico: é a mesma explicação que ela daria sentada ao seu lado, com
            calma, repetindo quantas vezes for preciso.
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
            <Headphones className="w-5 h-5" /> Falar com a professora antes de comprar
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Áudios ───────────────────────── */
const audios = [
  { name: "Antonio", desc: "Contando como foi começar do zero", src: "/audio/antonio-1.ogg" },
  { name: "Antonio", desc: "Continuação do depoimento", src: "/audio/antonio-2.ogg" },
  { name: "Vanderlei", desc: "Superou o medo do computador", src: "/audio/vanderlei.ogg" },
];

const AudioPlayer = ({ item }: { item: (typeof audios)[0] }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) el.pause();
    else el.play().catch(() => undefined);
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-3 bg-stone-800 border border-stone-700 rounded-2xl p-3.5">
      <audio
        ref={ref}
        src={item.src}
        preload="none"
        onTimeUpdate={() => {
          const el = ref.current;
          if (el?.duration) setProgress((el.currentTime / el.duration) * 100);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pausar áudio" : "Ouvir áudio"}
        className="w-12 h-12 shrink-0 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center"
      >
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-black text-white text-sm md:text-base flex items-center gap-2">
          {item.name} <Volume2 className="w-4 h-4 text-amber-400" />
        </p>
        <p className="text-stone-400 text-xs md:text-sm truncate">{item.desc}</p>
        <div className="mt-2 h-1.5 bg-stone-700 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Provas ───────────────────────── */
const depoimentos = [
  {
    txt: "Eu tinha medo até de ligar o computador. Hoje faço meu currículo sozinha e já mandei para três empresas.",
    nome: "Maria, 54 anos",
  },
  {
    txt: "As aulas são calmas. Quando não entendo, assisto de novo. Nunca me senti burro estudando com a professora.",
    nome: "José Antônio, 61 anos",
  },
  {
    txt: "Precisava de Excel no trabalho e estava travando. Em poucas semanas montei minha primeira planilha sozinha.",
    nome: "Aline, 33 anos",
  },
];

const Provas = () => (
  <section className="bg-stone-900 text-white">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
              <img
                key={i}
                src={a}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-stone-900 object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <div className="text-left">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm md:text-base font-bold">+15.000 alunos que começaram igual você</p>
          </div>
        </div>

        <h2 className="mt-6 text-2xl md:text-4xl font-black text-center leading-tight">
          Mensagens que a professora <span className="text-amber-400">recebe todo dia</span>
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <img
            src={whatsappTestimonial1}
            alt="Depoimento de aluno no WhatsApp"
            className="w-full rounded-2xl border-4 border-amber-400"
            loading="lazy"
          />
          <img
            src={whatsappTestimonial2}
            alt="Depoimento de aluna no WhatsApp"
            className="w-full rounded-2xl border-4 border-amber-400"
            loading="lazy"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <p className="font-black text-lg md:text-xl mb-3 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-400" /> Áudios de alunos
            </p>
            <div className="space-y-3">
              {audios.map((a, i) => (
                <AudioPlayer key={i} item={a} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-black text-lg md:text-xl mb-3">O que eles dizem</p>
            <div className="space-y-3">
              {depoimentos.map((d) => (
                <div key={d.nome} className="bg-white text-stone-800 rounded-2xl p-4">
                  <p className="text-base md:text-lg leading-snug">"{d.txt}"</p>
                  <p className="mt-2 font-black text-stone-900 text-sm md:text-base">— {d.nome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── Certificado ───────────────────────── */
const Certificado = () => (
  <section className="bg-white border-y-4 border-stone-900">
    <div className="container mx-auto px-4 py-9 md:py-14">
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 items-center">
        <img
          src={certificado}
          alt="Exemplo de certificado do curso"
          className="w-full rounded-xl border-2 border-stone-900"
          loading="lazy"
        />
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-stone-900 leading-tight">
            No final, você recebe seu certificado
          </h2>
          <p className="mt-3 text-base md:text-xl text-stone-700 leading-snug">
            Um documento para anexar no currículo e mostrar que você sabe usar o computador.
          </p>
          <ul className="mt-4 space-y-2">
            {["Emitido em nome do aluno", "Pode imprimir ou enviar por e-mail", "Sem prova difícil: é só concluir as aulas"].map(
              (i) => (
                <li key={i} className="flex items-start gap-2 text-base md:text-lg font-semibold text-stone-800">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /> {i}
                </li>
              )
            )}
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
];

const bonus = [
  "E-mail Profissional: criar, configurar e usar sem confusão",
  "Mercado de Trabalho: como se apresentar e conquistar a vaga",
  "Atalhos Essenciais: guia rápido para ganhar tempo",
  "Currículo Profissional: modelo pronto para preencher",
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

          <div className="mt-5 bg-[#FBF6EF] border-2 border-stone-900 rounded-xl p-4">
            <p className="font-black text-stone-900 text-base md:text-xl flex items-center gap-2">
              <Gift className="w-5 h-5" /> Hoje você leva 4 bônus exclusivos
            </p>
            <ul className="mt-2 space-y-1.5">
              {bonus.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm md:text-base text-stone-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-1" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-center border-t-2 border-dashed border-stone-300 pt-5">
            <p className="text-base md:text-lg text-stone-500 font-bold">
              De <span className="line-through">R$ 497,00</span> por apenas
            </p>
            <p className="text-5xl md:text-6xl font-black text-stone-900 leading-none mt-1">R$ 297</p>
            <p className="mt-2 text-base md:text-xl font-bold text-stone-700">à vista ou em até 12x no cartão</p>
            <p className="mt-1 text-sm md:text-base text-stone-500">Pagamento único. Você nunca mais paga nada.</p>

            <div className="mt-5">
              <CTA hint={null}>QUERO COMEÇAR AGORA</CTA>
            </div>

            <div className="mt-4 flex items-start gap-3 bg-[#FBF6EF] border-2 border-stone-900 rounded-xl p-3.5 text-left">
              <ShieldCheck className="w-8 h-8 text-[#25D366] shrink-0" />
              <p className="text-sm md:text-base font-semibold text-stone-800 leading-snug">
                <b>Garantia de 7 dias.</b> Entre, assista as aulas e, se achar que não é pra você, devolvemos
                todo o dinheiro. O risco é nosso.
              </p>
            </div>
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
    a: "Estudando um pouco por dia, a maioria dos alunos já se sente mais segura no primeiro mês. Cada pessoa segue no seu ritmo.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Logo após o pagamento aprovado você recebe o acesso por e-mail e já pode assistir a primeira aula.",
  },
  {
    q: "Tem alguém para me ajudar se eu travar?",
    a: "Tem. Você fala com a equipe da professora pelo WhatsApp e recebe orientação.",
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
                {open === i && <p className="px-4 pb-4 text-base md:text-lg text-stone-700 leading-snug">{f.a}</p>}
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
          Comece hoje, no seu ritmo, com quem tem paciência de te ensinar de verdade.
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
    const onScroll = () => setShow(window.scrollY > 900);
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
const VendasPro = () => {
  useEffect(() => {
    document.title = "Curso de Informática do Zero para Adultos | Informática na Prática";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "Curso de informática do zero para adultos: Windows, Word, Excel, internet e e-mail com aulas calmas, +15.000 alunos, certificado e acesso vitalício.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <TopBar />
      <CredBar />
      <Hero />
      <Identificacao />
      <Metodo />
      <AulaReal />
      <Modulos />
      <Professora />
      <Provas />
      <Certificado />
      <Oferta />
      <FAQ />
      <Fechamento />
      <Footer />
      <StickyBar />
      <WhatsAppButton />
    </div>
  );
};

export default VendasPro;
