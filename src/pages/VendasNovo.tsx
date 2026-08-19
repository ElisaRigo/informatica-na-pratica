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
  Monitor,
  Mail,
  Presentation,
  Keyboard,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Infinity as InfinityIcon,
  ChevronDown,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  Smartphone,
  ThumbsUp,
  Heart,
  Headphones,
  MousePointer,
  Rocket,
  Check,
  Gift,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import logoBlue from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import elisaTeaching from "@/assets/elisa-teaching.jpg";
import heroCover from "@/assets/hero-video-cover-home.jpg";
import homeVideoThumbAsset from "@/assets/capa-hero-principal.png.asset.json";
const homeVideoThumb = homeVideoThumbAsset.url;
import certificado from "@/assets/certificado-exemplo.png";
import aulaGratisThumbAsset from "@/assets/capa-aula-demonstrativa.jpg.asset.json";
const aulaGratisThumb = aulaGratisThumbAsset.url;
import aprendaComigoThumb from "@/assets/aprenda-comigo-thumb.jpg";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import fbAvatar1 from "@/assets/avatar-1.jpg";
import fbAvatar2 from "@/assets/avatar-2.jpg";
import fbAvatar3 from "@/assets/avatar-3.jpg";
import fbAvatar4 from "@/assets/avatar-4.jpg";
import fbAvatar5 from "@/assets/avatar-5.jpg";
import fbAvatar6 from "@/assets/avatar-6.jpg";
import fbAvatar7 from "@/assets/avatar-7.jpg";
import fbAvatar8 from "@/assets/avatar-8.jpg";

import { openHotmartCheckout } from "@/lib/checkoutTracking";
import { HeroBonuses } from "@/components/aprender/HeroBonuses";
import { QuizIdentificacao } from "@/components/aprender/QuizIdentificacao";

const openCheckout = () => openHotmartCheckout();

// ───────────────────────── CTA Button ─────────────────────────
const CTA = ({ children = "Quero aprender informática agora", size = "lg", subtle = false, to }: any) => {
  const handleClick = () => {
    if (to) {
      const el = document.getElementById(to);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    openCheckout();
  };
  return (
    <button
      onClick={handleClick}
      className={`group inline-flex items-center justify-center gap-2 md:gap-1.5 bg-green-600 hover:bg-green-700 active:scale-[.99] text-white font-extrabold rounded-2xl shadow-lg shadow-green-600/20 transition-all whitespace-nowrap w-full ${
        size === "lg" ? "text-lg md:text-2xl px-5 py-4 md:px-10 md:py-5" : "text-base md:text-xl px-4 py-3 md:px-6 md:py-3"
      } ${subtle ? "bg-green-600/95" : ""}`}
    >
      <Monitor className="w-5 h-5 md:w-5 md:h-5 shrink-0" />
      <span>{children}</span>
      <ArrowRight className="hidden sm:inline-block w-5 h-5 md:w-5 md:h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
};

// ───────────────────────── Countdown ─────────────────────────
const useCountdown = () => {
  const [t, setT] = useState({ h: 23, m: 47, s: 12 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(({ h, m, s }) => {
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`;
};

import logo from "@/assets/logo-blue.png";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

// ───────────────────────── Header ─────────────────────────
const Header = () => (
  <header className="bg-white border-b border-slate-200 py-3 md:py-5">
    <div className="container mx-auto px-4">
      <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
        <div className="relative group shrink-0">
          <div className="relative bg-slate-100 rounded-xl p-2 md:p-4 border border-slate-200 shadow-lg">
            <img src={logo} alt="Informática na Prática" className="h-16 md:h-20 lg:h-24" />
          </div>
        </div>
        <p className="text-slate-900 text-lg md:text-3xl lg:text-4xl font-bold leading-tight text-left">
          Curso de <span className="text-sky-600">Informática Online</span> Simples e Fácil.
        </p>
      </div>
    </div>
  </header>
);

// ───────────────────────── Faixa de prova social (topo) ─────────────────────────
const TopTrustBar = () => (
  <section className="bg-blue-600 py-2 md:py-2.5">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center gap-3 max-w-5xl mx-auto">
        <div className="flex -space-x-2 shrink-0">
          {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
            <img key={i} src={a} alt="" className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-blue-600 object-cover" />
          ))}
        </div>
        <div className="flex flex-col items-start leading-none">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-300 fill-yellow-300" />
            ))}
          </div>
          <p className="text-white text-xs md:text-sm font-bold mt-0.5">
            +15.000 alunos já aprenderam comigo
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Hero ─────────────────────────
const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="max-w-5xl mx-auto text-center">
          {/* Prova social sutil — sem faixa, 1 linha */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex -space-x-2 shrink-0">
              {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
                <img key={i} src={a} alt="" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
              ))}
            </div>
            <div className="text-left shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">+15.000 alunos já aprenderam</p>
            </div>
          </div>


          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-base md:text-lg mb-2">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            No seu ritmo, passo a passo
          </div>

          <h1 className="text-[2rem] md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-[-0.04em] mb-2 mx-0 px-4 md:mx-[-1rem] md:px-4 text-center">
            <span className="block">Aprenda a usar o computador</span>
            <span className="block text-blue-600">
              mesmo que você nunca tenha ligado um na vida.
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto mb-3 leading-snug font-medium">
            Imagine usar o computador com confiança e transformar a sua rotina, sem depender de ninguém!
          </p>

          {/* Selos de destaque */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm">
              <InfinityIcon className="w-4 h-4 md:w-5 md:h-5" /> ACESSO VITALÍCIO
            </span>
            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm">
              <Headphones className="w-4 h-4 md:w-5 md:h-5" /> SUPORTE AO ALUNO
            </span>
          </div>

          {/* Video */}
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200 mb-3">
            {!isPlaying ? (
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                <img
                  src={homeVideoThumb}
                  alt="Recado da professora"
                  className="w-full h-full object-cover"
                  loading="eager"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border border-white/40">
                    <PlayCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-600" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&playsinline=1&iv_load_policy=3&cc_load_policy=0&fs=1&autoplay=1"
                  title="Aula gratuita"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />

              </div>
            )}
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto mb-3 leading-relaxed font-medium">
            Em poucas aulas, você vai criar documentos e planilhas, organizar arquivos, enviar e-mails e muito mais...
          </p>



        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Selos de confiança ─────────────────────────
const TrustCards = () => (
  <section className="py-3 md:py-4 bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto">
        {[
          { icon: Headphones, label: "Suporte nas Aulas", sub: "Aprenda com orientação", bg: "bg-green-50/70 border-green-100", ic: "text-green-600" },
          { icon: ShieldCheck, label: "Garantia 7 Dias", sub: "Risco zero para você", bg: "bg-indigo-50/70 border-indigo-100", ic: "text-indigo-600" },
          { icon: Award, label: "Certificado", sub: "Reconhecido no mercado", bg: "bg-amber-50/70 border-amber-100", ic: "text-amber-500" },
          { icon: Users, label: "+15.000 Alunos", sub: "+20 anos ensinando", bg: "bg-sky-50/70 border-sky-100", ic: "text-sky-600" },
        ].map((item) => (
          <div key={item.label} className={`flex flex-col items-center text-center p-2 md:p-4 border rounded-xl shadow-sm ${item.bg}`}>
            <item.icon className={`w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 ${item.ic}`} />
            <span className="text-slate-900 font-bold text-xs md:text-sm">{item.label}</span>
            <span className="text-slate-500 text-[10px] md:text-xs">{item.sub}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────────────── Identification ─────────────────────────
const Identification = () => {
  const items = [
    "Sente vergonha de pedir ajuda toda hora pro filho ou neto",
    "Tem medo de clicar em algo e estragar o computador",
    "Não sabe anexar um arquivo, enviar um e-mail ou salvar uma foto",
    "Já tentou aprender sozinho(a) no YouTube e se perdeu",
    "Precisa do computador pra trabalhar, estudar ou resolver coisas do dia a dia",
    "Quer aprender no SEU ritmo, sem pressa e sem julgamento",
  ];
  return (
    <section id="identificacao" className="py-3 md:py-4 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-3">Esse curso é pra você se…</h2>
        <p className="text-center text-slate-600 mb-5 max-w-2xl mx-auto">
          Marque quantas você se identifica. Se for 2 ou mais, esse curso foi feito pensando exatamente em você.
        </p>
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {items.map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-300 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Agitação (custo de não aprender) ─────────────────────────
const AgitateSection = () => {
  const losses = [
    "Perder oportunidades de emprego por não saber informática",
    "Depender do filho, neto ou colega pra tarefas simples",
    "Ficar de fora quando pedem pra enviar um documento ou preencher um cadastro",
    "Sentir vergonha quando o assunto é computador",
    "Deixar de resolver coisas do banco, INSS ou governo online",
  ];
  return (
    <section id="dor" className="py-4 md:py-6 bg-red-50 border-y border-red-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full mb-3">
            ⚠ E se você continuar do mesmo jeito?
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
            Cada dia sem aprender é uma <span className="text-red-600">oportunidade perdida</span>
          </h2>
        </div>
        <ul className="space-y-2.5">
          {losses.map((l) => (
            <li key={l} className="flex items-start gap-3 bg-white border border-red-100 rounded-xl p-3.5 shadow-sm">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                ×
              </span>
              <span className="text-slate-800 font-medium">{l}</span>
            </li>
          ))}
        </ul>
        <p className="text-center text-slate-700 mt-5 text-base md:text-lg">
          A boa notícia: <strong className="text-slate-900">tudo isso muda em poucas semanas</strong> — com o método
          certo.
        </p>
      </div>
    </section>
  );
};


// ───────────────────────── Aulas Reais (após a Professora) ─────────────────────────

const AulaVideo = ({
  videoId,
  thumb,
  label,
  subtitle,
}: {
  videoId: string;
  thumb: string;
  label: string;
  subtitle: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs md:text-sm font-bold px-3 py-1 rounded-full">
          {label}
        </span>
        <span className="text-slate-600 text-sm md:text-base font-medium">{subtitle}</span>
      </div>
      <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200">
        {!isPlaying ? (
          <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
            <img src={thumb} alt={label} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-blue-600" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-slate-900/40 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg">
              Assista agora
            </div>
          </div>
        ) : (
          <div className="aspect-video relative">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&showinfo=0&playsinline=1&iv_load_policy=3&cc_load_policy=0&fs=1&autoplay=1`}
              title={label}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
};

const AulasReais = ({ aula = 1 }: { aula?: 1 | 2 }) => {
  const isFirst = aula === 1;
  return (
    <section id={`aula-${aula}`} className="py-3 md:py-5 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full mb-3">
            <PlayCircle className="w-4 h-4" /> {isFirst ? "AULA REAL — ASSISTA AGORA" : "MAIS UMA AULA REAL"}
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
            {isFirst ? (
              <>
                Veja como é uma aula <span className="text-blue-600">passo a passo</span> — do jeito que você vai
                aprender
              </>
            ) : (
              <>
                Antes de decidir, <span className="text-blue-600">assista mais uma aula</span> comigo
              </>
            )}
          </h2>
          <p className="text-slate-600 text-base md:text-lg mt-3 max-w-2xl mx-auto">
            {isFirst
              ? "Sem termos difíceis. Sem pressa. A professora explica cada clique como se você estivesse do lado dela."
              : "Se você entendeu essa aula, você vai entender o curso inteiro. É exatamente esse o ritmo."}
          </p>
        </div>

        {isFirst ? (
          <AulaVideo
            videoId="_0OPLnEiMHk"
            thumb={aulaGratisThumb}
            label="Aula 1"
            subtitle="Primeiros passos no computador"
          />
        ) : (
          <AulaVideo
            videoId="-sdVG1OtDks"
            thumb={aprendaComigoThumb}
            label="Aula 2"
            subtitle="Aprenda comigo, na prática"
          />
        )}

        <p className="text-center text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {isFirst ? (
            <>
              Essa é a mesma didática que já fez <strong className="text-slate-900">+15.000 pessoas</strong> saírem do
              zero e usarem o computador com confiança.
            </>
          ) : (
            <>
              Agora imagine <strong className="text-slate-900">+90 aulas assim</strong>, na ordem certa, do zero até
              você usar o computador sozinho(a).
            </>
          )}
        </p>
      </div>
    </section>
  );
};

// ───────────────────────── Aula 2 em destaque (reengajamento antes da oferta) ─────────────────────────
const Aula2Destaque = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section id="aula-2" className="py-4 md:py-6 bg-gradient-to-b from-blue-50 via-white to-white border-t border-blue-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <PlayCircle className="w-4 h-4" /> AULA PRÁTICA Nº 2
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
            Eu sei que pode parecer difícil agora…{" "}
            <span className="text-blue-600">mas veja o quanto é simples</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg mt-3 max-w-2xl mx-auto">
            Mais uma aula real do curso, sem edição, sem roteiro. É exatamente assim que você vai aprender em casa — no
            seu tempo, do seu jeito.
          </p>
        </div>

        {/* Vídeo em moldura destacada */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-sm opacity-30" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border-2 border-blue-200">
            {!isPlaying ? (
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                <img src={aprendaComigoThumb} alt="Aula 2 — Aprenda comigo na prática" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border border-white/40">
                    <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-blue-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4" /> Aula 2
                </div>
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-white/90 text-slate-900 text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg">
                  ▶ Assista agora
                </div>
              </div>
            ) : (
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/-sdVG1OtDks?rel=0&controls=1&modestbranding=1&showinfo=0&playsinline=1&iv_load_policy=3&cc_load_policy=0&fs=1&autoplay=1"
                  title="Aula 2 — Aprenda comigo na prática"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* Gancho de transição para a oferta */}
        <div className="max-w-2xl mx-auto mt-5 text-center">
          <p className="text-slate-700 text-base md:text-lg leading-relaxed">
            Se você acompanhou essa aula, <strong className="text-slate-900">você já consegue</strong>. Agora imagine
            repetir esse progresso em <strong className="text-blue-600">+90 aulas</strong>, na ordem certa, até dominar
            o computador de uma vez por todas.
          </p>
        </div>
      </div>
    </section>
  );
};


// ───────────────────────── Mini Value Section (acima do Instructor) ─────────────────────────
const MiniValueSection = () => {
  return (
    <section className="py-4 md:py-6 bg-blue-50">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <h2 className="text-slate-900 font-black text-xl md:text-2xl leading-tight">Curso Completo de Informática</h2>
        <p className="text-slate-500 text-sm md:text-base mt-1">+90 videoaulas • Suporte Direto • Acesso vitalício</p>
        <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-3 mb-5" />
        <div className="bg-white/70 rounded-2xl p-5 md:p-7 border border-slate-200/60 shadow-sm">
          <p className="text-slate-600 text-base md:text-lg">
            de <span className="line-through">R$ 497,00</span> por apenas
          </p>
          <p className="text-4xl md:text-6xl font-black text-green-600 leading-tight mt-1">
            R$ 297,00
          </p>
          <p className="text-amber-600 font-bold text-sm md:text-base mt-2 flex items-center justify-center gap-2">
            <Gift className="w-4 h-4" /> Hoje você leva 4 bônus exclusivos
          </p>
          <p className="text-slate-600 text-base md:text-lg mt-1">
            ou <span className="font-semibold text-slate-800">12x de R$ 30,72</span> no cartão
          </p>
          <p className="inline-flex items-center justify-center gap-1.5 text-slate-500 text-xs md:text-sm mt-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Pagamento 100% seguro · Acesso imediato
          </p>
        </div>
        <div className="mt-5">
          <CTA>Quero perder o medo do computador</CTA>
        </div>
        <div className="mt-5 rounded-xl border-2 border-green-200 bg-green-50 px-5 py-4 text-center shadow-sm">
          <p className="flex flex-row items-center justify-center gap-1.5 text-green-700 font-black text-sm md:text-lg">
            <ShieldCheck className="w-5 h-5" />{" "}
            <span className="whitespace-nowrap">GARANTIA INCONDICIONAL DE 7 DIAS</span>
          </p>
          <p className="text-slate-700 text-sm md:text-base mt-1.5 leading-snug">
            <span className="text-blue-600 font-bold">RISCO ZERO!</span> Se não gostar, devolvemos{" "}
            <span className="text-green-700 font-bold whitespace-nowrap">100% do seu dinheiro.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Instructor ─────────────────────────
const Instructor = () => (
  <section id="professora" className="py-4 md:py-6 bg-white">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative">
          <img src={elisa} alt="Professora Elisa" className="rounded-3xl shadow-xl w-full object-cover aspect-[4/5]" />
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-200 px-4 py-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-lg font-black text-slate-900 leading-none">+15.000</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Alunos formados</div>
            </div>
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4" /> Quem vai te ensinar
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
            Oi, eu sou a <span className="text-blue-600">Professora Elisa</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
            Há mais de <strong>20 anos</strong> eu ensino informática pra adultos que nunca tinham tocado num
            computador. E descobri uma coisa:{" "}
            <strong>o problema nunca foi a pessoa — era o jeito que ensinavam.</strong>
          </p>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
            Por isso criei um método simples, devagar e com linguagem do dia a dia. Sem palavras difíceis, sem pressa.
            Você assiste, faz junto comigo, e em poucas semanas tá usando o computador sozinho(a).
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-700">
                +20 anos
                <br />
                de experiência
              </div>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <Award className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-700">
                Método
                <br />
                próprio
              </div>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <HeartHandshake className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-700">
                Suporte
                <br />
                humano
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Method (3 steps) ─────────────────────────
const Method = () => {
  const steps = [
    {
      n: "1",
      icon: Play,
      t: "Assista às aulas curtas e claras",
      badge: "O computador deixa de ser um bicho de 7 cabeças",
      d: "Aulas de 5 a 15 minutos, sem termos difíceis. Você assiste no celular, computador ou tablet, quando quiser.",
    },
    {
      n: "2",
      icon: MousePointer,
      t: "Pratique clicando junto comigo",
      badge: "Você ganha confiança a cada passo",
      d: "Eu mostro exatamente onde clicar. Você repete comigo e aprende na prática, sem pular nada.",
    },
    {
      n: "3",
      icon: Rocket,
      t: "Use sozinho no seu dia a dia",
      badge: "Você deixa de depender dos outros",
      d: "Em poucos dias você já envia e-mails, cria documentos, organiza arquivos e navega na internet sem medo.",
    },
  ];
  return (
    <section className="py-6 md:py-10 bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full mb-3">
            <Monitor className="w-4 h-4" /> SUA TRANSFORMAÇÃO
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">
            Do medo à confiança em 3 passos simples
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Você não precisa ter experiência. Basta seguir o passo a passo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="relative bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-100 text-slate-500 font-bold text-sm md:text-base flex items-center justify-center">
                    {s.n}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{s.t}</h3>

                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded bg-green-600 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-green-700 text-xs md:text-sm font-bold leading-snug">{s.badge}</p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm md:text-base font-bold px-4 py-2.5 rounded-full">
            <ThumbsUp className="w-4 h-4 md:w-5 md:h-5" />
            Se milhares de alunos conseguiram aprender dessa forma, você também consegue.
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Transformation (Módulos + Benefícios reais) ─────────────────────────
const Modules = () => {
  const steps = [
    {
      icon: windowsIcon,
      module: "Windows",
      outcome: "Organizar fotos, documentos e arquivos sem se perder",
    },
    {
      icon: wordIcon,
      module: "Word",
      outcome: "Montar currículo e enviar por e-mail sozinho(a)",
    },
    {
      icon: excelIcon,
      module: "Excel",
      outcome: "Criar planilhas e controlar contas do dia a dia",
    },
    {
      icon: powerpointIcon,
      module: "PowerPoint",
      outcome: "Fazer apresentações bonitas e claras",
    },
    {
      icon: internetIcon,
      module: "Internet e E-mail",
      outcome: "Marcar consultas, pesquisar e resolver tudo online",
    },
    {
      icon: typingIcon,
      module: "Digitação",
      outcome: "Digitar mais rápido e sem olhar para o teclado",
    },
  ];
  return (
    <section id="modulos" className="py-6 md:py-10 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-black px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Seu passo a passo
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
            Do zero à independência no computador
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            6 módulos práticos. Cada um te leva a uma conquista do dia a dia.
          </p>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 md:-translate-x-1/2" />

          <div className="space-y-4 md:space-y-6">
            {steps.map((s, idx) => (
              <div
                key={s.module}
                className={`relative flex items-center gap-4 md:gap-8 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* number + icon bubble */}
                <div className="relative z-10 shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-blue-200 shadow-sm flex items-center justify-center">
                    <img
                      src={s.icon}
                      alt={`Ícone ${s.module}`}
                      className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      loading="lazy"
                      width="32"
                      height="32"
                    />
                  </div>
                  <span className="mt-1 text-[10px] md:text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* center dot on timeline */}
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />

                {/* card */}
                <div
                  className={`flex-1 bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm ${
                    idx % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className="text-xs md:text-sm font-black text-blue-600 uppercase tracking-wide mb-1">
                    Módulo {s.module}
                  </p>
                  <h3 className="text-slate-900 font-bold text-base md:text-lg leading-snug">
                    {s.outcome}
                  </h3>
                </div>

                {/* empty spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs md:text-sm mt-6 max-w-2xl mx-auto">
          Tudo em <strong className="text-slate-800">+90 videoaulas curtas</strong>, passo a passo.
        </p>
      </div>
    </section>
  );
};

// ───────────────────────── Bloco Emocional (Vision) ─────────────────────────
const EmotionalVision = () => {
  const moments = [
    {
      icon: Monitor,
      title: "Você senta no computador",
      subtitle: "E ele deixa de ser um bicho de sete cabeças",
      before: "Tremia só de olhar a tela",
      after: "Agora abre, navega e resolve com calma",
    },
    {
      icon: Mail,
      title: "Você manda um e-mail sozinho",
      subtitle: "Sem depender de ninguém para escrever ou anexar arquivo",
      before: "Pedía ajuda para enviar qualquer coisa",
      after: "Agora escreve, anexa e responde sozinho(a)",
    },
    {
      icon: HeartHandshake,
      title: "Você conta a conquista para a família",
      subtitle: "E ouve: 'nossa, aprendeu sozinho!'",
      before: "Ficava de fora das conversas digitais",
      after: "Agora participa e ainda ensina os outros",
    },
  ];

  return (
    <section className="py-8 md:py-14 bg-gradient-to-b from-blue-700 via-blue-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-6 md:mb-10">
          <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Sua rotina muda em poucas semanas
          </span>
          <h2 className="text-2xl md:text-4xl font-black leading-tight">
            Veja o que muda no seu dia a dia
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {moments.map((m) => (
            <div
              key={m.title}
              className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 md:p-6 text-center hover:bg-white/15 transition-colors"
            >
              <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-yellow-400/20 flex items-center justify-center mb-4">
                <m.icon className="w-7 h-7 md:w-8 md:h-8 text-yellow-300" strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-white mb-1">{m.title}</h3>
              <p className="text-blue-100 text-sm md:text-base mb-4">{m.subtitle}</p>

              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2 text-sm text-blue-100/80">
                  <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-red-400/30 flex items-center justify-center text-[10px]">✕</span>
                  <span>{m.before}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white font-medium">
                  <CheckCircle2 className="shrink-0 mt-0.5 w-4 h-4 text-green-400" />
                  <span>{m.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-blue-100 text-base md:text-lg font-medium mt-6 md:mt-8 max-w-2xl mx-auto">
          Isso não é sonho. É o que acontece com quem começa o curso hoje.
        </p>
      </div>
    </section>
  );
};

// ───────────────────────── Social Proof (WhatsApp + Facebook) ─────────────────────────
const audioTestimonials = [
  { name: "Antonio", description: "Continuação do depoimento", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Vanderlei", description: "Superou as dificuldades com tecnologia", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const whatsappScreenshots = [
  { image: whatsappTestimonial2, description: "Aluno Roberto agradecendo pela didática das aulas de planilha" },
];

const fbAvatars = [fbAvatar1, fbAvatar2, fbAvatar3, fbAvatar4, fbAvatar5, fbAvatar6, fbAvatar7, fbAvatar8];

const facebookComments = [
  {
    name: "Luciana M.",
    text: "Professora maravilhosa! Aprendi em 1 semana o que não consegui em meses 🙌",
    time: "2 h",
    likes: 14,
    hasHeart: true,
  },
  {
    name: "Tereza S.",
    text: "Tô conseguindo usar o computador sozinha, muito obrigada! 😍",
    time: "5 h",
    likes: 23,
    hasHeart: false,
  },
  {
    name: "Carlos A.",
    text: "Melhor investimento que fiz! Já indiquei pra toda família",
    time: "1 d",
    likes: 8,
    hasHeart: false,
  },
  {
    name: "Juliana R.",
    text: "Ganhei uma promoção no trabalho por causa do curso! 🎉",
    time: "3 d",
    likes: 31,
    hasHeart: true,
  },
  {
    name: "Marcos V.",
    text: "Achei que era difícil mas a didática é perfeita, parabéns!",
    time: "1 sem",
    likes: 12,
    hasHeart: false,
  },
  {
    name: "Patrícia S.",
    text: "Minha mãe de 62 anos aprendeu! Recomendo demais 👏",
    time: "1 sem",
    likes: 19,
    hasHeart: true,
  },
  {
    name: "Roberto L.",
    text: "Finalmente consigo fazer planilhas no trabalho. Obrigado! 💪",
    time: "2 sem",
    likes: 7,
    hasHeart: false,
  },
  {
    name: "Maria G.",
    text: "Com 68 anos aprendi a mexer no computador. Deus abençoe! 🙏",
    time: "3 sem",
    likes: 42,
    hasHeart: true,
  },
];

const AudioPlayerLight = ({ testimonial }: { testimonial: (typeof audioTestimonials)[0] }) => {
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
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
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
    <div
      className={`bg-white border rounded-xl p-4 transition-all ${hasError ? "border-red-300 opacity-50" : "border-slate-200 hover:border-blue-300 shadow-sm"}`}
    >
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        preload="none"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          disabled={hasError}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform shadow-md ${hasError ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:scale-105"}`}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-slate-900 font-semibold text-sm">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-blue-600" />
          </div>
          <p className="text-slate-500 text-xs mb-2">{hasError ? "Áudio não disponível" : testimonial.description}</p>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FBComment = ({ comment, index }: { comment: (typeof facebookComments)[0]; index: number }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
    <div className="flex gap-2">
      <img
        src={fbAvatars[index % fbAvatars.length]}
        alt=""
        className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]"
      />
      <div className="flex-1 min-w-0">
        <div className="bg-slate-100 rounded-2xl px-3 py-2">
          <p className="text-slate-900 text-xs font-semibold leading-none mb-1 blur-[3px] select-none">
            {comment.name}
          </p>
          <p className="text-slate-700 text-xs leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-2">
          <span className="text-[11px] text-slate-400">{comment.time}</span>
          <span className="text-[11px] text-slate-500 font-medium cursor-pointer hover:underline">
            Curtir
          </span>
          <span className="text-[11px] text-slate-500 font-medium cursor-pointer hover:underline">
            Responder
          </span>
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
);

const SocialProof = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
    <section id="depoimentos" className="py-4 md:py-6 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-5">


          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
                <img key={i} src={a} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-medium">+15.000 alunos já aprenderam</p>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
            Se eles conseguiram, <span className="text-blue-600">você também consegue</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium">
            Pessoas como você, que{" "}
            <span className="text-slate-900 font-bold">nunca tinham tocado num computador</span> — e hoje fazem tudo
            sozinhas, sem pedir ajuda a ninguém
          </p>
        </div>

        {/* WhatsApp + Audios */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-5">
          {/* WhatsApp Screenshots */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Prints de Conversas</h3>
            </div>
            <div className="space-y-3">
              {whatsappScreenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="bg-slate-100 rounded-2xl p-2 shadow-xl border-2 border-blue-200 ring-2 ring-blue-100"
                >
                  <div className="bg-slate-200 rounded-t-lg pt-1.5 pb-0.5 px-3">
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-slate-400 rounded-full"></div>
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

          {/* Audio Players */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Áudios de Alunos</h3>
            </div>
            <div className="space-y-3">
              {audioTestimonials.map((testimonial, index) => (
                <AudioPlayerLight key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Highlight phrase */}
        <div className="text-center my-4 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
            Eles começaram do zero.{" "}
            <span className="text-green-600">Agora é a sua vez de conseguir.</span>
          </p>
        </div>

        {/* Facebook-style comments — primeira metade (sempre visível) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto mb-2">
          {facebookComments.slice(0, 4).map((comment, index) => (
            <FBComment key={index} comment={comment} index={index} />
          ))}
        </div>

        {/* Facebook-style comments — restante (revelado ao clicar) */}
        {showMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto mb-2">
            {facebookComments.slice(4).map((comment, index) => (
              <FBComment key={index + 4} comment={comment} index={index + 4} />
            ))}
          </div>
        )}

        {/* Botão Ver mais / Ver menos */}
        <div className="text-center mt-3 mb-5">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border-2 border-blue-200 transition-all active:scale-[.99]"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${showMore ? "rotate-180" : ""}`} />
            {showMore ? "Ver menos depoimentos" : "Ver mais depoimentos"}
          </button>
        </div>
      </div>
    </section>

    </>
  );
};

// ───────────────────────── Certificate ─────────────────────────
const Certificate = () => (
  <section className="py-4 md:py-6 bg-slate-50">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <img
          src={certificado}
          alt="Certificado de conclusão"
          className="rounded-2xl shadow-xl border border-slate-200"
        />
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            BÔNUS
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Você sai com certificado de conclusão</h2>
          <p className="text-slate-700 text-base md:text-lg mb-6">
            Ao terminar o curso, você recebe um certificado digital pra anexar no currículo, no LinkedIn ou pra mostrar
            pra família que <strong>você conseguiu</strong>.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Certificado digital válido em todo Brasil",
              "Pronto pra anexar no currículo",
              "Modelo profissional e elegante",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                {x}
              </li>
            ))}
          </ul>
          <CTA size="md">Quero meu certificado!</CTA>
        </div>
      </div>
    </div>
  </section>
);


// ───────────────────────── Pricing (Oferta principal — hierarquia forte) ─────────────────────────
const Pricing = () => (
  <section id="oferta" className="py-8 md:py-14 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-black leading-tight">Sua vaga está aqui</h2>
        <p className="text-blue-100 text-base md:text-lg mt-2">Acesso liberado na hora • Vitalício</p>
      </div>

      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400">
        {/* Faixa de topo */}
        <div className="bg-yellow-400 text-blue-900 text-center py-2 px-4 font-black text-sm md:text-base uppercase tracking-wide">
          🎁 Hoje leva 4 bônus exclusivos (grátis)
        </div>

        <div className="p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-black text-center mb-1">Curso Completo de Informática</h3>
          <p className="text-center text-slate-500 text-sm mb-5">+90 videoaulas • 6 módulos • Acesso vitalício</p>

          {/* Preço */}
          <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl p-6 text-center mb-5 border-2 border-green-200">
            <p className="text-slate-500 text-sm mb-1">De <span className="line-through">R$ 497,00</span> por apenas</p>
            <p className="text-6xl md:text-7xl font-black text-green-600 leading-none tracking-tight">R$ 297</p>
            <p className="text-slate-700 text-base mt-2">à vista no PIX</p>
            <p className="text-base text-slate-600 mt-1">
              ou <strong className="text-slate-900">12x de R$ 30,72</strong> no cartão
            </p>
          </div>

          {/* Tudo que inclui */}
          <p className="text-center text-slate-500 text-xs font-black uppercase tracking-wide mb-3">Tudo que você recebe hoje</p>
          <ul className="space-y-2.5 mb-6">
            {[
              ["+90 videoaulas passo a passo", "R$ 297"],
              ["Acesso vitalício (nunca perde)", "Incluso"],
              ["Certificado de conclusão", "Bônus"],
              ["Suporte direto com a professora", "Bônus"],
              ["Bônus 1: Atalhos essenciais", "R$ 47"],
              ["Bônus 2: Currículo profissional", "R$ 97"],
              ["Bônus 3: Mercado de trabalho", "R$ 127"],
              ["Bônus 4: E-mail Profissional", "R$ 97"],
            ].map(([x, v]) => (
              <li key={x} className="flex items-center justify-between gap-3 text-slate-800 text-sm md:text-base border-b border-slate-100 pb-2">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="font-medium">{x}</span>
                </span>
                <span className={`text-xs md:text-sm font-bold shrink-0 ${v === "Bônus" ? "text-amber-600" : "text-slate-400"}`}>{v}</span>
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 rounded-xl p-3 text-center mb-5">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Valor total</p>
            <p className="text-slate-400 line-through text-lg font-bold">R$ 665,00</p>
            <p className="text-green-600 font-black text-2xl md:text-3xl leading-none mt-1">Você paga só R$ 297</p>
          </div>

          <CTA>Quero começar agora</CTA>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-green-600" /> Pagamento 100% seguro</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> 7 dias de garantia</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Acesso imediato</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Guarantee ─────────────────────────
const GuaranteeBlock = () => (
  <section className="py-4 md:py-6 bg-white">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="bg-green-50 border-2 border-green-600 rounded-3xl p-6 md:p-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600 mb-5">
          <ShieldCheck className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">Garantia incondicional de 7 dias</h2>
        <p className="text-slate-700 text-base md:text-lg leading-relaxed">
          Faça sua matrícula hoje, assista as aulas, teste o método. Se em <strong>7 dias</strong> você achar que o
          curso não é pra você — por qualquer motivo — <strong>devolvemos 100% do seu dinheiro</strong>. Sem perguntas,
          sem burocracia. <strong>O risco é todo nosso.</strong>
        </p>
      </div>
    </div>
  </section>
);

// ───────────────────────── FAQ ─────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "Eu nunca mexi num computador. Vou conseguir mesmo?",
      a: "Sim! O curso foi feito justamente pra quem está começando do zero. A professora explica passo a passo, com linguagem simples, sem termos técnicos. +15.000 alunos já provaram que funciona.",
    },
    {
      q: "Quanto tempo leva pra concluir?",
      a: "Você aprende no seu ritmo. Em média os alunos terminam em 30 a 60 dias dedicando 20-30 min por dia. Mas como o acesso é vitalício, você tem o tempo que precisar.",
    },
    {
      q: "Em quanto tempo recebo o acesso?",
      a: "Na hora. Logo após o pagamento aprovado você recebe os dados de acesso no seu e-mail.",
    },
    {
      q: "Funciona no celular?",
      a: "Sim. Você pode assistir no celular, tablet ou computador. Mas pra praticar é importante ter acesso a um computador.",
    },
    {
      q: "Como funciona a garantia?",
      a: "Você tem 7 dias pra testar o curso. Se não gostar, é só mandar um e-mail e devolvemos 100% do valor. Sem perguntas.",
    },
    {
      q: "O certificado é válido?",
      a: "Sim. É um certificado digital de conclusão, aceito em todo o Brasil pra anexar em currículos, LinkedIn e processos seletivos.",
    },
    {
      q: "E se eu travar numa aula? Tem suporte?",
      a: "Tem sim. Você pode tirar dúvidas direto com a professora pelo WhatsApp e pela área do aluno.",
    },
  ];
  return (
    <section className="py-4 md:py-6 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-5">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-5 text-left"
              >
                <span className="font-bold text-slate-900">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && <div className="px-5 pb-5 text-slate-700 leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <CTA>Quero garantir minha vaga agora!</CTA>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Final CTA ─────────────────────────
const FinalCTA = () => (
  <section className="py-4 md:py-6 bg-slate-900 text-white">
    <div className="container mx-auto px-4 max-w-3xl text-center">
      <InfinityIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
      <h2 className="text-3xl md:text-5xl font-black mb-4">Pare de depender dos outros pra usar o computador</h2>
      <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
        Em poucas semanas você vai olhar pra trás e não vai acreditar como era difícil antes. Sua vida fica mais leve,
        mais independente. <strong className="text-white">Hoje é o dia.</strong>
      </p>
      <CTA>Quero começar agora!</CTA>
      <p className="text-xs text-slate-400 mt-4">🔒 Pagamento seguro • 7 dias de garantia • Acesso imediato</p>
    </div>
  </section>
);

// ───────────────────────── Footer ─────────────────────────
const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-10 text-center text-xs">
    <div className="container mx-auto px-4">
      <p className="font-bold text-slate-300 mb-2">Informática na Prática LTDA</p>
      <p className="mb-1">© 2026 — Todos os direitos reservados</p>
      <p className="mb-3 text-slate-500">CNPJ: 32.373.460/0001-51</p>
      <div className="flex justify-center gap-4">
        <a href="/termos-de-uso" className="hover:text-white">
          Termos de Uso
        </a>
        <a href="/politica-de-privacidade" className="hover:text-white">
          Privacidade
        </a>
      </div>
    </div>
  </footer>
);


// ───────────────────────── Sticky CTA (fixo no rodapé) ─────────────────────────
const StickyCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const pricing = document.getElementById("oferta");
      const depoimentos = document.getElementById("depoimentos");
      const inOffer = pricing ? (() => {
        const rect = pricing.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      })() : false;
      const depoimentosStarted = depoimentos ? (() => {
        const rect = depoimentos.getBoundingClientRect();
        return rect.top < window.innerHeight;
      })() : window.scrollY > 700;
      setShow(depoimentosStarted && !inOffer);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-3 pb-3 md:pb-4 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <button
          onClick={() => openCheckout()}
          className="group flex w-full items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[.99] text-white font-extrabold rounded-2xl shadow-2xl shadow-green-600/30 transition-all whitespace-nowrap text-lg md:text-xl px-5 py-4"
        >
          <Monitor className="w-5 h-5 shrink-0" />
          <span>Quero começar agora</span>
          <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// ───────────────────────── Page ─────────────────────────
const VendasNovo = () => {
  useEffect(() => {
    document.title = "Aprenda Informática do Zero • Curso Online com Garantia";
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <Hero />
      {/* 1. Prova social imediata (reduz incerteza logo após o gancho) */}
      <TrustCards />
      {/* 2. Prova social profunda antes da identificação */}
      <SocialProof />
      {/* 3. Identificação — "esse curso é pra mim" */}
      <Identification />
      {/* 3b. Prova viva imediata: aula real 1 logo após identificação */}
      <AulasReais aula={1} />
      {/* 4. Problema / agitação da dor + contraste de futuro (bloco único) */}
      <AgitateSection />
      {/* 5. Autoridade: quem vai te ensinar (antídoto emocional da dor) */}
      <Instructor />
      {/* 6. Solução: a transformação (plano claro, prova da promessa da professora) */}
      <Method />
      {/* 7. Micro-compromisso: quiz interativo */}
      <QuizIdentificacao />
      {/* 8. Conteúdo/entregável */}
      <Modules />
      {/* 9. Visão emocional (desejo antes do preço) */}
      <EmotionalVision />
      {/* 10b. Reengajamento antes da oferta: aula real 2 em destaque */}
      <Aula2Destaque />

      {/* 11. Value stack: bônus antes da oferta */}
      <section id="sessao-valor" className="py-4 md:py-6 bg-slate-50">
        <div className="container mx-auto px-4">
          <HeroBonuses variant="light" />
        </div>
      </section>
      {/* 12. Oferta */}
      <section id="oferta">
        <Pricing />
      </section>
      {/* 13. Reforço de valor pós-preço */}
      <Certificate />
      {/* 13b. Garantia — reforça confiança antes das objeções */}
      <GuaranteeBlock />
      {/* 14. Quebra de objeções */}
      <FAQ />
      {/* 15. Fechamento */}
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      <StickyCTA />
    </div>
  );
};

export default VendasNovo;
