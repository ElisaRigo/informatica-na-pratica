import { useEffect, useState } from "react";
import { Award, Check, ChevronDown, GraduationCap, HeartHandshake, Infinity as InfinityIcon, PlayCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openHotmartCheckout } from "@/versoes/homebackup/lib/checkoutTracking";
import headerLogo from "@/assets/logo-blue.png";
import windowsIcon from "@/versoes/homebackup/assets/windows-icon.png";
import wordIcon from "@/versoes/homebackup/assets/word-icon.png";
import excelIcon from "@/versoes/homebackup/assets/excel-icon.png";
import powerpointIcon from "@/versoes/homebackup/assets/powerpoint-icon.png";
import internetIcon from "@/versoes/homebackup/assets/internet-icon.png";
import typingIcon from "@/versoes/homebackup/assets/typing-icon.png";
import testimonial1 from "@/versoes/homebackup/assets/whatsapp-testimonial-1.png";
import testimonial2 from "@/versoes/homebackup/assets/whatsapp-testimonial-2.png";
import "./estilo.css";

const programs = [
  { icon: windowsIcon, title: "Windows", text: "Use o mouse, o teclado e organize seus arquivos." },
  { icon: wordIcon, title: "Word", text: "Escreva, salve e imprima seus documentos." },
  { icon: excelIcon, title: "Excel", text: "Organize suas contas em planilhas simples." },
  { icon: powerpointIcon, title: "PowerPoint", text: "Monte suas próprias apresentações." },
  { icon: internetIcon, title: "Internet e e-mail", text: "Pesquise, envie anexos e navegue com segurança." },
  { icon: typingIcon, title: "Digitação", text: "Pratique e ganhe confiança no teclado." },
];
const faqs = [
  { q: "Posso começar do zero?", a: "Sim. Eu ensino desde os primeiros cliques, com calma. Você pode pausar e repetir cada aula." },
  { q: "Por quanto tempo posso acessar?", a: "O acesso é vitalício. Você aprende no seu ritmo e volta às aulas quando precisar." },
  { q: "Quando recebo meu acesso?", a: "Após a aprovação do pagamento, os dados de acesso chegam no seu e-mail." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias após a compra para pedir a devolução de 100% do seu dinheiro." },
];
const whatsapp = "https://api.whatsapp.com/send?phone=5545988287082&text=" + encodeURIComponent("Olá, professora Elisa! Vi no site as informações do curso, mas ainda tenho dúvidas. Pode me ajudar?");

function Video({ cover, id, title }: { cover: string; id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      {playing ? (
        <iframe title={title} className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&controls=1&playsinline=1&autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      ) : (
        <>
          <img src={cover} alt={title} className="h-full w-full object-cover" loading={id === "0kFjFZX5c9I" ? "eager" : "lazy"} />
          <Button variant="ghost" aria-label={`Assistir: ${title}`} onClick={() => setPlaying(true)} className="absolute inset-0 h-full w-full rounded-none hover:bg-transparent">
            <span className="simple-video-play flex h-14 w-14 items-center justify-center rounded-full md:h-16 md:w-16">
              <PlayCircle className="!h-11 !w-11" strokeWidth={1.5} />
            </span>
          </Button>
        </>
      )}
    </div>
  );
}

const PurchaseButton = () => <Button onClick={() => openHotmartCheckout()} className="simple-purchase w-full">Quero começar meu curso!</Button>;

export default function VendasNovo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { document.title = "Informática na Prática • Aprenda com calma, do zero"; }, []);
  return (
    <div className="home-copy-simple min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <header className="border-b border-border px-5 py-3">
        <div className="simple-inner flex items-center justify-center gap-3">
          <img src={headerLogo} alt="Informática na Prática" className="h-14 w-14 object-contain" />
          <p className="text-lg font-bold leading-snug md:text-xl">Curso de Informática<br /><span className="text-sm font-medium text-muted-foreground md:text-base">Online · Do zero · No seu ritmo</span></p>
        </div>
      </header>

      <main>
        <section className="simple-section">
          <div className="simple-inner text-center">
            <h1 className="text-[40px] font-black leading-[1.1] md:text-6xl">Domine o<br /><span className="text-primary">Computador</span></h1>
            <p className="mt-3 text-xl font-semibold leading-snug md:text-2xl">Aprenda do ZERO<br className="md:hidden" /> com calma e paciência.</p>
            <div className="mx-auto mt-5 max-w-3xl">
              <Video cover="/images/capa-primeiro-video-icone2.jpg" id="0kFjFZX5c9I" title="Recado da professora Elisa" />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-base text-muted-foreground">
              <span className="inline-flex items-center gap-2"><InfinityIcon className="h-5 w-5 text-primary" />Acesso vitalício</span>
              <span className="inline-flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-primary" />Suporte para dúvidas</span>
            </div>
          </div>
        </section>

        <section className="simple-section border-t border-border">
          <div className="simple-inner grid items-center gap-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
            <div className="mx-auto w-full max-w-sm">
              <p className="mb-3 text-center text-base font-semibold text-muted-foreground">Mais de 15.000 alunos já aprenderam</p>
              <img src="/images/prof-elisa.jpg" alt="Professora Elisa" className="h-auto w-full rounded-lg" loading="lazy" />
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2 text-lg font-semibold text-primary"><GraduationCap className="h-6 w-6" />Quem vai te ensinar</p>
              <h2 className="simple-title">Oi, eu sou a<br />Professora Elisa.</h2>
              <p className="simple-copy mt-3 text-muted-foreground">Há mais de 20 anos ensino informática. Eu mostro cada clique, você faz junto e pode repetir quando quiser.</p>
              <p className="simple-copy mt-2 font-semibold">Ficou com dúvida? Você tem minha ajuda.</p>
              <h3 className="mb-3 mt-6 text-2xl font-bold">Veja uma aula de verdade</h3>
              <Video cover="/images/capa-segunda-aula.jpg" id="_0OPLnEiMHk" title="Aula completa do curso" />
            </div>
          </div>
        </section>

        <section className="simple-section border-t border-border">
          <div className="simple-inner">
            <h2 className="simple-title text-center">Do primeiro clique<br />à sua independência.</h2>
            <p className="simple-copy mt-3 text-center text-muted-foreground">Tudo explicado passo a passo, no seu computador.</p>
            <div className="mt-6 grid gap-x-8 md:grid-cols-2">
              {programs.map(program => (
                <div key={program.title} className="flex items-start gap-4 border-t border-border py-4">
                  <img src={program.icon} alt="" className="h-14 w-14 shrink-0 object-contain" loading="lazy" />
                  <div><h3 className="text-xl font-bold">{program.title}</h3><p className="simple-copy text-muted-foreground">{program.text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="simple-section border-t border-border">
          <div className="simple-inner">
            <h2 className="simple-title text-center">Quem aprendeu conta.</h2>
            <div className="mx-auto mt-6 grid max-w-3xl gap-5 md:grid-cols-2">
              {[testimonial1, testimonial2].map((image, index) => (
                <img key={image} src={image} alt={index === 0 ? "Conversa de aluna sobre o curso" : "Aluno agradecendo pelas aulas de planilha"} className="h-auto w-full rounded-lg" loading="lazy" />
              ))}
            </div>
            <div className="mx-auto mt-5 grid max-w-3xl gap-4 md:grid-cols-2">
              {[{ name: "Antonio", src: "/audio/antonio-1.ogg" }, { name: "Vanderlei", src: "/audio/vanderlei.ogg" }].map(audio => (
                <div key={audio.name}><p className="mb-2 text-lg font-semibold">Ouça {audio.name}</p><audio controls preload="none" aria-label={`Depoimento de ${audio.name}`} className="h-12 w-full" src={audio.src} /></div>
              ))}
            </div>
          </div>
        </section>

        <section id="oferta" className="simple-light simple-section bg-background text-foreground">
          <div className="simple-inner grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h2 className="simple-title">Seu curso completo.<br />Sua nova conquista.</h2>
              <ul className="simple-copy mt-5 space-y-2">
                {["Mais de 90 videoaulas", "Acesso vitalício", "Suporte com a professora", "Certificado e bônus incluídos"].map(item => <li key={item} className="flex items-center gap-3"><Check className="h-5 w-5 shrink-0 text-primary" />{item}</li>)}
              </ul>
            </div>
            <div className="text-center">
              <p className="text-lg text-muted-foreground">De <span className="line-through">R$ 497,00</span></p>
              <p className="mt-2 text-5xl font-black leading-tight">R$ 297<span className="text-2xl">,00</span></p>
              <p className="mt-2 text-lg text-muted-foreground">ou 12x de R$ 30,72 no cartão</p>
              <p className="mt-3 text-lg font-bold text-primary">Você economiza R$ 200</p>
              <div className="mt-5"><PurchaseButton /></div>
              <p className="mt-4 flex items-center justify-center gap-2 text-lg font-bold"><ShieldCheck className="h-6 w-6 shrink-0 text-primary" />7 dias de garantia</p>
              <p className="simple-copy mt-1 text-muted-foreground">Se não gostar, devolvemos 100% do seu dinheiro.</p>
            </div>
          </div>
        </section>

        <section className="simple-section">
          <div className="simple-inner max-w-3xl">
            <h2 className="simple-title mb-5 text-center">Suas dúvidas, com calma.</h2>
            {faqs.map((faq, index) => (
              <div key={faq.q} className="border-b border-border">
                <Button variant="ghost" aria-expanded={openFaq === index} aria-controls={`simple-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="h-auto w-full justify-between whitespace-normal px-0 py-4 text-left text-xl font-bold hover:bg-transparent hover:text-primary">
                  <span>{faq.q}</span><ChevronDown className={`!h-5 !w-5 shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </Button>
                {openFaq === index && <p id={`simple-faq-${index}`} className="simple-copy pb-4 text-muted-foreground">{faq.a}</p>}
              </div>
            ))}
            <p className="simple-copy mt-5 text-center text-muted-foreground">Quer conversar antes de começar?</p>
            <Button asChild variant="link" className="mt-1 h-auto w-full whitespace-normal text-center text-lg text-primary"><a href={whatsapp} target="_blank" rel="noopener noreferrer">Fale com a professora no WhatsApp</a></Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-5 text-center text-sm leading-relaxed text-muted-foreground">
        <p>Informática na Prática LTDA · © 2026</p><p>CNPJ: 32.373.460/0001-51</p>
        <div className="mt-2 flex justify-center gap-5"><a href="/termos-de-uso" className="underline">Termos de Uso</a><a href="/politica-de-privacidade" className="underline">Privacidade</a></div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-md md:hidden"><div className="mx-auto max-w-lg"><PurchaseButton /></div></div>
    </div>
  );
}
