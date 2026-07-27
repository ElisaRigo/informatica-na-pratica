import { useEffect, useState, useMemo } from "react";

import {
  ShieldCheck, Star, CheckCircle2, X, Clock, Sparkles, Award, Users,
  PlayCircle, Zap, Heart, TrendingUp, Lock, Gift, GraduationCap,
  MessageCircle, Infinity as InfinityIcon, ChevronDown, CreditCard,
  Smartphone, Trophy, BookOpen, Headphones, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import heroCover from "@/assets/hero-video-cover.png";

/* ---------- Countdown (persistent 20min) ---------- */
const useCountdown = () => {
  const KEY = "mq_countdown_expires";
  const DURATION = 20 * 60 * 1000;
  const [ms, setMs] = useState<number>(() => {
    if (typeof window === "undefined") return DURATION;
    const stored = Number(window.localStorage.getItem(KEY));
    const now = Date.now();
    if (!stored || stored < now) {
      const expires = now + DURATION;
      window.localStorage.setItem(KEY, String(expires));
      return DURATION;
    }
    return stored - now;
  });
  useEffect(() => {
    const id = setInterval(() => {
      setMs((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          const expires = Date.now() + DURATION;
          window.localStorage.setItem(KEY, String(expires));
          return DURATION;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${pad(m)}:${pad(s)}`;
};

const openCheckout = () => (window as any).openCheckout?.();

/* ---------- Reusable CTA ---------- */
const CTA = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <Button
    onClick={openCheckout}
    size="lg"
    className={`h-auto py-5 md:py-6 px-6 md:px-10 rounded-2xl font-black text-base md:text-lg
      bg-gradient-to-r from-[hsl(150_80%_38%)] to-[hsl(150_75%_40%)]
      hover:from-[hsl(150_75%_40%)] hover:to-[hsl(150_80%_38%)]
      text-white shadow-[0_16px_50px_hsl(150_75%_40%/0.45)]
      hover:scale-[1.02] active:scale-[0.99] transition-all
      border border-white/10 ${className}`}
  >
    {children}
    <ArrowRight className="w-5 h-5 ml-2" />
  </Button>
);

/* ---------- Sticky top bar ---------- */
const TopBar = () => {
  const c = useCountdown();
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold flex-wrap">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Oferta especial 40% OFF
        </span>
        <span className="hidden sm:inline text-white/60">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> Termina em
          <span className="font-mono tabular-nums bg-white/15 border border-white/30 px-2 py-0.5 rounded">{c}</span>
        </span>
      </div>
    </div>
  );
};

/* ---------- HERO ---------- */
const Hero = () => {
  const [play, setPlay] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="absolute inset-0 pointer-events-none opacity-40"
           style={{ backgroundImage: "radial-gradient(1000px 400px at 50% -100px, hsl(195 100% 90%), transparent 60%)" }} />
      <div className="container mx-auto px-4 py-8 md:py-12 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 shadow-sm px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-blue-700 mb-5 animate-fade-in">
            <Users className="w-4 h-4" /> +15.000 alunos já aprenderam com a Professora Elisa
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] mb-5">
            Aprenda informática do <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">zero</span>
            <br className="hidden md:block" />
            e nunca mais dependa de ninguém.
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-7">
            Em poucas semanas você usa <b>Word, Excel, e-mail e internet</b> com confiança —
            no seu ritmo, com aulas simples e uma professora que explica com calma.
          </p>

          {/* Video / mockup */}
          <div className="relative max-w-3xl mx-auto mb-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-video bg-slate-900">
              {play ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                  title="Apresentação do curso"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button onClick={() => setPlay(true)} className="w-full h-full relative group">
                  <img src={heroCover} alt="Curso de informática" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-14 h-14 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> ASSISTA
                  </div>
                </button>
              )}
            </div>
          </div>

          <CTA>Quero aprender agora com 40% OFF</CTA>

          <p className="text-xs md:text-sm text-slate-500 mt-3">
            Acesso imediato • Garantia incondicional de 7 dias • Parcele em até 12x
          </p>

          {/* Trust row */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6 text-slate-600 text-xs md:text-sm">
            <div className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> Compra 100% segura</div>
            <div className="inline-flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-600" /> Certificado incluso</div>
            <div className="inline-flex items-center gap-1.5"><InfinityIcon className="w-4 h-4 text-blue-600" /> Acesso vitalício</div>
            <div className="inline-flex items-center gap-1.5"><Headphones className="w-4 h-4 text-blue-600" /> Suporte da professora</div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- PAIN ---------- */
const Pain = () => (
  <section className="py-14 md:py-20 bg-white">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-10">
        <span className="text-red-600 font-bold text-sm uppercase tracking-widest">Você se reconhece?</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2">
          Você não está sozinho(a) — mas isso <span className="text-red-600">está te custando caro</span>.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          "Sente vergonha quando alguém te pede pra 'mexer no computador'",
          "Depende do filho, neto ou colega pra tarefas simples",
          "Já perdeu vagas de emprego por não saber Word ou Excel",
          "Fica ansioso(a) quando precisa mandar um e-mail ou anexar um arquivo",
          "Tem medo de clicar 'no lugar errado' e estragar tudo",
          "Se sente ultrapassado(a) num mundo cada vez mais digital",
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700 text-base md:text-lg">{t}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-slate-600 text-lg md:text-xl mt-10 max-w-3xl mx-auto">
        Cada dia sem aprender é uma <b>oportunidade perdida</b>: um trabalho, uma promoção,
        uma independência que deveria ser sua há muito tempo.
      </p>
    </div>
  </section>
);

/* ---------- SOLUTION ---------- */
const Solution = () => (
  <section className="py-14 md:py-20 bg-gradient-to-b from-blue-50 to-white">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10">
        <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">A solução definitiva</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2">
          O método <span className="text-blue-600">Informática na Prática</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
          Aulas curtas, práticas e no ritmo de quem está começando do zero — feitas por uma professora
          que ensinou mais de 15 mil alunos a perderem o medo do computador.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { icon: BookOpen, t: "Passo a passo, na sua velocidade", d: "Aulas curtas de 5 a 10 minutos, do básico ao avançado, sem pressa e sem termos técnicos difíceis." },
          { icon: Heart, t: "Explicado como se fosse pra sua mãe", d: "Linguagem simples, exemplos do dia a dia e paciência de sobra. Você entende de primeira." },
          { icon: TrendingUp, t: "Resultado real em semanas", d: "Já na primeira semana você faz coisas que hoje pede pros outros: e-mail, documento, pesquisa." },
        ].map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <c.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-black text-xl text-slate-900 mb-2">{c.t}</h3>
            <p className="text-slate-600">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- BENEFITS Before/After ---------- */
const Benefits = () => (
  <section className="py-14 md:py-20 bg-white">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">
          A sua vida <span className="text-blue-600">antes</span> e <span className="text-green-600">depois</span> do curso
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-red-200 bg-red-50/50 p-6">
          <h3 className="font-black text-xl text-red-700 mb-4 flex items-center gap-2">
            <X className="w-5 h-5" /> Antes
          </h3>
          <ul className="space-y-3 text-slate-700">
            {["Dependência de outras pessoas", "Vergonha de pedir ajuda", "Medo de clicar errado",
              "Oportunidades perdidas no trabalho", "Sensação de estar 'ficando pra trás'"].map((t,i)=>(
              <li key={i} className="flex gap-2"><X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-green-200 bg-green-50/50 p-6">
          <h3 className="font-black text-xl text-green-700 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Depois
          </h3>
          <ul className="space-y-3 text-slate-700">
            {["Autonomia total no computador", "Orgulho de fazer sozinho(a)", "Confiança em qualquer tarefa",
              "Portas abertas no mercado de trabalho", "Sensação de conquista todos os dias"].map((t,i)=>(
              <li key={i} className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-10">
        <CTA>Quero essa transformação</CTA>
      </div>
    </div>
  </section>
);

/* ---------- WHAT YOU GET ---------- */
const modules = [
  { t: "Fundamentos do Computador", d: "Ligar, desligar, mouse, teclado, janelas, arquivos e pastas." },
  { t: "Windows na Prática", d: "Domine o sistema, organize seus arquivos e nunca mais se perca." },
  { t: "Word Descomplicado", d: "Crie documentos, currículos, cartas e trabalhos profissionais." },
  { t: "Excel do Zero ao Avançado", d: "Planilhas, fórmulas e controle financeiro sem complicação." },
  { t: "Internet com Segurança", d: "Navegar, pesquisar, baixar e evitar golpes online." },
  { t: "E-mail Profissional", d: "Enviar, receber, anexar e organizar como um verdadeiro pro." },
];
const Contents = () => (
  <section className="py-14 md:py-20 bg-slate-50">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-10">
        <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">O que você recebe</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2">Tudo o que você precisa em um só lugar</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m, i) => (
          <div key={i} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black flex-shrink-0">
                {String(i+1).padStart(2,"0")}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">{m.t}</h3>
                <p className="text-slate-600 text-sm mt-1">{m.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid md:grid-cols-4 gap-3">
        {[
          { icon: InfinityIcon, t: "Acesso Vitalício" },
          { icon: Award, t: "Certificado Digital" },
          { icon: Headphones, t: "Suporte com a Professora" },
          { icon: Zap, t: "Atualizações Gratuitas" },
        ].map((b,i)=>(
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <b.icon className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-slate-800">{b.t}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- BONUSES ---------- */
const bonuses = [
  { t: "Bônus #1 — Mercado de Trabalho", d: "Como usar informática pra conquistar sua vaga.", v: "R$ 97" },
  { t: "Bônus #2 — Atalhos Essenciais", d: "Trabalhe 3x mais rápido com atalhos secretos.", v: "R$ 67" },
  { t: "Bônus #3 — Currículo Profissional", d: "Modelos prontos + como preencher passo a passo.", v: "R$ 107" },
  { t: "Bônus #4 — E-mail Profissional", d: "Aprenda a se comunicar como um verdadeiro pro.", v: "R$ 97" },
];
const Bonuses = () => (
  <section className="py-14 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none"
         style={{ backgroundImage: "radial-gradient(600px 300px at 20% 20%, #22d3ee, transparent), radial-gradient(600px 300px at 80% 80%, #10b981, transparent)" }} />
    <div className="container mx-auto px-4 max-w-5xl relative">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          <Gift className="w-4 h-4" /> Bônus Exclusivos
        </span>
        <h2 className="text-3xl md:text-5xl font-black mt-3">
          Hoje você leva <span className="text-yellow-300">4 bônus</span> que valem mais que o curso
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {bonuses.map((b,i)=>(
          <div key={i} className="backdrop-blur bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-black text-xl">{b.t}</h3>
                <p className="text-slate-300 mt-1">{b.d}</p>
              </div>
              <span className="text-yellow-300 font-black whitespace-nowrap">{b.v}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-slate-300">Valor total dos bônus:</p>
        <p className="text-3xl md:text-4xl font-black text-yellow-300 line-through decoration-red-500">R$ 368</p>
        <p className="text-xl font-black text-white mt-1">Hoje: GRÁTIS com o curso</p>
      </div>
    </div>
  </section>
);

/* ---------- TESTIMONIALS ---------- */
const testimonials = [
  { n: "Maria, 58", r: "Aposentada", t: "Antes eu chorava tentando abrir um e-mail. Hoje eu ajudo minhas amigas. A Elisa mudou minha vida." , s: 5 },
  { n: "José, 62", r: "Comerciante", t: "Comecei do zero, aprendi Excel e agora faço o controle da minha loja sozinho. Recomendo demais." , s: 5 },
  { n: "Ana, 45", r: "Diarista", t: "Consegui um emprego de auxiliar administrativo depois do curso. Nunca imaginei que conseguiria." , s: 5 },
  { n: "Carlos, 51", r: "Motorista", t: "Aulas curtas, direto ao ponto. Em 3 semanas eu já mexia no computador com confiança." , s: 5 },
];
const Testimonials = () => (
  <section className="py-14 md:py-20 bg-white">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10">
        <div className="flex justify-center gap-1 mb-3">
          {[...Array(5)].map((_,i)=><Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Mais de 15.000 vidas transformadas</h2>
        <p className="text-slate-600 mt-3 text-lg">Veja o que dizem quem começou exatamente como você</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {testimonials.map((d,i)=>(
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-1 mb-3">
              {[...Array(d.s)].map((_,i)=><Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-slate-700 text-lg italic mb-4">"{d.t}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black">
                {d.n[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900">{d.n}</p>
                <p className="text-sm text-slate-500">{d.r}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-10 max-w-3xl mx-auto text-center">
        {[
          { n: "15.000+", l: "Alunos" },
          { n: "98%", l: "Satisfação" },
          { n: "4.9", l: "Avaliação" },
        ].map((s,i)=>(
          <div key={i} className="bg-blue-50 rounded-2xl p-4">
            <p className="text-2xl md:text-4xl font-black text-blue-600">{s.n}</p>
            <p className="text-sm text-slate-600">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- AUTHORITY ---------- */
const Authority = () => (
  <section className="py-14 md:py-20 bg-slate-50">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-8xl font-black shadow-2xl">
            E
          </div>
        </div>
        <div className="md:col-span-3">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Quem vai te ensinar</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2 mb-4">Professora Elisa</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Mais de 20 anos ensinando informática pra quem <b>nunca conseguiu aprender</b>.
            Especialista em ensinar adultos e idosos com paciência, calma e uma didática que quebra qualquer barreira.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { i: Users, n: "15.000+", l: "alunos" },
              { i: Trophy, n: "20 anos", l: "ensinando" },
              { i: Star, n: "4.9/5", l: "avaliação" },
            ].map((s,i)=>(
              <div key={i} className="bg-white rounded-2xl p-3 border border-slate-200 text-center">
                <s.i className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="font-black text-slate-900">{s.n}</p>
                <p className="text-xs text-slate-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- OBJECTIONS ---------- */
const objections = [
  { q: "Não tenho tempo", a: "Aulas de 5 a 10 minutos. Você aprende em qualquer horário, no seu ritmo." },
  { q: "Sou muito velho(a) pra aprender", a: "Nossos alunos têm entre 40 e 78 anos. A idade é justamente sua maior vantagem: você tem paciência." },
  { q: "Nunca consegui aprender computador", a: "Nunca teve alguém explicando com calma. Aqui a Elisa começa do 'como ligar' e vai passo a passo." },
  { q: "Tenho medo de estragar o computador", a: "Impossível. Você aprende exatamente onde clicar. E se errar, é só voltar. Nada quebra." },
  { q: "Vou desistir no meio", a: "Aulas curtas, práticas e com resultado visível já na primeira semana. Você não vai querer parar." },
  { q: "Está caro pra mim", a: "R$ 297 (ou 12x menos de R$ 30) por um curso vitalício que abre portas pro resto da vida. Menos de R$ 1 por dia." },
];
const Objections = () => (
  <section className="py-14 md:py-20 bg-white">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">"Mas e se..."</h2>
        <p className="text-slate-600 mt-3 text-lg">As dúvidas que passam pela sua cabeça agora — respondidas com honestidade.</p>
      </div>
      <div className="space-y-3">
        {objections.map((o,i)=>(
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-black text-lg text-slate-900 mb-1">❌ {o.q}</p>
            <p className="text-slate-700">✅ {o.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- GUARANTEE ---------- */
const Guarantee = () => (
  <section className="py-14 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
    <div className="container mx-auto px-4 max-w-3xl text-center">
      <div className="inline-block w-24 h-24 rounded-full bg-white shadow-xl mb-6 flex items-center justify-center border-4 border-green-500">
        <ShieldCheck className="w-14 h-14 text-green-600" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
        Garantia incondicional de <span className="text-green-600">7 dias</span>
      </h2>
      <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
        Faça o curso, teste tudo por 7 dias. Se por qualquer motivo não gostar,
        <b> devolvemos 100% do seu dinheiro</b>. Sem perguntas, sem burocracia.
      </p>
      <p className="mt-6 text-slate-600">O <b>risco é todo nosso</b>. Você só tem a ganhar.</p>
    </div>
  </section>
);

/* ---------- OFFER / PRICING ---------- */
const Offer = () => {
  const c = useCountdown();
  return (
    <section id="oferta" className="py-14 md:py-20 bg-gradient-to-b from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 text-xs md:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wide">
            <Clock className="w-4 h-4" /> Oferta termina em {c}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-4">Garanta sua vaga hoje</h2>
        </div>

        <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Tudo o que está incluso</p>
          <div className="space-y-2 mb-6">
            {[
              ["Curso completo Informática na Prática", "R$ 497"],
              ["4 Bônus exclusivos", "R$ 368"],
              ["Certificado digital", "R$ 97"],
              ["Suporte com a professora", "R$ 197"],
            ].map(([t,v],i)=>(
              <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{t}</span>
                <span className="text-slate-500 line-through">{v}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold">Valor total:</span>
              <span className="text-xl font-black line-through text-slate-400">R$ 1.159</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-6 text-center">
            <p className="text-sm font-bold text-green-700 uppercase tracking-widest">Hoje por apenas</p>
            <p className="text-2xl text-slate-400 line-through mt-1">R$ 497</p>
            <p className="text-5xl md:text-7xl font-black text-slate-900 mt-1">R$ 297</p>
            <p className="text-lg md:text-xl font-bold text-slate-700 mt-2">
              ou 12x de <span className="text-green-600">R$ 30,72</span>
            </p>
            <p className="text-sm text-slate-500 mt-1">💰 Menos de R$ 1 por dia</p>
          </div>

          <div className="mt-6">
            <CTA className="w-full">Quero minha vaga com 40% OFF</CTA>
            <div className="flex flex-wrap justify-center gap-3 mt-4 text-slate-600 text-sm">
              <span className="inline-flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> Cartão até 12x</span>
              <span className="inline-flex items-center gap-1.5"><Smartphone className="w-4 h-4" /> Pix</span>
              <span className="inline-flex items-center gap-1.5"><Lock className="w-4 h-4" /> Compra segura via Hotmart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const faqs = [
  ["Como funciona o curso?", "100% online, você acessa quando e de onde quiser, com aulas em vídeo curtas e práticas."],
  ["Preciso ter computador?", "Sim, é ideal ter um computador ou notebook pra praticar junto com as aulas."],
  ["Sou iniciante total, vou conseguir?", "Sim! O curso começa do zero absoluto — inclusive como ligar e desligar o computador."],
  ["Quanto tempo tenho pra assistir?", "Acesso vitalício. Você assiste quantas vezes quiser, pelo resto da vida."],
  ["Tem certificado?", "Sim, certificado digital de conclusão, emitido 15 dias após o pagamento."],
  ["Como recebo o acesso?", "Assim que confirma o pagamento, você recebe o acesso por e-mail em até 2 minutos."],
  ["Posso parcelar?", "Sim, em até 12x no cartão de crédito."],
  ["Tem suporte?", "Sim, direto com a Professora Elisa e sua equipe."],
  ["Funciona pra pessoas mais velhas?", "Muitos alunos têm entre 50 e 70+ anos. Foi feito pensando neles."],
  ["Vou aprender Word e Excel?", "Sim! Módulos completos de Word e Excel, do básico ao avançado."],
  ["E se eu não gostar?", "Você tem 7 dias de garantia incondicional. Devolvemos 100% do valor."],
  ["Precisa de internet?", "Sim, pra assistir as aulas. Depois de assistir, você pode praticar offline."],
  ["Quanto tempo leva pra terminar?", "Cerca de 30 dias no ritmo médio. Mas você tem acesso pra sempre."],
  ["Ganho os bônus mesmo?", "Sim! Os 4 bônus estão inclusos gratuitamente na compra de hoje."],
  ["Como falo com o suporte?", "Pelo WhatsApp da professora, disponível pra tirar suas dúvidas."],
];
const FAQ = () => (
  <section className="py-14 md:py-20 bg-white">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Perguntas frequentes</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map(([q,a],i)=>(
          <AccordionItem key={i} value={`i${i}`} className="bg-slate-50 border border-slate-200 rounded-2xl px-5">
            <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline">{q}</AccordionTrigger>
            <AccordionContent className="text-slate-700">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

/* ---------- FINAL CTA ---------- */
const FinalCTA = () => (
  <section className="py-14 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl md:text-5xl font-black mb-4">A decisão é sua.</h2>
      <p className="text-lg md:text-xl text-slate-300 mb-8">
        Você pode continuar dependendo dos outros... ou aprender de vez, no seu ritmo, com quem sabe ensinar.
      </p>
      <CTA>Quero começar agora</CTA>
      <p className="text-sm text-slate-400 mt-4">7 dias de garantia • Acesso imediato • Vitalício</p>
    </div>
  </section>
);

/* ---------- FOOTER ---------- */
const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-10">
    <div className="container mx-auto px-4 max-w-5xl text-center text-sm space-y-3">
      <p className="font-bold text-white">Informática na Prática LTDA</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/termos-de-uso" className="hover:text-white">Termos de uso</a>
        <a href="/politica-de-privacidade" className="hover:text-white">Política de privacidade</a>
        <a href="https://api.whatsapp.com/send?phone=5545988287082" className="hover:text-white">Contato</a>
      </div>
      <p className="text-xs text-slate-500 max-w-2xl mx-auto">
        Todos os direitos reservados. Este site não é afiliado ao Facebook, Google ou qualquer outra plataforma.
      </p>
    </div>
  </footer>
);

/* ---------- Sticky mobile CTA ---------- */
const StickyMobile = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur border-t border-slate-200 shadow-2xl">
    <Button
      onClick={openCheckout}
      className="w-full h-14 rounded-xl font-black text-base bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
    >
      Quero minha vaga por R$ 297
    </Button>
  </div>
);

/* ---------- PAGE ---------- */
export default function Maquina() {
  useEffect(() => {
    document.title = "Curso de Informática do Zero — Aprenda sem depender de ninguém";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Curso online de informática do zero com a Professora Elisa. Word, Excel, internet e e-mail. Acesso vitalício, certificado e 7 dias de garantia.");
    setMeta("og:title", "Curso de Informática do Zero — Aprenda sem depender de ninguém", "property");
    setMeta("og:description", "Aprenda informática no seu ritmo. +15.000 alunos.", "property");
    setMeta("og:type", "product", "property");
  }, []);
  return (
    <div className="bg-white text-slate-900 min-h-screen antialiased">
      <TopBar />
      <Hero />
      <Pain />
      <Solution />
      <Benefits />
      <Contents />
      <Bonuses />
      <Testimonials />
      <Authority />
      <Objections />
      <Guarantee />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobile />
    </div>
  );
}
