import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Check, ShieldCheck, MessageCircle, Play, MousePointer2, FileText, Table2, Globe, Monitor, Infinity as InfinityIcon, GraduationCap, Pause, Repeat2, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { requestCheckout } from '@/versoes/v2909/lib/requestCheckout';
import logo from '@/assets/logo-blue.png';
import { offer, outcomes, questions } from './content';

const contact = 'https://api.whatsapp.com/send?phone=5545988287082&text=' + encodeURIComponent('Olá, professora Elisa! Quero aprender a usar o computador e gostaria de tirar uma dúvida sobre o curso.');
const icons = [MousePointer2, FileText, Table2, Globe];
const BuyButton = ({ children = 'Quero aprender com a Elisa', className = '' }: { children?: React.ReactNode; className?: string }) => <Button onClick={requestCheckout} className={`independencia-cta ${className}`}>{children}</Button>;

function RealLesson() {
  const [playing, setPlaying] = useState(false);
  return <div className="independencia-video">
    {playing ? <iframe title="Aula real com a professora Elisa" src="https://www.youtube-nocookie.com/embed/-sdVG1OtDks?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <>
      <img src="/images/capa-segunda-aula.jpg" alt="A professora Elisa mostrando uma aula de informática no computador" loading="lazy" />
      <Button onClick={() => setPlaying(true)} className="independencia-video-badge" aria-label="Assistir à aula real"><Play /> Assistir à aula real</Button>
    </>}
  </div>;
}

export default function Independencia() {
  const [selected, setSelected] = useState(0);
  const current = outcomes[selected];
  return <main className="independencia-page pb-28 md:pb-0">
    <Helmet>
      <title>Aprenda a usar o computador no seu ritmo | Informática na Prática</title>
      <meta name="description" content="Conquiste mais independência no computador com a professora Elisa. Aulas do zero, suporte para dúvidas, acesso vitalício e garantia de 7 dias." />
      <meta property="og:title" content="Sua independência começa no primeiro clique" />
      <meta property="og:description" content="Aprenda informática com calma e conquiste mais autonomia no computador." />
      <meta property="og:type" content="website" /><meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <header className="border-b border-border">
      <div className="independencia-container flex items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-3"><img src={logo} alt="Informática na Prática" className="h-14 w-14 object-contain" /><span className="text-base font-bold leading-snug">Informática<br />na Prática</span></div>
        <Button asChild variant="ghost" className="h-auto text-base px-2 text-foreground"><a href={contact} target="_blank" rel="noopener noreferrer"><MessageCircle className="!h-5 !w-5 text-primary" /><span>Fale com a Elisa</span></a></Button>
      </div>
    </header>

    <section className="independencia-hero">
      <img src="/images/elisa-independencia-aula.jpg" alt="Elisa ensinando cada passo em um computador" className="independencia-hero-photo" fetchPriority="high" />
      <div className="independencia-container py-7 md:py-16">
        <p className="text-secondary text-base md:text-lg font-bold mb-5">APRENDER NÃO TEM IDADE.</p>
        <h1 className="independencia-heading">O computador<br />é seu.<br /><span className="text-secondary">Sua independência<br />começa aqui.</span></h1>
        <p className="max-w-xl mt-6 text-xl md:text-2xl leading-relaxed">Aprenda a usar o computador <strong>sem depender dos outros.</strong> Do zero, com calma e uma professora de verdade.</p>
        <div className="mt-7"><BuyButton /><p className="mt-3 flex items-center gap-2 text-base text-muted-foreground"><ShieldCheck className="w-5 h-5 text-primary" /> 7 dias para conhecer. Ou seu dinheiro de volta.</p></div>
        <div className="hidden md:flex flex-wrap gap-x-7 gap-y-3 mt-8 text-base font-semibold"><span className="flex gap-2 items-center"><Pause className="w-5 h-5 text-primary" /> No seu ritmo</span><span className="flex gap-2 items-center"><Repeat2 className="w-5 h-5 text-primary" /> Repita quando quiser</span><span className="flex gap-2 items-center"><MessageCircle className="w-5 h-5 text-primary" /> Ajuda da professora</span></div>
      </div>
    </section>

    <section className="independencia-light py-10 md:py-14">
      <div className="independencia-container">
        <p className="text-primary text-base font-bold mb-3">DA VONTADE À VIDA REAL</p>
        <h2 className="independencia-heading max-w-3xl">O que você quer<br />fazer sozinho?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7" role="group" aria-label="O que você quer aprender">
          {outcomes.map((outcome, index) => { const Icon = icons[index]; return <Button key={outcome.id} variant="outline" aria-pressed={selected === index} onClick={() => setSelected(index)} className="independencia-option"><Icon className="!h-5 !w-5" /><span className="min-w-0 break-words">{outcome.label}</span></Button>; })}
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-8" aria-live="polite">
          <div><h3 className="text-2xl md:text-3xl font-extrabold leading-snug">{current.title}</h3><p className="mt-4 text-muted-foreground">{current.description}</p><ul className="mt-5 space-y-3">{current.skills.map(skill => <li key={skill} className="flex gap-3 items-start"><Check className="mt-1 w-6 h-6 shrink-0 text-primary" />{skill}</li>)}</ul></div>
          <div className="independencia-preview" aria-label={`Exemplo de aprendizagem: ${current.program}`}>
            <div className="flex items-center gap-2 border-b border-border px-5 py-3 bg-muted text-base font-semibold"><Monitor className="w-5 h-5 text-primary" /> {current.program}</div>
            <div className="p-6 md:p-8"><div className="flex gap-3 items-center"><FileText className="w-9 h-9 text-primary" /><span className="text-xl font-bold">{current.file}</span></div>
              {selected === 2 ? <div className="mt-5 text-base"><div className="grid grid-cols-2 border-b border-border py-2 font-bold"><span>Descrição</span><span>Valor</span></div><div className="grid grid-cols-2 border-b border-border py-2"><span>Mercado</span><span>R$ 120,00</span></div><div className="grid grid-cols-2 py-2"><span>Transporte</span><span>R$ 40,00</span></div><div className="grid grid-cols-2 bg-muted p-2 font-bold"><span>Total</span><span>R$ 160,00</span></div></div> : <div className="mt-6 space-y-3"><div className="h-3 w-full bg-muted rounded-sm" /><div className="h-3 w-4/5 bg-muted rounded-sm" /><div className="h-3 w-3/5 bg-muted rounded-sm" /><p className="text-base text-primary font-bold pt-3">Um passo de cada vez. Você faz junto.</p></div>}
            </div>
          </div>
        </div>
        <p className="border-t border-border mt-8 pt-5 text-base text-muted-foreground">Curso completo: Windows, Word, Excel, PowerPoint, internet e e-mail.</p>
      </div>
    </section>

    <section className="py-10 md:py-14">
      <div className="independencia-container">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 items-center">
          <div><p className="text-secondary font-bold text-base mb-4">NÃO PRECISA ACREDITAR SÓ NA PROMESSA.</p><h2 className="independencia-heading">Veja a aula.<br /><span className="text-primary">Sinta a diferença.</span></h2><p className="text-muted-foreground mt-5">Nada de alguém fazer correndo por você. A Elisa mostra cada clique, explica com palavras simples e você acompanha.</p></div>
          <RealLesson />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-9 border-t border-border pt-7">
          {[['01', 'Você vê.', 'Cada passo aparece na tela.'], ['02', 'Você faz junto.', 'Pause e pratique no seu computador.'], ['03', 'Você ganha confiança.', 'Repita e tire suas dúvidas.']].map(([number, title, description]) => <div key={number} className="flex gap-4"><span className="text-primary text-3xl font-black">{number}</span><div><h3 className="font-bold text-xl">{title}</h3><p className="text-muted-foreground text-lg mt-1">{description}</p></div></div>)}
        </div>
      </div>
    </section>

    <section className="independencia-light py-10 md:py-14">
      <div className="independencia-container grid md:grid-cols-[.75fr_1.25fr] gap-8 md:gap-14 items-center">
        <img src="/images/elisa-independencia.jpg" alt="Professora Elisa" className="w-full max-w-sm mx-auto aspect-[4/5] object-cover rounded-lg" loading="lazy" />
        <div><p className="text-primary font-bold text-base mb-4">GENTE ENSINANDO GENTE.</p><h2 className="independencia-heading">“Eu ensino.<br />Você consegue<br />dar o próximo passo.”</h2><p className="mt-5 text-muted-foreground">Sou a professora Elisa. Há mais de 20 anos, ensino informática para quem quer começar do zero.</p><p className="mt-4">Você não precisa aprender tudo de uma vez. Precisa de uma explicação que faça sentido <strong>e de alguém com paciência para ensinar.</strong></p><p className="mt-6 font-bold">Professora Elisa <span className="block text-base text-muted-foreground font-normal">Informática na Prática</span></p></div>
      </div>
    </section>

    <section className="py-10 md:py-14">
      <div className="independencia-container"><p className="text-secondary text-base font-bold mb-4">QUEM APRENDEU TEM VOZ.</p><h2 className="independencia-heading">Ouça quem já começou.</h2><p className="text-muted-foreground mt-4">Relatos reais de alunos sobre a experiência com o curso.</p><div className="grid md:grid-cols-3 gap-4 mt-7">{[{ name: 'Antonio', src: '/audio/antonio-1.ogg' }, { name: 'Vanderlei', src: '/audio/vanderlei.ogg' }, { name: 'Bruna', src: '/audio/bruna.aac' }].map(student => <article key={student.name} className="border border-border rounded-lg p-5 bg-card"><h3 className="font-bold mb-4 text-xl">{student.name}</h3><audio controls preload="none" className="w-full" aria-label={`Depoimento de ${student.name}`} src={student.src} /></article>)}</div></div>
    </section>

    <section id="oferta" className="independencia-light py-10 md:py-14 scroll-mt-6">
      <div className="independencia-container grid md:grid-cols-2 gap-8 md:gap-14">
        <div><p className="text-primary text-base font-bold mb-4">UM NOVO COMEÇO. SEM MENSALIDADE.</p><h2 className="independencia-heading">Seu próximo<br />“eu consegui!”<br />começa aqui.</h2><ul className="space-y-5 mt-7">{[{ Icon: Monitor, title: 'Curso completo do zero', text: 'Do básico aos programas do dia a dia.' }, { Icon: InfinityIcon, title: 'Acesso vitalício', text: 'Aprenda agora. Reveja quando precisar.' }, { Icon: MessageCircle, title: 'Suporte para dúvidas', text: 'Ajuda da professora pelo WhatsApp.' }, { Icon: GraduationCap, title: 'Certificado de conclusão', text: 'Uma conquista para chamar de sua.' }].map(({ Icon, title, text }) => <li key={title} className="flex gap-4"><Icon className="w-7 h-7 mt-1 text-primary shrink-0" /><div><strong>{title}</strong><p className="text-lg text-muted-foreground">{text}</p></div></li>)}</ul></div>
        <div className="border-2 border-primary rounded-lg p-6 md:p-8 bg-card"><p className="font-bold text-primary text-lg">Curso Informática na Prática</p><p className="text-muted-foreground mt-5">De <del>R$ {offer.original},00</del></p><p className="mt-2 text-lg">Pagamento único de</p><p className="independencia-offer-price mt-2">R$ {offer.price}<span className="text-2xl">,00</span></p><p className="text-xl mt-3">ou {offer.installments}x de <strong>R$ {offer.installment}</strong> no cartão</p><p className="bg-secondary text-secondary-foreground font-bold px-3 py-2 mt-5 text-lg inline-block">Você economiza R$ {offer.original - offer.price},00</p><BuyButton className="w-full mt-6">Quero começar agora!</BuyButton><p className="flex gap-2 justify-center items-center text-base mt-4 text-muted-foreground"><LockKeyhole className="w-5 h-5 text-primary" /> Pagamento seguro pela Hotmart</p><div className="mt-6 border-t border-border pt-5 flex gap-3"><ShieldCheck className="w-8 h-8 text-primary shrink-0" /><p className="text-lg"><strong>7 dias para conhecer o curso.</strong><br />Comprou e não é para você? Peça o reembolso em até 7 dias e receba seu dinheiro de volta.</p></div></div>
      </div>
    </section>

    <section className="py-10 md:py-14"><div className="independencia-container max-w-3xl"><h2 className="independencia-heading mb-6">Pode perguntar.<br /><span className="text-primary">A gente explica.</span></h2><Accordion type="single" collapsible>{questions.map((item, index) => <AccordionItem key={item.question} value={`question-${index}`}><AccordionTrigger className="text-xl font-bold text-left gap-4 py-5">{item.question}</AccordionTrigger><AccordionContent className="text-xl text-muted-foreground leading-relaxed">{item.answer}</AccordionContent></AccordionItem>)}</Accordion><div className="mt-8"><p className="mb-4">Quer conversar antes de decidir?</p><Button asChild variant="outline" className="h-auto py-4 px-5 text-lg whitespace-normal"><a href={contact} target="_blank" rel="noopener noreferrer"><MessageCircle className="!w-6 !h-6 text-primary" />Fale com a professora Elisa</a></Button></div></div></section>
    <footer className="border-t border-border py-8"><div className="independencia-container text-base text-muted-foreground"><p>Informática na Prática LTDA</p><div className="flex gap-5 flex-wrap mt-3"><a href="/termos-de-uso" className="underline">Termos de uso</a><a href="/politica-de-privacidade" className="underline">Privacidade</a></div><p className="mt-4">Cada pessoa aprende no seu ritmo. Resultados dependem da prática e da dedicação. O curso é voltado ao uso de computadores.</p></div></footer>
    <Button asChild className="independencia-floating fixed right-4 bottom-28 md:bottom-6 z-40 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover" aria-label="Tire suas dúvidas no WhatsApp"><a href={contact} target="_blank" rel="noopener noreferrer"><MessageCircle className="!w-7 !h-7" /></a></Button>
    <div className="independencia-floating fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border p-3 md:hidden"><BuyButton className="w-full">Quero começar agora!</BuyButton></div>
  </main>;
}