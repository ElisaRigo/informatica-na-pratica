import { Button } from "@/components/ui/button";
import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

const modules = [
  {
    icon: windowsIcon,
    title: "Windows e Organização",
    description: "Organize arquivos e use o computador com segurança e autonomia.",
    alt: "Ícone do Windows - Sistema operacional e organização de arquivos"
  },
  {
    icon: wordIcon,
    title: "Word Profissional",
    description: "Crie documentos e currículos impecáveis, que impressionam recrutadores.",
    alt: "Ícone do Microsoft Word - Editor de texto profissional"
  },
  {
    icon: excelIcon,
    title: "Excel na Prática",
    description: "Monte planilhas profissionais e domine fórmulas com confiança.",
    alt: "Ícone do Microsoft Excel - Planilhas e análise de dados"
  },
  {
    icon: powerpointIcon,
    title: "PowerPoint Impactante",
    description: "Faça apresentações bonitas e eficazes, mesmo sem experiência.",
    alt: "Ícone do Microsoft PowerPoint - Apresentações profissionais"
  },
  {
    icon: internetIcon,
    title: "Internet e E-mail",
    description: "Navegue, pesquise e se comunique com segurança no dia a dia e no trabalho.",
    alt: "Ícone de Internet - Navegação web e comunicação digital"
  },
  {
    icon: typingIcon,
    title: "Digitação Profissional",
    description: "Ganhe velocidade e produtividade pra se destacar no trabalho.",
    alt: "Ícone de Digitação - Técnicas de digitação rápida"
  },
];

export const CourseContent = () => {
  return (
    <section id="conteudo" className="py-12 md:py-20 bg-panel">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Veja Tudo o Que Você Vai Dominar no Curso
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Do zero ao profissional — aprenda as <strong className="text-foreground">ferramentas que vão transformar sua rotina</strong> e abrir portas no mercado de trabalho.
          </p>
        </header>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {modules.map((module, index) => (
            <article
              key={index}
              className="bg-card border border-line rounded-2xl p-8 text-center hover:border-primary/50 transition-all hover:scale-105"
            >
              <img
                src={module.icon}
                alt={module.alt}
                className="w-16 h-16 mx-auto mb-4"
                loading="lazy"
                width="64"
                height="64"
              />
              <h3 className="text-xl font-bold mb-3">{module.title}</h3>
              <p className="text-muted-foreground">{module.description}</p>
            </article>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8 bg-primary/10 border border-primary/30 rounded-2xl p-6 md:p-8">
          <p className="text-lg md:text-xl font-bold text-primary mb-2">
            💙 Com essas habilidades, você vai usar o computador com confiança
          </p>
          <p className="text-base md:text-lg text-foreground">
            e estará preparado para qualquer desafio do mercado.
          </p>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg md:text-xl font-black px-8 md:px-16 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--primary)/0.4)] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-2 border-primary/30"
            onClick={() => (window as any).openCheckout?.()}
          >
            ✅ Quero Aprender Tudo Isso Agora
          </Button>
        </div>
      </div>
    </section>
  );
};