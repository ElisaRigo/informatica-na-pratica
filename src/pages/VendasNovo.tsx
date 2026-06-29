import { useEffect, useState, useRef } from "react";
import {
  ShieldCheck, Lock, CheckCircle2, Star, Clock, Award, Users,
  PlayCircle, Monitor, Mail, FileText, Globe, Presentation, Keyboard,
  Sparkles, GraduationCap, HeartHandshake, Infinity as InfinityIcon,
  ChevronDown, ArrowRight, Play, Pause, Volume2, Smartphone, ThumbsUp, Heart, Headphones,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import logoBlue from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import elisaTeaching from "@/assets/elisa-teaching.jpg";
import heroCover from "@/assets/hero-video-cover-home.jpg";
import homeVideoThumbAsset from "@/assets/aprender-hero-cover-v3.jpg.asset.json";
const homeVideoThumb = homeVideoThumbAsset.url;
import certificado from "@/assets/certificado-exemplo.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import avatar6 from "@/assets/testimonial-new-6.jpg";
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

const openCheckout = () => openHotmartCheckout();

// ───────────────────────── CTA Button ─────────────────────────
const CTA = ({ children = "Quero aprender informática agora", size = "lg", subtle = false }: any) => (
  <button
    onClick={openCheckout}
    className={`group inline-flex items-center justify-center gap-1 md:gap-1.5 bg-green-600 hover:bg-green-700 active:scale-[.99] text-white font-extrabold rounded-2xl shadow-lg shadow-green-600/20 transition-all whitespace-nowrap w-full ${
      size === "lg" ? "text-sm md:text-lg px-4 py-3 md:px-10 md:py-5" : "text-xs md:text-base px-3 py-2.5 md:px-6 md:py-3"
    } ${subtle ? "bg-green-600/95" : ""}`}
  >
    <Monitor className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
    <span>{children}</span>
    <ArrowRight className="hidden sm:inline-block w-4 h-4 md:w-5 md:h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
  </button>
);

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
  <header className="bg-white border-b border-slate-200 py-4 md:py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
        <div className="relative group shrink-0">
          <div className="relative bg-slate-100 rounded-xl p-2 md:p-4 border border-slate-200 shadow-lg">
            <img src={logo} alt="Informática na Prática" className="h-16 md:h-20 lg:h-24" />
          </div>
        </div>
        <p className="text-slate-900 text-base md:text-2xl lg:text-3xl font-bold leading-tight text-left">
          Curso de <span className="text-sky-600">Informática Online</span> — Simples e para Todos.
        </p>
      </div>
    </div>
  </header>
);

// ───────────────────────── Hero ─────────────────────────
const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Top urgency strip */}
      <div className="bg-blue-600 text-center py-2.5 px-4">
        <span className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-white">
          <span>🔥</span>
          Oferta especial de 40% OFF por tempo limitado
        </span>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full mb-5">
            <GraduationCap className="w-4 h-4" /> Curso 100% Online • Aulas Passo a Passo
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-5">
            Aprenda a usar o computador<br className="hidden md:block" />
            <span className="text-blue-600"> mesmo que você nunca tenha ligado um na vida.</span>
          </h1>

          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto mb-7">
            Em poucas semanas, você vai usar Word, Excel, arquivos, internet e e-mail com confiança — sem depender de filho, neto ou ninguém.
          </p>

          {/* Video */}
          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200 mb-7">
            {!isPlaying ? (
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={homeVideoThumb}
                  alt="Aula demonstrativa gratuita"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-14 h-14 md:w-16 md:h-16 text-blue-600" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1"
                  title="Aula gratuita"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <CTA>Quero começar agora!</CTA>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-xs md:text-sm text-slate-600">
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-green-600" /> Pagamento seguro</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> 7 dias de garantia</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Acesso imediato</span>
          </div>

          {/* Social proof inline */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
                <img key={i} src={a} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
              <p className="text-xs text-slate-600 font-medium">+15.000 alunos já aprenderam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-3">
          Esse curso é pra você se…
        </h2>
        <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
          Marque quantas você se identifica. Se for 2 ou mais, esse curso foi feito pensando exatamente em você.
        </p>
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {items.map((t) => (
            <div key={t} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-300 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{t}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><CTA>Quero aprender do zero!</CTA></div>
      </div>
    </section>
  );
};

// ───────────────────────── Mini Value Section (acima do Instructor) ─────────────────────────
const MiniValueSection = () => {
  return (
    <section className="py-8 md:py-12 bg-blue-50">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <h2 className="text-slate-900 font-black text-xl md:text-2xl leading-tight">
          Curso Completo de Informática
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-1">
          +90 videoaulas • Suporte Direto • Acesso vitalício
        </p>
        <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-3 mb-5" />
        <p className="text-slate-500 text-sm md:text-base">
          de <span className="line-through text-slate-400">R$ 497,00</span> por apenas
        </p>
        <p className="text-green-600 font-black text-4xl md:text-5xl leading-tight mt-1">
          R$ 297,00
        </p>
        <p className="text-slate-600 text-base md:text-lg mt-1">
          ou <span className="font-semibold text-slate-800">12x de R$ 30,72</span> no cartão
        </p>
        <p className="inline-flex items-center justify-center gap-1.5 text-slate-500 text-xs md:text-sm mt-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Pagamento 100% seguro · Acesso imediato
        </p>
        <div className="mt-5">
          <CTA>Quero perder o medo do computador</CTA>
        </div>
        <div className="mt-5 rounded-xl border-2 border-green-200 bg-green-50 px-5 py-4 text-center shadow-sm">
          <p className="flex flex-row items-center justify-center gap-1.5 text-green-700 font-black text-sm md:text-lg">
            <ShieldCheck className="w-5 h-5" /> <span className="whitespace-nowrap">GARANTIA INCONDICIONAL DE 7 DIAS</span>
          </p>
          <p className="text-slate-700 text-sm md:text-base mt-1.5 leading-snug">
            <span className="text-blue-600 font-bold">RISCO ZERO!</span> Se não gostar, devolvemos <span className="text-green-700 font-bold whitespace-nowrap">100% do seu dinheiro.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Instructor ─────────────────────────
const Instructor = () => (
  <section className="py-8 md:py-12 bg-white">
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
            Há mais de <strong>20 anos</strong> eu ensino informática pra adultos que nunca tinham
            tocado num computador. E descobri uma coisa: <strong>o problema nunca foi a pessoa — era o jeito que ensinavam.</strong>
          </p>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
            Por isso criei um método simples, devagar e com linguagem do dia a dia. Sem palavras difíceis, sem pressa.
            Você assiste, faz junto comigo, e em poucas semanas tá usando o computador sozinho(a).
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center bg-slate-50 rounded-xl p-3"><Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" /><div className="text-xs font-bold text-slate-700">+20 anos<br/>de experiência</div></div>
            <div className="text-center bg-slate-50 rounded-xl p-3"><Award className="w-5 h-5 text-blue-600 mx-auto mb-1" /><div className="text-xs font-bold text-slate-700">Método<br/>próprio</div></div>
            <div className="text-center bg-slate-50 rounded-xl p-3"><HeartHandshake className="w-5 h-5 text-blue-600 mx-auto mb-1" /><div className="text-xs font-bold text-slate-700">Suporte<br/>humano</div></div>
          </div>
          <CTA size="md">Quero aprender sem medo!</CTA>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Method (3 steps) ─────────────────────────
const Method = () => {
  const steps = [
    { n: "1", t: "Assiste a aula curta", d: "Cada aula tem entre 5 e 15 minutos. Você assiste no celular, computador ou tablet, quando quiser." },
    { n: "2", t: "Faz junto comigo", d: "Você abre o computador e vai clicando junto. Eu mostro cada passo, sem pular nada." },
    { n: "3", t: "Pratica no seu dia a dia", d: "Em poucos dias você já tá enviando e-mail, usando Word e mexendo na internet sem medo." },
  ];
  return (
    <section className="py-8 md:py-12 bg-blue-600 text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black mb-3">Como funciona — em 3 passos simples</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">Sem complicação, sem termos técnicos. Só você, o computador e eu te guiando.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-white text-blue-600 font-black text-xl flex items-center justify-center mb-4">{s.n}</div>
              <h3 className="text-xl font-bold mb-2">{s.t}</h3>
              <p className="text-blue-50 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Modules ─────────────────────────
const Modules = () => {
  const mods = [
    { i: windowsIcon, t: "Windows e Organização", d: "Ligar, desligar, mouse, teclado, área de trabalho, pastas e arquivos com segurança.", lessons: "Módulo 1" },
    { i: wordIcon, t: "Word Profissional", d: "Escreva cartas, currículos e documentos. Formate, salve e imprima sem medo.", lessons: "Módulo 2" },
    { i: excelIcon, t: "Excel na Prática", d: "Crie planilhas, fórmulas e organize contas e gastos do mês.", lessons: "Módulo 3" },
    { i: powerpointIcon, t: "PowerPoint Impactante", d: "Faça apresentações bonitas e profissionais, mesmo sem experiência.", lessons: "Módulo 4" },
    { i: internetIcon, t: "Internet e E-mail", d: "Pesquise no Google, envie e receba e-mails, evite golpes e use o YouTube.", lessons: "Módulo 5" },
    { i: typingIcon, t: "Digitação Profissional", d: "Ganhe velocidade no teclado e produtividade no dia a dia.", lessons: "Módulo 6" },
  ];
  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">CONTEÚDO COMPLETO</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">Tudo o que você vai aprender</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">+90 videoaulas práticas, organizadas em 6 módulos, do básico ao essencial.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mods.map((m) => (
            <div key={m.t} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <img src={m.i} alt={m.t} className="w-8 h-8" loading="lazy" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{m.t}</h3>
              <p className="text-slate-600 text-sm mb-3">{m.d}</p>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{m.lessons}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><CTA>Quero ver todas as aulas!</CTA></div>
      </div>
    </section>
  );
};

// ───────────────────────── Testimonials ─────────────────────────
import { Quote } from "lucide-react";

const Testimonials = () => {
  const t = [
    { name: "Maria Helena, 58 anos", role: "Aposentada", image: avatar1, text: "Achei que era tarde demais para aprender. A Elisa provou que eu estava errada! Hoje faço tudo sozinha no computador.", rating: 5 },
    { name: "Carla Eduarda, 23 anos", role: "Comerciante", image: avatar2, text: "Finalmente consigo fazer minhas planilhas de controle de estoque. Economizo 3 horas por semana!", rating: 5 },
    { name: "Pedro Junk, 38 anos", role: "Empresário", image: avatar3, text: "Ganhei uma promoção porque agora domino Word e Excel. O investimento se pagou em menos de um mês.", rating: 5 },
    { name: "Roberta Silva, 28 anos", role: "Autônoma", image: avatar4, text: "A didática da professora é incrível. Ela explica de um jeito que até quem nunca usou computador entende.", rating: 5 },
    { name: "Fernanda Costa, 28 anos", role: "Estudante", image: avatar5, text: "Consegui meu primeiro emprego graças ao curso! Fiz meu currículo perfeito e impressionei na entrevista.", rating: 5 },
    { name: "José Antônio, 61 anos", role: "Aposentado", image: avatar6, text: "Meus netos não acreditaram quando viram eu usando o computador sozinho. Valeu cada centavo!", rating: 5 },
  ];
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}</div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">+15.000 alunos já mudaram de vida</h2>
          <p className="text-slate-600">Veja o que dizem quem começou exatamente como você.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.map((x) => (
            <div key={x.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-all hover:-translate-y-1">
              <Quote className="w-8 h-8 text-blue-400/50 mb-3" />
              <div className="flex mb-3">{[...Array(x.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
              <p className="text-slate-700 text-sm leading-relaxed mb-5">"{x.text}"</p>
              <div className="flex items-center gap-3">
                <img src={x.image} alt={x.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30" loading="lazy" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">{x.name}</div>
                  <div className="text-xs text-slate-500">{x.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
          {[
            { number: "15.000+", label: "Alunos" },
            { number: "98%", label: "Satisfação" },
            { number: "4.9", label: "Avaliação" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">{stat.number}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Social Proof (WhatsApp + Facebook) ─────────────────────────
const audioTestimonials = [
  { name: "Antonio", description: "Depoimento sobre sua experiência com o curso", audioSrc: "/audio/antonio-1.ogg" },
  { name: "Antonio", description: "Continuação do depoimento", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Amanda", description: "Como o curso transformou sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Superou as dificuldades com tecnologia", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const whatsappScreenshots = [
  { image: whatsappTestimonial1, description: "Mãe de aluna elogiando o curso e voltando para comprar outro" },
  { image: whatsappTestimonial2, description: "Aluno Roberto agradecendo pela didática das aulas de planilha" },
];

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

const AudioPlayerLight = ({ testimonial }: { testimonial: typeof audioTestimonials[0] }) => {
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
    <div className={`bg-white border rounded-xl p-4 transition-all ${hasError ? "border-red-300 opacity-50" : "border-slate-200 hover:border-blue-300 shadow-sm"}`}>
      <audio ref={audioRef} src={testimonial.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} onError={handleError} preload="auto" />
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} disabled={hasError} className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform shadow-md ${hasError ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:scale-105"}`}>
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

const SocialProof = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4 border border-slate-200 rounded-full px-5 py-2 bg-slate-50">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {fbAvatars.slice(0, 5).map((av, i) => (
                  <img key={i} src={av} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <span className="text-slate-900 text-sm font-bold ml-1">+15.000 alunos</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-lg">★</span>
              ))}
              <span className="text-slate-900 text-sm font-semibold ml-1">4.9/5</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
            Veja o que dizem os alunos que <span className="text-blue-600">saíram do zero</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium">
            Histórias reais de pessoas que <span className="text-slate-900 font-bold">não sabiam nem ligar o computador</span> — e hoje usam com total confiança
          </p>
        </div>

        {/* WhatsApp + Audios */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
          {/* WhatsApp Screenshots */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Prints de Conversas</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {whatsappScreenshots.map((screenshot, index) => (
                <div key={index} className="bg-slate-100 rounded-xl p-1.5 shadow-lg border border-slate-200">
                  <div className="bg-slate-200 rounded-t-lg pt-1.5 pb-0.5 px-3">
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-slate-400 rounded-full"></div>
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
        <div className="text-center my-8 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
            Se essas pessoas conseguiram, <span className="text-green-600">você também consegue.</span>
            <br />
            <span className="text-slate-500 font-medium text-lg md:text-xl">Mesmo começando do zero.</span>
          </p>
        </div>

        {/* Facebook-style comments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto mb-10">
          {facebookComments.map((comment, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
              <div className="flex gap-2">
                <img src={fbAvatars[index % fbAvatars.length]} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" />
                <div className="flex-1 min-w-0">
                  <div className="bg-slate-100 rounded-2xl px-3 py-2">
                    <p className="text-slate-900 text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
                    <p className="text-slate-700 text-xs leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-2">
                    <span className="text-[11px] text-slate-400">{comment.time}</span>
                    <span className="text-[11px] text-slate-500 font-medium cursor-pointer hover:underline">Curtir</span>
                    <span className="text-[11px] text-slate-500 font-medium cursor-pointer hover:underline">Responder</span>
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

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900">Eu também quero aprender!</h3>
          <CTA>Quero aprender sem medo!</CTA>
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-green-600" /> Pagamento seguro · Garantia de 7 dias · Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Certificate ─────────────────────────
const Certificate = () => (
  <section className="py-8 md:py-12 bg-slate-50">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <img src={certificado} alt="Certificado de conclusão" className="rounded-2xl shadow-xl border border-slate-200" />
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">BÔNUS</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Você sai com certificado de conclusão</h2>
          <p className="text-slate-700 text-base md:text-lg mb-6">
            Ao terminar o curso, você recebe um certificado digital pra anexar no currículo,
            no LinkedIn ou pra mostrar pra família que <strong>você conseguiu</strong>.
          </p>
          <ul className="space-y-2 mb-6">
            {["Certificado digital válido em todo Brasil", "Pronto pra anexar no currículo", "Modelo profissional e elegante"].map((x) => (
              <li key={x} className="flex items-center gap-2 text-slate-700"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />{x}</li>
            ))}
          </ul>
          <CTA size="md">Quero meu certificado!</CTA>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Pricing ─────────────────────────
const Pricing = () => (
  <section id="oferta" className="py-8 md:py-12 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-8">
        <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
          🔥 Oferta especial • 40% OFF
        </span>
        <h2 className="text-3xl md:text-5xl font-black mb-3">Garanta sua vaga hoje</h2>
        <p className="text-blue-100 text-base md:text-lg">Acesso vitalício • Comece agora mesmo</p>
      </div>

      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-yellow-400">
        <h3 className="text-xl md:text-2xl font-black text-center mb-2">Curso Completo de Informática</h3>
        <p className="text-center text-slate-500 text-sm mb-6">+90 videoaulas • 6 módulos • Acesso vitalício</p>

        <div className="bg-slate-50 rounded-2xl p-6 text-center mb-6">
          <p className="text-slate-500 line-through text-lg md:text-xl mb-1">De R$ 497,00</p>
          <p className="text-sm text-slate-600 font-semibold mb-1">por apenas</p>
          <p className="text-5xl md:text-7xl font-black text-green-600 leading-none">R$ 297</p>
          <p className="text-lg text-slate-700 mt-3">à vista no PIX</p>
          <p className="text-base text-slate-600 mt-1">ou <strong className="text-slate-900">12x de R$ 30,72</strong> no cartão</p>
        </div>

        <ul className="space-y-3 mb-6">
          {[
            "+90 videoaulas passo a passo",
            "Acesso vitalício — assiste quantas vezes quiser",
            "Certificado de conclusão",
            "Suporte direto com a professora",
            "Atualizações gratuitas pra sempre",
            "Acesso pelo celular, tablet ou computador",
          ].map((x) => (
            <li key={x} className="flex items-start gap-3 text-slate-800 font-medium">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />{x}
            </li>
          ))}
        </ul>

        <CTA>Quero aproveitar o desconto!</CTA>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-green-600" /> Pagamento 100% seguro</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> 7 dias de garantia</span>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── Guarantee ─────────────────────────
const GuaranteeBlock = () => (
  <section className="py-8 md:py-12 bg-white">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="bg-green-50 border-2 border-green-600 rounded-3xl p-6 md:p-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600 mb-5">
          <ShieldCheck className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">Garantia incondicional de 7 dias</h2>
        <p className="text-slate-700 text-base md:text-lg leading-relaxed">
          Faça sua matrícula hoje, assista as aulas, teste o método. Se em <strong>7 dias</strong> você achar
          que o curso não é pra você — por qualquer motivo — <strong>devolvemos 100% do seu dinheiro</strong>.
          Sem perguntas, sem burocracia. <strong>O risco é todo nosso.</strong>
        </p>
      </div>
    </div>
  </section>
);

// ───────────────────────── FAQ ─────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Eu nunca mexi num computador. Vou conseguir mesmo?", a: "Sim! O curso foi feito justamente pra quem está começando do zero. A professora explica passo a passo, com linguagem simples, sem termos técnicos. +15.000 alunos já provaram que funciona." },
    { q: "Quanto tempo leva pra concluir?", a: "Você aprende no seu ritmo. Em média os alunos terminam em 30 a 60 dias dedicando 20-30 min por dia. Mas como o acesso é vitalício, você tem o tempo que precisar." },
    { q: "Em quanto tempo recebo o acesso?", a: "Na hora. Logo após o pagamento aprovado você recebe os dados de acesso no seu e-mail." },
    { q: "Funciona no celular?", a: "Sim. Você pode assistir no celular, tablet ou computador. Mas pra praticar é importante ter acesso a um computador." },
    { q: "Como funciona a garantia?", a: "Você tem 7 dias pra testar o curso. Se não gostar, é só mandar um e-mail e devolvemos 100% do valor. Sem perguntas." },
    { q: "O certificado é válido?", a: "Sim. É um certificado digital de conclusão, aceito em todo o Brasil pra anexar em currículos, LinkedIn e processos seletivos." },
    { q: "E se eu travar numa aula? Tem suporte?", a: "Tem sim. Você pode tirar dúvidas direto com a professora pelo WhatsApp e pela área do aluno." },
  ];
  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-10">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 p-5 text-left">
                <span className="font-bold text-slate-900">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-slate-700 leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────── Final CTA ─────────────────────────
const FinalCTA = () => (
  <section className="py-8 md:py-12 bg-slate-900 text-white">
    <div className="container mx-auto px-4 max-w-3xl text-center">
      <InfinityIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
      <h2 className="text-3xl md:text-5xl font-black mb-4">Pare de depender dos outros pra usar o computador</h2>
      <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
        Em poucas semanas você vai olhar pra trás e não vai acreditar como era difícil antes.
        Sua vida fica mais leve, mais independente. <strong className="text-white">Hoje é o dia.</strong>
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
        <a href="/termos-de-uso" className="hover:text-white">Termos de Uso</a>
        <a href="/politica-de-privacidade" className="hover:text-white">Privacidade</a>
      </div>
    </div>
  </footer>
);

// ───────────────────────── Sticky Mobile CTA ─────────────────────────
const StickyMobile = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 p-3 shadow-2xl">
    <button onClick={openCheckout} className="w-full bg-green-600 active:scale-[.99] text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2">
      <Monitor className="w-5 h-5" /> Quero começar agora!
    </button>
  </div>
);

// ───────────────────────── Page ─────────────────────────
const VendasNovo = () => {
  useEffect(() => {
    document.title = "Aprenda Informática do Zero • Curso Online com Garantia";
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 md:pb-0">
      <Header />
      <Hero />
      <Identification />
      <MiniValueSection />
      <Instructor />
      <Method />
      <Modules />
      <Testimonials />
      <SocialProof />
      <Certificate />
      <Pricing />
      <GuaranteeBlock />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobile />
      <WhatsAppButton />
    </div>
  );
};

export default VendasNovo;
