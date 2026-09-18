import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  FileCheck2,
  Headphones,
  HelpCircle,
  Infinity as InfinityIcon,
  Instagram,
  Facebook,
  LockKeyhole,
  MessageCircle,
  Monitor,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckoutModalLight, preloadCheckoutModalImage } from "@/components/CheckoutModalLight";
import logo from "@/assets/logo-blue.png";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import whatsappTestimonial from "@/assets/whatsapp-testimonial-2.png";
import testimonialPhoto from "@/assets/testimonial-new-1.jpg";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1%20Professora!%20Ainda%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20inform%C3%A1tica";

const courseItems = [
  { icon: windowsIcon, label: "Computador e Windows" },
  { icon: wordIcon, label: "Word e currículo" },
  { icon: excelIcon, label: "Excel na prática" },
  { icon: powerpointIcon, label: "PowerPoint" },
  { icon: internetIcon, label: "Internet e e-mail" },
  { icon: typingIcon, label: "Digitação" },
];

const faqs = [
  {
    question: "E se eu estiver começando do zero?",
    answer: "Este curso foi feito para você. A professora mostra cada passo com calma, desde os primeiros cliques no computador.",
  },
  {
    question: "Por quanto tempo terei acesso?",
    answer: "O acesso é vitalício. Você pode assistir às aulas no seu ritmo e voltar quantas vezes precisar.",
  },
  {
    question: "Quem me ajuda se eu tiver dúvida?",
    answer: "Você terá suporte humanizado pelo WhatsApp para perguntar e receber ajuda durante seus estudos.",
  },
  {
    question: "Como funciona a garantia?",
    answer: "Você tem 7 dias para conhecer o curso. Se não gostar, pode pedir o reembolso e receber 100% do valor pago.",
  },
];

const Informatica = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    preloadCheckoutModalImage();
  }, []);

  const openModal = () => setModalOpen(true);

  return (
    <div className="dark min-h-screen bg-background text-foreground pb-24 md:pb-28">
      <header className="border-b border-border bg-background/95">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <img src={logo} alt="Informática na Prática" className="h-12 w-12 object-contain md:h-14 md:w-14" width="56" height="56" />
          <div className="text-right">
            <p className="font-black text-sm md:text-base">Curso de Informática</p>
            <p className="text-xs text-muted-foreground">Online, com suporte</p>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-border bg-background">
          <div className="container mx-auto grid max-w-6xl items-center gap-7 px-4 py-7 md:grid-cols-[1.2fr_.8fr] md:py-12">
            <div className="text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-bold text-primary md:text-sm">
                <Monitor className="h-4 w-4" /> Uma mensagem para quem ainda está pensando
              </div>
              <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
                Ainda está pensando se consegue aprender informática?
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-muted-foreground md:mx-0 md:text-2xl">
                Você consegue. E não precisa aprender sozinho(a).
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 text-left sm:grid-cols-4">
                {[
                  [PlayCircle, "+90 aulas"],
                  [Headphones, "Suporte"],
                  [InfinityIcon, "Vitalício"],
                  [ShieldCheck, "7 dias de garantia"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex min-h-16 items-center gap-2 rounded-lg border border-border bg-card p-3">
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-xs font-bold leading-tight md:text-sm">{label as string}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 md:items-start">
                <div>
                  <p className="text-sm text-muted-foreground">De <span className="line-through">R$ 497,00</span> por</p>
                  <p className="text-4xl font-black text-success">R$ 297</p>
                  <p className="text-sm font-semibold text-muted-foreground">ou até 12x de R$ 30,72</p>
                </div>
                <Button onClick={openModal} className="h-auto w-full rounded-xl bg-success px-7 py-4 text-base font-black text-success-foreground shadow-cta hover:bg-success/90 sm:w-auto md:text-lg">
                  QUERO COMEÇAR AGORA
                </Button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <LockKeyhole className="h-4 w-4 text-primary" /> Pagamento seguro pela Hotmart
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                <img src={elisaPhoto} alt="Professora Elisa" className="aspect-[4/5] w-full object-cover" fetchPriority="high" />
                <div className="border-t border-border p-4 text-center">
                  <p className="font-black">Professora Elisa</p>
                  <p className="text-sm text-muted-foreground">Mais de 20 anos ensinando informática</p>
                </div>
              </div>
              <div className="absolute -bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-lg border border-success/40 bg-card px-3 py-2 shadow-card">
                <Users className="h-5 w-5 text-success" />
                <span className="text-sm font-black">+15.000 alunos já aprenderam</span>
              </div>
            </div>
          </div>
        </section>

        <nav aria-label="Escolha sua principal dúvida" className="border-b border-border bg-card">
          <div className="container mx-auto max-w-5xl px-4 py-7">
            <p className="mb-4 text-center text-xl font-black md:text-2xl">O que ainda está impedindo você?</p>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["#consigo-aprender", HelpCircle, "Tenho medo de não conseguir"],
                ["#como-funciona", BookOpen, "Ainda tenho dúvida sobre o curso"],
                ["#investimento", CreditCard, "Quero saber se vale o investimento"],
              ].map(([href, Icon, label]) => (
                <a key={href as string} href={href as string} className="group flex min-h-20 items-center justify-between gap-3 rounded-lg border border-border bg-background p-4 font-bold transition-colors hover:border-primary/50 hover:bg-primary/5">
                  <span className="flex items-center gap-3">
                    <Icon className="h-6 w-6 shrink-0 text-primary" />
                    <span>{label as string}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section id="consigo-aprender" className="scroll-mt-4 border-b border-border bg-background">
          <div className="container mx-auto max-w-5xl px-4 py-9 md:py-12">
            <div className="text-center">
              <span className="text-sm font-bold text-primary">SEU MEDO TEM SOLUÇÃO</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Você não precisa saber nada para começar</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">A professora mostra a tela, explica cada clique e repete o que for necessário. Você assiste no seu ritmo.</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
              <article className="rounded-lg border border-border bg-card p-5">
                <div className="mb-4 flex items-center gap-3">
                  <img src={testimonialPhoto} alt="Aluna do curso" className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-black">Maria Helena, 58 anos</p>
                    <div className="flex" aria-label="5 estrelas">
                      {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-4 w-4 fill-warning text-warning" />)}
                    </div>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-relaxed">“Achei que era tarde demais. Hoje faço tudo sozinha no computador.”</p>
              </article>

              <article className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <PlayCircle className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-black">Ouça quem também começou com dificuldade</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Vanderlei conta como superou o medo e começou a usar o computador.</p>
                <audio controls preload="metadata" className="h-12 w-full" aria-label="Depoimento do aluno Vanderlei">
                  <source src="/audio/vanderlei.ogg" type="audio/ogg" />
                </audio>
              </article>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-4 border-b border-border bg-card">
          <div className="container mx-auto max-w-6xl px-4 py-9 md:py-12">
            <div className="text-center">
              <span className="text-sm font-bold text-primary">UM RESUMO RÁPIDO</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Tudo o que você precisa para aprender</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Aulas simples para ganhar confiança no computador, melhorar no trabalho e parar de depender dos outros.</p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3">
              {courseItems.map((item) => (
                <div key={item.label} className="flex min-h-24 items-center gap-3 rounded-lg border border-border bg-background p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <img src={item.icon} alt="" className="h-8 w-8 object-contain" loading="lazy" />
                  </div>
                  <p className="text-sm font-black md:text-base">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Award, "Certificado de conclusão"],
                [Headphones, "Suporte humanizado"],
                [InfinityIcon, "Acesso vitalício"],
                [Sparkles, "4 bônus inclusos"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <Icon className="h-6 w-6 shrink-0 text-primary" />
                  <span className="font-bold">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="container mx-auto grid max-w-5xl items-center gap-6 px-4 py-9 md:grid-cols-[.85fr_1.15fr] md:py-12">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card p-2 shadow-card">
              <img src={whatsappTestimonial} alt="Mensagem real de aluno sobre o curso" className="w-full rounded-md" loading="lazy" />
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-6 w-6" />
                <span className="text-sm font-black">RESULTADO DE QUEM COMEÇOU DO ZERO</span>
              </div>
              <h2 className="text-3xl font-black md:text-4xl">Não é sobre aprender rápido. É sobre finalmente aprender.</h2>
              <p className="mt-4 text-lg text-muted-foreground">Você pode pausar, voltar e assistir de novo. O importante é avançar com segurança, um passo de cada vez.</p>
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <Users className="h-8 w-8 shrink-0 text-success" />
                <div>
                  <p className="text-xl font-black">+15.000 alunos</p>
                  <p className="text-sm text-muted-foreground">Pessoas reais que decidiram começar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid max-w-5xl items-center gap-7 px-4 py-9 md:grid-cols-[.7fr_1.3fr] md:py-12">
            <img src={elisaPhoto} alt="Professora Elisa" className="mx-auto aspect-square w-full max-w-xs rounded-lg border border-border object-cover object-top" loading="lazy" />
            <div>
              <span className="text-sm font-bold text-primary">UM RECADO DA PROFª ELISA</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">“Comece sem medo. Eu vou ensinar você passo a passo.”</h2>
              <p className="mt-4 text-muted-foreground">Há mais de 20 anos ensino informática para pessoas que achavam que não conseguiriam. Você não precisa ter prática. Precisa apenas dar o primeiro passo.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-background p-4 text-center">
                  <p className="text-2xl font-black text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">anos ensinando</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4 text-center">
                  <p className="text-2xl font-black text-primary">90+</p>
                  <p className="text-sm text-muted-foreground">aulas práticas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="investimento" className="scroll-mt-4 border-b border-border bg-background">
          <div className="container mx-auto max-w-5xl px-4 py-9 md:py-12">
            <div className="text-center">
              <span className="text-sm font-bold text-primary">SEU ACESSO COMPLETO</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Tudo o que você recebe por R$ 297</h2>
            </div>

            <div className="mt-7 grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-[1.15fr_.85fr]">
              <div className="p-5 md:p-7">
                <div className="space-y-3">
                  {[
                    "+90 aulas passo a passo",
                    "Windows, Word, Excel, PowerPoint, internet e digitação",
                    "4 bônus para o trabalho e o dia a dia",
                    "Suporte humanizado pelo WhatsApp",
                    "Acesso vitalício e certificado",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    [BriefcaseBusiness, "Mercado de Trabalho"],
                    [Clock3, "Atalhos Essenciais"],
                    [FileCheck2, "Currículo Profissional"],
                    [BookOpen, "E-mail Profissional"],
                  ].map(([Icon, label]) => (
                    <div key={label as string} className="flex min-h-20 flex-col items-center justify-center rounded-lg border border-border bg-background p-3 text-center">
                      <Icon className="mb-2 h-5 w-5 text-primary" />
                      <span className="text-xs font-bold md:text-sm">{label as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center border-t border-border bg-primary/5 p-5 text-center md:border-l md:border-t-0 md:p-7">
                <p className="text-sm text-muted-foreground">De <span className="line-through">R$ 497,00</span> por apenas</p>
                <p className="my-2 text-5xl font-black text-success">R$ 297</p>
                <p className="font-bold text-muted-foreground">ou até 12x de R$ 30,72</p>
                <Button onClick={openModal} className="mt-5 h-auto w-full rounded-xl bg-success px-6 py-4 text-base font-black text-success-foreground shadow-cta hover:bg-success/90">
                  QUERO ACESSAR O CURSO
                </Button>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <LockKeyhole className="h-4 w-4 text-primary" /> Pagamento pela Hotmart
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 rounded-lg border-2 border-success/40 bg-success/10 p-5 text-center sm:flex-row sm:text-left">
              <ShieldCheck className="h-12 w-12 shrink-0 text-success" />
              <div>
                <p className="text-xl font-black">7 dias de garantia incondicional</p>
                <p className="text-muted-foreground">Conheça o curso sem medo. Se não gostar, você recebe 100% do valor pago.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container mx-auto max-w-3xl px-4 py-9 md:py-12">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-primary"><HelpCircle className="h-4 w-4" /> ÚLTIMAS DÚVIDAS</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">O que você precisa saber antes de começar</h2>
            </div>
            <Accordion type="single" collapsible className="mt-6 space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-lg border border-border bg-background px-5">
                  <AccordionTrigger className="text-left font-bold hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-6 text-center">
              <p className="mb-3 text-sm text-muted-foreground">Ainda quer falar com alguém antes de decidir?</p>
              <Button asChild variant="outline" className="h-auto rounded-xl px-6 py-3 font-bold">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 text-success" /> Falar com a Professora Elisa
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="container mx-auto max-w-4xl px-4 py-10 text-center md:py-14">
            <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-3xl font-black md:text-5xl">Você não precisa continuar dependendo de outras pessoas para usar o computador.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">O próximo passo pode ser simples: começar a primeira aula e aprender no seu ritmo.</p>
            <Button onClick={openModal} className="mt-6 h-auto w-full rounded-xl bg-success px-8 py-4 text-base font-black text-success-foreground shadow-cta hover:bg-success/90 sm:w-auto md:text-lg">
              SIM, QUERO COMEÇAR
            </Button>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-success" /> Garantia de 7 dias</span>
              <span className="flex items-center gap-1"><InfinityIcon className="h-4 w-4 text-primary" /> Acesso vitalício</span>
              <span className="flex items-center gap-1"><Headphones className="h-4 w-4 text-primary" /> Suporte humanizado</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-7">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="mb-4 flex justify-center gap-6">
            <a href="https://www.instagram.com/informaticanapratica.oficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-primary"><Instagram className="h-5 w-5" /></a>
            <a href="https://www.facebook.com/informaticanapratica.oficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-primary"><Facebook className="h-5 w-5" /></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-success"><MessageCircle className="h-5 w-5" /></a>
          </div>
          <div className="mb-3 flex flex-wrap justify-center gap-4">
            <Link to="/termos-de-uso" className="hover:text-foreground">Termos de Uso</Link>
            <Link to="/politica-de-privacidade" className="hover:text-foreground">Política de Privacidade</Link>
          </div>
          <p className="font-semibold text-foreground">Informática na Prática LTDA</p>
          <p>CNPJ: 32.373.460/0001-51</p>
          <p className="mt-2">© {new Date().getFullYear()} Informática na Prática. Todos os direitos reservados.</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="hidden md:block">
            <p className="font-black">Curso completo por R$ 297</p>
            <p className="text-xs text-muted-foreground">Acesso vitalício e garantia de 7 dias</p>
          </div>
          <Button onClick={openModal} className="h-auto w-full rounded-xl bg-success px-8 py-3.5 text-base font-black text-success-foreground shadow-cta hover:bg-success/90 md:w-auto">
            QUERO COMEÇAR AGORA
          </Button>
        </div>
      </div>

      <CheckoutModalLight open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Informatica;
