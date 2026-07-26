import { useEffect, useRef, useState } from "react";
import {
  Play, CheckCircle2, ShieldCheck, Star, Lock, Award, Clock,
  ArrowRight, RotateCcw, Briefcase, Home as HomeIcon, Target, Heart,
  Sparkles, MessageCircle, BookOpen, Mail, FileText, Keyboard,
  Gift, Users, ChevronDown, NotebookPen,
} from "lucide-react";
import elisa from "@/assets/elisa-photo.jpg";
import { openHotmartCheckout } from "@/lib/checkoutTracking";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

/* ============================================================
   /boa — Landing de alta conversão
   Direção: Masterclass (navy + verde) — Outfit/Figtree — single column
   ============================================================ */

const NAVY = "#0f1b3d";
const NAVY_2 = "#1e3a5f";
const BLUE = "#3b6fa0";
const MIST = "#e8edf3";
const GREEN = "#16a34a";
const GREEN_DARK = "#15803d";

const cta = (label: string) => (
  <button
    onClick={() => openHotmartCheckout()}
    className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-5 md:py-6 rounded-2xl text-lg md:text-xl font-bold shadow-[0_10px_20px_-5px_rgba(22,163,74,0.45)] transition-all hover:-translate-y-0.5 active:scale-[.98]"
  >
    {label}
    <span className="block text-xs font-normal opacity-85 mt-1">Acesso imediato • Garantia de 7 dias</span>
  </button>
);

/* ---------- Hero ---------- */
const Hero = () => {
  const [play, setPlay] = useState(false);
  return (
    <section className="bg-[#0f1b3d]">
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-[#3b6fa0]/25 px-4 py-1.5 rounded-full border border-[#3b6fa0]/40 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#e8edf3] text-xs font-semibold tracking-wider uppercase font-['Outfit']">Inscrições Abertas</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Outfit']">
          Aprenda a usar o computador <span className="text-[#7fb2e0]">do zero</span>, sem medo
        </h1>
        <p className="text-[#e8edf3]/85 mt-4 text-base md:text-lg font-['Figtree']">
          Método passo a passo da Prof. Elisa para quem quer independência digital, mesmo começando do absoluto zero.
        </p>
      </div>

      {/* Vídeo destacado sobrepondo hero */}
      <div className="max-w-2xl mx-auto px-6 -mt-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-[#1e3a5f]">
          {play ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/_0OPLnEiMHk?rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&autoplay=1"
              title="Aula demonstrativa"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button onClick={() => setPlay(true)} className="absolute inset-0 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/70 to-transparent" />
              <div className="z-10 bg-white/15 backdrop-blur-md p-5 rounded-full border border-white/25 group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white fill-white" />
              </div>
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium font-['Outfit']">
                Assistir aula demonstrativa
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Trust bar */}
      <div className="max-w-2xl mx-auto px-6 mt-6 pb-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[#e8edf3]/85 text-sm font-['Figtree']">
        <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> +15.000 alunos</span>
        <span className="inline-flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4,9/5 avaliação</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Garantia 7 dias</span>
      </div>
    </section>
  );
};

/* ---------- Identificação (checklist) ---------- */
const Identify = () => (
  <section className="bg-white">
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d] text-center font-['Outfit']">
        Você se identifica com alguma dessas situações?
      </h2>
      <ul className="mt-8 space-y-3 font-['Figtree']">
        {[
          "Tem medo de clicar em algo errado e estragar o computador",
          "Precisa pedir ajuda para o filho ou neto pra tudo",
          "Sente vergonha por não saber mandar um e-mail simples",
          "Já perdeu oportunidade de trabalho por não dominar o básico",
          "Quer aprender no seu ritmo, com calma e sem julgamento",
        ].map((t) => (
          <li key={t} className="flex items-start gap-3 bg-[#e8edf3]/60 border border-[#3b6fa0]/15 rounded-xl p-4">
            <CheckCircle2 className="w-6 h-6 text-[#16a34a] shrink-0 mt-0.5" />
            <span className="text-[#1e3a5f] text-base md:text-lg">{t}</span>
          </li>
        ))}
      </ul>
      <p className="text-center mt-8 text-[#1e3a5f] text-lg font-['Figtree']">
        Se marcou pelo menos uma, <strong className="text-[#0f1b3d]">esse curso foi feito pra você</strong>.
      </p>
    </div>
  </section>
);

/* ---------- Quiz curto ---------- */
type Profile = "trabalho" | "pessoal";
const QUESTIONS: { q: string; options: { label: string; icon: any; profile: Profile }[] }[] = [
  { q: "Por que você quer aprender informática?", options: [
    { label: "Pra conseguir um emprego ou melhorar no trabalho", icon: Briefcase, profile: "trabalho" },
    { label: "Pra usar no dia a dia sem depender de ninguém", icon: HomeIcon, profile: "pessoal" },
  ]},
  { q: "O que você mais quer aprender?", options: [
    { label: "Word, Excel e enviar currículo por e-mail", icon: Target, profile: "trabalho" },
    { label: "Mexer no PC, salvar fotos e resolver coisas online", icon: Heart, profile: "pessoal" },
  ]},
  { q: "Como você se sente hoje diante do computador?", options: [
    { label: "Perdido(a) — e isso me atrapalha profissionalmente", icon: Briefcase, profile: "trabalho" },
    { label: "Com vergonha de pedir ajuda toda hora", icon: HomeIcon, profile: "pessoal" },
  ]},
];
const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Profile[]>([]);
  const done = step >= QUESTIONS.length;
  const profile: Profile = answers.filter(a => a === "trabalho").length >= answers.filter(a => a === "pessoal").length ? "trabalho" : "pessoal";
  const result = {
    trabalho: {
      title: "Perfil: Mercado de Trabalho",
      msg: "Você vai dominar Word, Excel, e-mail e internet — as ferramentas mais pedidas em qualquer vaga — e sair pronto(a) para entrevistas e testes básicos.",
    },
    pessoal: {
      title: "Perfil: Uso Pessoal",
      msg: "Você vai usar o computador com autonomia no dia a dia: resolver serviços, salvar suas fotos, mandar e-mails e nunca mais depender dos outros.",
    },
  }[profile];

  return (
    <section className="bg-[#e8edf3]">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0f1b3d] text-white px-5 py-2 rounded-full font-['Outfit'] font-bold text-sm md:text-base">
            <NotebookPen className="w-5 h-5" /> Teste rápido — 30 segundos
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#0f1b3d] font-['Outfit']">
            Descubra como esse curso pode te ajudar
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-[#3b6fa0]/15 shadow-lg p-6 md:p-8">
          {!done ? (
            <>
              <div className="flex items-center justify-between mb-4 font-['Figtree'] text-sm text-[#3b6fa0]">
                <span>Pergunta {step + 1} de {QUESTIONS.length}</span>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <span key={i} className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-[#3b6fa0]" : "bg-[#e8edf3]"}`} />
                  ))}
                </div>
              </div>
              <p className="text-[#0f1b3d] text-lg md:text-xl font-bold mb-5 font-['Outfit']">
                {step + 1}. {QUESTIONS[step].q}
              </p>
              <div className="grid gap-3">
                {QUESTIONS[step].options.map((opt, i) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={`q${step}-o${i}`}
                      onClick={() => { setAnswers([...answers, opt.profile]); setStep(step + 1); }}
                      className="flex items-center gap-3 p-4 bg-white border-2 border-[#e8edf3] rounded-xl hover:border-[#3b6fa0] hover:bg-[#e8edf3]/40 transition text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#e8edf3] flex items-center justify-center text-[#1e3a5f] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[#1e3a5f] font-medium font-['Figtree']">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <div className="inline-block bg-[#0f1b3d] text-white px-3 py-1 rounded-full text-xs font-bold font-['Outfit'] mb-3">
                {result.title}
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0f1b3d] font-['Outfit']">
                Sim, esse curso é pra você!
              </h3>
              <p className="text-[#1e3a5f] mt-3 font-['Figtree']">{result.msg}</p>
              <div className="mt-6">{cta("Quero começar agora")}</div>
              <button
                onClick={() => { setStep(0); setAnswers([]); }}
                className="mt-3 inline-flex items-center gap-1 text-[#3b6fa0] text-sm font-medium mx-auto"
              >
                <RotateCcw className="w-4 h-4" /> Refazer teste
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- O que você vai aprender ---------- */
const Learn = () => {
  const items = [
    { icon: BookOpen, t: "Windows do zero", d: "Ligar, mexer no mouse, abrir programas e organizar arquivos." },
    { icon: FileText, t: "Word", d: "Criar cartas, currículos e documentos formatados." },
    { icon: Keyboard, t: "Excel", d: "Planilhas simples pra controlar contas e organizar a vida." },
    { icon: Mail, t: "E-mail & Internet", d: "Enviar e-mails, pesquisar com segurança e resolver serviços online." },
    { icon: MessageCircle, t: "WhatsApp Web", d: "Usar o WhatsApp no computador, arquivos e chamadas." },
    { icon: Award, t: "Certificado", d: "Reconhecido para incluir no currículo e no LinkedIn." },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d] text-center font-['Outfit']">
          O que você vai aprender
        </h2>
        <p className="text-center text-[#1e3a5f] mt-2 font-['Figtree']">
          Conteúdo direto ao ponto, do básico ao intermediário.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-8">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-[#e8edf3]/60 border border-[#3b6fa0]/15 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-lg bg-[#0f1b3d] text-white flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-3 font-bold text-[#0f1b3d] font-['Outfit']">{t}</h3>
              <p className="text-[#1e3a5f] text-sm mt-1 font-['Figtree']">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Professora ---------- */
const Teacher = () => (
  <section className="bg-[#0f1b3d]">
    <div className="max-w-2xl mx-auto px-6 py-14 text-center">
      <img src={elisa} alt="Professora Elisa" className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover border-4 border-white shadow-xl" />
      <div className="mt-4 inline-flex items-center gap-2 bg-[#3b6fa0]/25 px-4 py-1 rounded-full border border-[#3b6fa0]/40">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-[#e8edf3] text-xs font-semibold uppercase tracking-widest font-['Outfit']">Sua Professora</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-4 font-['Outfit']">
        Prof. Elisa — 20+ anos ensinando informática do zero
      </h2>
      <p className="text-[#e8edf3]/85 mt-4 font-['Figtree']">
        Especialista em ensinar adultos e iniciantes com uma didática calma, sem termos técnicos e com paciência para explicar quantas vezes você precisar.
        Mais de 15.000 alunos já transformaram sua relação com o computador com o método dela.
      </p>
    </div>
  </section>
);

/* ---------- Depoimentos curtos ---------- */
const Testimonials = () => {
  const items = [
    { n: "Maria José, 62", t: "Não sabia nem ligar o computador. Hoje faço chamadas de vídeo com meus netos e pago minhas contas sozinha." },
    { n: "Antônio, 55", t: "Consegui um emprego melhor porque agora domino Word e Excel. Valeu cada centavo." },
    { n: "Rosa, 48", t: "A professora explica com uma calma que dá até vergonha de ter tido medo antes. Recomendo demais." },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d] text-center font-['Outfit']">
          O que dizem os alunos
        </h2>
        <div className="mt-8 space-y-4">
          {items.map((it) => (
            <div key={it.n} className="bg-[#e8edf3]/50 border-l-4 border-[#3b6fa0] rounded-r-2xl p-5">
              <div className="flex text-yellow-400 mb-2">{"★★★★★"}</div>
              <p className="text-[#1e3a5f] italic font-['Figtree']">"{it.t}"</p>
              <p className="text-[#0f1b3d] font-bold text-sm mt-2 font-['Outfit']">{it.n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Bônus ---------- */
const Bonuses = () => {
  const items = [
    { t: "Mercado de Trabalho", d: "Como usar o PC pra buscar vagas, montar currículo e se destacar.", v: "R$ 97" },
    { t: "Atalhos Essenciais", d: "Os atalhos que economizam tempo e passam a impressão de expert.", v: "R$ 67" },
    { t: "Currículo Profissional", d: "Modelo pronto no Word + passo a passo pra personalizar.", v: "R$ 97" },
    { t: "E-mail Profissional", d: "Como escrever e-mails que geram resposta e confiança.", v: "R$ 107" },
  ];
  return (
    <section className="bg-[#0f1b3d]">
      <div className="max-w-2xl mx-auto px-6 py-14 text-center">
        <div className="inline-flex items-center gap-2 bg-[#3b6fa0]/25 px-4 py-1 rounded-full border border-[#3b6fa0]/40 mb-4">
          <Gift className="w-4 h-4 text-emerald-400" />
          <span className="text-[#e8edf3] text-xs font-semibold uppercase tracking-widest font-['Outfit']">Hoje você leva</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-['Outfit']">
          4 Bônus Exclusivos <span className="text-emerald-400">de R$ 368</span> inclusos
        </h2>
        <p className="text-[#e8edf3]/85 mt-2 font-['Figtree']">
          Sem pagar nada a mais. Só quem se inscreve hoje recebe.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 gap-3 text-left">
          {items.map((b) => (
            <div key={b.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-white font-['Outfit']">{b.t}</h3>
                <span className="text-emerald-400 font-bold text-sm">{b.v}</span>
              </div>
              <p className="text-[#e8edf3]/75 text-sm mt-2 font-['Figtree']">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Oferta principal ---------- */
const Offer = () => (
  <section id="oferta" className="bg-white">
    <div className="max-w-2xl mx-auto px-6 py-14">
      <div className="bg-white rounded-3xl border border-[#3b6fa0]/20 shadow-2xl p-8 md:p-10 text-center">
        <span className="text-[#1e3a5f] text-xs font-bold uppercase tracking-widest opacity-70 font-['Outfit']">
          Oferta especial
        </span>
        <div className="text-[#0f1b3d] line-through text-lg opacity-40 italic font-medium mt-2 font-['Figtree']">
          De R$ 497,00
        </div>
        <div className="flex items-baseline justify-center gap-2 mt-1">
          <span className="text-[#0f1b3d] text-xl md:text-2xl font-medium font-['Outfit']">12x de</span>
          <span className="text-[#0f1b3d] text-5xl md:text-6xl font-black font-['Outfit']">R$ 30,72</span>
        </div>
        <div className="text-[#3b6fa0] font-semibold mt-2 font-['Figtree']">
          ou R$ 297,00 à vista • Acesso Vitalício
        </div>

        <ul className="mt-8 space-y-2 text-left font-['Figtree']">
          {[
            "Curso completo passo a passo (do zero ao intermediário)",
            "4 bônus exclusivos (R$ 368 inclusos)",
            "Certificado de conclusão reconhecido",
            "Acesso vitalício — estude no seu ritmo",
            "Suporte para tirar suas dúvidas",
          ].map((f) => (
            <li key={f} className="flex items-start gap-3 text-[#1e3a5f]">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">{cta("Quero começar agora")}</div>

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#1e3a5f]/70 font-['Figtree']">
          <span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Compra 100% segura</span>
          <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Garantia 7 dias</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Acesso imediato</span>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Garantia ---------- */
const Guarantee = () => (
  <section className="bg-[#e8edf3]">
    <div className="max-w-2xl mx-auto px-6 py-14 text-center">
      <div className="w-20 h-20 rounded-full bg-white shadow-lg mx-auto flex items-center justify-center border-4 border-[#16a34a]">
        <ShieldCheck className="w-10 h-10 text-[#16a34a]" />
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d] mt-4 font-['Outfit']">
        Garantia incondicional de 7 dias
      </h2>
      <p className="text-[#1e3a5f] mt-3 font-['Figtree'] max-w-md mx-auto">
        Assista, teste, aprenda. Se em 7 dias você achar que o curso não é pra você, devolvemos 100% do seu dinheiro — sem burocracia e sem perguntas.
      </p>
    </div>
  </section>
);

/* ---------- FAQ ---------- */
const FAQ = () => {
  const faqs = [
    { q: "Preciso ter experiência com computador?", a: "Não. O curso começa do absoluto zero, ensinando desde ligar o computador e usar o mouse até tarefas mais completas." },
    { q: "Por quanto tempo tenho acesso?", a: "Acesso vitalício. Você estuda no seu ritmo e pode revisar quantas vezes quiser." },
    { q: "O certificado é válido?", a: "Sim. É um certificado digital para incluir no currículo e no LinkedIn." },
    { q: "Como funciona a garantia?", a: "Você tem 7 dias para pedir reembolso integral, sem justificativa." },
    { q: "Como recebo o acesso?", a: "Assim que o pagamento é confirmado, você recebe o acesso por e-mail imediatamente." },
    { q: "Posso parcelar?", a: "Sim, em até 12x no cartão." },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f1b3d] text-center font-['Outfit']">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="border-b border-[#e8edf3]">
              <AccordionTrigger className="text-left text-[#0f1b3d] font-semibold font-['Outfit']">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#1e3a5f] font-['Figtree']">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

/* ---------- Footer ---------- */
const Footer = () => (
  <footer className="bg-[#0f1b3d]">
    <div className="max-w-2xl mx-auto px-6 py-8 text-center">
      <p className="text-[#e8edf3]/50 text-[11px] tracking-widest uppercase font-['Outfit']">
        © Informática na Prática LTDA
      </p>
    </div>
  </footer>
);

/* ---------- Sticky mobile CTA ---------- */
const StickyCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
      <button
        onClick={() => openHotmartCheckout()}
        className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-4 rounded-2xl text-base font-bold shadow-2xl"
      >
        Quero começar agora — R$ 297
      </button>
    </div>
  );
};

/* ---------- Top banner ---------- */
const TopBanner = () => (
  <div className="bg-[#1e3a5f] text-white text-center text-sm md:text-base font-semibold py-2 px-4 font-['Outfit']">
    💻 Hoje: 40% OFF + 4 bônus exclusivos!
  </div>
);

/* ============== Page ============== */
const Boa = () => {
  useEffect(() => {
    document.title = "Curso de Informática do Zero — Prof. Elisa";
  }, []);
  return (
    <div className="min-h-screen bg-white font-['Figtree']">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <TopBanner />
      <Hero />
      <Identify />
      <Quiz />
      <Learn />
      <Teacher />
      <Testimonials />
      <Bonuses />
      <Offer />
      <Guarantee />
      <FAQ />
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Boa;
