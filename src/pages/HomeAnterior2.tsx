import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BookOpen, Check, FileText, Headphones, Infinity, LockKeyhole, Mail, MessageCircle, Monitor, Play, RotateCcw, ShieldCheck, Star, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { openHotmartCheckout } from "@/versoes/v2909/lib/checkoutTracking";
import logo from "@/versoes/v2909/assets/logo-blue.png";
import elisa from "@/versoes/v2909/assets/elisa-photo.jpg";
import testimonial1 from "@/versoes/v2909/assets/whatsapp-testimonial-1.png";
import testimonial2 from "@/versoes/v2909/assets/whatsapp-testimonial-2.png";
import avatar1 from "@/versoes/v2909/assets/testimonial-new-1.jpg";
import avatar2 from "@/versoes/v2909/assets/testimonial-new-2.jpg";
import avatar3 from "@/versoes/v2909/assets/testimonial-new-3.jpg";
import avatar4 from "@/versoes/v2909/assets/testimonial-new-4.jpg";
import avatar5 from "@/versoes/v2909/assets/testimonial-new-5.jpg";

const whatsappLink = `https://api.whatsapp.com/send?phone=5545988287082&text=${encodeURIComponent("Olá, professora Elisa! Vi no site as informações do curso, mas ainda tenho dúvidas. Pode me ajudar?")}`;
const reasons = [
  { icon: BookOpen, title: "Começa do zero", text: "Você não precisa saber antes. As aulas começam pelos primeiros passos no computador." },
  { icon: Monitor, title: "Cada clique é explicado", text: "A professora mostra na tela, com palavras simples. Você acompanha e faz junto." },
  { icon: RotateCcw, title: "Sem pressa para aprender", text: "Pause, volte e repita quantas vezes precisar. Seu acesso às aulas é vitalício." },
  { icon: Headphones, title: "Ajuda quando precisar", text: "Surgiu uma dúvida? Conte com o suporte pelo WhatsApp para seguir aprendendo." },
];
const results = [
  { icon: FileText, title: "Fazer seus documentos", text: "Criar um currículo, escrever no Word e salvar sem se perder." },
  { icon: Table2, title: "Organizar suas contas", text: "Montar planilhas no Excel para os gastos de casa ou do trabalho." },
  { icon: Mail, title: "Usar internet e e-mail", text: "Pesquisar, enviar arquivos e reconhecer cuidados importantes." },
];
const questions = [
  ["Mesmo começando do zero, posso aprender?", "Sim. O curso foi feito para quem está começando. Você vê cada passo na tela, repete no seu computador e avança com a prática, no seu ritmo."],
  ["Preciso acompanhar em um horário marcado?", "Não. As aulas são online e gravadas. Você assiste no seu computador no horário que preferir e pode pausar e repetir."],
  ["E se eu esquecer o que aprendi?", "Seu acesso é vitalício. Você pode voltar à aula sempre que precisar, sem prazo para terminar."],
  ["Como recebo meu acesso?", "Depois da confirmação do pagamento, você recebe por e-mail as informações para entrar na área de aulas."],
  ["Como funciona a garantia de 7 dias?", "Você compra o curso e tem 7 dias após a compra para conhecer as aulas. Se não for para você, peça o reembolso integral pela Hotmart dentro desse prazo."],
];

function trackWhatsApp() {
  if (!["informaticanapratica.com.br", "www.informaticanapratica.com.br"].includes(window.location.hostname)) return;
  const trackedWindow = window as Window & { gtag?: (...args: unknown[]) => void };
  trackedWindow.gtag?.("event", "conversion", { send_to: "AW-17641842157/-qUVCOSN474bEO3LpNxB", value: 20, currency: "BRL" });
}

function PurchaseButton({ children, fixed = false }: { children: React.ReactNode; fixed?: boolean }) {
  return <Button type="button" onClick={() => openHotmartCheckout()} className={`h-auto w-full rounded-xl bg-success px-3 py-4 font-extrabold text-success-foreground shadow-cta hover:bg-success/90 ${fixed ? "gap-2 whitespace-nowrap text-xl leading-tight" : "whitespace-normal text-lg md:text-xl"}`}>
    {fixed && <Monitor className="h-6 w-6 shrink-0" aria-hidden="true" />}{children}
  </Button>;
}

function Video({ lesson = false }: { lesson?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return <div className="relative aspect-video overflow-hidden bg-panel">
    {playing ? <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${lesson ? "_0OPLnEiMHk" : "0kFjFZX5c9I"}?autoplay=1&rel=0&playsinline=1`} title={lesson ? "Aula demonstrativa da professora Elisa" : "Recado da professora Elisa"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <>
      <img src={lesson ? "/images/capa-segunda-aula.jpg" : "/images/capa-primeiro-video-aprender.jpg"} alt={lesson ? "Professora Elisa ensinando informática passo a passo" : "Professora Elisa apresentando o curso de informática"} className="h-full w-full object-cover" loading={lesson ? "lazy" : "eager"} fetchPriority={lesson ? "auto" : "high"} />
      <Button type="button" onClick={() => setPlaying(true)} aria-label={lesson ? "Assistir à primeira aula" : "Assista o recado da prof"} className={`absolute bottom-4 left-4 h-auto max-w-[80%] gap-2 rounded-full px-3 py-2.5 text-xs font-bold sm:text-sm ${lesson ? "bg-background text-foreground hover:bg-panel" : "badge-pill badge-breathe text-[hsl(var(--badge-hot-foreground))]"}`}>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${lesson ? "bg-primary text-primary-foreground" : "badge-halo bg-[hsl(var(--badge-hot-foreground))] text-[hsl(var(--badge-hot))]"}`}><Play className="h-4 w-4 fill-current" aria-hidden="true" /></span>
        {lesson ? "Assistir à primeira aula" : "Assista o recado da prof"}
      </Button>
    </>}
  </div>;
}

export default function HomeAnterior2() {
  return <div className="remarketing-confidence min-h-screen bg-background pb-24 text-foreground md:pb-0">
    <Helmet>
      <title>Informática do Zero com Confiança | Professora Elisa</title>
      <meta name="description" content="Aprenda a usar o computador do zero, com explicações simples da professora Elisa. Aulas no seu ritmo, acesso vitalício e garantia de 7 dias." />
      <meta property="og:title" content="Informática do Zero com Confiança | Professora Elisa" />
      <meta property="og:description" content="Cada clique explicado com calma. Conheça o curso completo, aprenda no seu ritmo e comece com 7 dias de garantia." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 md:px-6">
        <img src={logo} alt="Informática na Prática" className="h-10 w-auto md:h-12" />
        <p className="text-right text-xs leading-relaxed text-muted-foreground">Com a professora Elisa<br /><strong className="text-foreground">Do zero. No seu ritmo.</strong></p>
      </div>
    </header>
    <main>
      <section className="px-4 pb-6 pt-5 text-center md:pb-8 md:pt-7">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-hero text-3xl leading-tight md:text-5xl">Aprenda informática.<br /><span className="text-primary">Ganhe confiança para fazer sozinho.</span></h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Você não precisa chegar sabendo. Eu ensino <strong className="text-foreground">do zero, com calma e palavras simples</strong>, para você usar o computador no dia a dia.</p>
          <div className="-mx-4 mt-5 text-left md:mx-auto md:max-w-3xl md:overflow-hidden md:rounded-lg"><Video /></div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground md:text-sm">
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-primary" />Tudo desde o começo</span>
            <span className="flex items-center gap-1.5"><Infinity className="h-4 w-4 text-primary" />Acesso vitalício</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" />Garantia de 7 dias</span>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">Se a sua dúvida era “será que eu consigo?”, conheça o jeito de aprender que foi pensado para quem está começando.</p>
        </div>
      </section>

      <section className="border-y border-border bg-panel py-6 md:py-9">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-extrabold md:text-4xl">Você pode aprender.<br /><span className="text-primary">E não precisa fazer isso sozinho.</span></h2>
          <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-3"><Icon className="mt-0.5 h-7 w-7 shrink-0 text-primary" aria-hidden="true" /><div><h3 className="text-base font-bold md:text-lg">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{text}</p></div></div>)}
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <h2 className="text-center text-xl font-extrabold md:text-2xl">O resultado aparece nas tarefas do seu dia</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {results.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-lg border border-border bg-background p-4"><Icon className="h-6 w-6 text-primary" /><h3 className="mt-3 font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Uma tarefa de cada vez. Com prática, você vai construindo sua independência.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 text-center md:py-9">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">{[avatar1, avatar2, avatar3, avatar4, avatar5].map(avatar => <img key={avatar} src={avatar} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" loading="lazy" />)}</div>
            <div className="text-left"><div className="flex" aria-label="Cinco estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}</div><p className="mt-1 text-xs font-semibold text-muted-foreground">+15.000 alunos já aprenderam</p></div>
          </div>
          <h2 className="font-hero text-2xl md:text-4xl">Veja como é aprender com calma</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">Nesta aula, você vê a explicação na tela. É assim que o curso ajuda você a acompanhar cada passo.</p>
          <div className="-mx-4 mt-4 text-left md:mx-0 md:overflow-hidden md:rounded-lg"><Video lesson /></div>
          <p className="mt-4 text-base font-bold">Você assiste, faz junto e repete quando precisar.</p>
        </div>
      </section>

      <section className="remarketing-light bg-background py-6 text-foreground md:py-9">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-extrabold md:text-4xl">Quem começou também tinha dúvidas</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground md:text-base">Veja as mensagens de alunos sobre as aulas.</p>
          <div className="mx-auto mt-5 grid max-w-2xl gap-4 sm:grid-cols-2">{[testimonial1, testimonial2].map((image, i) => <img key={image} src={image} alt={`Mensagem de aluno sobre as aulas da professora Elisa — ${i + 1}`} className="h-auto w-full rounded-lg border border-border" loading="lazy" />)}</div>
          <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center"><p className="shrink-0 text-sm font-bold">Ouça o aluno Vanderlei</p><audio aria-label="Depoimento do aluno Vanderlei" controls preload="none" src="/audio/vanderlei.ogg" className="h-10 w-full min-w-0" /></div>
        </div>
      </section>

      <section id="oferta" className="scroll-mt-4 border-b border-border py-7 md:py-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center"><p className="text-sm font-bold text-primary">Curso completo de Informática na Prática</p><h2 className="mt-2 text-2xl font-extrabold md:text-4xl">Não é só assistir a aulas.<br />É aprender a fazer por conta própria.</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">Um caminho desde o básico, com a professora Elisa, para você praticar e usar o computador com mais segurança.</p></div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start md:gap-10">
            <div>
              <h3 className="text-lg font-bold">Tudo isso está no seu curso</h3>
              <ul className="mt-4 space-y-3">{[
                ["Mais de 90 aulas práticas", "Computador, Windows, Word, Excel, PowerPoint, internet, e-mail e digitação."],
                ["Explicação simples, passo a passo", "Para começar do zero e fazer junto no seu computador."],
                ["Acesso vitalício", "Sem mensalidade. Volte às aulas sempre que precisar."],
                ["Suporte pelo WhatsApp", "Para tirar dúvidas e seguir praticando com apoio."],
                ["Certificado de conclusão", "Para registrar o que você aprendeu."],
              ].map(([title, text]) => <li key={title} className="flex gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" /><div><p className="font-bold">{title}</p><p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{text}</p></div></li>)}</ul>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">Você não precisa dominar tudo hoje. Só precisa começar pelo primeiro passo — e ter um caminho para continuar.</p>
            </div>
            <div className="border-t border-border pt-5 text-center md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="text-sm text-muted-foreground">De <span className="line-through">R$ 497,00</span> por</p>
              <p className="mt-2 text-5xl font-extrabold md:text-6xl">R$ 297<span className="text-2xl">,00</span></p>
              <p className="mt-2 text-sm text-muted-foreground">à vista ou em até <strong className="text-foreground">12x de R$ 30,72</strong> no cartão</p>
              <p className="mt-3 text-sm font-semibold text-primary">Uma compra. Acesso para a vida toda.</p>
              <div className="mt-5"><PurchaseButton>Quero aprender com a professora Elisa</PurchaseButton></div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole className="h-4 w-4 text-primary" />Pagamento seguro pela Hotmart</p>
              <div className="mt-5 flex items-start gap-3 border-t border-border pt-5 text-left"><ShieldCheck className="h-8 w-8 shrink-0 text-success" /><div><h3 className="font-bold">7 dias para conhecer o curso com tranquilidade</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Após a compra, assista às aulas. Se o curso não for para você, peça seu dinheiro de volta pela Hotmart em até 7 dias.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-panel py-6 md:py-9">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-extrabold md:text-3xl">Comece com suas dúvidas esclarecidas</h2>
          <Accordion type="single" collapsible className="mt-4">{questions.map(([question, answer], i) => <AccordionItem key={question} value={`question-${i}`}><AccordionTrigger className="text-left text-sm font-bold hover:no-underline md:text-base">{question}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion>
          <div className="mt-6 flex flex-col items-center gap-4 border-t border-border pt-5 text-center sm:flex-row sm:text-left"><img src={elisa} alt="Professora Elisa" className="h-24 w-24 shrink-0 rounded-full object-cover object-top" loading="lazy" /><div><h3 className="text-xl font-bold">“Eu ensino com calma. Você aprende no seu ritmo.”</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Ficou com alguma dúvida sobre o curso? Fale com a professora Elisa antes de decidir.</p><Button asChild variant="link" className="mt-1 h-auto whitespace-normal px-0 text-primary"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}>Conversar pelo WhatsApp</a></Button></div></div>
          <div className="mx-auto mt-6 max-w-xl text-center"><PurchaseButton>Quero começar do zero, no meu ritmo</PurchaseButton><p className="mt-3 text-xs text-muted-foreground">Acesso vitalício · Suporte pelo WhatsApp · 7 dias de garantia</p></div>
        </div>
      </section>
    </main>
    <footer className="px-4 py-5 text-center text-xs leading-relaxed text-muted-foreground"><p>Informática na Prática LTDA</p><p className="mx-auto mt-2 max-w-2xl">Seu aprendizado depende da prática, da dedicação e do seu ponto de partida. Cada pessoa tem seu ritmo.</p><div className="mt-3 flex justify-center gap-4"><Link to="/termos-de-uso">Termos de uso</Link><Link to="/politica-de-privacidade">Privacidade</Link></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-lg md:hidden"><PurchaseButton fixed>Quero começar meu curso</PurchaseButton></div>
    <Button asChild className="fixed bottom-28 right-4 z-40 h-12 rounded-full bg-success px-4 text-success-foreground shadow-cta hover:bg-success/90 md:bottom-6"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp} aria-label="Tire suas dúvidas no WhatsApp"><MessageCircle className="h-6 w-6" /><span className="hidden sm:inline">Tire suas dúvidas</span></a></Button>
  </div>;
}
