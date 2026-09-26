import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Clock3,
  BookOpen,
  FileText,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Infinity as InfinityIcon,
  Keyboard,
  Lock,
  Mail,
  MessageCircleHeart,
  Monitor,
  Play,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HeroBonuses } from "@/components/aprender/HeroBonuses";
import { CourseEnrollmentDialog } from "@/components/CourseEnrollmentDialog";
import { CHECKOUT_MODAL_EVENT, requestCheckout } from "@/lib/requestCheckout";
import elisa from "@/assets/elisa-photo.jpg";
import elisaHeaderAsset from "@/assets/elisa-header.jpg.asset.json";
const elisaHeader = elisaHeaderAsset.url;
import presentationVideoAsset from "@/assets/informatica-apresentacao.mp4.asset.json";
import presentationCoverAsset from "@/assets/informatica-apresentacao-capa.jpg.asset.json";
import homeVideoThumbAsset from "@/assets/aprender-hero-cover-v3.jpg.asset.json";
import lessonVideoThumbAsset from "@/assets/capa-aula-demonstrativa.jpg.asset.json";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import fbAvatar2 from "@/assets/avatar-2.jpg";
import fbAvatar3 from "@/assets/avatar-3.jpg";
import fbAvatar5 from "@/assets/avatar-5.jpg";
import fbAvatar8 from "@/assets/avatar-8.jpg";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";
import certificateImage from "@/assets/certificado-exemplo.png";

const studentAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
const presentationVideo = presentationVideoAsset.url;
const presentationCover = presentationCoverAsset.url;
const homeVideoThumb = homeVideoThumbAsset.url;
const lessonVideoThumb = lessonVideoThumbAsset.url;

const CTA = ({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) => (
  <Button
    type="button"
    onClick={requestCheckout}
    className={`h-auto w-full whitespace-normal rounded-xl bg-success px-5 font-black text-success-foreground shadow-cta hover:bg-success/90 ${
      compact ? "py-3 text-base md:text-lg" : "py-4 text-lg md:py-5 md:text-xl"
    }`}
  >
    <Monitor className="h-5 w-5 shrink-0" />
    {children}
  </Button>
);

const TrustRow = () => (
  <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground md:text-sm">
    <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-success" />Pagamento seguro</span>
    <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" />7 dias de garantia</span>
    <span className="flex items-center gap-1.5"><InfinityIcon className="h-4 w-4 text-success" />Acesso vitalício</span>
  </div>
);

const Header = () => (
  <header className="border-b border-border bg-background py-3">
    <div className="container mx-auto flex items-center justify-center gap-3 px-4">
      <img src={elisaHeader} alt="Professora Elisa" className="h-16 w-16 shrink-0 rounded-full border-2 border-primary object-cover shadow-card md:h-20 md:w-20" />
      <p className="max-w-xs text-xl font-black leading-tight text-foreground md:max-w-none md:text-2xl">
        Aprenda <span className="text-primary">Informática</span> do zero, passo a passo
      </p>
    </div>
  </header>
);

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background">
      <div className="relative overflow-hidden bg-slate-900 px-4 py-4 md:py-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
        <div className="container relative mx-auto max-w-4xl text-center">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 backdrop-blur-sm md:mb-3 md:px-4 md:py-1.5 md:text-xs">
            <MessageCircleHeart className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" aria-hidden />
            Recado da Profª Elisa
          </span>
          <p className="relative text-lg font-black leading-tight text-white md:text-2xl">
            <span className="pointer-events-none absolute -left-2 -top-4 select-none font-serif text-4xl italic leading-none text-primary/30 md:-left-10 md:-top-7 md:text-6xl" aria-hidden>
              &ldquo;
            </span>
            Vou te ensinar a usar o
            <span className="relative mt-1 block w-full leading-none">
              <span className="relative z-10 whitespace-nowrap text-[12.5vw] font-black leading-none md:text-[8.5rem]">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">computador</span>
              </span>
              <span className="absolute inset-x-0 bottom-[0.04em] z-0 h-1 rounded-full bg-gradient-to-r from-blue-500/0 via-cyan-400/80 to-blue-500/0 md:h-2" />
            </span>
            <span className="mt-1 block">de uma vez por todas!</span>
          </p>
          <div className="mx-auto mt-3 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-primary/70 to-transparent md:mt-4 md:w-32" />
        </div>
      </div>
      <div className="container mx-auto max-w-5xl px-4 py-5 md:py-8">
        <div className="text-center">
          <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-foreground md:text-5xl">
            Imagine fazer seus documentos, planilhas e e-mails <span className="text-primary">sem depender de ninguém.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-bold text-foreground md:mt-4 md:text-2xl">
            Eu vou te ensinar cada passo, com calma, até você conseguir.
          </p>
          <div className="mx-auto mt-5 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-panel shadow-card">
            {!isPlaying ? (
              <Button
                type="button"
                variant="ghost"
                aria-label="Assistir apresentação do curso"
                onClick={() => setIsPlaying(true)}
                className="group relative block h-auto w-full rounded-none p-0"
              >
                <img
                  src={presentationCover}
                  alt="Professora Elisa apresentando o curso"
                  className="aspect-[35/54] w-full object-cover"
                  width="560"
                  height="864"
                  decoding="async"
                  {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                />
                <span className="absolute left-1/2 top-3 w-max -translate-x-1/2 rounded-full bg-slate-900/60 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-card backdrop-blur-sm md:text-sm">
                  <span className="flex items-center gap-1.5"><MessageCircleHeart className="h-4 w-4 shrink-0 text-warning" /> Recado da Profª Elisa</span>
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-card ring-2 ring-primary/30 transition-transform group-hover:scale-105 group-active:scale-95 md:h-24 md:w-24">
                    <Play className="ml-1 h-10 w-10 text-primary drop-shadow-sm md:h-12 md:w-12" fill="currentColor" />
                  </span>
                </span>
              </Button>
            ) : (
              <div className="aspect-[35/54]">
                <video
                  src={presentationVideo}
                  poster={presentationCover}
                  title="Apresentação do curso"
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  ref={(el) => {
                    if (el) void el.play().catch(() => undefined);
                  }}
                />
              </div>
            )}
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            O computador deixa de ser medo e vira parte do seu dia: trabalho, recados da família, contas e tudo mais.
          </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {studentAvatars.map((avatar, index) => (
              <img key={avatar} src={avatar} alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover" />
            ))}
          </div>
          <div className="text-left">
            <div className="flex" aria-label="Avaliação de cinco estrelas">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-warning text-warning" />)}
            </div>
            <p className="text-xs font-bold text-muted-foreground">+15.000 alunos já aprenderam</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeIntroductionVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-muted py-6 md:py-9">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <span className="text-sm font-black uppercase text-primary">Veja antes de decidir</span>
        <h2 className="mt-2 text-2xl font-black text-foreground md:text-4xl">Conheça o curso e veja como você também pode aprender</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Assista a esta apresentação rápida e descubra como funciona o meu jeito de ensinar.</p>
        <div className="mx-auto mt-5 overflow-hidden rounded-xl border border-border bg-panel shadow-card">
          {!isPlaying ? (
            <Button type="button" variant="ghost" onClick={() => setIsPlaying(true)} className="group relative block h-auto w-full rounded-none p-0" aria-label="Assistir apresentação do curso">
              <img src={homeVideoThumb} alt="Apresentação do curso de informática" className="aspect-video w-full object-cover" loading="eager" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-card ring-2 ring-primary/30 transition-transform group-hover:scale-105 md:h-20 md:w-20">
                  <Play className="ml-1 h-8 w-8 text-primary md:h-10 md:w-10" fill="currentColor" />
                </span>
              </span>
            </Button>
          ) : (
            <div className="aspect-video">
              <iframe src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1" title="Apresentação do curso de informática" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          )}
        </div>
        <div className="mx-auto mt-5 max-w-xl"><CTA compact>Quero começar a aprender</CTA></div>
      </div>
    </section>
  );
};

const HomeDemoLesson = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background py-6 md:py-9">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-warning/15 px-3 py-1.5 text-xs font-black text-warning"><PlayCircle className="h-4 w-4" /> AULA REAL</span>
        <h2 className="mt-3 text-2xl font-black text-foreground md:text-4xl">Veja como é uma aula passo a passo</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Sem palavras difíceis e sem pressa. Eu mostro cada clique como se estivesse ao seu lado.</p>
        <div className="mx-auto mt-5 overflow-hidden rounded-xl border border-border bg-panel shadow-card">
          {!isPlaying ? (
            <Button type="button" variant="ghost" onClick={() => setIsPlaying(true)} className="group relative block h-auto w-full rounded-none p-0" aria-label="Assistir aula demonstrativa">
              <img src={lessonVideoThumb} alt="Aula demonstrativa da Professora Elisa" className="aspect-video w-full object-cover" loading="lazy" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-card ring-2 ring-primary/30 transition-transform group-hover:scale-105 md:h-20 md:w-20">
                  <Play className="ml-1 h-8 w-8 text-primary md:h-10 md:w-10" fill="currentColor" />
                </span>
              </span>
            </Button>
          ) : (
            <div className="aspect-video">
              <iframe src="https://www.youtube-nocookie.com/embed/_0OPLnEiMHk?rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1" title="Aula demonstrativa da Professora Elisa" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          )}
        </div>
        <p className="mx-auto mt-4 max-w-2xl font-bold text-foreground">Essa é a mesma explicação simples que você encontra em todo o curso.</p>
      </div>
    </section>
  );
};

const Objections = () => {
  const items = [
    { icon: Monitor, title: "“Tenho medo de não conseguir”", text: "Eu começo do zero com você. Você acompanha cada clique junto comigo, sem pressa." },
    { icon: Clock3, title: "“Não tenho muito tempo”", text: "Eu fiz aulas curtas justamente para você. E o acesso é vitalício: aprenda no seu ritmo." },
    { icon: Headphones, title: "“E se eu tiver dúvidas?”", text: "Pode me chamar. Você não fica sozinho: eu ajudo você quando travar." },
    { icon: ShieldCheck, title: "“Tenho receio de investir”", text: "Conheça o curso por 7 dias, com calma. Se não gostar, devolvemos seu dinheiro." },
  ];

  return (
    <section className="bg-muted py-6 md:py-9">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="text-sm font-black uppercase text-primary">Comece com tranquilidade</span>
          <h2 className="mt-2 text-2xl font-black text-foreground md:text-4xl">Suas dúvidas têm respostas simples</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3 rounded-lg border border-border bg-background p-4">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <div><h3 className="font-black text-foreground">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{text}</p></div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 max-w-xl"><CTA compact>Agora eu quero começar</CTA></div>
      </div>
    </section>
  );
};

const WhoItIsFor = () => {
  const profiles = [
    { icon: Monitor, title: "Você está começando do zero", text: "Eu ensino desde os primeiros passos, sem presumir que você já saiba alguma coisa." },
    { icon: FileText, title: "Você quer fazer tudo sozinho", text: "Aprenda a criar documentos, organizar arquivos, usar planilhas e enviar e-mails." },
    { icon: HeartHandshake, title: "Você precisa de calma e apoio", text: "As explicações são simples, e você pode rever cada aula quantas vezes precisar." },
    { icon: Award, title: "Você busca novas oportunidades", text: "Ganhe confiança para usar o computador no trabalho e em tarefas importantes do dia a dia." },
  ];

  return (
    <section className="bg-background py-6 md:py-9">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="text-sm font-black uppercase text-primary">Feito para você</span>
          <h2 className="mt-2 text-2xl font-black text-foreground md:text-4xl">Este curso é para quem quer aprender sem medo</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Não importa se você sabe pouco ou nunca fez um curso. Eu começo do começo.</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {profiles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3 rounded-lg border border-border bg-panel p-4 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-5 w-5 text-primary" /></span>
              <div><h3 className="font-black text-foreground">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const studentComments = [
  { avatar: fbAvatar2, text: "Tô conseguindo usar o computador sozinha, muito obrigada!" },
  { avatar: fbAvatar3, text: "Melhor investimento que fiz! Já indiquei pra toda família." },
  { avatar: fbAvatar5, text: "Achei que era difícil, mas a didática é perfeita. Parabéns!" },
  { avatar: fbAvatar8, text: "Com 68 anos aprendi a mexer no computador. Deus abençoe!" },
];

const SocialProof = () => (
  <section className="bg-muted py-6 md:py-9">
    <div className="container mx-auto max-w-5xl px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-5">
          <span><strong className="block text-2xl text-primary md:text-3xl">+15.000</strong><small className="font-bold text-muted-foreground">alunos</small></span>
          <span><strong className="block text-2xl text-primary md:text-3xl">4,9</strong><small className="font-bold text-muted-foreground">avaliação</small></span>
          <span><strong className="block text-2xl text-primary md:text-3xl">20 anos</strong><small className="font-bold text-muted-foreground">ensinando</small></span>
        </div>
        <h2 className="mt-5 text-2xl font-black text-foreground md:text-4xl">Eu já ajudei pessoas que começaram com medo, igual você</h2>
        <p className="mt-2 text-muted-foreground">Elas só precisavam de uma explicação simples e de alguém com paciência. É isso que eu faço.</p>
      </div>
      <div className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-3">
        {[whatsappTestimonial1, whatsappTestimonial2].map((image, index) => (
          <div key={image} className="overflow-hidden rounded-lg border border-border bg-panel p-1.5 shadow-card">
            <img src={image} alt={`Mensagem de aluno ${index + 1}`} className="w-full rounded-md" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
        {studentComments.map((comment, index) => (
          <article key={comment.text} className="flex gap-3 rounded-lg border border-border bg-background p-4 shadow-card">
            <img src={comment.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover blur-[3px]" loading="lazy" />
            <div>
              <div className="flex gap-0.5" aria-label="Avaliação de cinco estrelas">
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-3.5 w-3.5 fill-warning text-warning" />)}
              </div>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground md:text-base">“{comment.text}”</p>
              <p className="mt-1 text-xs font-bold text-muted-foreground">Comentário de aluna {index + 1}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 text-center text-xl font-black text-foreground md:text-2xl">Se eles conseguiram comigo, <span className="text-success">você também consegue.</span></p>
    </div>
  </section>
);

const CourseContent = () => {
  const lessons = [
    { image: windowsIcon, title: "Windows e arquivos", text: "Organize pastas e use o computador com segurança." },
    { image: wordIcon, title: "Word", text: "Crie, salve e imprima documentos e currículos." },
    { image: excelIcon, title: "Excel", text: "Faça planilhas e organize contas e informações." },
    { image: powerpointIcon, title: "PowerPoint", text: "Monte apresentações bonitas e organizadas." },
    { image: internetIcon, title: "Internet e e-mail", text: "Pesquise, envie mensagens e reconheça riscos." },
    { image: typingIcon, title: "Digitação", text: "Ganhe confiança e agilidade no teclado." },
  ];

  return (
    <section className="bg-muted py-6 md:py-9">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="text-sm font-black uppercase text-primary">Tudo em um só curso</span>
          <h2 className="mt-2 text-2xl font-black text-foreground md:text-4xl">O que eu preparei para você</h2>
          <p className="mt-2 text-muted-foreground">Mais de 90 aulas práticas que eu gravei para você usar o computador com confiança.</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {lessons.map((lesson) => (
            <div key={lesson.title} className="rounded-lg border border-border bg-background p-3 md:p-4">
              <img src={lesson.image} alt="" className="h-9 w-9" loading="lazy" />
              <h3 className="mt-2 font-black text-foreground">{lesson.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{lesson.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {["Suporte com a professora", "Certificado de conclusão", "Acesso vitalício às aulas"].map((item) => (
            <p key={item} className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm font-bold text-foreground">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { number: "1", icon: PlayCircle, title: "Assista à aula curta", text: "Eu mostro uma tarefa por vez, com uma explicação fácil de acompanhar." },
    { number: "2", icon: Monitor, title: "Faça junto comigo", text: "Abra o computador e repita cada passo no seu ritmo, sem pular nenhuma etapa." },
    { number: "3", icon: BookOpen, title: "Pratique no seu dia", text: "Use o que aprendeu em documentos, planilhas, e-mails e outras tarefas reais." },
  ];

  return (
    <section className="bg-primary py-7 text-primary-foreground md:py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="text-sm font-black uppercase text-primary-foreground/75">Um caminho simples</span>
          <h2 className="mt-2 text-2xl font-black md:text-4xl">Como você vai aprender</h2>
          <p className="mx-auto mt-2 max-w-2xl text-primary-foreground/80">Sem palavras difíceis: você vê, faz junto e pratica.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, text }) => (
            <div key={number} className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 p-4">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-lg font-black text-primary">{number}</span><Icon className="h-6 w-6 text-warning" /></div>
              <h3 className="mt-3 text-lg font-black">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-primary-foreground/80 md:text-base">{text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 max-w-xl"><CTA compact>Quero aprender passo a passo</CTA></div>
      </div>
    </section>
  );
};

const Teacher = () => {
  return (
    <section className="bg-background py-6 md:py-9">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-center md:text-left">
            <img src={elisa} alt="Professora Elisa" className="mx-auto aspect-[4/5] max-h-72 rounded-xl object-cover object-top shadow-card md:mx-0" />
            <h2 className="mt-3 text-2xl font-black text-foreground">Professora Elisa</h2>
            <p className="mt-1 font-bold text-primary">Há mais de 20 anos ensinando informática</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">“Eu vou explicar com calma, sem palavras difíceis e sem julgamento. Você não estará sozinho.”</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StudentVoices = () => {
  const audios = [
    { name: "Antonio", label: "Conta como foi aprender com as aulas", src: "/audio/antonio-1.ogg" },
    { name: "Antonio", label: "Continuação do depoimento", src: "/audio/antonio-2.ogg" },
    { name: "Vanderlei", label: "Fala sobre sua experiência no curso", src: "/audio/vanderlei.ogg" },
  ];

  return (
    <section className="bg-background py-6 md:py-9">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="text-sm font-black uppercase text-primary">Ouça quem já começou</span>
          <h2 className="mt-2 text-2xl font-black text-foreground md:text-4xl">Alunos contando com a própria voz</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Depoimentos enviados por pessoas que conheceram o meu jeito de ensinar.</p>
        </div>
        <div className="mx-auto mt-5 grid max-w-3xl gap-3 md:grid-cols-3">
          {audios.map((audio) => (
            <div key={`${audio.name}-${audio.src}`} className="rounded-lg border border-border bg-panel p-4 shadow-card">
              <div className="flex items-center gap-2"><Headphones className="h-6 w-6 text-primary" /><h3 className="font-black text-foreground">{audio.name}</h3></div>
              <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">{audio.label}</p>
              <audio className="mt-3 h-10 w-full" controls preload="none" src={audio.src}>Seu navegador não consegue tocar este áudio.</audio>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xl font-black text-foreground md:text-2xl">Cada aluno começou de um jeito. <span className="text-success">Todos deram o primeiro passo.</span></p>
      </div>
    </section>
  );
};

const Certificate = () => (
  <section className="bg-muted py-6 md:py-9">
    <div className="container mx-auto grid max-w-5xl items-center gap-5 px-4 md:grid-cols-2 md:gap-8">
      <img src={certificateImage} alt="Exemplo do certificado de conclusão" className="w-full rounded-xl border border-border shadow-card" loading="lazy" />
      <div className="text-center md:text-left">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black text-primary"><GraduationCap className="h-4 w-4" /> SUA CONQUISTA</span>
        <h2 className="mt-3 text-2xl font-black text-foreground md:text-4xl">Conclua o curso e receba seu certificado</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground md:text-lg">Uma forma de reconhecer seu aprendizado e mostrar que você se dedicou a dominar o computador.</p>
        <div className="mt-4 space-y-2 text-left">
          {["Certificado digital de conclusão", "Pronto para incluir no currículo", "Um registro da sua realização"].map((item) => (
            <p key={item} className="flex items-center gap-2 font-bold text-foreground"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</p>
          ))}
        </div>
        <div className="mt-5"><CTA compact>Quero conquistar meu certificado</CTA></div>
      </div>
    </div>
  </section>
);

const Offer = () => (
  <section id="oferta" className="bg-primary py-7 text-primary-foreground md:py-10">
    <div className="container mx-auto max-w-3xl px-4">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-warning px-4 py-2 text-sm font-black text-warning-foreground"><Award className="h-5 w-5" /> CONDIÇÃO ESPECIAL DE HOJE</span>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">Eu vou te acompanhar, no seu ritmo</h2>
        <p className="mt-2 text-primary-foreground/80">Curso completo, meu suporte e acesso vitalício.</p>
      </div>
      <div className="mt-5 rounded-xl border-2 border-warning bg-background p-5 text-foreground shadow-card md:p-8">
        <div className="text-center">
          <p className="text-muted-foreground">De <span className="line-through">R$ 497,00</span> por apenas</p>
          <p className="mt-1 text-5xl font-black text-success md:text-6xl">R$ 297</p>
          <p className="mt-2 text-base font-bold text-foreground md:text-lg">ou no cartão em até</p>
          <p className="mt-1 text-2xl font-black text-primary md:text-3xl">12x de R$ 30,72</p>
          <p className="mt-3 font-black text-warning">Hoje você leva 4 bônus exclusivos</p>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {["Mais de 90 videoaulas", "Word, Excel, internet e arquivos", "Suporte humano", "Certificado de conclusão", "Acesso vitalício", "4 bônus exclusivos"].map((item) => (
            <p key={item} className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</p>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-success/30 bg-success/10 p-4 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-success" />
          <p className="mt-1 text-lg font-black text-success">Você tem 7 dias para conhecer o curso</p>
          <p className="mt-1 text-sm text-muted-foreground">Se não gostar, basta pedir o reembolso dentro desse prazo.</p>
        </div>
        <div className="mt-5"><CTA>Quero garantir minha vaga agora</CTA></div>
        <TrustRow />
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    ["Nunca usei computador. Vou conseguir?", "Sim. Eu começo do zero e mostro cada clique, com linguagem simples."],
    ["E se eu esquecer uma aula?", "O acesso é vitalício. Você pode assistir minhas aulas quantas vezes quiser."],
    ["Como recebo o acesso?", "Assim que o pagamento for confirmado, os dados de acesso chegam no seu e-mail."],
    ["Vou ter ajuda quando surgir uma dúvida?", "Sim. Eu e minha equipe vamos te ajudar durante todo o curso."],
    ["Como funciona a garantia?", "Você tem 7 dias para conhecer minhas aulas com calma. Se não gostar, devolvemos seu dinheiro."],
  ];

  return (
    <section className="bg-muted py-6 md:py-9">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-center text-2xl font-black text-foreground md:text-4xl">Ficou alguma dúvida?</h2>
        <div className="mt-5 space-y-2">
          {faqs.map(([question, answer], index) => (
            <div key={question} className="overflow-hidden rounded-lg border border-border bg-background">
              <Button type="button" variant="ghost" onClick={() => setOpen(open === index ? -1 : index)} className="h-auto w-full justify-between whitespace-normal rounded-none p-4 text-left font-black text-foreground">
                {question}<ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === index ? "rotate-180" : ""}`} />
              </Button>
              {open === index && <p className="px-4 pb-4 leading-relaxed text-muted-foreground">{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="bg-foreground py-7 text-background md:py-10">
    <div className="container mx-auto max-w-3xl px-4 text-center">
      <Monitor className="mx-auto h-12 w-12 text-primary" />
      <h2 className="mt-3 text-3xl font-black md:text-5xl">Eu quero te ver usando o computador sem depender de ninguém</h2>
      <p className="mx-auto mt-3 max-w-2xl text-background/75 md:text-lg">Dê o primeiro passo hoje. Eu vou te acompanhar com calma, desde o começo.</p>
      <div className="mt-5"><CTA>Quero aprender com você, Profª Elisa</CTA></div>
      <p className="mt-3 text-xs font-semibold text-background/70">Pagamento seguro • 7 dias de garantia • acesso vitalício</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-foreground py-6 text-center text-xs text-background/60">
    <p className="font-bold text-background/80">Informática na Prática LTDA</p>
    <p className="mt-1">© 2026 — Todos os direitos reservados • CNPJ: 32.373.460/0001-51</p>
    <div className="mt-2 flex justify-center gap-4"><a href="/termos-de-uso">Termos de Uso</a><a href="/politica-de-privacidade">Privacidade</a></div>
  </footer>
);

const StickyCTA = () => (
  <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-2.5 shadow-card md:hidden">
    <Button type="button" onClick={requestCheckout} className="h-auto w-full rounded-xl bg-success py-3.5 text-base font-black text-success-foreground hover:bg-success/90">
      <Monitor className="h-5 w-5" /> Quero começar meu curso
    </Button>
  </div>
);

const Remarketing = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    document.title = "Curso de Informática Online • Informática na Prática";
    const openDialog = () => setCheckoutOpen(true);
    window.addEventListener(CHECKOUT_MODAL_EVENT, openDialog);
    return () => window.removeEventListener(CHECKOUT_MODAL_EVENT, openDialog);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground md:pb-0">
      <Header />
      <Hero />
      <HomeIntroductionVideo />
      <HomeDemoLesson />
      <SocialProof />
      <WhoItIsFor />
      <Objections />
      <CourseContent />
      <HowItWorks />
      <Teacher />
      <section className="bg-muted px-4 py-6 md:py-9"><HeroBonuses variant="light" /></section>
      <StudentVoices />
      <Certificate />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
      <CourseEnrollmentDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
};

export default Remarketing;
