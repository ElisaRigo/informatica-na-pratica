import { lazy, Suspense, memo, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { 
  Shield, Award, Zap, CheckCircle, Star, Clock, Users, 
  ArrowRight, Play, Gift, Lock, Flame, ChevronRight,
  Sparkles, Trophy, Heart, Eye
} from "lucide-react";
import videoPoster from "@/assets/hero-poster-free-lesson.png";
import heroVideo from "@/assets/hero-video-free-lesson.mp4";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import alinePhoto from "@/assets/testimonial-new-1.jpg";
import joaoPhoto from "@/assets/testimonial-new-3.jpg";
import carlaPhoto from "@/assets/testimonial-new-2.jpg";

const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));
const LoadingFallback = memo(() => <div className="h-8" />);

// Custom styles for this page - Dark theme with vibrant orange
const styles = {
  bg: "bg-[#0a0a0f]",
  bgAlt: "bg-[#12121a]",
  bgCard: "bg-[#1a1a25]",
  accent: "#ff6b00",
  accentLight: "#ff8533",
  text: "text-white",
  textMuted: "text-gray-400",
  gradient: "bg-gradient-to-r from-[#ff6b00] to-[#ff8533]",
  gradientText: "bg-gradient-to-r from-[#ff6b00] to-[#ffaa00] bg-clip-text text-transparent",
  glow: "shadow-[0_0_60px_rgba(255,107,0,0.3)]",
  border: "border-[#2a2a35]"
};

// Animated Counter
const CountdownTimer = () => {
  const [time, setTime] = useState({ h: 1, m: 47, s: 33 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 justify-center">
      {[
        { v: time.h, l: "HRS" },
        { v: time.m, l: "MIN" },
        { v: time.s, l: "SEG" }
      ].map((item, i) => (
        <div key={i} className="relative">
          <div className={`${styles.gradient} p-[2px] rounded-xl`}>
            <div className={`${styles.bgCard} rounded-xl px-4 py-3 min-w-[70px]`}>
              <span className="text-3xl md:text-4xl font-black text-white block">
                {item.v.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] text-gray-500 tracking-widest">{item.l}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Glowing CTA Button
const GlowButton = ({ onClick, children, size = "lg" }: { onClick: () => void; children: React.ReactNode; size?: "lg" | "xl" }) => (
  <button
    onClick={onClick}
    className={`
      relative group overflow-hidden
      ${styles.gradient} 
      ${size === "xl" ? "px-12 py-6 text-xl" : "px-8 py-5 text-lg"}
      font-black text-white rounded-2xl
      transform hover:scale-105 transition-all duration-300
      shadow-[0_0_40px_rgba(255,107,0,0.4)]
      hover:shadow-[0_0_60px_rgba(255,107,0,0.6)]
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-[#ff8533] to-[#ffaa00] opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

// Floating particles effect
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-[#ff6b00] rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

const VendaConversao = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  (window as any).openCheckout = openCheckout;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setShouldLoadVideo(true);
    }, { rootMargin: "50px" });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const testimonials = [
    { text: "Eu tinha PAVOR de computador. Hoje trabalho no escritório e todos me pedem ajuda!", author: "Aline S.", image: alinePhoto, role: "Secretária" },
    { text: "Em 3 semanas consegui meu primeiro emprego de verdade. O curso mudou minha vida!", author: "João M.", image: joaoPhoto, role: "Auxiliar Administrativo" },
    { text: "Finalmente consigo ajudar meus netos com as tarefas. Me sinto jovem de novo!", author: "Carla T.", image: carlaPhoto, role: "Aposentada" },
  ];

  return (
    <div className={`min-h-screen ${styles.bg} overflow-x-hidden`}>
      {/* Custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,107,0,0.4); }
          50% { box-shadow: 0 0 40px rgba(255,107,0,0.8); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? `${styles.bgCard} backdrop-blur-lg border-b ${styles.border}` : ''
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 ${styles.gradient} rounded-xl flex items-center justify-center`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-white text-lg hidden md:block">Informática na Prática</span>
          </div>
          <button
            onClick={openCheckout}
            className={`${styles.gradient} px-6 py-2.5 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity`}
          >
            QUERO MEU ACESSO
          </button>
        </div>
      </header>

      {/* HERO - Full Impact */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12">
        <FloatingParticles />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#ff6b00] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#ff8533] rounded-full blur-[120px] opacity-15" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8 animate-slide-up">
              <div className={`inline-flex items-center gap-2 ${styles.bgCard} border ${styles.border} px-5 py-2.5 rounded-full`}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6b00]"></span>
                </span>
                <span className="text-gray-400 text-sm font-medium">🔥 127 pessoas estão vendo isso agora</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-white">Chega de perder</span>
              <br />
              <span className={styles.gradientText}>oportunidades</span>
              <span className="text-white"> por não</span>
              <br />
              <span className="text-white">saber informática</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 text-center max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Aprenda <span className="text-white font-bold">Word, Excel e Internet</span> do zero absoluto 
              em apenas <span className={`${styles.gradientText} font-bold`}>4 semanas</span> — mesmo que você nunca tenha tocado em um computador
            </p>

            {/* Video */}
            <div ref={containerRef} className="max-w-4xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className={`relative rounded-3xl overflow-hidden ${styles.glow} animate-pulse-glow`}>
                <div className={`absolute inset-0 ${styles.gradient} opacity-20`} />
                
                {/* Live badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur px-4 py-2 rounded-full">
                  <Eye className="w-4 h-4 text-[#ff6b00]" />
                  <span className="text-white text-sm font-medium">Prévia do curso</span>
                </div>

                {shouldLoadVideo ? (
                  <video 
                    ref={videoRef}
                    className="w-full aspect-video"
                    playsInline
                    preload="metadata"
                    poster={videoPoster}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                ) : (
                  <div 
                    className="w-full aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${videoPoster})` }}
                  />
                )}
                
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group bg-black/30"
                    onClick={handlePlayClick}
                  >
                    <div className={`w-24 h-24 ${styles.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,107,0,0.5)]`}>
                      <Play className="w-10 h-10 text-white ml-2" fill="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA + Price */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="inline-block mb-6">
                <p className="text-gray-500 text-lg mb-1">De <span className="line-through">R$ 497</span></p>
                <p className="text-5xl md:text-6xl font-black text-white">
                  R$ <span className={styles.gradientText}>297</span>
                </p>
                <p className="text-gray-400 mt-1">ou 12x de R$ 30,22</p>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <GlowButton onClick={openCheckout} size="xl">
                  QUERO COMEÇAR AGORA <ArrowRight className="w-6 h-6" />
                </GlowButton>
                
                <div className="flex flex-wrap gap-6 justify-center text-gray-500 text-sm">
                  <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#ff6b00]" /> Acesso imediato</span>
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#ff6b00]" /> Garantia 7 dias</span>
                  <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#ff6b00]" /> Certificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Numbers */}
      <section className={`py-16 ${styles.bgAlt}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "2.500+", label: "Alunos formados", icon: Users },
              { value: "4.9", label: "Avaliação média", icon: Star },
              { value: "15+", label: "Anos ensinando", icon: Trophy },
              { value: "98%", label: "Aprovação", icon: Heart },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-[#ff6b00] mx-auto mb-3" />
                <p className={`text-3xl md:text-4xl font-black ${styles.gradientText}`}>{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-white">
            Você se identifica com <span className={styles.gradientText}>alguma dessas situações</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Sente vergonha de pedir ajuda para coisas simples no computador",
              "Perdeu oportunidades de emprego por não saber informática",
              "Tem medo de \"estragar\" algo quando mexe no computador",
              "Depende dos filhos ou netos para fazer qualquer coisa online",
              "Se sente excluído(a) quando todo mundo fala de tecnologia",
              "Acha que é tarde demais para aprender"
            ].map((pain, i) => (
              <div key={i} className={`${styles.bgCard} border ${styles.border} rounded-2xl p-6 flex items-center gap-4 hover:border-[#ff6b00]/50 transition-colors`}>
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-xl">✗</span>
                </div>
                <p className="text-gray-300">{pain}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-2xl md:text-3xl font-bold text-white mt-12">
            Se você disse <span className="text-red-400">"sim"</span> para qualquer uma... 
            <span className={`${styles.gradientText} block mt-2`}>esse curso foi feito para você!</span>
          </p>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className={`py-20 ${styles.bgAlt} relative overflow-hidden`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff6b00] rounded-full blur-[200px] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-white">
            Sua <span className={styles.gradientText}>transformação</span> começa aqui
          </h2>
          <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
            Em poucas semanas você vai sair do zero e dominar tudo isso:
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Word", desc: "Crie currículos, documentos e relatórios profissionais", emoji: "📄" },
              { title: "Excel", desc: "Domine planilhas, fórmulas e gráficos com facilidade", emoji: "📊" },
              { title: "Internet", desc: "Navegue, compre e use redes sociais com segurança", emoji: "🌐" },
            ].map((item, i) => (
              <div key={i} className={`${styles.bgCard} border ${styles.border} rounded-3xl p-8 text-center hover:border-[#ff6b00]/50 transition-all hover:-translate-y-2`}>
                <div className="text-6xl mb-6">{item.emoji}</div>
                <h3 className={`text-2xl font-black ${styles.gradientText} mb-3`}>{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <GlowButton onClick={openCheckout}>
              QUERO APRENDER TUDO ISSO <ChevronRight className="w-5 h-5" />
            </GlowButton>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-white">
            Quem fez, <span className={styles.gradientText}>aprovou</span>
          </h2>
          <p className="text-gray-400 text-center text-lg mb-16">
            Histórias reais de pessoas como você
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className={`${styles.bgCard} border ${styles.border} rounded-3xl p-8 relative`}>
                <div className="absolute -top-4 left-8">
                  <div className={`${styles.gradient} p-[2px] rounded-full`}>
                    <img src={t.image} alt={t.author} className="w-16 h-16 rounded-full object-cover" loading="lazy" />
                  </div>
                </div>
                
                <div className="pt-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-[#ff6b00] text-[#ff6b00]" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-white">{t.author}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHER */}
      <section className={`py-20 ${styles.bgAlt}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <div className={`absolute inset-0 ${styles.gradient} rounded-full blur-2xl opacity-30`} />
              <div className={`relative ${styles.gradient} p-[4px] rounded-full`}>
                <img 
                  src={elisaPhoto} 
                  alt="Professora Elisa" 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <p className="text-[#ff6b00] font-bold mb-2">SUA PROFESSORA</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Elisa Rodrigues
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Há <span className="text-white font-bold">15 anos</span> ensinando informática para pessoas que nunca tocaram em um computador. 
                Minha missão é provar que <span className={`${styles.gradientText} font-bold`}>nunca é tarde para aprender</span>.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {[
                  { v: "+15 anos", l: "experiência" },
                  { v: "+2.500", l: "alunos" },
                  { v: "4.9/5", l: "avaliação" },
                ].map((s, i) => (
                  <div key={i} className={`${styles.bgCard} border ${styles.border} rounded-xl px-4 py-3`}>
                    <p className={`font-black ${styles.gradientText}`}>{s.v}</p>
                    <p className="text-xs text-gray-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY + OFFER */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff6b00]/10 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Timer */}
            <div className={`${styles.bgCard} border ${styles.border} rounded-3xl p-8 mb-10`}>
              <p className="text-red-400 font-bold mb-4 flex items-center justify-center gap-2">
                <Flame className="w-5 h-5" /> OFERTA EXPIRA EM:
              </p>
              <CountdownTimer />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
              Invista em você <span className={styles.gradientText}>agora</span>
            </h2>

            {/* Price card */}
            <div className={`${styles.bgCard} border-2 border-[#ff6b00]/50 rounded-3xl p-10 ${styles.glow}`}>
              {/* Bonuses */}
              <div className="mb-8">
                <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5 text-[#ff6b00]" /> BÔNUS INCLUSOS:
                </p>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    "Digitação Ninja",
                    "Internet Segura",
                    "E-mail Pro",
                    "Suporte VIP"
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#ff6b00]" />
                      <span className="text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#2a2a35] pt-8">
                <p className="text-gray-500 mb-2">De <span className="line-through text-lg">R$ 768</span></p>
                <p className="text-6xl md:text-7xl font-black text-white mb-2">
                  R$ <span className={styles.gradientText}>297</span>
                </p>
                <p className="text-gray-400 mb-2">ou 12x de R$ 30,22</p>
                <p className="text-[#ff6b00] font-bold mb-8">💰 Economia de R$ 471!</p>
                
                <GlowButton onClick={openCheckout} size="xl">
                  GARANTIR MINHA VAGA <ArrowRight className="w-6 h-6" />
                </GlowButton>
                
                <div className="flex flex-wrap gap-6 justify-center mt-6 text-gray-500 text-sm">
                  <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Pagamento seguro</span>
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> 7 dias de garantia</span>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className={`${styles.bgCard} border ${styles.border} rounded-2xl p-8 mt-10 flex flex-col md:flex-row items-center gap-6`}>
              <div className={`w-20 h-20 ${styles.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-black text-white mb-2">Garantia Incondicional de 7 Dias</h3>
                <p className="text-gray-400">
                  Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`py-16 ${styles.gradient}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Sua nova vida começa com um clique
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Não deixe para amanhã. As vagas são limitadas!
          </p>
          <button
            onClick={openCheckout}
            className="bg-white text-[#0a0a0f] font-black text-xl px-12 py-6 rounded-2xl hover:bg-gray-100 transition-colors shadow-2xl"
          >
            COMEÇAR AGORA <ArrowRight className="inline-block ml-2 w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${styles.bg} text-center text-gray-600 text-sm border-t ${styles.border}`}>
        <p>© 2024 Informática na Prática — Todos os direitos reservados</p>
      </footer>

      {/* Floating bottom bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${styles.gradient} p-3 md:p-4 shadow-2xl border-t border-[#ff8533]`}>
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block text-white">
            <p className="font-bold text-sm">🔥 Oferta especial por tempo limitado</p>
            <p className="text-xs opacity-80">De R$ 497 por R$ 297</p>
          </div>
          <button
            onClick={openCheckout}
            className="flex-1 md:flex-none bg-white text-[#0a0a0f] font-black px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            GARANTIR MINHA VAGA <ArrowRight className="inline-block ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="pb-16">
        <Suspense fallback={<LoadingFallback />}>
          <WhatsAppButton />
        </Suspense>
      </div>

      {/* Checkout */}
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default VendaConversao;
