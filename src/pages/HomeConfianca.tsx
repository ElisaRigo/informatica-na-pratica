import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  FolderOpen,
  Infinity as InfinityIcon,
  Keyboard,
  Lock,
  Mail,
  MessageCircleHeart,
  Monitor,
  Pause,
  Play,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseEnrollmentDialog } from "@/components/CourseEnrollmentDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CHECKOUT_MODAL_EVENT, requestCheckout } from "@/lib/requestCheckout";
import elisa from "@/assets/elisa-photo.jpg";
import presentationVideoAsset from "@/assets/informatica-apresentacao.mp4.asset.json";
import presentationCoverAsset from "@/assets/informatica-apresentacao-capa.jpg.asset.json";
import courseCoverAsset from "@/assets/aprender-hero-cover-v3.jpg.asset.json";
import classCoverAsset from "@/assets/capa-aula-demonstrativa.jpg.asset.json";
import lessonCover from "@/assets/aprenda-comigo-thumb.jpg";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import avatar6 from "@/assets/testimonial-new-6.jpg";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import internetIcon from "@/assets/internet-icon.png";

const presentationVideo = presentationVideoAsset.url;
const presentationCover = presentationCoverAsset.url;
const courseCover = courseCoverAsset.url;
const classCover = classCoverAsset.url;
const studentAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

const CTA = ({ children, compact = false }: { children: ReactNode; compact?: boolean }) => (
  <Button
    type="button"
    onClick={requestCheckout}
    className={`h-auto w-full whitespace-normal rounded-xl bg-success px-5 font-black text-success-foreground shadow-cta hover:bg-success/90 ${
      compact ? "py-3.5 text-base md:text-lg" : "py-4 text-lg md:py-5 md:text-xl"
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
    <div className="container mx-auto flex max-w-5xl items-center justify-center gap-3 px-4">
      <img src={elisa} alt="Professora Elisa" className="h-14 w-14 rounded-full border-2 border-primary/30 object-cover object-top shadow-card md:h-16 md:w-16" />
      <div>
        <p className="font-heading text-lg font-bold leading-tight text-foreground md:text-xl">Profª Elisa</p>
        <p className="text-sm font-semibold text-primary md:text-base">Informática do zero, passo a passo</p>
      </div>
    </div>
  </header>
);

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background px-4 py-6 md:py-10">
      <div className="container mx-auto max-w-4xl px-0 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black uppercase text-primary">
          <MessageCircleHeart className="h-4 w-4" /> Aprenda sem medo e sem julgamento
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
          Imagine usar o computador com confiança, <span className="text-primary">sem depender de ninguém.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
          Eu sou a Profª Elisa e vou ensinar cada clique com calma, no seu ritmo, até você conseguir.
        </p>

        <div className="mx-auto mt-5 w-full max-w-[340px] overflow-hidden rounded-xl border-4 border-primary/10 bg-foreground shadow-card">
          {!isPlaying ? (
            <Button type="button" variant="ghost" onClick={() => setIsPlaying(true)} className="group relative block h-auto w-full rounded-none p-0" aria-label="Assistir ao recado da Professora Elisa">
              <img src={presentationCover} alt="Professora Elisa apresentando o curso" className="aspect-[35/54] w-full object-cover" width="560" height="864" decoding="async" />
              <span className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 px-5">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-background/90 shadow-card ring-4 ring-primary/20 transition-transform group-hover:scale-105">
                  <Play className="ml-1 h-10 w-10 text-primary" fill="currentColor" />
                </span>
                <span className="mt-4 rounded-full bg-foreground/75 px-4 py-2 text-sm font-black text-background">Assista ao meu recado para você</span>
              </span>
            </Button>
          ) : (
            <div className="aspect-[35/54]">
              <video src={presentationVideo} poster={presentationCover} title="Recado da Professora Elisa" className="h-full w-full object-contain" controls autoPlay playsInline preload="auto" ref={(element) => { if (element) void element.play().catch(() => undefined); }} />
            </div>
          )}
        </div>

        <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-primary/20 bg-primary/5 p-4 text-left md:p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
            <p className="text-base font-semibold leading-relaxed text-foreground md:text-lg">
              Aqui você aprende sem vergonha. Se errar, volta a aula e tenta novamente comigo — quantas vezes precisar.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-5 max-w-xl"><CTA>Quero aprender com a Profª Elisa</CTA></div>
        <TrustRow />
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {studentAvatars.map((avatar) => <img key={avatar} src={avatar} alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover" />)}
          </div>
          <div className="text-left">
            <div className="flex" aria-label="Avaliação de cinco estrelas">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-warning text-warning" />)}</div>
            <p className="text-xs font-bold text-muted-foreground">+15.000 alunos já aprenderam</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Possibilities = () => {
  const items = [
    { icon: FileText, text: "Criar documentos e currículos" },
    { icon: FolderOpen, text: "Organizar arquivos e pastas" },
    { icon: Mail, text: "Enviar e-mails com segurança" },
    { icon: Keyboard, text: "Usar o teclado com confiança" },
  ];
  return (
    <section className="bg-foreground px-4 py-7 text-background md:py-10">
      <div className="container mx-auto max-w-4xl px-0 text-center">
        <p className="text-sm font-black uppercase text-primary">Você também consegue</p>
        <h2 className="mt-2 font-heading text-2xl font-bold leading-tight md:text-4xl">O computador pode facilitar a sua vida</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-background/15 bg-background/5 p-4 text-center">
              <Icon className="h-7 w-7 text-primary" />
              <p className="mt-2 text-sm font-bold leading-snug md:text-base">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseIntroduction = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background px-4 py-7 md:py-10">
      <div className="container mx-auto max-w-4xl px-0 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black uppercase text-primary"><PlayCircle className="h-4 w-4" /> Conheça o curso</span>
        <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-4xl">Veja como eu preparei tudo para você</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground md:text-lg">Neste vídeo eu mostro o curso por dentro e explico como você vai aprender.</p>
        <div className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-xl border border-border bg-panel shadow-card">
          {!isPlaying ? (
            <Button type="button" variant="ghost" onClick={() => setIsPlaying(true)} className="group relative block h-auto w-full rounded-none p-0" aria-label="Assistir Conheça o curso">
              <img src={courseCover} alt="Conheça o curso de Informática na Prática" className="aspect-video w-full object-cover" loading="lazy" />
              <span className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/15 px-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 shadow-card"><Play className="ml-1 h-8 w-8 text-primary" fill="currentColor" /></span>
                <span className="mt-3 rounded-full bg-foreground/80 px-4 py-2 text-sm font-black text-background">Assistir agora</span>
              </span>
            </Button>
          ) : (
            <div className="aspect-video">
              <iframe src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1" title="Conheça o curso" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          )}
        </div>
        <div className="mx-auto mt-5 max-w-xl"><CTA compact>Quero aprender com a Profª Elisa</CTA></div>
      </div>
    </section>
  );
};

const videoChoices = [
  { id: "aula", label: "Aula demonstrativa", title: "Assista a uma aula completa", text: "Veja cada clique sendo explicado sem pressa e sem palavras difíceis.", cover: classCover, videoId: "_0OPLnEiMHk" },
  { id: "passo", label: "Passo a passo", title: "Aprenda comigo na prática", text: "Uma aula real para você sentir como é aprender ao meu lado.", cover: lessonCover, videoId: "-sdVG1OtDks" },
];

const VideoLibrary = () => {
  const [selectedId, setSelectedId] = useState(videoChoices[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const selected = videoChoices.find((video) => video.id === selectedId) ?? videoChoices[0];

  return (
    <section className="bg-background px-4 py-7 md:py-10">
      <div className="container mx-auto max-w-4xl px-0">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-warning/15 px-3 py-1.5 text-xs font-black uppercase text-warning"><PlayCircle className="h-4 w-4" /> Veja antes de decidir</span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-4xl">Eu prefiro mostrar como ensino</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground md:text-lg">Escolha um vídeo e veja com seus próprios olhos. Todos carregam somente quando você aperta o play.</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2" role="tablist" aria-label="Aulas para assistir">
          {videoChoices.map((video) => (
            <Button key={video.id} type="button" variant={selectedId === video.id ? "default" : "outline"} onClick={() => { setSelectedId(video.id); setIsPlaying(false); }} className="h-auto min-h-14 whitespace-normal rounded-lg px-2 py-2 text-xs font-black md:text-sm">
              {video.label}
            </Button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-panel shadow-card">
          {!isPlaying ? (
            <Button type="button" variant="ghost" onClick={() => setIsPlaying(true)} className="group relative block h-auto w-full rounded-none p-0" aria-label={`Assistir ${selected.title}`}>
              <img src={selected.cover} alt={selected.title} className="aspect-video w-full object-cover" loading="lazy" />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/10"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 shadow-card"><Play className="ml-1 h-8 w-8 text-primary" fill="currentColor" /></span></span>
            </Button>
          ) : (
            <div className="aspect-video">
              <iframe src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1`} title={selected.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">{selected.title}</h3>
          <p className="mt-1 text-muted-foreground md:text-lg">{selected.text}</p>
        </div>
      </div>
    </section>
  );
};

const audioTestimonials = [
  { name: "Amanda", description: "Como o curso ajudou na sua rotina", audioSrc: "/audio/amanda.mp4" },
  { name: "Vanderlei", description: "Como superou as dificuldades", audioSrc: "/audio/vanderlei.ogg" },
  { name: "Bruna", description: "Uma mensagem de gratidão", audioSrc: "/audio/bruna.aac" },
];

const AudioTestimonial = ({ testimonial }: { testimonial: (typeof audioTestimonials)[number] }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else void audio.play().catch(() => setIsPlaying(false));
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-left shadow-card">
      <audio ref={audioRef} src={testimonial.audioSrc} preload="none" onEnded={() => setIsPlaying(false)} />
      <Button type="button" size="icon" onClick={toggle} className="h-11 w-11 shrink-0 rounded-full" aria-label={`${isPlaying ? "Pausar" : "Ouvir"} depoimento de ${testimonial.name}`}>
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" fill="currentColor" />}
      </Button>
      <div className="min-w-0"><p className="font-black text-foreground">{testimonial.name}</p><p className="text-xs text-muted-foreground">{testimonial.description}</p></div>
      <Volume2 className="ml-auto h-5 w-5 shrink-0 text-primary" />
    </div>
  );
};

const studentStories = [
  { name: "Luciana M.", text: "Aprendi em uma semana o que não consegui em meses.", avatar: avatar1 },
  { name: "Tereza S.", text: "Estou conseguindo usar o computador sozinha. Muito obrigada!", avatar: avatar2 },
  { name: "Carlos A.", text: "Melhor investimento que fiz. Já indiquei para toda a família.", avatar: avatar3 },
  { name: "Maria G.", text: "Com 68 anos aprendi a mexer no computador.", avatar: avatar6 },
];

const SocialProof = () => (
  <section className="bg-muted px-4 py-7 md:py-10">
    <div className="container mx-auto max-w-5xl px-0 text-center">
      <Users className="mx-auto h-9 w-9 text-primary" />
      <h2 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-4xl">Mais alunos contam como foi aprender</h2>
      <p className="mx-auto mt-2 max-w-2xl text-muted-foreground md:text-lg">Pessoas reais que começaram com medo e hoje usam o computador com mais confiança.</p>
      <div className="mx-auto mt-5 grid max-w-4xl grid-cols-2 gap-3">
        {[whatsappTestimonial1, whatsappTestimonial2].map((image, index) => (
          <div key={image} className="overflow-hidden rounded-lg border border-border bg-background p-1.5 shadow-card"><img src={image} alt={`Mensagem de aluno ${index + 1}`} className="w-full rounded-md" loading="lazy" /></div>
        ))}
      </div>
      <div className="mx-auto mt-5 grid max-w-4xl gap-3 md:grid-cols-3">
        {audioTestimonials.map((testimonial) => <AudioTestimonial key={testimonial.name} testimonial={testimonial} />)}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {studentStories.map((story) => (
          <div key={story.name} className="rounded-lg border border-border bg-background p-4 text-left shadow-card">
            <div className="flex items-center gap-2"><img src={story.avatar} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" /><div><p className="text-sm font-black text-foreground">{story.name}</p><div className="flex">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5 fill-warning text-warning" />)}</div></div></div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">“{story.text}”</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xl font-black text-foreground md:text-2xl">Se eles conseguiram, <span className="text-success">você também consegue.</span></p>
    </div>
  </section>
);

const CourseSummary = () => {
  const topics = [
    { image: windowsIcon, title: "Windows e arquivos" },
    { image: wordIcon, title: "Word e documentos" },
    { image: excelIcon, title: "Excel e planilhas" },
    { image: internetIcon, title: "Internet e e-mail" },
  ];
  return (
    <section className="bg-background px-4 py-7 md:py-10">
      <div className="container mx-auto max-w-4xl px-0 text-center">
        <p className="text-sm font-black uppercase text-primary">Um curso completo e direto</p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-4xl">Tudo que você precisa para começar</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {topics.map((topic) => (
            <div key={topic.title} className="rounded-lg border border-border bg-panel p-4">
              <img src={topic.image} alt="" className="mx-auto h-10 w-10" loading="lazy" />
              <p className="mt-2 text-sm font-black text-foreground md:text-base">{topic.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm font-bold text-foreground">
          {[
            "+90 aulas práticas",
            "Suporte humano",
            "Certificado incluso",
            "Acesso vitalício",
            "4 bônus exclusivos",
          ].map((item) => <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2"><CheckCircle2 className="h-4 w-4 text-success" />{item}</span>)}
        </div>
      </div>
    </section>
  );
};

const Offer = () => (
  <section id="oferta" className="bg-foreground px-4 py-8 text-background md:py-12">
    <div className="container mx-auto max-w-2xl px-0 text-center">
      <img src={elisa} alt="Professora Elisa" className="mx-auto h-20 w-20 rounded-full border-4 border-primary/30 object-cover object-top" />
      <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">Eu vou acompanhar você desde o primeiro clique</h2>
      <p className="mx-auto mt-2 max-w-xl text-background/75 md:text-lg">Comece no seu ritmo e volte às aulas sempre que precisar.</p>
      <div className="mt-5 rounded-xl border-2 border-primary/40 bg-background p-5 text-foreground shadow-card md:p-7">
        <p className="font-bold text-muted-foreground">Curso completo + 4 bônus exclusivos</p>
        <p className="mt-2 text-sm text-muted-foreground">De <span className="line-through">R$ 497,00</span> por</p>
        <p className="mt-1 text-5xl font-black leading-none text-success md:text-6xl">R$ 297</p>
        <p className="mt-2 font-bold">ou em até <span className="text-primary">12x de R$ 30,72</span> no cartão</p>
        <div className="mt-5 rounded-lg border border-success/30 bg-success/10 p-4">
          <ShieldCheck className="mx-auto h-8 w-8 text-success" />
          <p className="mt-1 text-lg font-black text-success">7 dias para conhecer sem risco</p>
          <p className="mt-1 text-sm text-muted-foreground">Se não gostar, basta pedir o reembolso dentro desse prazo.</p>
        </div>
        <div className="mt-5"><CTA>Quero começar meu curso</CTA></div>
        <TrustRow />
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    ["Nunca usei computador. Vou conseguir?", "Sim. Eu começo do zero e mostro cada clique com palavras simples."],
    ["Posso aprender no meu ritmo?", "Sim. O acesso é vitalício e você pode rever as aulas quantas vezes precisar."],
    ["Vou ter ajuda quando surgir uma dúvida?", "Sim. Você conta com suporte humano durante o curso."],
    ["Como funciona a garantia?", "Você tem 7 dias para conhecer as aulas. Se não gostar, pode pedir o reembolso nesse prazo."],
  ];
  return (
    <section className="bg-muted px-4 py-7 md:py-10">
      <div className="container mx-auto max-w-3xl px-0">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-4xl">Antes de começar, tire suas dúvidas</h2>
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
        <div className="mx-auto mt-5 max-w-xl"><CTA compact>Sim, eu quero aprender</CTA></div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-foreground px-4 pb-24 pt-6 text-center text-xs text-background/60 md:pb-6">
    <p className="font-bold text-background/80">Informática na Prática LTDA</p>
    <p className="mt-1">© 2026 — Todos os direitos reservados • CNPJ: 32.373.460/0001-51</p>
    <div className="mt-2 flex justify-center gap-4"><a href="/termos-de-uso">Termos de Uso</a><a href="/politica-de-privacidade">Privacidade</a></div>
  </footer>
);

const StickyCTA = () => (
  <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-2.5 shadow-card md:hidden">
    <Button type="button" onClick={requestCheckout} className="h-auto w-full rounded-xl bg-success py-3.5 text-base font-black text-success-foreground hover:bg-success/90"><Monitor className="h-5 w-5" /> Quero começar meu curso</Button>
  </div>
);

const HomeConfianca = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    document.title = "Aprenda Informática sem Medo | Profª Elisa";
    const openDialog = () => setCheckoutOpen(true);
    window.addEventListener(CHECKOUT_MODAL_EVENT, openDialog);
    return () => window.removeEventListener(CHECKOUT_MODAL_EVENT, openDialog);
  }, []);

  return (
    <div className="confidence-home min-h-screen bg-background font-body text-foreground">
      <Header />
      <main>
        <Hero />
        <Possibilities />
        <CourseIntroduction />
        <VideoLibrary />
        <SocialProof />
        <CourseSummary />
        <Offer />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
      <CourseEnrollmentDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
};

export default HomeConfianca;