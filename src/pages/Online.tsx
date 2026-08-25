import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  PlayCircle,
  Monitor,
  Mail,
  FileText,
  Globe,
  FolderOpen,
  Table2,
  Download,
  MousePointerClick,
  HelpCircle,
  Infinity as InfinityIcon,
  ChevronDown,
  GraduationCap,
  Award,
  Heart,
} from "lucide-react";
import { openHotmartCheckout } from "@/lib/checkoutTracking";
import logo from "@/assets/logo-blue.png";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import elisaTeaching from "@/assets/elisa-teaching.jpg";
import certificado from "@/assets/certificado-exemplo.png";
import aulaThumbAsset from "@/assets/capa-aula-demonstrativa.jpg.asset.json";
import wpp1 from "@/assets/whatsapp-testimonial-1.png";
import wpp2 from "@/assets/whatsapp-testimonial-2.png";
import depo1 from "@/assets/testimonial-new-1.jpg";
import depo2 from "@/assets/testimonial-new-2.jpg";
import depo3 from "@/assets/testimonial-new-3.jpg";

const aulaThumb = aulaThumbAsset.url;

/* ───────────────── CTA ───────────────── */
const CTA = ({
  children = "QUERO APRENDER INFORMÁTICA",
  small = false,
  id,
}: {
  children?: React.ReactNode;
  small?: boolean;
  id?: string;
}) => (
  <button
    id={id}
    onClick={() => {
      try {
        (window as any).gtag?.("event", "cta_click", { location: id || "online" });
      } catch {}
      openHotmartCheckout();
    }}
    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 font-extrabold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 active:scale-[.99] ${
      small ? "px-5 py-4 text-base md:text-lg" : "px-6 py-5 text-lg md:text-2xl"
    }`}
  >
    <Monitor className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
    <span className="leading-tight">{children}</span>
  </button>
);

const TrustRow = () => (
  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600 md:text-sm">
    <span className="flex items-center gap-1.5">
      <Lock className="h-4 w-4 text-green-600" /> Pagamento seguro
    </span>
    <span className="flex items-center gap-1.5">
      <ShieldCheck className="h-4 w-4 text-green-600" /> Garantia de 7 dias
    </span>
    <span className="flex items-center gap-1.5">
      <CheckCircle2 className="h-4 w-4 text-green-600" /> Acesso imediato
    </span>
  </div>
);

/* ───────────────── Hero ───────────────── */
const Hero = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <header className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 pb-8 pt-5 md:pb-14 md:pt-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <img src={logo} alt="Informática na Prática" className="mb-5 h-12 md:h-16" />

          <h1 className="mb-4 text-3xl font-black leading-[1.15] tracking-tight text-slate-900 md:text-5xl">
            Aprenda a usar o computador com segurança,{" "}
            <span className="text-blue-600">mesmo começando do zero</span>
          </h1>

          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Aulas simples, práticas e passo a passo para você aprender no seu ritmo — sem medo, sem
            vergonha e sem precisar depender de ninguém.
          </p>

          <div className="mb-6 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-blue-900/10">
            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Assistir aula demonstrativa"
                className="group relative block aspect-video w-full"
              >
                <img
                  src={aulaThumb}
                  alt="Professora Elisa em uma aula do curso de informática, explicando passo a passo"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <PlayCircle className="h-12 w-12 text-blue-600" strokeWidth={1.5} />
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
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <CTA id="hero" />
          <TrustRow />
        </div>
      </div>
    </header>
  );
};

/* ───────────────── Identificação ───────────────── */
const situacoes = [
  "Tenho medo de clicar e fazer alguma coisa errada.",
  "Sempre preciso pedir ajuda para usar o computador.",
  "Tenho vergonha porque todo mundo parece saber mais que eu.",
  "Já tentei aprender, mas achei tudo muito complicado.",
  "Quero aprender, mas não sei nem por onde começar.",
];

const Identificacao = () => (
  <section className="bg-white py-12 md:py-16">
    <div className="container mx-auto max-w-3xl px-4">
      <h2 className="mb-8 text-center text-2xl font-black text-slate-900 md:text-4xl">
        Você se identifica com alguma dessas situações?
      </h2>

      <ul className="space-y-3">
        {situacoes.map((s) => (
          <li
            key={s}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-700 md:text-lg"
          >
            <MousePointerClick className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 rounded-xl bg-blue-600 px-5 py-4 text-center text-lg font-bold text-white md:text-xl">
        Se você se identificou, o Informática na Prática foi feito para você.
      </p>
    </div>
  </section>
);

/* ───────────────── Solução ───────────────── */
const passos = ["Comece do zero", "Aprenda passo a passo", "Pratique", "Ganhe confiança"];

const Solucao = () => (
  <section className="bg-slate-50 py-12 md:py-16">
    <div className="container mx-auto max-w-3xl px-4 text-center">
      <h2 className="mb-4 text-2xl font-black text-slate-900 md:text-4xl">
        Aqui você aprende de verdade, passo a passo
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
        Você não precisa entender de informática para começar. As aulas foram pensadas para quem
        está começando do zero, com explicações simples, práticas e fáceis de acompanhar.
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {passos.map((p, i) => (
          <div
            key={p}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm"
          >
            <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              {i + 1}
            </span>
            <p className="text-sm font-bold text-slate-800 md:text-base">{p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────── Habilidades ───────────────── */
const habilidades = [
  { icon: FileText, t: "Criar e editar documentos no Word", d: "Currículos, cartas e trabalhos com aparência profissional." },
  { icon: Table2, t: "Fazer planilhas no Excel", d: "Controlar contas, listas e números do dia a dia." },
  { icon: Mail, t: "Enviar e responder e-mails", d: "Falar com empresas, clientes e família sem depender de ninguém." },
  { icon: Globe, t: "Pesquisar na internet", d: "Encontrar o que precisa com segurança." },
  { icon: FolderOpen, t: "Organizar arquivos e pastas", d: "Achar seus documentos e fotos em segundos." },
  { icon: Download, t: "Baixar e enviar arquivos", d: "Resolver tarefas do trabalho sem travar." },
];

const Habilidades = () => (
  <section className="bg-white py-12 md:py-16">
    <div className="container mx-auto max-w-4xl px-4">
      <h2 className="mb-8 text-center text-2xl font-black text-slate-900 md:text-4xl">
        Depois de aprender, você vai conseguir:
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {habilidades.map(({ icon: Icon, t, d }) => (
          <div key={t} className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-blue-600" />
            <div>
              <p className="font-bold text-slate-900">{t}</p>
              <p className="text-sm text-slate-600">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-md">
        <CTA small id="habilidades">
          QUERO APRENDER INFORMÁTICA
        </CTA>
      </div>
    </div>
  </section>
);

/* ───────────────── Objeção principal ───────────────── */
const MesmoQueVoce = () => (
  <section className="bg-slate-900 py-12 md:py-16">
    <div className="container mx-auto max-w-3xl px-4 text-center">
      <HelpCircle className="mx-auto mb-4 h-12 w-12 text-blue-400" />
      <h2 className="mb-4 text-2xl font-black text-white md:text-4xl">
        E se eu não souber absolutamente nada?
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
        Não tem problema. O curso foi pensado justamente para quem está começando. Não importa se
        você nunca fez um curso de informática ou se ainda sente insegurança para fazer tarefas
        simples. Você começa do básico e evolui passo a passo.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {["Zero experiência", "Sem complicação", "Aprendizado passo a passo"].map((t) => (
          <div key={t} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm font-bold uppercase tracking-wide text-white md:text-base">{t}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────── Como funciona ───────────────── */
const etapas = [
  "Você faz sua inscrição.",
  "Recebe o acesso à plataforma no seu e-mail.",
  "Começa pelas aulas iniciais, do zero.",
  "Assiste e pratica junto com a professora.",
  "Avança conforme a sua evolução.",
];

const ComoFunciona = () => (
  <section className="bg-slate-50 py-12 md:py-16">
    <div className="container mx-auto max-w-3xl px-4">
      <h2 className="mb-3 text-center text-2xl font-black text-slate-900 md:text-4xl">
        Aprenda no seu ritmo, de onde estiver
      </h2>
      <p className="mb-8 text-center text-base text-slate-600 md:text-lg">
        Pode rever as aulas quantas vezes quiser — o acesso é vitalício.
      </p>
      <ol className="space-y-3">
        {etapas.map((e, i) => (
          <li key={e} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black text-white">
              {i + 1}
            </span>
            <span className="text-base text-slate-700 md:text-lg">{e}</span>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ───────────────── Prova social ───────────────── */
const depoimentos = [
  {
    img: depo1,
    nome: "Maria",
    texto: "Eu tinha medo de mexer e hoje faço tudo sozinha. Aprendi no meu ritmo, sem pressa.",
  },
  {
    img: depo2,
    nome: "João",
    texto: "Consegui organizar meus arquivos e mandar e-mails no trabalho sem pedir ajuda.",
  },
  {
    img: depo3,
    nome: "Sandra",
    texto: "Finalmente consegui aprender. As aulas explicam com calma, do jeito que eu precisava.",
  },
];

const ProvaSocial = () => (
  <section className="bg-white py-12 md:py-16">
    <div className="container mx-auto max-w-4xl px-4">
      <h2 className="mb-8 text-center text-2xl font-black text-slate-900 md:text-4xl">
        Quem aprende, sente a diferença
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {depoimentos.map((d) => (
          <figure key={d.nome} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <img
              src={d.img}
              alt={`Aluna ou aluno do curso: ${d.nome}`}
              className="mb-3 h-14 w-14 rounded-full object-cover"
              loading="lazy"
            />
            <blockquote className="text-sm leading-relaxed text-slate-700">“{d.texto}”</blockquote>
            <figcaption className="mt-3 text-sm font-bold text-slate-900">{d.nome}</figcaption>
          </figure>
        ))}
      </div>

      <p className="mb-4 mt-10 text-center text-base font-bold text-slate-700 md:text-lg">
        Mensagens reais de alunos
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {[wpp1, wpp2].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Mensagem de aluno contando o que conseguiu fazer depois do curso"
            className="w-full rounded-xl border border-slate-200"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────── Professora ───────────────── */
const Professora = () => (
  <section className="bg-slate-50 py-12 md:py-16">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <img
          src={elisaPhoto}
          alt="Professora Elisa, responsável pelas aulas do curso Informática na Prática"
          className="mx-auto w-full max-w-xs rounded-2xl object-cover shadow-xl md:max-w-none"
          loading="lazy"
        />
        <div>
          <h2 className="mb-4 text-2xl font-black text-slate-900 md:text-4xl">
            Quem vai te ensinar
          </h2>
          <p className="mb-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Eu sou a <strong className="text-slate-900">Professora Elisa</strong>. Há mais de 20 anos
            ensino informática para pessoas que achavam que não iam conseguir aprender.
          </p>
          <p className="mb-6 text-base leading-relaxed text-slate-600 md:text-lg">
            Minhas aulas são calmas, sem termos técnicos e feitas para quem está começando. Se você
            tem dificuldade com o computador, aqui você vai ser ensinado com paciência.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <GraduationCap className="h-4 w-4 text-blue-600" /> +20 anos ensinando
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <Heart className="h-4 w-4 text-blue-600" /> Aulas com paciência
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────── Plataforma / produto real ───────────────── */
const Plataforma = () => (
  <section className="bg-white py-12 md:py-16">
    <div className="container mx-auto max-w-4xl px-4">
      <h2 className="mb-3 text-center text-2xl font-black text-slate-900 md:text-4xl">
        Existe um curso completo por trás disso
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-base text-slate-600 md:text-lg">
        Aulas gravadas e organizadas por módulos, na ordem certa para quem começa do zero. Você
        assiste, pratica e revê quando precisar.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <img
          src={elisaTeaching}
          alt="Aula do curso mostrando a tela do computador durante a explicação"
          className="w-full rounded-2xl border border-slate-200 object-cover"
          loading="lazy"
        />
        <img
          src={certificado}
          alt="Modelo do certificado de conclusão do curso de informática"
          className="w-full rounded-2xl border border-slate-200 object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

/* ───────────────── Inclui + Oferta ───────────────── */
const inclui = [
  "Curso completo de informática, do básico ao dia a dia",
  "Aulas passo a passo, explicadas com calma",
  "Acesso à plataforma do aluno",
  "Acesso vitalício: reveja as aulas quando quiser",
  "Conteúdo feito para quem começa do zero",
  "Certificado de conclusão",
  "Suporte para tirar dúvidas no WhatsApp",
];

const Oferta = () => (
  <section id="oferta" className="bg-slate-900 py-12 md:py-16">
    <div className="container mx-auto max-w-2xl px-4">
      <h2 className="mb-6 text-center text-2xl font-black text-white md:text-4xl">
        Ao entrar para o Informática na Prática, você recebe:
      </h2>

      <ul className="mb-8 space-y-2.5">
        {inclui.map((i) => (
          <li key={i} className="flex items-start gap-3 text-base text-slate-100 md:text-lg">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
            <span>{i}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-white p-6 text-center shadow-2xl md:p-8">
        <p className="text-base text-slate-500 line-through md:text-lg">De R$ 497,00</p>
        <p className="text-sm font-bold uppercase tracking-wide text-slate-600">por apenas</p>
        <p className="my-1 text-5xl font-black text-slate-900 md:text-6xl">R$ 297</p>
        <p className="mb-5 text-sm text-slate-600 md:text-base">
          à vista no PIX ou em até 12x no cartão
        </p>

        <CTA id="oferta">QUERO COMEÇAR AGORA</CTA>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600 md:text-sm">
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-green-600" /> Pagamento seguro
          </span>
          <span className="flex items-center gap-1.5">
            <InfinityIcon className="h-4 w-4 text-green-600" /> Acesso vitalício
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-600" /> Comece agora mesmo
          </span>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────── Garantia ───────────────── */
const Garantia = () => (
  <section className="bg-white py-12 md:py-16">
    <div className="container mx-auto max-w-2xl px-4 text-center">
      <ShieldCheck className="mx-auto mb-4 h-14 w-14 text-green-600" />
      <h2 className="mb-4 text-2xl font-black text-slate-900 md:text-4xl">
        Você não precisa ter medo de começar
      </h2>
      <p className="mb-8 text-base leading-relaxed text-slate-600 md:text-lg">
        Você tem 7 dias de garantia. Se nesse período achar que o curso não é para você, basta
        pedir o cancelamento e devolvemos todo o valor pago — sem complicação.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, t: "Compra segura" },
          { icon: Lock, t: "Pagamento protegido" },
          { icon: Award, t: "Garantia de 7 dias" },
        ].map(({ icon: Icon, t }) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <Icon className="mx-auto mb-2 h-6 w-6 text-green-600" />
            <p className="text-sm font-bold text-slate-800">{t}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────── FAQ ───────────────── */
const faq = [
  {
    q: "Preciso saber alguma coisa de informática para começar?",
    a: "Não. O curso foi pensado para quem está começando do zero. As primeiras aulas explicam o computador desde o básico.",
  },
  {
    q: "E se eu nunca usei um computador?",
    a: "Tudo bem. As aulas começam pelos fundamentos e avançam devagar, sem termos técnicos.",
  },
  {
    q: "Posso assistir às aulas novamente?",
    a: "Sim. O acesso é vitalício, então você pode rever cada aula quantas vezes quiser.",
  },
  {
    q: "O curso é presencial?",
    a: "Não. É um curso 100% online, gravado. Você assiste no horário que puder.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Depois da confirmação do pagamento, você recebe no seu e-mail os dados de acesso à plataforma do aluno.",
  },
  {
    q: "Quanto tempo tenho para concluir?",
    a: "Não existe prazo. Como o acesso é vitalício, você avança no seu ritmo.",
  },
  {
    q: "Tem certificado?",
    a: "Sim. O certificado de conclusão fica disponível 15 dias após a confirmação do pagamento.",
  },
  {
    q: "Como faço para tirar dúvidas?",
    a: "Você pode falar com a nossa equipe pelo WhatsApp sempre que precisar de ajuda.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto max-w-2xl px-4">
        <h2 className="mb-8 text-center text-2xl font-black text-slate-900 md:text-4xl">
          Perguntas frequentes
        </h2>
        <div className="space-y-2">
          {faq.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                aria-expanded={open === i}
              >
                <h3 className="text-base font-bold text-slate-900 md:text-lg">{f.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-blue-600 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="px-4 pb-4 text-base leading-relaxed text-slate-600">{f.a}</p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-base text-slate-600">
          Ficou com alguma dúvida?{" "}
          <a
            href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-green-700 underline"
          >
            Fale com a nossa equipe no WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
};


/* ───────────────── CTA final ───────────────── */
const CTAFinal = () => (
  <section className="bg-blue-600 py-12 md:py-16">
    <div className="container mx-auto max-w-2xl px-4 text-center">
      <h2 className="mb-4 text-2xl font-black leading-tight text-white md:text-4xl">
        Você não precisa continuar dependendo de alguém para usar o computador
      </h2>
      <p className="mb-8 text-base leading-relaxed text-blue-50 md:text-lg">
        Comece do zero, aprenda passo a passo e conquiste mais segurança para usar a tecnologia no
        seu dia a dia.
      </p>
      <CTA id="final" />
      <p className="mt-4 text-sm text-blue-50">
        R$ 297 à vista ou em até 12x • Garantia de 7 dias • Acesso vitalício
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 py-8">
    <div className="container mx-auto px-4 text-center text-xs text-slate-400">
      <img src={logo} alt="Informática na Prática" className="mx-auto mb-4 h-10 opacity-90" />
      <p className="mb-2">Informática na Prática LTDA</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/termos-de-uso" className="hover:text-white">
          Termos de uso
        </a>
        <a href="/politica-de-privacidade" className="hover:text-white">
          Política de privacidade
        </a>
      </div>
    </div>
  </footer>
);

/* ───────────────── Página ───────────────── */
const Online = () => {
  useEffect(() => {
    document.title = "Curso de Informática Online | Informática na Prática";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Aprenda a usar o computador com segurança, mesmo começando do zero. Aulas simples e passo a passo, no seu ritmo, com acesso vitalício."
    );

    const t = setTimeout(() => {
      try {
        (window as any).fbq?.("track", "ViewContent", {
          content_name: "Curso Informática na Prática",
          content_category: "curso-online",
          value: 297.0,
          currency: "BRL",
        });
        (window as any).gtag?.("event", "view_item", {
          currency: "BRL",
          value: 297.0,
          items: [{ item_id: "curso-informatica", item_name: "Curso Informática na Prática" }],
        });
      } catch {}
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-24 md:pb-0">
        <Hero />
        <Identificacao />
        <Solucao />
        <Habilidades />
        <MesmoQueVoce />
        <ComoFunciona />
        <ProvaSocial />
        <Professora />
        <Plataforma />
        <Oferta />
        <Garantia />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />

      {/* CTA fixo mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <CTA small id="sticky" />
      </div>
    </div>
  );
};

export default Online;
