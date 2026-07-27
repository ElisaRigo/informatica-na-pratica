import { useEffect, useState } from "react";
import { CursoCheckoutDialog } from "@/components/curso/CursoCheckoutDialog";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import {
  ArrowUpRight, Check, Star, Quote, Play, Plus, Minus, ShieldCheck,
} from "lucide-react";

/* ================================================================== */
/*  /revolucao — Editorial Bold, storytelling, cream/black/orange       */
/*  Fonte: Instrument Serif (display) + Inter (body). Zero shadcn Card. */
/* ================================================================== */

const INK = "#0a0a0a";
const CREAM = "#f5f0e6";
const ORANGE = "#e85d3a";
const GOLD = "#c9a84c";

const openCheckoutFn = () => (window as any).openCheckout?.();

/* ---------- Chapter label ---------- */
const Chapter = ({ n, title }: { n: string; title: string }) => (
  <div className="flex items-baseline gap-4 md:gap-6 mb-6 md:mb-10">
    <span
      className="font-serif italic text-5xl md:text-7xl leading-none"
      style={{ color: ORANGE }}
    >
      {n}
    </span>
    <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold text-black/50">
      {title}
    </span>
    <span className="flex-1 h-px bg-black/15" />
  </div>
);

/* ---------- Big CTA button, editorial style ---------- */
const CTA = ({ label = "Começar agora" }: { label?: string }) => (
  <button
    onClick={openCheckoutFn}
    className="group inline-flex items-center gap-4 rounded-full px-8 md:px-10 py-5 md:py-6 font-semibold text-base md:text-lg transition-all hover:scale-[1.02] active:scale-[0.99]"
    style={{ background: INK, color: CREAM }}
  >
    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: ORANGE }} />
    {label}
    <ArrowUpRight
      className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </button>
);

/* ---------- Marquee ---------- */
const Marquee = ({ items }: { items: string[] }) => (
  <div className="relative overflow-hidden border-y" style={{ borderColor: `${INK}1a` }}>
    <div className="flex animate-marquee whitespace-nowrap py-4 md:py-6">
      {[...items, ...items].map((t, i) => (
        <span
          key={i}
          className="mx-8 md:mx-12 font-serif italic text-2xl md:text-4xl"
          style={{ color: INK }}
        >
          {t}
          <span className="ml-8 md:ml-12" style={{ color: ORANGE }}>✦</span>
        </span>
      ))}
    </div>
  </div>
);

/* ---------- Ticker (compact) ---------- */
const Ticker = () => (
  <div className="border-b" style={{ background: INK, borderColor: `${CREAM}20` }}>
    <div className="overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2 text-xs md:text-sm font-medium uppercase tracking-widest" style={{ color: CREAM }}>
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex items-center">
            {[
              "Edição limitada — 40% OFF",
              "4 bônus exclusivos hoje",
              "Acesso vitalício",
              "Certificado incluso",
              "Garantia 7 dias",
              "Suporte da professora",
            ].map((t, i) => (
              <span key={i} className="mx-6 flex items-center gap-3">
                {t}
                <span style={{ color: ORANGE }}>◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- FAQ item ---------- */
const FaqItem = ({ q, a, i }: { q: string; a: string; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t" style={{ borderColor: `${INK}20` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left"
      >
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-serif italic text-2xl md:text-3xl" style={{ color: ORANGE }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-xl md:text-2xl leading-snug" style={{ color: INK }}>
            {q}
          </span>
        </div>
        <span className="mt-2 shrink-0 w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor: `${INK}40` }}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      {open && (
        <div className="pb-8 pl-12 md:pl-16 pr-4 text-base md:text-lg leading-relaxed text-black/70">
          {a}
        </div>
      )}
    </div>
  );
};

export default function Revolucao() {
  const { isOpen, closeCheckout } = useCheckoutDialog();
  const [videoOn, setVideoOn] = useState(false);

  useEffect(() => {
    document.title = "Informática do Zero — Uma edição para quem quer começar";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Um curso editorial de informática, feito para quem nunca ligou um computador. Aprenda com a Prof. Elisa. Vitalício, com garantia.");
  }, []);

  return (
    <div style={{ background: CREAM, color: INK }} className="min-h-screen font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; font-weight: 400; }
        .grain::before {
          content:""; position:absolute; inset:0; pointer-events:none; opacity:.06;
          background-image: radial-gradient(#000 1px, transparent 1px);
          background-size: 3px 3px; mix-blend-mode:multiply;
        }
      `}</style>

      <Ticker />

      {/* ============== NAV ============== */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: `${CREAM}e6`, borderBottom: `1px solid ${INK}15` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl md:text-3xl">Informática</span>
            <span className="font-serif italic text-2xl md:text-3xl" style={{ color: ORANGE }}>na Prática</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#historia" className="hover:underline underline-offset-4">História</a>
            <a href="#dentro" className="hover:underline underline-offset-4">O que tem dentro</a>
            <a href="#vozes" className="hover:underline underline-offset-4">Vozes reais</a>
            <a href="#oferta" className="hover:underline underline-offset-4">Oferta</a>
          </div>
          <button
            onClick={openCheckoutFn}
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
            style={{ background: INK, color: CREAM }}
          >
            Matricular →
          </button>
        </div>
      </header>

      {/* ============== HERO — editorial capa de revista ============== */}
      <section className="relative overflow-hidden grain">
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-8 md:pt-16 pb-10 md:pb-20">
          {/* header edition */}
          <div className="flex items-center justify-between mb-8 md:mb-14 text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-black/60">
            <span>Edição N.º 07 — 2026</span>
            <span className="hidden md:inline">Uma leitura de 4 minutos</span>
            <span style={{ color: ORANGE }}>◆ Especial</span>
          </div>

          {/* headline */}
          <h1 className="font-serif leading-[0.9] tracking-tight text-[52px] sm:text-[72px] md:text-[112px] lg:text-[148px]">
            Aprender <span style={{ color: ORANGE }} className="italic">informática</span>
            <br />
            deveria ser <span className="italic">simples.</span>
          </h1>

          <div className="grid md:grid-cols-12 gap-6 md:gap-10 mt-10 md:mt-16">
            <div className="md:col-span-5 md:col-start-1">
              <p className="text-lg md:text-xl leading-relaxed text-black/75">
                Um curso feito para <em>gente de verdade</em>: quem tem medo de mexer, quem depende de filho ou neto, quem sente vergonha de perguntar. Aqui, ninguém julga. Aqui, você aprende no seu tempo — do <strong>zero absoluto</strong> até fazer sozinho(a).
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTA label="Quero começar" />
                <button
                  onClick={() => setVideoOn(true)}
                  className="inline-flex items-center gap-2 text-sm md:text-base font-medium underline underline-offset-4"
                >
                  <Play className="w-4 h-4" fill={INK} /> Assistir a apresentação
                </button>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  {[GOLD, ORANGE, INK, "#87a878"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2" style={{ background: c, borderColor: CREAM }} />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5" fill={ORANGE} stroke={ORANGE} />
                    ))}
                    <span className="ml-1 font-semibold">4.9/5</span>
                  </div>
                  <span className="text-black/60">+15.000 alunos matriculados</span>
                </div>
              </div>
            </div>

            {/* video / capa vertical */}
            <div className="md:col-span-6 md:col-start-7">
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[28px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]">
                {!videoOn ? (
                  <button
                    onClick={() => setVideoOn(true)}
                    className="group absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${INK} 0%, #1a1a1a 100%)` }}
                  >
                    <div className="absolute inset-0 opacity-40" style={{
                      backgroundImage: "radial-gradient(circle at 30% 30%, rgba(232,93,58,0.5), transparent 50%), radial-gradient(circle at 70% 70%, rgba(201,168,76,0.4), transparent 55%)"
                    }} />
                    <div className="absolute top-6 left-6 right-6 flex justify-between text-[10px] uppercase tracking-[0.3em]" style={{ color: CREAM }}>
                      <span>Capítulo 01</span>
                      <span>Prof. Elisa</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: CREAM }}>
                        <Play className="w-9 h-9 md:w-12 md:h-12 ml-1" fill={INK} style={{ color: INK }} />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 font-serif text-2xl md:text-4xl leading-tight" style={{ color: CREAM }}>
                      "Se você sabe assinar seu nome, você consegue."
                    </div>
                  </button>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/0kFjFZX5c9I?autoplay=1&rel=0&modestbranding=1"
                    title="Apresentação do curso"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-black/50 text-right">
                Fotografado no estúdio · IN.P/07
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== MARQUEE ============== */}
      <Marquee items={["Word", "Excel", "Internet", "E-mail", "WhatsApp Web", "Currículo", "Segurança digital", "Atalhos"]} />

      {/* ============== 02 · A HISTÓRIA (pain) ============== */}
      <section id="historia" className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-28">
        <Chapter n="02" title="A história" />
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7">
            <p className="font-serif text-3xl md:text-5xl leading-[1.15]">
              Você já deixou de pedir uma vaga porque pediram para enviar o currículo <em>por e-mail</em>? Já sentiu o coração acelerar quando o caixa disse "faça um Pix"? Já ficou <span style={{ color: ORANGE }}>envergonhada</span> de perguntar de novo como abrir uma pasta?
            </p>
            <p className="mt-8 text-lg md:text-xl text-black/70 leading-relaxed max-w-xl">
              Não é falta de inteligência. É que <strong>ninguém te ensinou com paciência</strong>. Os cursos vão rápido demais, usam palavras difíceis, e a família não tem tempo de sentar do seu lado. O resultado? Você fica travada, e o mundo digital passa por fora.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl p-8 md:p-10" style={{ background: INK, color: CREAM }}>
              <div className="text-xs uppercase tracking-[0.3em] mb-6 opacity-60">O que muda quando você aprende</div>
              <ul className="space-y-4">
                {[
                  "Envia currículo sem depender de ninguém",
                  "Usa Pix e banco pelo celular com segurança",
                  "Preenche formulários online sozinha(o)",
                  "Faz Excel simples, currículo, e-mail profissional",
                  "Volta a sentir orgulho de si mesma(o)",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-base md:text-lg">
                    <Check className="w-5 h-5 mt-1 shrink-0" style={{ color: ORANGE }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 03 · O MÉTODO ============== */}
      <section className="relative py-16 md:py-28" style={{ background: INK, color: CREAM }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-baseline gap-4 md:gap-6 mb-10 md:mb-14">
            <span className="font-serif italic text-5xl md:text-7xl" style={{ color: ORANGE }}>03</span>
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold opacity-70">O método</span>
            <span className="flex-1 h-px opacity-20" style={{ background: CREAM }} />
          </div>
          <h2 className="font-serif text-4xl md:text-7xl leading-[1.05] max-w-4xl">
            Aulas curtas. Linguagem de mãe. Sem "informatiquês".
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-20">
            {[
              { n: "01", t: "Assiste no seu ritmo", d: "Aulas de 5 a 12 minutos. Pausa, volta, revê quantas vezes precisar. Ninguém corre com você." },
              { n: "02", t: "Faz junto na hora", d: "Cada aula tem um exercício prático. Você abre o computador e faz do lado da professora." },
              { n: "03", t: "Sente que consegue", d: "Ao fim de cada módulo, um mini-desafio. É ali que a confiança nasce — e não sai mais." },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-serif italic text-6xl md:text-7xl" style={{ color: ORANGE }}>{s.n}</div>
                <div className="mt-3 font-serif text-2xl md:text-3xl">{s.t}</div>
                <p className="mt-3 opacity-70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 04 · O QUE TEM DENTRO ============== */}
      <section id="dentro" className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-28">
        <Chapter n="04" title="O que tem dentro" />
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-12">
          Uma biblioteca completa, dividida em <span style={{ color: ORANGE }} className="italic">capítulos.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: `${INK}20` }}>
          {[
            { t: "Windows do zero", d: "Ligar, desligar, mouse, teclado, janelas, pastas, arquivos.", tag: "MÓDULO" },
            { t: "Word, do começo ao fim", d: "Digitar, formatar, salvar, imprimir, criar cartas e documentos.", tag: "MÓDULO" },
            { t: "Excel sem pavor", d: "Planilhas, somas, listas, orçamento pessoal — passo a passo.", tag: "MÓDULO" },
            { t: "Internet com segurança", d: "Navegar, pesquisar, baixar, se proteger de golpes.", tag: "MÓDULO" },
            { t: "E-mail e WhatsApp Web", d: "Enviar, anexar, responder — vida pessoal e profissional.", tag: "MÓDULO" },
            { t: "PDF, impressão e nuvem", d: "Assinar, escanear, salvar no Google Drive, imprimir.", tag: "MÓDULO" },
            { t: "Bônus · Currículo profissional", d: "Faça seu currículo do zero, pronto para enviar.", tag: "BÔNUS", gold: true },
            { t: "Bônus · Atalhos essenciais", d: "Os atalhos que economizam horas por semana.", tag: "BÔNUS", gold: true },
            { t: "Bônus · Mercado de trabalho", d: "Como usar seus novos conhecimentos para conseguir vagas.", tag: "BÔNUS", gold: true },
            { t: "Bônus · E-mail profissional", d: "Escrever e-mails que passam confiança e clareza.", tag: "BÔNUS", gold: true },
          ].map((m, i) => (
            <div key={i} className="p-6 md:p-10" style={{ background: CREAM }}>
              <div className="flex items-center justify-between mb-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: m.gold ? ORANGE : `${INK}70` }}>
                <span>{m.tag}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-4xl leading-tight">{m.t}</h3>
              <p className="mt-3 text-black/70 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== 05 · A PROFESSORA ============== */}
      <section className="relative py-16 md:py-28" style={{ background: "#efe8d9" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-[28px] overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${GOLD})` }}>
              <div className="absolute inset-0 flex items-end p-8">
                <div style={{ color: CREAM }}>
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-90">A autora</div>
                  <div className="font-serif text-4xl md:text-6xl leading-none mt-2">Elisa</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <Chapter n="05" title="Quem te ensina" />
            <p className="font-serif text-3xl md:text-5xl leading-tight">
              "Eu ensino do jeito que gostaria que <em>tivessem me ensinado</em>: com calma, do zero, sem pressa."
            </p>
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-xl">
              Sou a Elisa. Já ensinei mais de 15.000 pessoas que nunca tinham tocado num computador — e vi cada uma sair sabendo. Se você me deixar te guiar, garanto: no fim do curso, você não é a mesma pessoa.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div><span className="font-serif text-3xl" style={{ color: ORANGE }}>15k+</span><br />alunos</div>
              <div><span className="font-serif text-3xl" style={{ color: ORANGE }}>4.9</span><br />avaliação</div>
              <div><span className="font-serif text-3xl" style={{ color: ORANGE }}>7</span><br />anos ensinando</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 06 · VOZES REAIS ============== */}
      <section id="vozes" className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-28">
        <Chapter n="06" title="Vozes reais" />
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { n: "Dona Marlene, 62", c: "Fui atrás de uma vaga de recepcionista aos 62. Consegui. Enviei o currículo que fiz sozinha, no computador da lan house." },
            { n: "José Antônio, 58", c: "Meu filho não tinha mais paciência. Nesse curso, a professora tem. Hoje eu que ajudo meus colegas de igreja." },
            { n: "Cida, 47", c: "Sempre tive vergonha. Aqui ninguém me apressava. Foi a primeira vez que aprendi de verdade." },
          ].map((t, i) => (
            <figure key={i} className="p-8 md:p-10 rounded-3xl" style={{ background: `${INK}0d`, border: `1px solid ${INK}15` }}>
              <Quote className="w-8 h-8" style={{ color: ORANGE }} />
              <blockquote className="font-serif text-xl md:text-2xl leading-snug mt-4">"{t.c}"</blockquote>
              <figcaption className="mt-6 text-sm uppercase tracking-widest text-black/60">— {t.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============== 07 · OFERTA ============== */}
      <section id="oferta" className="relative py-20 md:py-32" style={{ background: INK, color: CREAM }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-baseline gap-4 md:gap-6 mb-10">
            <span className="font-serif italic text-5xl md:text-7xl" style={{ color: ORANGE }}>07</span>
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold opacity-70">A oferta</span>
            <span className="flex-1 h-px opacity-20" style={{ background: CREAM }} />
          </div>

          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.95]">
                Uma <span className="italic" style={{ color: ORANGE }}>edição</span> pensada para quem quer começar hoje.
              </h2>
              <p className="mt-8 text-lg opacity-80 max-w-lg leading-relaxed">
                Curso completo + 4 bônus exclusivos, acesso vitalício, certificado, e sete dias de garantia total. Sem letras miúdas.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  ["Curso completo · Windows, Word, Excel, Internet", "R$ 497"],
                  ["Bônus · Currículo Profissional", "R$ 97"],
                  ["Bônus · Atalhos Essenciais", "R$ 67"],
                  ["Bônus · Mercado de Trabalho", "R$ 127"],
                  ["Bônus · E-mail Profissional", "R$ 77"],
                  ["Certificado + Acesso vitalício", "Incluso"],
                ].map(([l, v], i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4 border-b border-dashed pb-3" style={{ borderColor: `${CREAM}25` }}>
                    <span className="text-base md:text-lg">{l}</span>
                    <span className="font-serif text-xl md:text-2xl opacity-70">{v}</span>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 pt-4">
                  <span className="text-sm uppercase tracking-widest opacity-70">Valor real</span>
                  <span className="font-serif text-2xl md:text-3xl line-through opacity-60">R$ 1.159</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-[28px] p-8 md:p-10 relative overflow-hidden" style={{ background: CREAM, color: INK }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30" style={{ background: ORANGE }} />
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-black/60">Hoje, apenas</div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-7xl md:text-9xl leading-none">R$ 297</span>
                  </div>
                  <div className="text-base md:text-lg text-black/70 mt-2">à vista ou em até 12x no cartão</div>

                  <div className="my-8 h-px" style={{ background: `${INK}20` }} />

                  <ul className="space-y-3 text-base">
                    {[
                      "Acesso vitalício — seu para sempre",
                      "Certificado de conclusão",
                      "4 bônus exclusivos",
                      "Suporte da professora",
                      "Garantia incondicional de 7 dias",
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5" style={{ color: ORANGE }} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={openCheckoutFn}
                    className="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full py-5 font-semibold text-lg transition-transform hover:scale-[1.02]"
                    style={{ background: INK, color: CREAM }}
                  >
                    Garantir minha vaga
                    <ArrowUpRight className="w-5 h-5" />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-black/60">
                    <ShieldCheck className="w-4 h-4" />
                    Pagamento seguro · Hotmart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 08 · GARANTIA ============== */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 py-16 md:py-28 text-center">
        <Chapter n="08" title="Garantia" />
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8" style={{ background: `${ORANGE}20` }}>
          <ShieldCheck className="w-10 h-10" style={{ color: ORANGE }} />
        </div>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Se em 7 dias você achar que não é para você, <span style={{ color: ORANGE }} className="italic">devolvo cada centavo.</span>
        </h2>
        <p className="mt-6 text-lg text-black/70 max-w-2xl mx-auto">
          Nada de burocracia. Um e-mail e o dinheiro volta pra sua conta. O risco é só meu.
        </p>
      </section>

      {/* ============== 09 · FAQ ============== */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 py-16 md:py-28">
        <Chapter n="09" title="Perguntas honestas" />
        <div>
          {[
            { q: "Eu nunca liguei um computador. Serve mesmo para mim?", a: "Serve. O curso começa exatamente do zero: ligar, mouse, teclado. Se você sabe assinar seu nome, você consegue." },
            { q: "Quanto tempo eu tenho de acesso?", a: "Acesso vitalício. Você pode assistir hoje, amanhã, daqui a dois anos. Sempre que precisar." },
            { q: "Tenho 60+, ainda dá tempo?", a: "Dá. A maior parte dos nossos alunos tem entre 40 e 70 anos. As aulas são pensadas exatamente para esse ritmo." },
            { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia total. Devolvemos 100% sem perguntas." },
            { q: "Como funciona o pagamento?", a: "Cartão em até 12x, Pix ou boleto pela Hotmart. Ambiente 100% seguro." },
            { q: "Ganho certificado?", a: "Sim, ao concluir o curso você recebe seu certificado digital." },
          ].map((f, i) => <FaqItem key={i} i={i} {...f} />)}
        </div>
      </section>

      {/* ============== CTA FINAL ============== */}
      <section className="relative py-24 md:py-36 text-center" style={{ background: ORANGE, color: CREAM }}>
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="text-xs uppercase tracking-[0.3em] mb-6 opacity-90">Última palavra</div>
          <h2 className="font-serif text-5xl md:text-8xl leading-[0.95]">
            A pessoa que você vai ser <em>daqui a 30 dias</em> começa agora.
          </h2>
          <div className="mt-10 flex justify-center">
            <button
              onClick={openCheckoutFn}
              className="inline-flex items-center gap-4 rounded-full px-10 py-6 font-semibold text-lg transition-transform hover:scale-105"
              style={{ background: INK, color: CREAM }}
            >
              Começar meu curso agora
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-8 text-sm opacity-90">R$ 297 à vista · 12x no cartão · 7 dias de garantia</div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="py-12 text-center text-sm" style={{ background: INK, color: `${CREAM}80` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-serif text-2xl" style={{ color: CREAM }}>
            Informática <span style={{ color: ORANGE }} className="italic">na Prática</span>
          </div>
          <div>© {new Date().getFullYear()} Informática na Prática LTDA</div>
          <div className="flex gap-6">
            <a href="/termos-de-uso" className="hover:underline">Termos</a>
            <a href="/politica-de-privacidade" className="hover:underline">Privacidade</a>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <button
          onClick={openCheckoutFn}
          className="w-full inline-flex items-center justify-center gap-3 rounded-full py-4 font-semibold text-base shadow-2xl"
          style={{ background: INK, color: CREAM }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ORANGE }} />
          Quero começar — R$ 297
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <CursoCheckoutDialog open={isOpen} onOpenChange={(o) => !o && closeCheckout()} />
    </div>
  );
}
