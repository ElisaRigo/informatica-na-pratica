import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Check, Clock, Headphones, Infinity, LockKeyhole, Monitor, RotateCcw, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LessonPreview } from "@/components/confidence/LessonPreview";
import { openHotmartCheckout } from "@/versoes/v2909/lib/checkoutTracking";
import logo from "@/assets/logo-blue.png";
import elisa from "@/assets/elisa-photo.jpg";
import testimonial1 from "@/assets/whatsapp-testimonial-1.png";
import testimonial2 from "@/assets/whatsapp-testimonial-2.png";

const whatsappLink = `https://api.whatsapp.com/send?phone=5545988287082&text=${encodeURIComponent("Olá, professora Elisa! Vi no site as informações do curso, mas ainda tenho dúvidas. Pode me ajudar?")}`;
const reasons = [
  { icon: Monitor, title: "Você vê cada clique", text: "Eu mostro na tela e explico com calma. Você acompanha no seu computador." },
  { icon: BookOpen, title: "Começa pelo básico", text: "Você não precisa saber nada antes. A gente vai aprendendo passo a passo." },
  { icon: RotateCcw, title: "Pode repetir à vontade", text: "Pause, volte e assista de novo. O acesso é vitalício, sem pressa para terminar." },
  { icon: Headphones, title: "Tem alguém para ajudar", text: "Ficou com uma dúvida? Você pode contar com o suporte da professora Elisa." },
];
const questions = [
  { question: "Posso começar sem saber usar o computador?", answer: "Sim. As aulas começam pelo básico e mostram cada passo na tela." },
  { question: "As aulas são presenciais ou online?", answer: "São online e gravadas. Você assiste no seu computador, no horário que preferir." },
  { question: "Por quanto tempo posso assistir?", answer: "O acesso é vitalício. Você pode rever as aulas sempre que precisar." },
  { question: "E se o curso não for para mim?", answer: "Você tem 7 dias após a compra para pedir reembolso pela Hotmart." },
  { question: "O curso tem certificado?", answer: "Sim, certificado digital de conclusão. A emissão pode ser feita após concluir o curso e a partir de 15 dias da confirmação do pagamento." },
];

function trackWhatsApp() {
  if (window.location.hostname !== "informaticanapratica.com.br") return;
  const trackedWindow = window as Window & { gtag?: (...args: unknown[]) => void };
  trackedWindow.gtag?.("event", "conversion", { send_to: "AW-17641842157/-qUVCOSN474bEO3LpNxB", value: 20, currency: "BRL" });
}

function EnrollButton() {
  return <Button onClick={() => openHotmartCheckout()} className="h-auto w-full whitespace-normal rounded-xl bg-success px-6 py-4 text-lg font-extrabold text-success-foreground hover:bg-success/90 sm:w-auto sm:min-w-80">Quero começar o curso</Button>;
}

export default function NovaVersao() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Curso de Informática Online | Você também consegue aprender";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="confidence-page min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <img src={logo} alt="Informática na Prática" className="h-12 w-auto md:h-14" />
          <span className="text-right text-xs font-medium text-muted-foreground md:text-sm">Com a professora Elisa<br /><span className="text-foreground">Simples e para todos.</span></span>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-4 pb-7 pt-6 text-center md:px-6 md:pb-10 md:pt-8">
          <p className="mb-3 text-sm font-semibold text-primary">Do primeiro clique à sua independência</p>
          <h1 className="text-3xl font-black leading-tight md:text-5xl">Curso de Informática Online</h1>
          <p className="mt-3 text-xl font-bold text-primary md:text-3xl">Você também consegue aprender.</p>
          <p className="mx-auto mb-5 mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">Mesmo começando do zero. Eu mostro cada clique com calma, e você aprende no seu ritmo.</p>
          <div className="mx-auto max-w-2xl text-left">
            <div className="mb-2 flex items-center justify-between gap-2 text-xs md:text-sm">
              <span className="font-bold">Uma aula para você experimentar</span>
              <span className="text-primary">Grátis</span>
            </div>
            <LessonPreview />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground md:text-sm">
            <span className="flex items-center gap-1.5"><Infinity className="h-4 w-4 text-primary" />Acesso vitalício</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" />Garantia de 7 dias</span>
          </div>
        </section>

        <section className="border-y border-border bg-panel py-7 md:py-10">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <h2 className="text-center text-2xl font-black md:text-4xl">Por que você vai conseguir aprender</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground md:text-base">Você não precisa aprender tudo de uma vez.</p>
            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div><h3 className="text-base font-bold md:text-lg">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-border pt-5 text-center">
              <p className="text-sm font-bold">O que você vai aprender</p>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Computador e Windows · Internet e e-mail · Word · Excel · PowerPoint · Digitação</p>
            </div>
          </div>
        </section>

        <section className="confidence-light bg-background py-7 text-foreground md:py-10">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-center text-2xl font-black md:text-4xl">Veja o que os alunos contam</h2>
            <div className="mx-auto mt-5 grid max-w-2xl gap-4 sm:grid-cols-2">
              {[testimonial1, testimonial2].map((image, index) => <img key={image} src={image} alt={`Mensagem de aluno sobre o curso — ${index + 1}`} loading="lazy" className="h-auto w-full rounded-lg border border-border" />)}
            </div>
            <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:gap-5">
              <p className="shrink-0 text-sm font-bold">Ouça o aluno Vanderlei</p>
              <audio aria-label="Depoimento do aluno Vanderlei" controls preload="none" className="h-10 w-full min-w-0"><source src="/audio/vanderlei.ogg" type="audio/ogg" /></audio>
            </div>
          </div>
        </section>

        <section id="oferta" className="border-b border-border py-7 md:py-10">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-black md:text-4xl">Seu próximo passo começa aqui</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">Curso completo, com aulas gravadas e suporte para suas dúvidas.</p>
            <div className="my-5">
              <p className="text-sm text-muted-foreground">De <span className="line-through">R$ 497</span> por</p>
              <p className="mt-1 text-5xl font-black">R$ 297<span className="text-xl">,00</span></p>
              <p className="mt-2 text-sm text-muted-foreground">À vista ou em até 12x no cartão</p>
            </div>
            <div className="mb-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              {["Acesso vitalício", "Suporte da professora", "Certificado de conclusão"].map(item => <span key={item} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" />{item}</span>)}
            </div>
            <EnrollButton />
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5 text-primary" />Pagamento seguro pela Hotmart</p>
            <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 border-t border-border pt-5 text-left">
              <ShieldCheck className="h-7 w-7 shrink-0 text-primary" />
              <div><h3 className="text-sm font-bold">7 dias para experimentar com tranquilidade</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Se o curso não for para você, peça seu reembolso pela Hotmart dentro desse prazo.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-panel py-7 md:py-10">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="mb-3 text-center text-2xl font-black md:text-3xl">Suas dúvidas, sem complicação</h2>
            <Accordion type="single" collapsible>
              {questions.map(({ question, answer }, index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="text-left text-sm font-bold hover:no-underline md:text-base">{question}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}
            </Accordion>
            <div className="mt-7 flex flex-col items-center gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
              <img src={elisa} alt="Professora Elisa" loading="lazy" className="h-24 w-24 shrink-0 rounded-full object-cover object-top" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold">Ficou com alguma dúvida?</h3>
                <p className="mb-4 mt-2 text-sm leading-relaxed text-muted-foreground">Me chama no WhatsApp. Eu respondo com calma e te ajudo a entender se o curso é para você.</p>
                <Button asChild className="h-auto w-full whitespace-normal rounded-xl bg-success px-4 py-3 text-sm font-bold text-success-foreground hover:bg-success/90 sm:w-auto">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}>Falar com a professora Elisa</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        <p>Informática na Prática LTDA</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2"><Link className="hover:text-foreground" to="/termos-de-uso">Termos de uso</Link><Link className="hover:text-foreground" to="/politica-de-privacidade">Política de privacidade</Link></div>
      </footer>
    </div>
  );
}