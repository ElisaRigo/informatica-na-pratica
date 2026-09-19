import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Headphones,
  Infinity as InfinityIcon,
  Keyboard,
  Lock,
  Mail,
  Monitor,
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
import logo from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import homeVideoThumb from "@/assets/hero-video-cover-home.jpg";
import lessonVideoThumb from "@/assets/aprenda-comigo-thumb.jpg";
import whatsappTestimonial1 from "@/assets/whatsapp-testimonial-1.png";
import whatsappTestimonial2 from "@/assets/whatsapp-testimonial-2.png";
import avatar1 from "@/assets/testimonial-new-1.jpg";
import avatar2 from "@/assets/testimonial-new-2.jpg";
import avatar3 from "@/assets/testimonial-new-3.jpg";
import avatar4 from "@/assets/testimonial-new-4.jpg";
import avatar5 from "@/assets/testimonial-new-5.jpg";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

const studentAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

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
      <img src={logo} alt="Informática na Prática" className="h-14 md:h-16" />
      <p className="max-w-md text-base font-black leading-tight text-foreground md:text-xl">
        Curso de <span className="text-primary">Informática Online</span> — simples e passo a passo
      </p>
    </div>
  </header>
);

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background">
      <div className="bg-primary px-3 py-3">
        <div className="container mx-auto flex max-w-3xl items-center justify-center gap-3 md:gap-4">
          <img
            src={elisa}
            alt="Professora Elisa"
            className="h-16 w-16 shrink-0 rounded-full border-2 border-white/70 object-cover object-[center_20%] md:h-20 md:w-20"
          />
          <div className="text-left text-primary-foreground">
            <p className="text-base font-black leading-tight md:text-2xl">“Vou te ensinar a usar o computador de uma vez por todas!”</p>
            <p className="mt-0.5 text-sm font-semibold opacity-90 md:text-lg">— Profª Elisa</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl px-4 py-5 md:py-8">
        <div className="text-center">
          <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight text-foreground md:text-5xl">
            Ainda tem dúvida se vai conseguir? <span className="text-primary">Deixa comigo: eu te mostro cada passo.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Eu vou te ensinar cada clique com calma. Você aprende Word, Excel, arquivos, internet e e-mail sem depender de ninguém.
          </p>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-black text-success md:text-base">
              <CheckCircle2 className="h-5 w-5 shrink-0" /> Sua condição de 40% OFF + 4 bônus exclusivos ainda está disponível
            </span>
          </div>
        </div>

        <div className="mt-5 grid items-center gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <div className="overflow-hidden rounded-xl border border-border bg-panel shadow-card">
            {!isPlaying ? (
              <Button
                type="button"
                variant="ghost"
                aria-label="Assistir apresentação do curso"
                onClick={() => setIsPlaying(true)}
                className="group relative block h-auto w-full rounded-none p-0"
              >
                <img src={homeVideoThumb} alt="Professora Elisa apresentando o curso" className="aspect-video w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-card transition-transform group-hover:scale-105 md:h-20 md:w-20">
                    <PlayCircle className="h-11 w-11 text-primary md:h-14 md:w-14" />
                  </span>
                </span>
              </Button>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1"
                  title="Apresentação do curso"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-panel p-4 text-center shadow-card md:p-5">
            <p className="font-bold text-muted-foreground">Curso completo + 4 bônus</p>
            <p className="mt-2 text-sm text-muted-foreground">De <span className="line-through">R$ 497</span> por</p>
            <p className="text-5xl font-black leading-none text-success">R$ 297</p>
            <p className="mt-2 font-black text-warning">Hoje você leva 4 bônus exclusivos</p>
            <p className="mt-1 text-sm font-semibold text-foreground">Mais de 90 aulas • acesso vitalício</p>
            <div className="mt-4"><CTA>Sim, quero começar meu curso</CTA></div>
            <TrustRow />
          </div>
        </div>

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
          <span className="text-sm font-black uppercase text-primary">Talvez seja isso que faltava saber</span>
          <h2 className="mt-2 text-2xl font-black text-foreground md:text-4xl">O que está impedindo você de começar?</h2>
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

const SocialProof = () => (
  <section className="bg-background py-6 md:py-9">
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

const TeacherAndLesson = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background py-6 md:py-9">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid items-center gap-5 md:grid-cols-[.75fr_1.25fr]">
          <div className="text-center md:text-left">
            <img src={elisa} alt="Professora Elisa" className="mx-auto aspect-[4/5] max-h-72 rounded-xl object-cover object-top shadow-card md:mx-0" />
            <h2 className="mt-3 text-2xl font-black text-foreground">Professora Elisa</h2>
            <p className="mt-1 font-bold text-primary">Há mais de 20 anos ensinando informática</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">“Eu vou explicar com calma, sem palavras difíceis e sem julgamento. Você não estará sozinho.”</p>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-warning/15 px-3 py-1.5 text-xs font-black text-warning"><PlayCircle className="h-4 w-4" /> VEJA COMO ELA ENSINA</span>
            <h2 className="mt-2 text-2xl font-black text-foreground md:text-3xl">Assista a uma aula minha antes de decidir</h2>
            <p className="mt-2 text-muted-foreground">Veja como eu ensino: com calma, passo a passo e sem palavras difíceis.</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border shadow-card">
              {!isPlaying ? (
                <Button type="button" variant="ghost" onClick={() => setIsPlaying(true)} className="group relative block h-auto w-full rounded-none p-0" aria-label="Assistir aula real">
                  <img src={lessonVideoThumb} alt="Aula real com a Professora Elisa" className="aspect-video w-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 flex items-center justify-center"><PlayCircle className="h-16 w-16 text-primary transition-transform group-hover:scale-105" /></span>
                </Button>
              ) : (
                <div className="aspect-video">
                  <iframe src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&autoplay=1" title="Aula real da Professora Elisa" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
          <p className="mt-1 text-muted-foreground">ou em até 12x de R$ 30,72 no cartão</p>
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
    document.title = "Sua Condição Especial • Curso de Informática Online";
    const openDialog = () => setCheckoutOpen(true);
    window.addEventListener(CHECKOUT_MODAL_EVENT, openDialog);
    return () => window.removeEventListener(CHECKOUT_MODAL_EVENT, openDialog);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground md:pb-0">
      <Header />
      <Hero />
      <Objections />
      <SocialProof />
      <CourseContent />
      <TeacherAndLesson />
      <section className="bg-muted px-4 py-6 md:py-9"><HeroBonuses variant="light" /></section>
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
