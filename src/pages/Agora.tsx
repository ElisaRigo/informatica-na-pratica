import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  Infinity as InfinityIcon,
  Lock,
  Mail,
  Monitor,
  Play,
  ShieldCheck,
  Table2,
} from "lucide-react";
import { openHotmartCheckout } from "@/lib/checkoutTracking";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import certificado from "@/assets/certificado-exemplo.png";
import aulaThumbAsset from "@/assets/capa-aula-demonstrativa.jpg.asset.json";
import wpp1 from "@/assets/whatsapp-testimonial-1.png";
import wpp2 from "@/assets/whatsapp-testimonial-2.png";

const aulaThumb = (aulaThumbAsset as { url: string }).url;

const YELLOW = "#FFD400";

/* ────────── blocos base do bento ────────── */
const Tile = ({
  children,
  className = "",
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light" | "yellow" | "blue";
}) => {
  const tones = {
    dark: "bg-[#161616] text-white border-white/15",
    light: "bg-white text-[#101010] border-[#101010]",
    yellow: "bg-[#FFD400] text-[#101010] border-[#101010]",
    blue: "bg-[#1E88E5] text-white border-[#101010]",
  } as const;
  return (
    <div className={`rounded-3xl border-2 p-5 md:p-7 ${tones[tone]} ${className}`}>{children}</div>
  );
};

const CTA = ({
  id,
  children = "QUERO APRENDER AGORA",
  tone = "yellow",
}: {
  id?: string;
  children?: React.ReactNode;
  tone?: "yellow" | "black";
}) => (
  <button
    id={id}
    onClick={() => {
      try {
        (window as any).gtag?.("event", "cta_click", { location: id || "agora" });
      } catch {}
      openHotmartCheckout();
    }}
    className={`group inline-flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-[#101010] px-5 py-4 text-left font-display text-lg uppercase leading-none tracking-tight transition-transform active:scale-[.99] md:px-7 md:py-5 md:text-2xl ${
      tone === "yellow"
        ? "bg-[#FFD400] text-[#101010] shadow-[6px_6px_0_0_#101010] hover:-translate-y-0.5"
        : "bg-[#101010] text-white shadow-[6px_6px_0_0_#FFD400] hover:-translate-y-0.5"
    }`}
  >
    <span>{children}</span>
    <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
  </button>
);

/* ────────── página ────────── */
const Agora = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.title = "Curso de Informática do Zero | Aprenda em Casa, no Seu Ritmo";
    const desc = document.querySelector('meta[name="description"]');
    desc?.setAttribute(
      "content",
      "Curso de informática do zero: Word, Excel, internet, e-mail e arquivos. Aulas curtas, acesso vitalício, certificado e garantia de 7 dias.",
    );

    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href =
      "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Hind:wght@400;500;600;700&display=swap";
    document.head.appendChild(fonts);

    try {
      (window as any).gtag?.("event", "view_content", { page: "agora" });
      (window as any).fbq?.("track", "ViewContent");
    } catch {}

    return () => {
      fonts.remove();
    };
  }, []);

  const habilidades = [
    { icon: FileText, t: "Escrever no Word", d: "Cartas, currículo e documentos prontos para imprimir." },
    { icon: Table2, t: "Organizar no Excel", d: "Contas da casa e listas somando automaticamente." },
    { icon: Mail, t: "Usar o e-mail", d: "Enviar, responder e anexar arquivos sem medo." },
    { icon: Globe, t: "Navegar na internet", d: "Pesquisar, resolver serviços e evitar golpes." },
    { icon: FolderOpen, t: "Achar seus arquivos", d: "Salvar, renomear e nunca mais perder nada." },
    { icon: Monitor, t: "Dominar o teclado", d: "Copiar, colar, imprimir e atalhos do dia a dia." },
  ];

  const faq = [
    {
      q: "Nunca mexi em computador. Consigo acompanhar?",
      a: "Sim. O curso começa do absoluto zero: ligar, usar o mouse e o teclado. Cada aula é curta, calma e você repete quantas vezes quiser.",
    },
    {
      q: "Por quanto tempo tenho acesso?",
      a: "O acesso é vitalício. Você assiste no seu ritmo, quantas vezes precisar, e pode voltar sempre que esquecer algo.",
    },
    {
      q: "Recebo certificado?",
      a: "Sim, certificado de conclusão em seu nome, aceito para apresentar em processos seletivos e no trabalho.",
    },
    {
      q: "E se eu não gostar?",
      a: "Você tem 7 dias de garantia. Se não for para você, pede o reembolso e devolvemos o valor integral.",
    },
    {
      q: "Como pago?",
      a: "Cartão em até 12x, Pix ou boleto. O acesso chega no seu e-mail logo após a confirmação.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#101010] font-body text-white antialiased">
      {/* faixa superior */}
      <div className="border-b-2 border-[#101010] bg-[#FFD400] py-2 text-center font-display text-sm uppercase tracking-tight text-[#101010] md:text-base">
        Hoje: 40% OFF + 4 bônus exclusivos
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:pb-16 md:pt-10">
        {/* ───── HERO BENTO ───── */}
        <section className="grid gap-4 md:grid-cols-3">
          <Tile className="md:col-span-2" tone="dark">
            <p
              className="mb-3 inline-block font-display text-xs uppercase tracking-widest"
              style={{ color: YELLOW }}
            >
              Curso de informática do zero
            </p>
            <h1 className="font-display text-[2rem] uppercase leading-[0.95] tracking-tight md:text-6xl">
              Você aprende a usar o
              <span className="mx-1 inline-block -rotate-1 bg-[#FFD400] px-2 text-[#101010]">
                computador
              </span>
              sem precisar pedir ajuda pra ninguém.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Aulas curtas, calmas e no seu ritmo. Em poucas semanas você escreve documentos, usa
              planilhas, e-mail e internet com confiança.
            </p>
            <div className="mt-6 max-w-md">
              <CTA id="hero" />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4" style={{ color: YELLOW }} /> Pagamento seguro
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" style={{ color: YELLOW }} /> Garantia de 7 dias
              </span>
              <span className="flex items-center gap-1.5">
                <InfinityIcon className="h-4 w-4" style={{ color: YELLOW }} /> Acesso vitalício
              </span>
            </div>
          </Tile>

          {/* vídeo */}
          <Tile tone="light" className="flex flex-col justify-between p-0 md:p-0">
            <div className="overflow-hidden rounded-t-3xl">
              {!playing ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Assistir uma aula do curso"
                  className="group relative block aspect-video w-full"
                >
                  <img
                    src={aulaThumb}
                    alt="Professora Elisa dando uma aula do curso de informática passo a passo"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#101010] bg-[#FFD400]/85 transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 text-[#101010]" fill="#101010" />
                    </span>
                  </span>
                </button>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/_0OPLnEiMHk?rel=0&modestbranding=1&controls=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1"
                    title="Aula demonstrativa do curso Informática na Prática"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="font-display text-lg uppercase leading-tight">Veja uma aula de verdade</p>
              <p className="mt-1 text-[#101010]/70">
                Aperte o play e veja o jeito calmo de explicar, do começo ao fim.
              </p>
            </div>
          </Tile>
        </section>

        {/* ───── HABILIDADES ───── */}
        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <Tile tone="yellow" className="flex flex-col justify-center">
            <h2 className="font-display text-2xl uppercase leading-none tracking-tight md:text-4xl">
              O que você vai fazer sozinho
            </h2>
            <p className="mt-3 text-[#101010]/80">
              Tudo aplicado na vida real, com exercícios simples para praticar no seu computador.
            </p>
          </Tile>
          {habilidades.map(({ icon: Icon, t, d }) => (
            <Tile key={t} tone="dark">
              <Icon className="mb-3 h-8 w-8" style={{ color: YELLOW }} />
              <p className="font-display text-lg uppercase leading-tight">{t}</p>
              <p className="mt-1 text-white/70">{d}</p>
            </Tile>
          ))}
        </section>

        {/* ───── PROVA SOCIAL ───── */}
        <section className="mt-4 grid gap-4 md:grid-cols-4">
          <Tile tone="blue" className="md:col-span-2">
            <h2 className="font-display text-2xl uppercase leading-none tracking-tight md:text-4xl">
              +15.000 alunos já começaram do zero
            </h2>
            <p className="mt-3 text-white/85">
              Mensagens reais de quem tinha medo de mexer no computador e hoje resolve tudo sozinho.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                ["4,9", "Nota dos alunos"],
                ["30", "Dias em média"],
                ["100%", "Online"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border-2 border-[#101010] bg-white/10 p-3">
                  <p className="font-display text-xl leading-none md:text-2xl">{n}</p>
                  <p className="mt-1 text-xs text-white/80">{l}</p>
                </div>
              ))}
            </div>
          </Tile>
          {[wpp1, wpp2].map((src, i) => (
            <Tile key={i} tone="light" className="p-3 md:p-3">
              <img
                src={src}
                alt={`Depoimento real de aluno enviado por WhatsApp ${i + 1}`}
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </Tile>
          ))}
        </section>

        {/* ───── PROFESSORA + CERTIFICADO ───── */}
        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <Tile tone="dark" className="md:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                src={elisaPhoto}
                alt="Professora Elisa, responsável pelas aulas do curso"
                className="h-28 w-28 shrink-0 rounded-2xl border-2 object-cover"
                style={{ borderColor: YELLOW }}
                loading="lazy"
              />
              <div>
                <p className="font-display text-xs uppercase tracking-widest" style={{ color: YELLOW }}>
                  Quem ensina
                </p>
                <h2 className="font-display text-2xl uppercase leading-none tracking-tight md:text-3xl">
                  Professora Elisa
                </h2>
                <p className="mt-2 text-white/75">
                  Especialista em ensinar adultos que nunca usaram um computador. Explica devagar,
                  repete quando precisa e nunca faz você se sentir perdido.
                </p>
              </div>
            </div>
          </Tile>
          <Tile tone="light">
            <Award className="mb-3 h-8 w-8 text-[#1E88E5]" />
            <p className="font-display text-lg uppercase leading-tight">Certificado no seu nome</p>
            <img
              src={certificado}
              alt="Exemplo do certificado de conclusão do curso"
              className="mt-3 w-full rounded-xl border-2 border-[#101010]"
              loading="lazy"
            />
          </Tile>
        </section>

        {/* ───── OFERTA ───── */}
        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <Tile tone="yellow" className="md:col-span-2">
            <p className="font-display text-xs uppercase tracking-widest">Oferta de hoje</p>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <span className="font-display text-lg line-through opacity-60">R$ 497</span>
              <span className="font-display text-5xl leading-none md:text-7xl">R$ 297</span>
            </div>
            <p className="mt-2 font-display text-sm uppercase">
              À vista no Pix ou em até 12x no cartão
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Curso completo do zero",
                "Hoje você leva 4 bônus exclusivos",
                "Acesso vitalício às aulas",
                "Certificado de conclusão",
                "Suporte pelo WhatsApp",
                "Garantia de 7 dias",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA id="oferta" tone="black" />
            </div>
          </Tile>
          <Tile tone="dark" className="flex flex-col justify-center">
            <ShieldCheck className="mb-3 h-10 w-10" style={{ color: YELLOW }} />
            <p className="font-display text-xl uppercase leading-tight">Risco zero por 7 dias</p>
            <p className="mt-2 text-white/75">
              Entre, assista as aulas e veja se é para você. Se não gostar, devolvemos todo o valor.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
              <GraduationCap className="h-5 w-5" style={{ color: YELLOW }} /> Comece hoje mesmo, do
              seu computador em casa.
            </div>
          </Tile>
        </section>

        {/* ───── FAQ ───── */}
        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <Tile tone="light" className="flex flex-col justify-center">
            <h2 className="font-display text-2xl uppercase leading-none tracking-tight md:text-4xl">
              Dúvidas de quem está começando
            </h2>
          </Tile>
          <div className="grid gap-3 md:col-span-2">
            {faq.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-3xl border-2 border-white/15 bg-[#161616] p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-base uppercase leading-tight">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-white/75">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-8 border-t-2 border-white/10 pt-5 text-center text-xs text-white/50">
          Informática na Prática LTDA · Todos os direitos reservados
        </footer>
      </main>

      {/* CTA fixo mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#101010] bg-[#FFD400] p-3 md:hidden">
        <button
          onClick={() => {
            try {
              (window as any).gtag?.("event", "cta_click", { location: "sticky_mobile" });
            } catch {}
            openHotmartCheckout();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#101010] bg-[#101010] px-4 py-3.5 font-display text-base uppercase text-white"
        >
          Quero aprender por R$ 297 <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Agora;
