import { Play, Shield, Zap, Award, Lock, Star, Quote, MessageCircle, Volume2, Smartphone, ThumbsUp, Heart, Pause, Trophy, Sparkles, ArrowRight, GraduationCap, Briefcase, FileCheck, BookOpen, Clock, CheckCircle2, MessageCircleHeart, HeartHandshake, HelpCircle, Users, Check, Gift, Headphones, AlertCircle, Target, Infinity } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";

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
import certificadoExemplo from "@/assets/certificado-exemplo.png";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import environmentThumb from "@/assets/environment-thumb.jpg";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";
import testimonial1 from "@/assets/testimonial-new-1.jpg";
import testimonial2 from "@/assets/testimonial-new-2.jpg";
import testimonial3 from "@/assets/testimonial-new-3.jpg";
import testimonial4 from "@/assets/testimonial-new-4.jpg";
import testimonial5 from "@/assets/testimonial-new-5.jpg";
import testimonial6 from "@/assets/testimonial-new-6.jpg";
import marianaPhoto from "@/assets/testimonial-mariana.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EasyToLearn } from "@/components/EasyToLearn";
import { EnvironmentSection } from "@/components/curso/EnvironmentSection";

// ─── Data ───────────────────────────────────────────────────────────
const audioTestimonials = [
  { name: "Antonio", description: "Depoimento sobre sua experiência com o curso", audioSrc: "/audio/antonio-1.ogg" },
  { name: "Antonio", description: "Continuação do depoimento", audioSrc: "/audio/antonio-2.ogg" },
  { name: "Amanda", description: "Como o curso transformou sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Superou as dificuldades com tecnologia", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Gratidão pelo aprendizado", audioSrc: "/audio/bruna.aac" },
];

const whatsappScreenshots = [
  { image: whatsappTestimonial1, description: "Mãe de aluna elogiando o curso" },
  { image: whatsappTestimonial2, description: "Aluno agradecendo pela didática" },
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

const problems = [
  "Fica nervoso(a) quando precisa usar o computador no trabalho?",
  "Tem medo de clicar em algo errado e estragar tudo?",
  "Precisa sempre pedir ajuda para fazer coisas simples?",
  "Já perdeu oportunidades de emprego por não saber informática?",
  "Sente vergonha de admitir que não domina o básico?",
  "Acha que é \"velho demais\" para aprender?",
];

const testimonials = [
  { name: "Maria Helena, 58 anos", role: "Aposentada", text: "Achei que era tarde demais para aprender. A Elisa provou que eu estava errada! Hoje faço tudo sozinha no computador.", image: testimonial1, rating: 5 },
  { name: "Carla Eduarda, 23 anos", role: "Comerciante", text: "Finalmente consigo fazer minhas planilhas de controle de estoque. Economizo 3 horas por semana!", image: testimonial2, rating: 5 },
  { name: "Pedro Junk, 38 anos", role: "Empresário", text: "Ganhei uma promoção porque agora domino Word e Excel. O investimento se pagou em menos de um mês.", image: testimonial3, rating: 5 },
  { name: "Roberta Silva, 28 anos", role: "Autônoma", text: "A didática da professora é incrível. Ela explica de um jeito que até quem nunca usou computador entende.", image: testimonial4, rating: 5 },
  { name: "Fernanda Costa, 28 anos", role: "Estudante", text: "Consegui meu primeiro emprego graças ao curso! Fiz meu currículo perfeito e impressionei na entrevista.", image: testimonial5, rating: 5 },
  { name: "José Antônio, 61 anos", role: "Aposentado", text: "Meus netos não acreditaram quando viram eu usando o computador sozinho. Valeu cada centavo!", image: testimonial6, rating: 5 },
];

const modules = [
  { icon: windowsIcon, title: "Windows e Organização", description: "Organize arquivos e use o computador com segurança e autonomia." },
  { icon: wordIcon, title: "Word Profissional", description: "Crie documentos e currículos impecáveis, que impressionam recrutadores." },
  { icon: excelIcon, title: "Excel na Prática", description: "Monte planilhas profissionais e domine fórmulas com confiança." },
  { icon: powerpointIcon, title: "PowerPoint Impactante", description: "Faça apresentações bonitas e eficazes, mesmo sem experiência." },
  { icon: internetIcon, title: "Internet e E-mail", description: "Navegue, pesquise e se comunique com segurança no dia a dia e no trabalho." },
  { icon: typingIcon, title: "Digitação Profissional", description: "Ganhe velocidade e produtividade para se destacar no trabalho." },
];

const transformations = [
  { before: "Medo de errar", after: "Confiança total" },
  { before: "Depender dos outros", after: "Autonomia completa" },
  { before: "Perder oportunidades", after: "Conquistar vagas" },
  { before: "Vergonha de pedir ajuda", after: "Ajudar outras pessoas" },
  { before: "Frustração constante", after: "Satisfação pessoal" },
];

const faqs = [
  { question: "Preciso ter experiência com computador?", answer: "Não! O curso foi criado especialmente para quem nunca usou um computador ou tem pouca experiência. Começamos do absoluto zero, explicando cada clique de forma simples e didática." },
  { question: "Por quanto tempo terei acesso ao curso?", answer: "O acesso é vitalício! Isso significa que pode estudar no seu ritmo, revisar quantas vezes quiser e acompanhar todas as atualizações para sempre." },
  { question: "O certificado é válido?", answer: "Sim! Ao concluir o curso, você recebe um certificado digital que pode incluir no currículo e LinkedIn. Nosso certificado é reconhecido por empresas em todo o Brasil." },
  { question: "Como funciona a garantia de 7 dias?", answer: "É simples: se você não gostar do curso por qualquer motivo nos primeiros 7 dias, basta enviar um e-mail solicitando o reembolso. Devolvemos 100% do valor, sem perguntas." },
  { question: "Posso assistir pelo celular?", answer: "Sim! Nossas aulas funcionam em qualquer dispositivo: computador, notebook, tablet ou celular. Você pode estudar onde e quando quiser." },
  { question: "E se eu tiver dúvidas durante o curso?", answer: "Você terá acesso direto à professora Elisa pelo WhatsApp! Diferente de outros cursos, aqui você tem suporte humanizado e personalizado para tirar todas as suas dúvidas." },
  { question: "O pagamento é seguro?", answer: "Totalmente seguro! Utilizamos as mesmas tecnologias de segurança dos grandes bancos. Aceitamos cartão de crédito (em até 12x), PIX e boleto bancário." },
  { question: "Quando começo a ter acesso?", answer: "O acesso é imediato! Assim que seu pagamento for confirmado (no PIX é instantâneo), você recebe o login e senha por e-mail e já pode começar a estudar." },
];

const included = [
  { text: "Acesso completo a +90 videoaulas" },
  { text: "Windows, Word, Excel, PowerPoint, Internet" },
  { text: "Módulo de Digitação Profissional" },
  { text: "Certificado de conclusão" },
  { text: "Suporte direto com a professora" },
  { text: "Acesso Vitalício" },
  { text: "Atualizações gratuitas" },
  { text: "Material de apoio em PDF" },
];

const bonuses = [
  { text: "BÔNUS: E-mail Profissional", value: "R$ 97" },
  { text: "BÔNUS: Mercado de Trabalho", value: "R$ 127" },
  { text: "BÔNUS: Atalhos Essenciais", value: "R$ 47" },
  { text: "BÔNUS: Currículo Profissional", value: "R$ 97" },
];

// ─── Facebook Comment Component ────────────────────────────────────
const FacebookComment = ({ comment, avatarIndex }: { comment: typeof facebookComments[0]; avatarIndex: number }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100 max-w-md mx-auto">
    <div className="flex gap-2">
      <img src={avatarImages[avatarIndex % avatarImages.length]} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" />
      <div className="flex-1 min-w-0">
        <div className="bg-slate-50 rounded-2xl px-3 py-2">
          <p className="text-gray-900 text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
          <p className="text-gray-700 text-xs leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-2">
          <span className="text-[11px] text-gray-400">{comment.time}</span>
          <span className="text-[11px] text-gray-500 font-medium">Curtir</span>
          {comment.likes > 0 && (
            <span className="ml-auto text-[11px] text-gray-400 flex items-center gap-0.5">
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
);

const FacebookCommentPair = ({ indices }: { indices: [number, number] }) => (
  <div className="bg-slate-900 py-3">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        <FacebookComment comment={facebookComments[indices[0]]} avatarIndex={indices[0]} />
        <FacebookComment comment={facebookComments[indices[1]]} avatarIndex={indices[1]} />
      </div>
    </div>
  </div>
);

// ─── Audio Player Component ────────────────────────────────────────
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
    <div className={`bg-slate-50 border rounded-xl p-4 transition-all ${hasError ? 'border-red-300 opacity-50' : 'border-slate-200 hover:border-primary/40 hover:shadow-md'}`}>
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        onTimeUpdate={() => { if (audioRef.current) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0); }}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
        onError={() => { setHasError(true); setIsPlaying(false); }}
        preload="auto"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          disabled={hasError}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform shadow-md ${hasError ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:scale-105'}`}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-foreground font-semibold text-sm">{testimonial.name}</span>
            <Volume2 className="w-3 h-3 text-primary" />
          </div>
          <p className="text-muted-foreground text-xs mb-2">{hasError ? "Áudio não disponível" : testimonial.description}</p>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-100 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────
const Informatica = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnvPlaying, setIsEnvPlaying] = useState(false);
  const [shouldLoadEnv, setShouldLoadEnv] = useState(false);
  
  const envRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShouldLoadEnv(true); observer.disconnect(); } },
      { rootMargin: "100px" }
    );
    if (envRef.current) observer.observe(envRef.current);
    return () => observer.disconnect();
  }, []);

  (window as any).openCheckout = () => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'BRL', value: 297.00,
        items: [{ item_id: 'curso-informatica', item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 297.00, currency: 'BRL', content_name: 'Curso Informática na Prática', content_ids: ['curso-informatica'], num_items: 1
      });
    }
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* ─── HEADER ─── */}
      <header className="bg-slate-900 py-3 md:py-4 border-b border-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 md:flex-col md:gap-0">
          <div className="relative group shrink-0">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-4 border border-white/20 shadow-lg">
              <img src={logo} alt="Informática na Prática" className="h-12 md:h-20 lg:h-24 drop-shadow-lg" />
            </div>
          </div>
          <p className="text-white text-base md:text-lg lg:text-xl font-semibold text-left md:text-center md:mt-3 leading-tight">
            Curso de <span className="text-primary font-bold">Informática Online</span>
            <span className="md:hidden"><br /></span>
            <span className="hidden md:inline"> — </span>
            Simples e para Todos.
          </p>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="bg-slate-900 pt-0 pb-2 md:pb-4">
        {/* Faixa infinita acima da copy */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 mb-3 md:mb-4 overflow-hidden bg-gradient-to-r from-red-900/70 via-red-800/70 to-red-900/70 border-y border-red-400/30 shadow-md">
          <div className="flex animate-marquee whitespace-nowrap py-2 md:py-2.5" style={{ animationDuration: '30s' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-6 text-white font-black text-sm md:text-base tracking-wider uppercase flex items-center gap-2">
                <span className="text-xl md:text-2xl">😰</span>
                VOCÊ SENTE DIFICULDADE COM O COMPUTADOR?
              </span>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-[24px] md:text-4xl lg:text-5xl font-[900] text-white text-center mb-3 leading-[1.1] tracking-wide" style={{ WebkitTextStroke: '0.5px', letterSpacing: '0.04em' }}>
            Domine o <span className="text-primary">computador</span> em <span className="text-primary">poucas semanas</span>,<br className="hidden md:block" /> mesmo sem saber nada
          </h1>

          <div className="relative max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700">
              {!isPlaying ? (
                <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img src={heroVideoThumb} alt="Prévia do curso de informática" className="w-full h-full object-cover" loading="eager" />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl cursor-pointer">
                      <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&autoplay=1&vq=hd1080&hd=1" title="Veja como é fácil aprender" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-3 md:left-4 z-20 translate-y-1/2">
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-slate-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-black text-[11px] md:text-sm shadow-2xl border-2 border-primary ring-2 ring-slate-900/40">
                <Infinity className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                ACESSO VITALÍCIO
              </div>
            </div>
            <div className="absolute bottom-0 right-3 md:right-4 z-20 translate-y-1/2">
              <div className="flex items-center gap-1.5 md:gap-2 bg-slate-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-black text-[11px] md:text-sm shadow-2xl border-2 border-accent ring-2 ring-slate-900/40">
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                +15.000 ALUNOS
              </div>
            </div>
          </div>

          <p className="text-sm md:text-xl text-slate-200 text-center mb-2 mt-2 max-w-2xl mx-auto leading-snug">
            Use o <span className="text-primary font-bold">computador</span> com <span className="text-primary font-bold">confiança</span> no seu dia a dia — <strong className="text-white">sem depender de outras pessoas</strong>
          </p>

          {/* Selos de Confiança - Grid (estilo /curso HeroV2) */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-2xl mx-auto mt-2 mb-2">
            {[
              { icon: Headphones, label: "Suporte nas Aulas" },
              { icon: Shield, label: "Garantia 7 Dias" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-1.5 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10">
                <item.icon className="w-5 h-5 md:w-8 md:h-8 text-primary mb-0.5 md:mb-2" />
                <span className="text-white font-bold text-xs md:text-sm">{item.label}</span>
              </div>
            ))}
          </div>


          {/* Pricing (com banner de urgência integrado + CTA dentro) */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl max-w-xl mx-auto text-center overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 border-b-2 border-amber-300 py-3 px-4 flex items-center justify-center gap-2 shadow-lg">
              <p className="text-white font-black text-center text-sm md:text-base tracking-wide drop-shadow">
                Garanta seu acesso com
              </p>
              <span className="inline-flex items-center gap-1.5 bg-white text-red-600 font-black text-xs md:text-sm px-2.5 py-1 rounded-md shadow-md ring-2 ring-amber-300">
                40% OFF
              </span>
            </div>
            {/* CTA logo abaixo da faixa de urgência */}
            <div className="px-3 pt-3 flex justify-center">
              <button onClick={() => (window as any).openCheckout?.()} className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-success to-green-600 hover:from-green-500 hover:to-green-700 text-white font-black text-base md:text-lg tracking-wide px-10 py-3 md:px-14 md:py-3.5 rounded-xl border-b-4 border-green-700 hover:border-green-800 active:border-b-0 active:mt-1 hover:scale-[1.01] transition-all duration-200 cursor-pointer leading-tight">
                🎯 Quero Começar Agora
              </button>
            </div>

            {/* Selos: Acesso Imediato + Garantia 7 dias */}
            <div className="flex flex-wrap justify-center gap-2 px-3 pt-2.5">
              <div className="flex items-center gap-1.5 border border-primary/40 rounded-full px-3 py-1.5 bg-primary/15 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-white">Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1.5 border border-primary/40 rounded-full px-3 py-1.5 bg-primary/15 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-white">Garantia 7 dias</span>
              </div>
            </div>

            <div className="p-3 md:p-4">
              <p className="text-base md:text-lg text-slate-300 mb-1">De <span className="line-through font-bold">R$ 497,00</span> por apenas</p>
              <p className="text-3xl md:text-4xl font-black text-white mb-1 leading-tight">12x de <span className="text-success">R$ 30,72</span></p>
              <p className="text-sm md:text-base text-slate-300 mb-1">ou <span className="text-success font-bold text-lg md:text-xl">R$ 297,00</span> à vista</p>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mb-3"><Lock className="w-3 h-3" />Pagamento 100% seguro · Acesso imediato</p>

              <div className="border border-success/40 rounded-xl p-2 mb-2 bg-success/10">
                <p className="text-xs md:text-sm font-bold text-success mb-0.5"><Shield className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />Garantia Incondicional de 7 Dias</p>
                <p className="text-[11px] md:text-xs text-slate-300">Se não gostar, devolvo <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas.</p>
              </div>

              {/* Depoimento Mariana - prova social próxima ao CTA */}
              <div className="border border-primary/30 rounded-xl p-3 mb-2 bg-primary/10 text-left">
                <div className="flex items-start gap-3">
                  <img
                    src={marianaPhoto}
                    alt="Foto de Mariana S., aluna do curso"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/40"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-[12px] md:text-sm text-white italic leading-snug">
                      "Eu não sabia nada… hoje faço tudo sozinha." <span className="not-italic text-slate-300 font-semibold">— Mariana S.</span>
                    </p>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>

          {/* Selos: Certificado + Alunos (movidos da primeira dobra) */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-xl mx-auto mt-3">
            {[
              { icon: Award, label: "Certificado", sublabel: "Reconhecido no mercado" },
              { icon: Users, label: "+15.000 Alunos", sublabel: "+20 anos ensinando" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
                <span className="text-white font-bold text-xs md:text-sm">{item.label}</span>
                <span className="text-slate-400 text-[10px] md:text-xs">{item.sublabel}</span>
              </div>
            ))}
          </div>

          {/* Faixa animada acolhedora - full width */}
          <div className="relative w-screen left-1/2 -translate-x-1/2 mt-4 overflow-hidden border-y border-primary/60 bg-gradient-to-r from-primary via-primary/90 to-primary">
            <div className="flex animate-marquee whitespace-nowrap py-3" style={{ animationDuration: '30s' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-white text-base md:text-lg font-bold mx-6">
                  ✨ Você é capaz de aprender — Venha comigo!
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EASY TO LEARN ─── */}
      <EasyToLearn />

      {/* ─── AUDIO TESTIMONIALS HEADER ─── */}
      <section className="py-4 md:py-6 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4 border border-slate-700 rounded-full px-5 py-2 bg-slate-800/60">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {avatarImages.slice(0, 5).map((av, i) => (
                    <img key={i} src={av} alt="" className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" />
                  ))}
                </div>
                <span className="text-white text-sm font-bold ml-1">+15.000 alunos</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-lg">★</span>)}
                <span className="text-white text-sm font-semibold ml-1">4.9/5</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
              Veja o que dizem os alunos que <span className="text-primary">saíram do zero</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-medium">
              Histórias reais de pessoas que <span className="text-white font-bold">não sabiam nem ligar o computador</span> — e hoje usam com total confiança
            </p>
          </div>
        </div>
      </section>

      {/* ─── AUDIO TESTIMONIALS CONTENT ─── */}
      <section className="py-4 md:py-6 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* WhatsApp Screenshots */}
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-white">Prints de Conversas</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {whatsappScreenshots.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-1.5 shadow-lg border border-slate-700">
                  <div className="bg-slate-100 rounded-t-lg pt-1.5 pb-0.5 px-3">
                    <div className="flex items-center justify-center"><div className="w-10 h-0.5 bg-slate-300 rounded-full" /></div>
                  </div>
                  <img src={s.image} alt={s.description} className="w-full h-auto rounded-b-md" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Highlight phrase */}
          <div className="text-center my-4 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-snug">
              Se essas pessoas conseguiram, <span className="text-success">você também consegue.</span>
              <br />
              <span className="text-slate-300 font-medium text-lg md:text-xl">Mesmo começando do zero.</span>
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-4 space-y-3">
            <button onClick={() => (window as any).openCheckout?.()} className="inline-flex items-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-lg md:text-xl px-8 py-4 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 transition-all hover:scale-105">
              Quero Aprender Informática sem Medo →
            </button>
            <p className="text-slate-400 text-sm">🔒 Pagamento seguro · Garantia de 7 dias · Acesso imediato</p>
          </div>
        </div>
      </section>

      {/* ─── AUDIO 1 ─── */}
      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4 max-w-2xl">
          <AudioPlayer testimonial={audioTestimonials[0]} />
        </div>
      </div>

      {/* ─── COMMENTS 1-2 ─── */}
      <FacebookCommentPair indices={[0, 1]} />

      {/* ─── CONTENT SECTION ─── */}
      <section id="conteudo" className="py-6 md:py-8 bg-slate-800/40 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-block bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">Conteúdo Completo</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Veja tudo o que você vai <span className="text-primary">dominar no curso</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Do zero ao profissional — aprenda as ferramentas que vão transformar sua rotina e abrir portas no mercado de trabalho.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {modules.map((m, i) => (
              <div key={i} className="group relative bg-slate-800/70 rounded-2xl p-6 border-2 border-slate-700 hover:border-primary/40 shadow-md hover:shadow-xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                      <img src={m.icon} alt={m.title} className="w-9 h-9" loading="lazy" />
                    </div>
                    <h3 className="text-lg font-bold text-white mt-2">{m.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-4 bg-slate-800 border-2 border-slate-700 rounded-2xl p-5 md:p-6 shadow-lg">
              <div className="text-left">
                <p className="text-base md:text-lg font-bold text-white mb-0.5">+90 aulas passo a passo</p>
                <p className="text-slate-300 text-sm">Certificado de conclusão incluso</p>
              </div>
              <button onClick={() => (window as any).openCheckout?.()} className="bg-success text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap">
                Garantir Acesso
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATE SECTION ─── */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 px-5 py-2.5 rounded-full text-sm font-bold mb-4">
              <Trophy className="w-5 h-5" />
              <span>Certificado Profissional Incluso</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
              Imagine <span className="text-primary">seu nome</span> aqui!
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              O momento em que você <strong className="text-white">conquista seu certificado</strong> e prova para o mundo que você é capaz!
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-white p-3 md:p-5 rounded-2xl shadow-2xl border border-amber-200">
                <div className="relative overflow-hidden rounded-xl select-none" onContextMenu={(e) => e.preventDefault()}>
                  <img src={certificadoExemplo} alt="Exemplo de Certificado do Curso de Informática - 120 horas" className="w-full h-auto pointer-events-none" loading="lazy" draggable="false" onDragStart={(e) => e.preventDefault()} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-4xl md:text-6xl lg:text-7xl font-black text-red-500/30 rotate-[-25deg] select-none tracking-widest">EXEMPLO</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 right-4"><span className="text-xs md:text-sm text-slate-400 font-medium">*Exemplo ilustrativo</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-4">
            {[
              { icon: Briefcase, title: "Destaque no Mercado", description: "Saia na frente em entrevistas de emprego", color: "text-blue-300 bg-blue-500/15" },
              { icon: FileCheck, title: "120 Horas Reconhecidas", description: "Válido em todo território nacional", color: "text-emerald-300 bg-emerald-500/15" },
              { icon: Star, title: "Orgulho Pessoal", description: "Prove para si mesmo que você consegue!", color: "text-amber-300 bg-amber-500/15" },
            ].map((item, i) => (
              <div key={i} className="group flex flex-col items-center text-center p-5 bg-slate-800/70 rounded-2xl border border-slate-700 hover:border-primary/40 hover:shadow-lg transition-all">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => (window as any).openCheckout?.()} className="group inline-flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-white font-black text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-105 transition-all">
              <Trophy className="w-5 h-5 md:w-6 md:h-6" />
              Quero Conquistar Meu Certificado!
            </button>
            <p className="text-sm text-slate-300 mt-3 flex items-center justify-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              Certificado digital gerado automaticamente após conclusão
            </p>
          </div>
        </div>
      </section>

      {/* ─── AUDIO 5 ─── */}
      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4 max-w-2xl">
          <AudioPlayer testimonial={audioTestimonials[4]} />
        </div>
      </div>

      {/* ─── PROBLEM SECTION ─── */}
      <section className="py-6 md:py-8 bg-slate-900 relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 left-0 w-72 h-72 bg-destructive/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-destructive/15 text-destructive px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <AlertCircle className="w-4 h-4" />
              Você se identifica?
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Chega de se sentir <span className="text-destructive">travado(a)</span><br />por não saber usar o computador
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-3">
              {problems.map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-800/70 rounded-xl shadow-md border-l-4 border-destructive/60 hover:border-destructive hover:shadow-lg transition-all">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-white font-medium text-sm">{p}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-primary/10 border-2 border-primary/30 rounded-2xl p-6">
                <p className="text-lg md:text-xl font-bold text-white mb-1">Se você marcou pelo menos 1 item acima...</p>
                <p className="text-slate-300">Este curso foi feito <strong className="text-primary">especialmente para você</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMENTS 3-4 ─── */}
      <FacebookCommentPair indices={[2, 3]} />

      {/* ─── AUDIO 2 ─── */}
      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4 max-w-2xl">
          <AudioPlayer testimonial={audioTestimonials[1]} />
        </div>
      </div>

      {/* ─── AUDIO 3 ─── */}
      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4 max-w-2xl">
          <AudioPlayer testimonial={audioTestimonials[2]} />
        </div>
      </div>

      {/* ─── INSTRUCTOR SECTION ─── */}
      <section id="professora" className="py-6 md:py-8 bg-slate-800/40 relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={elisaPhoto} alt="Professora Elisa" className="w-full aspect-[4/5] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg">Professora Elisa</p>
                          <p className="text-primary text-sm font-medium">+20 anos de experiência</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/4 bg-slate-800 rounded-xl shadow-xl p-4 border border-slate-700 hidden md:block">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-black text-white">15.000+</p>
                      <p className="text-sm text-slate-300">Alunos</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="inline-block bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">Sua Professora</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Prazer, eu sou a <span className="text-primary">Professora Elisa</span></h2>
                <div className="space-y-3 text-slate-300 leading-relaxed mb-6">
                  <p>Há mais de <strong className="text-white">20 anos</strong> ensino informática para pessoas que, assim como você, achavam que era impossível aprender.</p>
                  <p>Já ajudei milhares de alunos a superarem o medo do computador e conquistarem <strong className="text-white">independência digital</strong>.</p>
                  <p>Minha missão é simples: <strong className="text-white">provar que você é capaz</strong>.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Award, number: "20+", label: "Anos ensinando" },
                    { icon: Users, number: "15.000+", label: "Alunos formados" },
                    { icon: Heart, number: "98%", label: "Satisfação" },
                    { icon: GraduationCap, number: "90+", label: "Aulas práticas" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-800/70 border border-slate-700 rounded-xl p-3">
                      <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center"><stat.icon className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-lg font-black text-white">{stat.number}</p>
                        <p className="text-xs text-slate-300">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AULA REAL (Conheça um Pouco Mais) ─── */}
      <EnvironmentSection />

      {/* ─── COMMENTS 5-6 ─── */}
      <FacebookCommentPair indices={[4, 5]} />

      {/* ─── STRATEGIC CTA ─── */}
      <section className="py-4 md:py-6 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-4 text-white">Quero aprender com a Elisa<span className="text-primary">!</span></h3>
            <button onClick={() => (window as any).openCheckout?.()} className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-[1.02] transition-all">
              Sim, Quero Ser Aluno(a)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs md:text-sm mt-3 text-slate-400">🔒 Pagamento seguro • Garantia de 7 dias • Acesso imediato</p>
          </div>
        </div>
      </section>


      {/* ─── AUDIO 4 ─── */}
      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4 max-w-2xl">
          <AudioPlayer testimonial={audioTestimonials[3]} />
        </div>
      </div>

      {/* ─── SUPPORT BANNER ─── */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-primary/15 p-5 rounded-full border-2 border-primary/30 shadow-lg">
                <HeartHandshake className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
              Você <span className="text-primary">não está sozinho(a)</span> nessa jornada
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Eu sei que aprender algo novo pode parecer assustador. Por isso, você terá
              <strong className="text-white"> suporte via WhatsApp</strong> para tirar
              <strong className="text-white"> todas as suas dúvidas</strong>.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: MessageCircleHeart, title: "Suporte Humanizado", desc: "Pessoas reais prontas para ajudar" },
                { icon: Clock, title: "Resposta Rápida", desc: "Sem esperar dias por uma resposta" },
                { icon: CheckCircle2, title: "Dúvidas Ilimitadas", desc: "Pergunte quantas vezes precisar" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg transition-all">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="inline-block bg-primary/10 border-2 border-primary/30 rounded-2xl px-6 py-4">
              <p className="text-lg md:text-xl font-bold text-white">
                Aprender é mais fácil quando você tem <span className="text-primary">alguém do seu lado</span>.
              </p>
            </div>
          </div>
        </div>
      </section>




      {/* ─── COMMENTS 7-8 ─── */}
      <FacebookCommentPair indices={[6, 7]} />

      {/* ─── FAQ ─── */}
      <section className="py-6 md:py-8 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4" />Dúvidas Frequentes
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Ainda tem <span className="text-primary">dúvidas</span>?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Confira as perguntas mais comuns dos nossos alunos</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-slate-800/70 rounded-xl border-none px-6 shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-bold text-white hover:text-primary py-4 hover:no-underline text-sm md:text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate-300 pb-4 leading-relaxed text-sm">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="text-center mt-4">
            <p className="text-slate-300 mb-3">Não encontrou sua dúvida? Fale diretamente com a professora:</p>
            <a href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20curso" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
              <MessageCircle className="w-5 h-5" />
              Falar com a Professora Elisa
            </a>
          </div>
        </div>
      </section>



      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-6 mb-6">
              <a href="https://www.instagram.com/informaticanapratica.oficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" /><span className="hidden sm:inline">Instagram</span>
              </a>
              <a href="https://www.facebook.com/informaticanapratica.oficial" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" /><span className="hidden sm:inline">Facebook</span>
              </a>
              <a href="https://api.whatsapp.com/send?phone=5545988287082" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" /><span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
            <div className="flex gap-6 mb-4 text-sm">
              <Link to="/termos-de-uso" className="text-slate-300 hover:text-white transition-colors">Termos de Uso</Link>
              <span className="text-slate-700">•</span>
              <Link to="/politica-de-privacidade" className="text-slate-300 hover:text-white transition-colors">Política de Privacidade</Link>
            </div>
            <div className="text-slate-400 text-sm space-y-1">
              <p className="font-semibold text-white">Informática na Prática LTDA</p>
              <p><strong>CNPJ:</strong> 32.373.460/0001-51</p>
              <p className="mt-3">© {new Date().getFullYear()} Informática na Prática. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <WhatsAppButton />
    </div>
  );
};

export default Informatica;
