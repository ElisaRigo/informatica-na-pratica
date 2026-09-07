import { useEffect, useState, useRef } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Star,
  Clock,
  Award,
  Users,
  PlayCircle,
  Sparkles,

  Infinity as InfinityIcon,
  ChevronDown,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  ThumbsUp,
  Heart,
  Headphones,
  Gift,
  AlertTriangle,
  Frown,
  TrendingDown,
  X,
  Check,
  Globe,
  Rocket,
  Flame,
  ClipboardCheck,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import logo from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import homeVideoThumbAsset from "@/assets/capa-video-principal.png.asset.json";
const homeVideoThumb = homeVideoThumbAsset.url;
import aulaRealThumbAsset from "@/assets/capa-aula-real.jpg.asset.json";
const aulaRealThumb = aulaRealThumbAsset.url;
import aulaGratisThumbAsset from "@/assets/capa-aula-demonstrativa-v2.jpg.asset.json";
const aulaGratisThumb = aulaGratisThumbAsset.url;
import aulaPratica2ThumbAsset from "@/assets/aula-pratica-2-thumb.jpg.asset.json";
const aulaPratica2Thumb = aulaPratica2ThumbAsset.url;
import certificado from "@/assets/certificado-exemplo.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
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

const scrollToOferta = () => {
  const el = document.getElementById("oferta");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};



// ───────────────────────── CTA ─────────────────────────
const CTA = ({
  children = "QUERO APRENDER AGORA",
  sub,
  size = "lg",
}: {
  children?: React.ReactNode;
  sub?: string;
  size?: "lg" | "sm";
}) => (
  <div className="w-full">
    <button
      onClick={openCheckout}
      className={`group inline-flex w-full items-center justify-center gap-2 bg-green-600 hover:bg-green-500 active:scale-[.99] text-white font-black rounded-xl shadow-[0_10px_40px_-10px_rgba(34,197,94,.7)] transition-all ${
        size === "lg" ? "text-lg md:text-2xl px-5 py-4 md:px-10 md:py-5" : "text-base md:text-lg px-4 py-3"
      }`}
    >
      <span className="leading-tight text-center">{children}</span>
    </button>
    {sub && (
      <p className="text-center text-xs md:text-sm text-slate-300 mt-2 flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" /> {sub}
      </p>
    )}
  </div>
);

// ───────────────────────── Header ─────────────────────────
const Header = () => (
  <header className="bg-slate-950 border-b border-slate-800 py-3">
    <div className="container mx-auto px-4 flex items-center justify-center gap-3">
      <div className="bg-white/95 rounded-xl p-1.5 md:p-2 shrink-0">
        <img src={logo} alt="Informática na Prática" className="h-10 md:h-14" />
      </div>
      <p className="text-white font-bold leading-tight text-left">
        <span className="block text-xl md:text-3xl tracking-tight whitespace-nowrap">Curso de Informática</span>
        <span className="flex items-center gap-3 text-[11px] md:text-sm text-slate-400 font-semibold mt-0.5">
          <span className="inline-flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-blue-400" /> Online
          </span>
          <span className="inline-flex items-center gap-1">
            <Headphones className="w-3.5 h-3.5 text-blue-400" /> Com suporte
          </span>
        </span>
      </p>
    </div>
  </header>
);

// ───────────────────────── Hero (dor) ─────────────────────────
const Hero = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/40 text-red-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" /> PARA QUEM TRAVA NA FRENTE DO COMPUTADOR
          </div>

          <h1 className="text-[2.1rem] md:text-6xl font-black text-white leading-[1.03] tracking-[-0.04em] mb-4">
            Cansado(a) de sentir <span className="text-red-500">vergonha</span> por não saber usar o computador?
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 leading-snug mb-5 font-medium">
            Em poucas semanas você usa o computador <strong className="text-white">sozinho(a)</strong> — sem pedir ajuda,
            sem medo de errar e sem passar mais nenhuma situação constrangedora.
          </p>

          {/* Vídeo */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl mb-4">
            {!playing ? (
              <div className="relative aspect-video cursor-pointer group" onClick={() => setPlaying(true)}>
                <img src={homeVideoThumb} alt="Recado da professora Elisa" className="w-full h-full object-cover" loading="eager" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  ▶ Assista o recado da professora
                </span>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1"
                  title="Recado da professora"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Prova social */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
                <img key={i} src={a} alt="" className="w-9 h-9 rounded-full border-2 border-slate-900 object-cover" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 font-semibold">+15.000 alunos já aprenderam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Selos de confiança ─────────────────────────
const TrustSeals = () => (
  <div className="bg-slate-950 border-y border-slate-800 py-4 md:py-5">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {[
          { icon: InfinityIcon, t: "Acesso vitalício" },
          { icon: ShieldCheck, t: "Garantia 7 dias" },
          { icon: Headphones, t: "Suporte humano" },
          { icon: Award, t: "Certificado" },
        ].map(({ icon: I, t }) => (
          <div key={t} className="flex min-h-28 flex-col items-center justify-center gap-2.5 bg-slate-900 border border-slate-700 rounded-xl px-3 py-4 text-center">
            <span className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-blue-500/15 border border-blue-500/30">
              <I className="w-6 h-6 md:w-7 md:h-7 text-blue-400" strokeWidth={2.2} />
            </span>
            <span className="text-sm md:text-base font-bold text-slate-100 leading-tight">{t}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ───────────────────── NOVO: Diagnóstico interativo ─────────────────────
const PAINS = [
  {
    label: "Fico travado(a) quando preciso mexer no computador",
    response: "Você não precisa decorar tudo. Com uma sequência simples, cada clique começa a fazer sentido.",
  },
  {
    label: "Tenho medo de clicar errado e estragar alguma coisa",
    response: "Esse medo diminui quando você pratica com orientação e entende o que cada botão realmente faz.",
  },
  {
    label: "Preciso pedir ajuda pra filho, neto ou colega",
    response: "Você pode conquistar independência para resolver suas tarefas sem precisar chamar alguém toda vez.",
  },
  {
    label: "Já perdi (ou deixei de tentar) uma vaga por não saber",
    response: "Aprender o básico mais pedido no trabalho pode devolver sua confiança para buscar novas oportunidades.",
  },
  {
    label: "Não consigo fazer um currículo, documento ou planilha",
    response: "Você vai aprender essas tarefas na prática, acompanhando cada etapa diretamente na tela.",
  },
  {
    label: "Sinto vergonha de dizer que não sei usar",
    response: "Não saber ainda não é motivo de vergonha. Você só precisa de uma explicação calma, começando do zero.",
  },
];

const getDiagnosticTitle = (count: number) => {
  if (count === 1) return "Existe um ponto específico te prendendo";
  if (count <= 3) return "Você não precisa continuar enfrentando isso sozinho(a)";
  return "O computador tem pesado demais na sua rotina";
};

const Diagnostico = () => {
  const [sel, setSel] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <section id="diagnostico" className="bg-slate-900 py-10 md:py-14 border-b border-slate-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
            <ClipboardCheck className="w-5 h-5" /> DIAGNÓSTICO EM 30 SEGUNDOS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Marque o que <span className="text-red-500">acontece com você</span> hoje
          </h2>
          <p className="text-slate-300 mt-2 text-base md:text-lg">Seja sincero(a). Ninguém está vendo.</p>
        </div>

        <div className="grid gap-2.5">
          {PAINS.map((pain, i) => {
            const on = sel.includes(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`flex items-center gap-3 text-left rounded-xl px-4 py-3.5 border-2 transition-all ${
                  on
                    ? "bg-red-600/15 border-red-600"
                    : "bg-slate-800/60 border-slate-700 hover:border-slate-600"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 ${
                    on ? "bg-red-600 border-red-600" : "border-slate-500"
                  }`}
                >
                  {on && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </span>
                <span className={`text-sm md:text-lg font-semibold ${on ? "text-white" : "text-slate-300"}`}>{pain.label}</span>
              </button>
            );
          })}
        </div>

        {!done ? (
          <button
            onClick={() => setDone(true)}
            disabled={sel.length === 0}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-lg md:text-xl rounded-xl px-6 py-4 transition-all"
          >
            {sel.length === 0 ? "Marque pelo menos 1 opção" : "VER MEU RESULTADO"}
          </button>
        ) : (
          <div className="mt-6 bg-gradient-to-b from-blue-600/20 to-slate-900 border-2 border-blue-500/40 rounded-2xl p-5 md:p-8">
            <div className="text-center">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/40">
                <ClipboardCheck className="w-7 h-7 text-blue-300" />
              </span>
              <p className="text-blue-300 font-bold text-sm mb-2">SEU RESULTADO PERSONALIZADO</p>
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
                {getDiagnosticTitle(sel.length)}
              </h3>
              <p className="text-slate-300 text-base md:text-lg leading-snug mb-5">
                Pelas suas respostas, este é o caminho que mais pode ajudar você agora:
              </p>
            </div>

            <div className="space-y-2.5">
              {sel.map((painIndex) => (
                <div key={painIndex} className="flex items-start gap-3 rounded-xl bg-slate-950/70 border border-slate-700 p-3.5">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed">{PAINS[painIndex].response}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-200 text-base md:text-lg leading-snug mt-5">
              Isso não é falta de inteligência. A professora Elisa ensina há mais de 20 anos, com calma, do zero e sem termos difíceis.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// ───────────────────────── Custo de continuar assim ─────────────────────────
const Custo = () => (
  <section className="bg-slate-950 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          O que <span className="text-red-500">não saber</span> já te custou?
        </h2>
        <p className="text-slate-300 mt-2 text-base md:text-lg">A conta é mais alta do que parece.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {[
          { icon: TrendingDown, t: "Vagas perdidas", d: "Quase toda vaga hoje pede o básico de computador. Sem isso, seu currículo nem é lido." },
          { icon: Frown, t: "Dependência diária", d: "Toda vez que precisa de um documento, precisa pedir favor para alguém." },
          { icon: Clock, t: "Tempo passando", d: "Mais um ano adiando algo que se aprende em poucas semanas." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="bg-slate-900 border border-slate-800 border-l-4 border-l-red-600 rounded-xl p-5">
            <I className="w-7 h-7 text-red-500 mb-2" />
            <p className="text-white font-bold text-lg mb-1">{t}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-300 text-lg md:text-2xl font-semibold mt-6 leading-snug">
        Continuar como está é a opção <span className="text-red-500 font-black">mais cara</span> de todas.
      </p>
    </div>
  </section>
);

// ───────────────────────── Antes x Depois ─────────────────────────
const AntesDepois = () => (
  <section className="bg-slate-900 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight mb-6">
        Sua vida vai Mudar
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-950 border border-red-600/40 rounded-2xl p-5">
          <p className="text-red-500 font-black text-lg mb-3 flex items-center gap-2">
            <X className="w-5 h-5" /> HOJE
          </p>
          <ul className="space-y-2.5">
            {[
              "Trava na frente da tela",
              "Depende de filho, neto ou colega",
              "Evita vagas que pedem computador",
              "Sente vergonha de perguntar",
              "Acha que já passou da idade",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-slate-300 text-sm md:text-base">
                <X className="w-4 h-4 text-red-500 mt-1 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-b from-green-600/15 to-slate-950 border border-green-500/40 rounded-2xl p-5">
          <p className="text-green-400 font-black text-lg mb-3 flex items-center gap-2">
            <Rocket className="w-5 h-5" /> DEPOIS DO CURSO
          </p>
          <ul className="space-y-2.5">
            {[
              "Liga, mexe e resolve sozinho(a)",
              "Faz currículo, documentos e planilhas",
              "Envia e-mail e usa a internet com segurança",
              "Se candidata a vagas com confiança",
              "Ensina o que aprendeu para outras pessoas",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-white text-sm md:text-base font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── É para você? ─────────────────────────
const ParaQuem = () => (
  <section className="bg-slate-900 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Esse curso é <span className="text-green-400">para você</span>?
        </h2>
        <p className="text-slate-300 mt-2 text-base md:text-lg">Seja honesto(a) e veja em qual lado você está.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-950 border-2 border-green-500/40 rounded-2xl p-5">
          <p className="text-green-300 font-black text-base md:text-lg mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> É PARA VOCÊ SE…
          </p>
          <ul className="space-y-2.5">
            {[
              "Você nunca ligou um computador ou mexe com muito medo",
              "Você precisa aprender para conseguir um emprego melhor",
              "Você quer parar de pedir ajuda para filho, neto ou colega",
              "Você tem mais de 40 anos e acha que já passou da hora",
              "Você quer aprender no seu ritmo, sem pressão e sem prova",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-slate-100 text-sm md:text-base font-medium">
                <Check className="w-4 h-4 text-green-400 mt-1 shrink-0" strokeWidth={3} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-950 border border-slate-700 rounded-2xl p-5">
          <p className="text-red-500 font-black text-base md:text-lg mb-3 flex items-center gap-2">
            <X className="w-5 h-5" /> NÃO É PARA VOCÊ SE…
          </p>
          <ul className="space-y-2.5">
            {[
              "Você já domina Windows, Word e Excel com segurança",
              "Você procura curso avançado de programação ou design",
              "Você quer aprender sem assistir nenhuma aula",
              "Você não está disposto(a) a praticar alguns minutos por dia",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-slate-300 text-sm md:text-base">
                <X className="w-4 h-4 text-red-500 mt-1 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-slate-100 text-lg md:text-2xl font-bold mt-6 leading-snug">
        Se você se viu na coluna verde, <span className="text-green-400">é o seu momento de começar.</span>
      </p>
    </div>
  </section>
);

// ───────────────────────── Como começa ─────────────────────────
const ComoComeca = () => (
  <section className="bg-slate-950 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-200 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
          <Rocket className="w-4 h-4" /> SIMPLES ASSIM
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Você começa a assistir hoje
        </h2>
        <p className="text-slate-300 mt-2 text-base md:text-lg">Sem espera, sem burocracia, sem complicação.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {[
          { n: "1", t: "Você garante sua vaga", d: "Cartão em até 12x, Pix ou boleto. Leva menos de 3 minutos." },
          { n: "2", t: "Recebe o acesso no e-mail", d: "Seu login chega logo após a confirmação do pagamento." },
          { n: "3", t: "Assiste a primeira aula", d: "Começa do começo mesmo: ligar o computador e usar o mouse." },
        ].map(({ n, t, d }) => (
          <div key={n} className="bg-slate-900 border border-slate-700 rounded-xl p-5">
            <span className="w-9 h-9 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center mb-2">
              {n}
            </span>
            <p className="text-white font-bold mb-1">{t}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-slate-200 text-xs md:text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5">
          <Clock className="w-4 h-4 text-blue-400" /> 15 minutos por dia já bastam
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5">
          <InfinityIcon className="w-4 h-4 text-blue-400" /> Acesso vitalício
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5">
          <Headphones className="w-4 h-4 text-blue-400" /> Suporte de verdade
        </span>
      </div>
    </div>
  </section>
);

// ───────────────────────── Aula real + método ─────────────────────────

const AulaCard = ({ videoId, thumb, label, subtitle }: { videoId: string; thumb: string; label: string; subtitle: string }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
      {!playing ? (
        <div className="relative aspect-video cursor-pointer group" onClick={() => setPlaying(true)}>
          <img src={thumb} alt={subtitle} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
              <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <PlayCircle className="w-4 h-4" /> {label}
          </div>
        </div>
      ) : (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1`}
            title={subtitle}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
      <p className="text-white font-bold text-sm md:text-base py-3 px-4 text-center">{subtitle}</p>
    </div>
  );
};

const Aulas = () => {
  return (
    <section className="bg-slate-950 py-10 md:py-14 border-b border-slate-800">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/40 text-red-300 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
          <PlayCircle className="w-4 h-4 text-red-500" /> PARE DE ADIAR — APERTE O PLAY
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
          Enquanto você adia, <span className="text-red-500">a vida não espera.</span>
        </h2>
        <p className="text-slate-300 mb-2 text-base md:text-lg leading-relaxed">
          Quantas vagas você já deixou passar? Quantas vezes precisou pedir ajuda para fazer algo simples no
          computador?
        </p>
        <p className="text-white font-bold mb-6 text-base md:text-lg">
          Aperte o play e veja com seus próprios olhos: a saída existe — e é mais fácil do que te disseram.
        </p>

        <div className="space-y-6 mb-8">
          <AulaCard videoId="_0OPLnEiMHk" thumb={aulaGratisThumb} label="Aula 2" subtitle="Você acha que informática é difícil? Assista e mude de ideia" />
          <AulaCard videoId="-sdVG1OtDks" thumb={aulaPratica2Thumb} label="Aula 3" subtitle="Aprenda comigo, na prática, clique por clique" />
          <AulaCard videoId="g_F1-d7tdQ0" thumb={aulaRealThumb} label="Aula 1" subtitle="Começando do zero absoluto — mesmo que você nunca tenha ligado um computador" />
        </div>

        <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-3">
          Se você entendeu essas aulas, acabou de provar uma coisa para si mesmo(a):{" "}
          <strong className="text-white">o problema nunca foi você.</strong> Ninguém tinha te ensinado do jeito certo.
        </p>
        <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-6">
          São <strong className="text-white">+90 aulas assim</strong>, na ordem certa, até você usar o computador
          sozinho(a). <strong className="text-white">A única coisa entre você e a sua independência é começar hoje.</strong>
        </p>

        <div className="grid md:grid-cols-3 gap-3 text-left">
          {[
            { n: "1", t: "Aulas curtas", d: "De 5 a 12 minutos. Você assiste no seu tempo, quantas vezes quiser." },
            { n: "2", t: "Passo a passo na tela", d: "A professora mostra cada clique. Você só repete junto." },
            { n: "3", t: "Suporte quando travar", d: "Ficou com dúvida? Você fala com a nossa equipe e destrava." },
          ].map(({ n, t, d }) => (
            <div key={n} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center mb-2">
                {n}
              </span>
              <p className="text-white font-bold mb-1">{t}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Professora ─────────────────────────
const Professora = () => (
  <section className="bg-slate-900 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8">
        <img src={elisa} alt="Professora Elisa" className="w-44 h-44 md:w-60 md:h-60 rounded-2xl object-cover border-2 border-slate-700 shrink-0" />
        <div className="text-center md:text-left">
          <p className="text-blue-400 font-bold text-sm mb-1">QUEM VAI TE ENSINAR</p>
          <h3 className="text-2xl md:text-4xl font-black text-white mb-2">Professora Elisa</h3>
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
             Há mais de 20 anos ensino informática para adultos que nunca tinham ligado um computador. A didática  é simples, calma e sem termos difíceis — por isso mais de 15.000 alunos conseguiram aprender comigo.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Prova social ─────────────────────────
const audioTestimonials = [
  { name: "Antonio", description: "Continuação do depoimento", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Vanderlei", description: "Superou as dificuldades com tecnologia", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const fbAvatars = [fbAvatar1, fbAvatar2, fbAvatar3, fbAvatar4, fbAvatar5, fbAvatar6, fbAvatar7, fbAvatar8];

const facebookComments = [
  { name: "Luciana M.", text: "Professora maravilhosa! Aprendi em 1 semana o que não consegui em meses 🙌", time: "2 h", hasHeart: true },
  { name: "Tereza S.", text: "Tô conseguindo usar o computador sozinha, muito obrigada! 😍", time: "5 h", hasHeart: false },
  { name: "Juliana R.", text: "Ganhei uma promoção no trabalho por causa do curso! 🎉", time: "3 d", hasHeart: true },
  { name: "Maria G.", text: "Com 68 anos aprendi a mexer no computador. Deus abençoe! 🙏", time: "3 sem", hasHeart: true },
  { name: "Roberto L.", text: "Finalmente consigo fazer planilhas no trabalho. Obrigado! 💪", time: "2 sem", hasHeart: false },
  { name: "Patrícia S.", text: "Minha mãe de 62 anos aprendeu! Recomendo demais 👏", time: "1 sem", hasHeart: true },
];

const AudioPlayer = ({ testimonial }: { testimonial: (typeof audioTestimonials)[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => setHasError(true));
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`bg-slate-900 border rounded-xl p-4 ${hasError ? "border-slate-800 opacity-50" : "border-slate-800"}`}>
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onError={() => setHasError(true)}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${hasError ? "bg-slate-700" : "bg-blue-600 hover:scale-105 transition-transform"}`}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold text-sm">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-blue-400" />
          </div>
          <p className="text-slate-300 text-xs mb-2">{hasError ? "Áudio não disponível" : testimonial.description}</p>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProvaSocial = () => (
  <section id="depoimentos" className="bg-slate-950 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Se eles conseguiram, <span className="text-green-400">você também consegue</span>
        </h2>
        <p className="text-slate-300 mt-2 text-base md:text-lg">Alunos que começaram exatamente como você.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-5">
        {audioTestimonials.map((t) => (
          <AudioPlayer key={t.name} testimonial={t} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-start">
        <img
          src={whatsappTestimonial2}
          alt="Mensagem de aluno agradecendo pelas aulas"
          className="rounded-xl border border-slate-800 w-full"
          loading="lazy"
        />
        <div className="space-y-2">
          {facebookComments.map((c, i) => (
            <div key={c.name} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex gap-2">
              <img src={fbAvatars[i % fbAvatars.length]} alt="" className="w-8 h-8 rounded-full object-cover blur-[3px] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-xs font-semibold blur-[3px] select-none">{c.name}</p>
                <p className="text-slate-200 text-sm leading-relaxed">{c.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-slate-400">{c.time}</span>
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                  </span>
                  {c.hasHeart && (
                    <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <Heart className="w-2.5 h-2.5 text-white fill-white" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Oferta ─────────────────────────
const modulos = [
  { icon: windowsIcon, t: "Windows do zero", d: "Ligar, mexer no mouse, salvar e organizar arquivos" },
  { icon: wordIcon, t: "Word", d: "Currículo, cartas e documentos prontos para imprimir" },
  { icon: excelIcon, t: "Excel", d: "Planilhas de controle e contas do dia a dia" },
  { icon: powerpointIcon, t: "PowerPoint", d: "Apresentações bonitas e simples" },
  { icon: internetIcon, t: "Internet e e-mail", d: "Pesquisar, enviar e-mail e navegar com segurança" },
  { icon: typingIcon, t: "Digitação", d: "Digitar mais rápido e sem olhar o teclado" },
];

const Oferta = () => (
  <section id="oferta" className="bg-slate-900 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
          <Flame className="w-4 h-4" /> OFERTA DE HOJE
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Tudo o que você recebe</h2>
      </div>

      {/* Módulos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-5">
        {modulos.map((m) => (
          <div key={m.t} className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
            <img src={m.icon} alt="" className="w-9 h-9 mx-auto mb-2" loading="lazy" />
            <p className="text-white font-bold text-sm">{m.t}</p>
            <p className="text-slate-300 text-[11px] leading-snug mt-1">{m.d}</p>
          </div>
        ))}
      </div>

      {/* Value stack */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 md:p-7">
        <p className="text-center text-blue-300 font-bold text-sm mb-4 flex items-center justify-center gap-2">
          <Gift className="w-4 h-4" /> HOJE VOCÊ LEVA 4 BÔNUS EXCLUSIVOS
        </p>
        <ul className="divide-y divide-slate-800">
          {[
            ["Curso completo com +90 videoaulas", "R$ 497"],
            ["Bônus 1 · Atalhos do computador", "R$ 97"],
            ["Bônus 2 · Mercado de trabalho", "R$ 127"],
            ["Bônus 3 · Currículo campeão", "R$ 97"],
            ["Bônus 4 · Suporte com a equipe", "R$ 47"],
            ["Certificado de conclusão", "Incluso"],
            ["Acesso vitalício", "Incluso"],
          ].map(([t, v]) => (
            <li key={t} className="flex items-center justify-between gap-3 py-2.5">
              <span className="flex items-center gap-2 text-slate-200 text-sm md:text-base">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> {t}
              </span>
              <span className="text-slate-400 text-sm font-semibold whitespace-nowrap">{v}</span>
            </li>
          ))}
        </ul>

        <div className="text-center mt-5 pt-5 border-t border-slate-800">
           <p className="text-slate-300 text-sm"></p>
          <p className="text-slate-300 text-base mt-3">
            De <span className="line-through font-bold text-xl">R$ 497,00</span> por apenas
          </p>
          <p className="text-6xl md:text-7xl font-black text-green-400 leading-none tracking-tight my-1">R$ 297</p>
           <p className="text-slate-300 font-semibold">à vista ou em até 12 x 30,72,no cartão</p>
           <p className="text-slate-300 text-sm mt-1">Curso completo  — e o acesso é para sempre.</p>

          <div className="mt-5">
             <CTA sub="Pagamento seguro • Acesso imediato">Quero começar agora</CTA>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-slate-300 text-xs font-semibold">
            <span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Site seguro</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Garantia 7 dias</span>
            <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> +15.000 alunos</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Garantia + Certificado ─────────────────────────
const GarantiaCertificado = () => (
  <section className="bg-slate-950 py-10 md:py-14 border-b border-slate-800">
    <div className="container mx-auto px-4 max-w-4xl grid md:grid-cols-2 gap-4 items-center">
      <div className="bg-slate-900 border-2 border-green-500/40 rounded-2xl p-6 text-center">
        <ShieldCheck className="w-14 h-14 text-green-400 mx-auto mb-3" />
         <h3 className="text-2xl md:text-3xl font-black text-white mb-2">O risco é zero</h3>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Entre, assista as aulas e teste por 7 dias. Se você achar que não é para você, devolvemos 100% do valor. Sem
          perguntas, sem burocracia.
        </p>
      </div>
      <div className="text-center">
        <img src={certificado} alt="Exemplo do certificado de conclusão" className="rounded-xl border border-slate-800 w-full" loading="lazy" />
        <p className="text-slate-300 text-sm mt-2 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-blue-400" /> Certificado de conclusão em seu nome
        </p>
      </div>
    </div>
  </section>
);

// ───────────────────────── FAQ (objeções) ─────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    ["Eu não sei NADA de computador. Serve pra mim?", "Serve, e foi feito exatamente para você. A primeira aula começa em ligar o computador e usar o mouse."],
    ["Sou mais velho(a), será que consigo?", "Sim. Boa parte dos nossos alunos tem mais de 50 anos. As aulas são lentas, repetíveis e sem termos difíceis."],
    ["Por quanto tempo tenho acesso?", "Para sempre. Você paga uma vez e assiste quantas vezes quiser, na hora que quiser."],
    ["E se eu travar em alguma aula?", "Você fala com a nossa equipe de suporte e recebe ajuda até conseguir."],
    ["Como eu pago?", "Cartão em até 12x, Pix ou boleto. O acesso chega no seu e-mail logo após a confirmação."],
    ["E se eu não gostar?", "Você tem 7 dias para pedir o dinheiro de volta, integralmente."],
  ];
  return (
    <section className="bg-slate-900 py-10 md:py-14 border-b border-slate-800">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6">Ainda com dúvida?</h2>
        <div className="space-y-2">
          {items.map(([q, a], i) => (
            <div key={q} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 text-left px-4 py-3.5"
              >
                <span className="text-white font-bold text-sm md:text-base">{q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-4 pb-4 text-slate-300 text-sm md:text-base leading-relaxed">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── CTA final ─────────────────────────
const CTAFinal = () => (
  <section className="bg-gradient-to-b from-blue-700 to-slate-950 py-12 md:py-16">
    <div className="container mx-auto px-4 max-w-2xl text-center">
      <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
        Daqui a um mês você vai desejar ter começado hoje
      </h2>
      <p className="text-blue-100 text-lg md:text-xl mb-6 leading-snug">
        Escolha entre continuar dependendo dos outros ou aprender de uma vez por todas.
      </p>
      <CTA sub="Acesso imediato • Garantia de 7 dias">COMEÇAR AGORA POR R$ 297</CTA>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-800 py-6">
    <div className="container mx-auto px-4 text-center text-slate-500 text-xs space-y-1">
      <p className="font-semibold text-slate-400">Informática na Prática LTDA</p>
      <p>© {new Date().getFullYear()} · Todos os direitos reservados</p>
    </div>
  </footer>
);

// ───────────────────────── Sticky CTA ─────────────────────────
const StickyCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800 p-3 md:hidden">
    <button
      onClick={scrollToOferta}
      className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-base rounded-xl py-3.5 shadow-lg"
    >
      QUERO COMEÇAR AGORA
    </button>
  </div>
);


// ───────────────────────── Página ─────────────────────────
const Copia = () => {
  useEffect(() => {
    document.title = "Curso de Informática do Zero — Pare de depender dos outros";
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 pb-20 md:pb-0">
      <Header />
      <Hero />
      <TrustSeals />
      <Diagnostico />
      <Aulas />
      <Custo />
      <ParaQuem />
      <AntesDepois />
      <Professora />
      <ProvaSocial />
      <Oferta />
      <ComoComeca />
      <GarantiaCertificado />
      <FAQ />
      <CTAFinal />
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
    </div>
  );
};

export default Copia;
