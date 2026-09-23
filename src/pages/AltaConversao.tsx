import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Star,
  Clock,
  Award,
  Users,
  Monitor,
  Mail,
  FileText,
  Globe,
  Presentation,
  Keyboard,
  Sparkles,
  HeartHandshake,
  Infinity as InfinityIcon,
  ArrowRight,
  Play,
  Lock,
  Gift,
  Heart,
  ThumbsUp,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import logoBlue from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import heroCoverAsset from "@/assets/capa-hero-principal.png.asset.json";
const heroCover = heroCoverAsset.url;
import certificado from "@/assets/certificado-exemplo.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import { openHotmartCheckout } from "@/lib/checkoutTracking";

const openCheckout = () => openHotmartCheckout();

// ── CTA principal (verde, gigante, tátil) ───────────────────
const CTA = ({
  children = "QUERO APRENDER AGORA",
  hint = "Acesso imediato • Garantia de 7 dias",
}: {
  children?: React.ReactNode;
  hint?: string;
}) => (
  <div className="w-full">
    <button
      onClick={openCheckout}
      className="group relative w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[.99] text-white font-black rounded-2xl shadow-xl shadow-green-600/30 transition-all text-lg md:text-2xl px-5 py-5 md:px-10 md:py-6 animate-[pulse_2.4s_ease-in-out_infinite]"
    >
      <Monitor className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
      <span className="leading-tight text-center">{children}</span>
      <ArrowRight className="hidden sm:inline-block w-6 h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
    </button>
    {hint && (
      <p className="mt-2 text-center text-xs md:text-sm text-slate-500 flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" /> {hint}
      </p>
    )}
  </div>
);

// ── Header simples ───────────────────────────────────────────
const Header = () => (
  <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
    <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
      <img src={logoBlue} alt="Informática na Prática" className="h-8 md:h-9" />
      <div className="hidden sm:flex items-center gap-1.5 text-xs md:text-sm text-slate-600">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        Compra 100% segura
      </div>
    </div>
  </header>
);

// ── Faixa promocional ────────────────────────────────────────
const TopBar = () => (
  <div className="w-full bg-blue-700 text-white text-center py-2 px-3 text-sm md:text-base font-bold">
    💻 Hoje: 40% OFF + 4 bônus exclusivos!
  </div>
);

// ── HERO — promessa clara, sem esforço ───────────────────────
const Hero = () => {
  const [play, setPlay] = useState(false);
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white pt-5 pb-6 md:pt-8 md:pb-10">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Feito para adultos que estão começando do zero
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-3">
          Use o computador com{" "}
          <span className="text-blue-700">confiança</span> e{" "}
          <span className="underline decoration-green-500 decoration-4 underline-offset-4">
            nunca mais dependa de ninguém
          </span>
          .
        </h1>

        <p className="text-base md:text-xl text-slate-700 mb-5 leading-snug">
          Em poucas aulas, você faz sozinho as tarefas do dia a dia:
          <br className="hidden md:block" />
          criar documentos, organizar arquivos, enviar e-mails e muito mais.
        </p>

        {/* Vídeo */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 mb-5 bg-black">
          <div className="aspect-video w-full">
            {play ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/_0OPLnEiMHk?cc_load_policy=0&autoplay=1&rel=0&modestbranding=1&showinfo=0&playsinline=1"
                title="Recado da professora"
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlay(true)}
                className="w-full h-full relative group"
                aria-label="Assistir vídeo"
              >
                <img src={heroCover} alt="Assista o recado da professora" className="w-full h-full object-cover" loading="eager" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                  <span className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/85 backdrop-blur flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 md:w-10 md:h-10 text-blue-700 fill-blue-700 ml-1" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        <CTA>QUERO APRENDER AGORA</CTA>

        {/* Selo de prova social imediata */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            {[avatar1, avatar2, avatar3, avatar4, avatar5].map((a, i) => (
              <img key={i} src={a} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
              ))}
              <span className="text-slate-700 text-xs font-bold ml-1">+15.000 alunos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── PAS — dor identificada com empatia ───────────────────────
const Dor = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-5 leading-tight">
        Você já sentiu isso?
      </h2>
      <div className="space-y-2.5">
        {[
          "Vergonha de pedir ajuda para o filho ou neto de novo",
          "Medo de “estragar” o computador ao clicar em algo",
          "Ficar de fora de trabalhos, cursos e oportunidades",
          "Se sentir “por fora” quando falam de e-mail, Word ou Excel",
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3.5">
            <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-slate-800 text-base md:text-lg leading-snug">{t}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-slate-700 mt-5 text-base md:text-lg">
        <strong>Não é culpa sua.</strong> Ninguém te ensinou do jeito certo — <strong className="text-blue-700">até agora</strong>.
      </p>
    </div>
  </section>
);

// ── Transformação (visão do depois) ─────────────────────────
const Transformacao = () => (
  <section className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-5 leading-tight">
        Imagine em <span className="text-blue-700">30 dias</span>...
      </h2>
      <div className="grid gap-2.5">
        {[
          "Abrir o computador sem medo e resolver tudo sozinho",
          "Escrever um documento no Word e mandar por e-mail",
          "Organizar suas fotos e arquivos como um profissional",
          "Se candidatar a vagas, cursos e serviços pela internet",
          "Sentir orgulho de dizer: “agora eu sei mexer no computador”",
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-3 bg-white border border-green-200 rounded-xl p-3.5 shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <p className="text-slate-800 text-base md:text-lg leading-snug font-medium">{t}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <CTA>QUERO ESSA TRANSFORMAÇÃO</CTA>
      </div>
    </div>
  </section>
);

// ── Prova social forte (WhatsApp) ────────────────────────────
const Prova = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-3">
        <ThumbsUp className="w-3.5 h-3.5" /> Alunos reais falando por si
      </div>
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-5">
        Mensagens que a professora recebe <span className="text-green-600">todos os dias</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <img src={whatsappTestimonial1} alt="Depoimento de aluno" className="rounded-xl shadow-md w-full" loading="lazy" />
        <img src={whatsappTestimonial2} alt="Depoimento de aluno" className="rounded-xl shadow-md w-full" loading="lazy" />
      </div>
    </div>
  </section>
);

// ── O que você recebe (benefício, não feature) ──────────────
const modulos = [
  { icon: Monitor, t: "Windows sem medo", d: "Use o computador com segurança do zero." },
  { icon: FileText, t: "Word do jeito fácil", d: "Escreva cartas, currículos e documentos." },
  { icon: Presentation, t: "Excel descomplicado", d: "Planilhas simples pra vida e trabalho." },
  { icon: Mail, t: "E-mail sem confusão", d: "Envie, receba e organize mensagens." },
  { icon: Globe, t: "Internet com confiança", d: "Pesquise e resolva sem cair em golpes." },
  { icon: Keyboard, t: "Digitação rápida", d: "Escreva sem olhar pro teclado." },
];

const Conteudo = () => (
  <section className="bg-slate-50 py-8 md:py-12">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-2">
        Tudo que você precisa, <span className="text-blue-700">nada que sobra</span>
      </h2>
      <p className="text-center text-slate-600 mb-6 text-base md:text-lg">+90 videoaulas curtas, no seu ritmo</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {modulos.map((m, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <m.icon className="w-8 h-8 text-blue-700 mx-auto mb-2" />
            <div className="font-black text-slate-900 text-sm md:text-base leading-tight">{m.t}</div>
            <div className="text-xs md:text-sm text-slate-600 mt-1">{m.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Bônus (ancoragem de valor) ──────────────────────────────
const Bonus = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-2">
          <Gift className="w-3.5 h-3.5" /> Só hoje
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900">
          4 bônus exclusivos <span className="text-blue-700">inclusos</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { t: "Mercado de Trabalho", d: "Como usar o computador para ganhar dinheiro." },
          { t: "Atalhos Essenciais", d: "Faça tudo em metade do tempo." },
          { t: "Currículo Profissional", d: "Modelo pronto pra você editar." },
          { t: "E-mail Profissional", d: "Passe confiança em qualquer mensagem." },
        ].map((b, i) => (
          <div key={i} className="flex items-start gap-3 bg-amber-50/60 border border-amber-200 rounded-xl p-3.5">
            <Gift className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-slate-900">{b.t}</div>
              <div className="text-sm text-slate-700">{b.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Professora (autoridade + confiança) ─────────────────────
const Professora = () => (
  <section className="bg-slate-50 py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 md:p-7 flex flex-col md:flex-row items-center gap-5">
        <img src={elisa} alt="Professora Elisa" className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100" />
        <div className="text-center md:text-left">
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Quem vai te ensinar</div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900">Professora Elisa</h3>
          <p className="text-slate-700 mt-2 text-sm md:text-base leading-snug">
            Mais de <strong>15.000 alunos</strong> já aprenderam com a Elisa. Aulas <strong>calmas, passo a passo</strong> e sem palavras difíceis — feitas para quem realmente está começando.
          </p>
          <div className="flex items-center gap-2 mt-3 justify-center md:justify-start text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
            <span className="text-xs text-slate-600 ml-1">4,9 / 5 de avaliação média</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Oferta (dominante) ──────────────────────────────────────
const Oferta = () => (
  <section id="oferta" className="bg-gradient-to-b from-blue-700 to-blue-900 py-10 md:py-16 text-white">
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-black text-center leading-tight mb-2">
        Comece <span className="text-amber-300">hoje</span> por menos de <span className="text-amber-300">R$ 1 por dia</span>
      </h2>
      <p className="text-center text-blue-100 mb-6">Acesso vitalício. Assista quando e onde quiser.</p>

      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-5 md:p-8">
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {[
            "+90 videoaulas",
            "Certificado",
            "Vitalício",
            "Suporte",
            "4 bônus",
            "Garantia 7 dias",
          ].map((t, i) => (
            <span key={i} className="text-xs md:text-sm font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded-full px-2.5 py-1">
              ✓ {t}
            </span>
          ))}
        </div>

        <div className="text-center mb-5">
          <div className="text-slate-500 text-sm md:text-base">De <span className="line-through">R$ 497</span> por apenas</div>
          <div className="text-5xl md:text-7xl font-black text-green-600 leading-none my-1">
            12x R$ 30,72
          </div>
          <div className="text-slate-700 text-base md:text-lg">
            ou <strong className="text-slate-900">R$ 297,00</strong> à vista
          </div>
        </div>

        <CTA hint="Pagamento 100% seguro • Acesso imediato">GARANTIR MEU ACESSO AGORA</CTA>

        <div className="mt-5 flex items-center justify-center gap-4 flex-wrap text-xs md:text-sm text-slate-600">
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> Compra segura</div>
          <div className="flex items-center gap-1.5"><InfinityIcon className="w-4 h-4 text-blue-700" /> Acesso vitalício</div>
          <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-700" /> Certificado incluso</div>
        </div>
      </div>
    </div>
  </section>
);

// ── Garantia (inversão de risco) ────────────────────────────
const Garantia = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-center gap-5">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-600 flex items-center justify-center shrink-0 shadow-lg">
          <ShieldCheck className="w-12 h-12 md:w-14 md:h-14 text-white" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-black text-slate-900">Garantia incondicional de 7 dias</h3>
          <p className="text-slate-700 mt-1 text-sm md:text-base">
            Se por qualquer motivo você não gostar, é só mandar um e-mail e devolvemos <strong>100% do valor</strong>. Sem burocracia, sem perguntas.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ── Certificado ─────────────────────────────────────────────
const Certificado = () => (
  <section className="bg-slate-50 py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">
        Você recebe um <span className="text-blue-700">certificado</span> ao concluir
      </h2>
      <p className="text-slate-700 mb-5">Válido para currículo, entrevistas e processos seletivos.</p>
      <img src={certificado} alt="Certificado do curso" className="rounded-xl shadow-2xl mx-auto max-w-full md:max-w-xl" loading="lazy" />
      <div className="mt-6 max-w-md mx-auto">
        <CTA>QUERO MEU CERTIFICADO</CTA>
      </div>
    </div>
  </section>
);

// ── FAQ (quebra últimas objeções) ───────────────────────────
const faqs = [
  { q: "Eu nunca mexi em computador. Consigo aprender?", a: "Sim. O curso foi feito para quem está começando do absoluto zero. As aulas são calmas e passo a passo." },
  { q: "Preciso ter internet rápida?", a: "Não. As aulas rodam bem em internet simples e você assiste no computador ou no notebook." },
  { q: "Por quanto tempo tenho acesso?", a: "Acesso vitalício. Você assiste quantas vezes quiser, para sempre." },
  { q: "Como funciona a garantia?", a: "Você tem 7 dias para testar. Se não gostar, devolvemos 100% do valor sem perguntas." },
  { q: "Recebo certificado?", a: "Sim, ao concluir o curso você recebe um certificado digital para incluir no currículo." },
  { q: "Como pago?", a: "Cartão em até 12x, Pix ou boleto. Após a compra, o acesso é liberado imediatamente." },
];

const FAQ = () => (
  <section className="bg-white py-8 md:py-12">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-6">
        Perguntas <span className="text-blue-700">frequentes</span>
      </h2>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <details key={i} className="group bg-slate-50 border border-slate-200 rounded-xl p-4">
            <summary className="cursor-pointer font-bold text-slate-900 flex items-center justify-between gap-2 list-none">
              <span>{f.q}</span>
              <span className="text-blue-700 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
            </summary>
            <p className="mt-2 text-slate-700 text-sm md:text-base">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA final ───────────────────────────────────────────────
const Final = () => (
  <section className="bg-gradient-to-b from-white to-blue-50 py-10 md:py-14">
    <div className="max-w-2xl mx-auto px-4 text-center">
      <HeartHandshake className="w-12 h-12 text-blue-700 mx-auto mb-3" />
      <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
        Sua nova vida com o computador <span className="text-blue-700">começa hoje</span>.
      </h2>
      <p className="text-slate-700 mb-6 text-base md:text-lg">
        Um clique agora — e daqui a 30 dias você não se reconhece mais na frente do computador.
      </p>
      <CTA>SIM, QUERO COMEÇAR AGORA</CTA>
      <div className="mt-4 flex items-center justify-center gap-4 flex-wrap text-xs md:text-sm text-slate-600">
        <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-700" /> +15.000 alunos</div>
        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-700" /> Acesso imediato</div>
        <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> Garantia 7 dias</div>
      </div>
    </div>
  </section>
);

// ── Sticky mobile CTA ───────────────────────────────────────
const StickyCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 p-2 shadow-2xl">
      <button
        onClick={openCheckout}
        className="w-full bg-green-600 active:scale-[.99] text-white font-black rounded-xl py-3.5 text-base flex items-center justify-center gap-2"
      >
        <Monitor className="w-5 h-5" />
        QUERO APRENDER AGORA
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// ── Página ──────────────────────────────────────────────────
const AltaConversao = () => {
  useEffect(() => {
    document.title = "Curso de Informática Online — Comece hoje sem medo";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Aprenda a usar o computador do zero, com aulas passo a passo. Acesso vitalício, certificado e garantia de 7 dias.");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Prova />
        <Dor />
        <Transformacao />
        <Conteudo />
        <Bonus />
        <Professora />
        <Certificado />
        <Oferta />
        <Garantia />
        <FAQ />
        <Final />
      </main>
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-xs">
        © {new Date().getFullYear()} Informática na Prática LTDA — Todos os direitos reservados
      </footer>
      <WhatsAppButton />
      <StickyCTA />
    </div>
  );
};

export default AltaConversao;
