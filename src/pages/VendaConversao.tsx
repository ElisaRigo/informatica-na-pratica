import { lazy, Suspense, memo, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { 
  Shield, Award, Zap, CheckCircle, Star, Clock, Users, 
  ArrowRight, Play, Gift, Lock, Flame, Target, TrendingUp,
  ChevronDown, MessageCircle, FileText, Monitor, Laptop
} from "lucide-react";
import videoPoster from "@/assets/hero-poster-free-lesson.png";
import heroVideo from "@/assets/hero-video-free-lesson.mp4";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import alinePhoto from "@/assets/testimonial-new-1.jpg";
import joaoPhoto from "@/assets/testimonial-new-3.jpg";
import carlaPhoto from "@/assets/testimonial-new-2.jpg";
import mariaPhoto from "@/assets/testimonial-new-4.jpg";
import robertoPhoto from "@/assets/testimonial-new-6.jpg";
import sandraPhoto from "@/assets/testimonial-new-5.jpg";

// Lazy load componentes pesados
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));

const LoadingFallback = memo(() => <div className="h-8" />);

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 37,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-lg">
        <span className="text-2xl md:text-4xl font-black">{pad(timeLeft.hours)}</span>
        <p className="text-[10px] uppercase tracking-wider">Horas</p>
      </div>
      <span className="text-2xl md:text-4xl font-black text-destructive">:</span>
      <div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-lg">
        <span className="text-2xl md:text-4xl font-black">{pad(timeLeft.minutes)}</span>
        <p className="text-[10px] uppercase tracking-wider">Min</p>
      </div>
      <span className="text-2xl md:text-4xl font-black text-destructive">:</span>
      <div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-lg">
        <span className="text-2xl md:text-4xl font-black">{pad(timeLeft.seconds)}</span>
        <p className="text-[10px] uppercase tracking-wider">Seg</p>
      </div>
    </div>
  );
};

// Floating CTA Bar
const FloatingCTA = ({ onClick }: { onClick: () => void }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-accent p-3 shadow-2xl border-t-4 border-accent animate-fade-in">
    <div className="container mx-auto flex items-center justify-between gap-4">
      <div className="hidden md:block text-primary-foreground">
        <p className="font-bold text-sm">🔥 Últimas vagas com desconto!</p>
        <p className="text-xs opacity-90">De R$ 497 por apenas R$ 297</p>
      </div>
      <Button 
        size="lg"
        onClick={onClick}
        className="flex-1 md:flex-none bg-background text-foreground hover:bg-background/90 font-black text-sm md:text-base py-5 px-6 rounded-xl animate-pulse hover:animate-none"
      >
        GARANTIR MINHA VAGA AGORA <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>
);

// CTA Button Component
const CTAButton = ({ onClick, variant = "primary", text = "QUERO COMEÇAR AGORA", icon = true }: { 
  onClick: () => void; 
  variant?: "primary" | "secondary";
  text?: string;
  icon?: boolean;
}) => (
  <Button 
    size="lg"
    onClick={onClick}
    className={`w-full md:w-auto font-black text-base md:text-xl py-7 md:py-8 px-8 md:px-16 rounded-2xl transition-all hover:scale-105 ${
      variant === "primary" 
        ? "bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent shadow-[0_12px_40px_hsl(var(--accent)/0.5)] border-2 border-accent/30" 
        : "bg-destructive hover:bg-destructive/90 shadow-[0_12px_40px_hsl(var(--destructive)/0.4)]"
    }`}
  >
    {text} {icon && <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />}
  </Button>
);

// Testimonial Card
const TestimonialCard = ({ text, author, image }: { text: string; author: string; image: string }) => (
  <div className="bg-card border-2 border-line rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1">
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
      ))}
    </div>
    <p className="text-base italic mb-4 text-foreground">"{text}"</p>
    <div className="flex items-center gap-3">
      <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
      <span className="font-bold text-sm text-muted-foreground">{author}</span>
    </div>
  </div>
);

// Module Card
const ModuleCard = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => (
  <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-black text-lg text-foreground">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const VendaConversao = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  (window as any).openCheckout = openCheckout;

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
    { text: "Eu tinha MEDO de mexer no computador. Hoje faço tudo no trabalho sozinha!", author: "Aline S.", image: alinePhoto },
    { text: "Em 2 semanas já estava criando planilhas e documentos. Incrível!", author: "João M.", image: joaoPhoto },
    { text: "O suporte da Elisa fez toda diferença. Recomendo demais!", author: "Carla T.", image: carlaPhoto },
    { text: "Finalmente consigo fazer meu currículo sozinha! Valeu cada centavo.", author: "Maria L.", image: mariaPhoto },
    { text: "Nunca imaginei aprender Excel. Agora uso todo dia no trabalho!", author: "Roberto P.", image: robertoPhoto },
    { text: "A prof. Elisa explica com paciência. Eu que achava impossível, hoje me viro!", author: "Sandra F.", image: sandraPhoto },
  ];

  const modules = [
    { icon: Monitor, title: "Windows na Prática", items: ["Navegação completa", "Organização de arquivos", "Atalhos essenciais"] },
    { icon: FileText, title: "Word Profissional", items: ["Criar currículos", "Documentos formatados", "Tabelas e imagens"] },
    { icon: TrendingUp, title: "Excel do Zero", items: ["Planilhas completas", "Fórmulas básicas", "Gráficos profissionais"] },
    { icon: Laptop, title: "PowerPoint", items: ["Apresentações impactantes", "Slides profissionais", "Animações e transições"] },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* HERO SECTION - Impacto máximo */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-6 pb-12 overflow-hidden">
        {/* Urgency Bar */}
        <div className="bg-destructive text-destructive-foreground py-3 text-center mb-6">
          <p className="font-bold text-sm md:text-base animate-pulse">
            ⚡ ATENÇÃO: Oferta por tempo limitado! Bônus exclusivos acabam em breve ⚡
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge de escassez */}
            <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Flame className="w-5 h-5" />
              <span className="font-bold text-sm">🔥 Apenas 23 vagas restantes com desconto</span>
            </div>

            {/* Headline principal - DOR */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-tight animate-fade-in">
              Está <span className="text-destructive">perdendo oportunidades</span> por não saber usar o computador?
            </h1>

            {/* Sub-headline - SOLUÇÃO */}
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto animate-fade-in">
              Domine <span className="text-primary font-bold">Word, Excel e Internet</span> em poucas semanas — mesmo começando do <span className="font-bold">ZERO</span>!
            </p>

            {/* Vídeo Hero */}
            <div ref={containerRef} className="relative max-w-4xl mx-auto mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-sm opacity-50 animate-pulse"></div>
              <div className="relative">
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-black text-xs shadow-lg animate-pulse">
                    🎬 VEJA O CURSO POR DENTRO
                  </div>
                </div>
                
                {shouldLoadVideo ? (
                  <video 
                    ref={videoRef}
                    className="w-full aspect-video rounded-2xl shadow-2xl"
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
                    className="w-full aspect-video rounded-2xl bg-cover bg-center shadow-2xl"
                    style={{ backgroundImage: `url(${videoPoster})` }}
                  />
                )}
                
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={handlePlayClick}
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-accent/90 rounded-full flex items-center justify-center border-4 border-white shadow-2xl group-hover:scale-110 transition-all animate-pulse group-hover:animate-none">
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-2" fill="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timer de Urgência */}
            <div className="bg-card border-2 border-destructive/30 rounded-2xl p-6 max-w-xl mx-auto mb-8 animate-fade-in">
              <p className="text-destructive font-bold mb-4 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" /> OFERTA EXPIRA EM:
              </p>
              <CountdownTimer />
            </div>

            {/* Preço e CTA */}
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 rounded-3xl p-8">
                <p className="text-muted-foreground mb-2">De <span className="line-through text-lg">R$ 497,00</span></p>
                <p className="text-4xl md:text-5xl font-black text-accent mb-2">R$ 297,00</p>
                <p className="text-primary font-bold text-lg mb-1">ou 12x de R$ 30,22</p>
                <p className="text-accent font-bold mb-6">💰 Economize R$ 200 HOJE!</p>
                
                <CTAButton onClick={openCheckout} text="GARANTIR MINHA VAGA AGORA" />
                
                <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Pagamento 100% seguro</span>
                  <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> 7 dias de garantia</span>
                  <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Acesso imediato</span>
                </div>
              </div>
            </div>

            {/* Social proof rápido */}
            <div className="flex flex-wrap gap-6 justify-center items-center text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-bold">+2.500 alunos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning fill-warning" />
                <span className="font-bold">4.9/5 de avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="font-bold">Certificado incluso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground/50" />
        </div>
      </section>

      {/* DOR vs TRANSFORMAÇÃO */}
      <section className="py-16 bg-panel">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            De onde você está... para <span className="text-accent">onde você quer chegar</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* ANTES - Dor */}
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-8">
              <h3 className="text-xl font-black text-destructive mb-6 flex items-center gap-2">
                ❌ ANTES (sua vida hoje)
              </h3>
              <ul className="space-y-4">
                {[
                  "Medo de mexer no computador e estragar algo",
                  "Depende dos outros para tarefas simples",
                  "Perde vagas de emprego por não saber informática",
                  "Vergonha de pedir ajuda sempre",
                  "Sensação de estar ficando para trás"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <span className="text-destructive text-xl">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* DEPOIS - Transformação */}
            <div className="bg-accent/5 border-2 border-accent/20 rounded-2xl p-8">
              <h3 className="text-xl font-black text-accent mb-6 flex items-center gap-2">
                ✅ DEPOIS (com o curso)
              </h3>
              <ul className="space-y-4">
                {[
                  "Confiança total para usar qualquer programa",
                  "Independência para fazer tudo sozinho(a)",
                  "Currículo pronto para novas oportunidades",
                  "Orgulho de dominar a tecnologia",
                  "Reconhecimento da família e amigos"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <CTAButton onClick={openCheckout} text="QUERO ESSA TRANSFORMAÇÃO" variant="secondary" />
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI APRENDER */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            O que você vai <span className="text-primary">dominar</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Conteúdo 100% prático — você aprende fazendo, não só assistindo!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {modules.map((module, i) => (
              <ModuleCard key={i} {...module} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-accent font-bold text-lg mb-4">+ Bônus: Internet Segura, E-mail Profissional e muito mais!</p>
            <CTAButton onClick={openCheckout} text="QUERO ACESSO COMPLETO" />
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Este curso é <span className="text-primary">perfeito</span> para você se...
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Nunca mexeu em um computador ou tem muito pouca experiência",
              "Quer conquistar um emprego melhor ou se recolocar no mercado",
              "Precisa de um certificado para apresentar no trabalho",
              "Está cansado(a) de depender dos outros para tarefas simples",
              "Quer fazer compras, pagamentos e usar a internet com segurança",
              "Deseja criar currículos, planilhas e documentos profissionais"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-card border border-line rounded-xl p-5">
                <Target className="w-8 h-8 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            Veja quem já <span className="text-accent">transformou sua vida</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Histórias reais de alunos que saíram do zero!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>

          <div className="text-center mt-10">
            <CTAButton onClick={openCheckout} text="QUERO SER O PRÓXIMO" />
          </div>
        </div>
      </section>

      {/* QUEM É A PROFESSORA */}
      <section className="py-16 bg-panel">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/3">
              <img 
                src={elisaPhoto} 
                alt="Professora Elisa" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary shadow-2xl mx-auto"
                loading="lazy"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Conheça a <span className="text-primary">Professora Elisa</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Há mais de <strong>15 anos</strong> ensinando informática para pessoas que nunca tocaram em um computador. 
                Especialista em transformar o "impossível" em "eu consegui!".
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Já ajudou <strong>mais de 2.500 alunos</strong> a conquistarem independência digital e novas oportunidades de trabalho.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-card border border-line rounded-xl px-4 py-2">
                  <span className="font-bold text-primary">+15 anos</span>
                  <p className="text-xs text-muted-foreground">de experiência</p>
                </div>
                <div className="bg-card border border-line rounded-xl px-4 py-2">
                  <span className="font-bold text-primary">+2.500</span>
                  <p className="text-xs text-muted-foreground">alunos formados</p>
                </div>
                <div className="bg-card border border-line rounded-xl px-4 py-2">
                  <span className="font-bold text-primary">4.9/5</span>
                  <p className="text-xs text-muted-foreground">avaliação média</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent rounded-3xl p-10 text-center">
            <Shield className="w-20 h-20 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Garantia Incondicional de <span className="text-accent">7 Dias</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Se em 7 dias você não gostar do curso, por <strong>qualquer motivo</strong>, devolvemos 
              <strong> 100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
            </p>
            <p className="text-accent font-bold text-xl">
              ✅ Risco ZERO para você experimentar!
            </p>
          </div>
        </div>
      </section>

      {/* OFERTA FINAL */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-full mb-6 animate-pulse">
              <Flame className="w-5 h-5" />
              <span className="font-bold text-sm">ÚLTIMA CHANCE — DESCONTO EXPIRA HOJE!</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-8">
              Tudo isso por um valor <span className="text-accent">simbólico</span>
            </h2>

            <div className="bg-card border-4 border-accent rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Timer */}
              <div className="mb-8">
                <p className="text-destructive font-bold mb-4 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" /> OFERTA TERMINA EM:
                </p>
                <CountdownTimer />
              </div>

              {/* Bônus */}
              <div className="bg-accent/10 rounded-2xl p-6 mb-8">
                <h3 className="font-black text-xl mb-4 flex items-center justify-center gap-2">
                  <Gift className="w-6 h-6 text-accent" /> BÔNUS EXCLUSIVOS (Grátis hoje!)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {[
                    { name: "Digitação Ninja", value: "R$ 97" },
                    { name: "Internet Segura", value: "R$ 67" },
                    { name: "E-mail Profissional", value: "R$ 47" },
                    { name: "Suporte Exclusivo WhatsApp", value: "R$ 60" }
                  ].map((bonus, i) => (
                    <div key={i} className="flex items-center justify-between bg-card rounded-lg p-3">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        {bonus.name}
                      </span>
                      <span className="text-muted-foreground line-through text-sm">{bonus.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preço */}
              <div className="mb-8">
                <p className="text-muted-foreground mb-1">
                  Valor total: <span className="line-through">R$ 768,00</span>
                </p>
                <p className="text-2xl text-destructive font-bold line-through mb-2">R$ 497,00</p>
                <p className="text-5xl md:text-6xl font-black text-accent mb-2">R$ 297,00</p>
                <p className="text-primary font-bold text-xl">ou 12x de R$ 30,22</p>
                <p className="text-accent font-bold mt-2">💰 ECONOMIA DE R$ 471!</p>
              </div>

              <CTAButton onClick={openCheckout} text="QUERO GARANTIR MINHA VAGA" />

              <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Pagamento 100% seguro</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> 7 dias de garantia</span>
                <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Acesso imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ RÁPIDO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Preciso ter computador em casa?", a: "Você pode acessar as aulas pelo celular, tablet ou computador. Mas para praticar, recomendamos ter acesso a um computador." },
              { q: "Por quanto tempo tenho acesso?", a: "Acesso por 2 ANOS completos! Tempo de sobra para aprender no seu ritmo e revisar sempre que precisar." },
              { q: "E se eu não gostar do curso?", a: "Sem problemas! Você tem 7 dias de garantia incondicional. Devolvemos 100% do seu dinheiro, sem perguntas." },
              { q: "Recebo certificado?", a: "Sim! Certificado digital incluso ao concluir o curso. Válido para comprovar suas habilidades." },
              { q: "As aulas são ao vivo?", a: "As aulas são gravadas, então você pode assistir quando e onde quiser, quantas vezes precisar." }
            ].map((faq, i) => (
              <div key={i} className="bg-card border border-line rounded-xl p-6">
                <h3 className="font-bold text-lg text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
            Sua transformação começa AGORA!
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Não deixe para amanhã o que pode mudar sua vida hoje. As vagas com desconto são limitadas!
          </p>
          <Button 
            size="lg"
            onClick={openCheckout}
            className="bg-background text-foreground hover:bg-background/90 font-black text-xl py-8 px-16 rounded-2xl shadow-2xl hover:scale-105 transition-all"
          >
            GARANTIR MINHA VAGA AGORA <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          <p className="text-primary-foreground/70 text-sm mt-4">
            ✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ Certificado incluso
          </p>
        </div>
      </section>

      {/* Footer simples */}
      <footer className="py-8 bg-panel text-center text-sm text-muted-foreground">
        <p>© 2024 Curso de Informática na Prática — Todos os direitos reservados</p>
      </footer>

      {/* Floating CTA */}
      <FloatingCTA onClick={openCheckout} />

      {/* WhatsApp Float */}
      <Suspense fallback={<LoadingFallback />}>
        <WhatsAppButton />
      </Suspense>

      {/* Checkout Dialog */}
      <CheckoutDialog open={isOpen} onOpenChange={closeCheckout} />
    </div>
  );
};

export default VendaConversao;
