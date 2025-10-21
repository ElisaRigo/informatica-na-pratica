import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
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
  },
  {
    icon: wordIcon,
    title: "Word Profissional",
    description: "Crie documentos e currículos impecáveis, que impressionam recrutadores.",
  },
  {
    icon: excelIcon,
    title: "Excel na Prática",
    description: "Monte planilhas profissionais e domine fórmulas com confiança.",
  },
  {
    icon: powerpointIcon,
    title: "PowerPoint Impactante",
    description: "Faça apresentações bonitas e eficazes, mesmo sem experiência.",
  },
  {
    icon: internetIcon,
    title: "Internet e E-mail",
    description: "Navegue, pesquise e se comunique com segurança no dia a dia e no trabalho.",
  },
  {
    icon: typingIcon,
    title: "Digitação Profissional",
    description: "Ganhe velocidade e produtividade pra se destacar no trabalho.",
  },
];

export const CourseContent = () => {
  return (
    <section id="conteudo" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-foreground">
            Veja tudo o que você vai dominar no curso
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Do zero ao profissional — aprenda as ferramentas que vão transformar sua rotina e abrir portas no mercado de trabalho.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-card border-2 border-line rounded-2xl p-8 text-center hover:border-primary/50 transition-all hover:scale-105"
            >
              <img
                src={module.icon}
                alt={module.title}
                className="w-16 h-16 mx-auto mb-4"
                loading="lazy"
                width="64"
                height="64"
              />
              <h3 className="text-xl font-bold mb-3 text-foreground">{module.title}</h3>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          ))}
        </div>

        {/* Chamada final transformacional */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
            <p className="text-xl md:text-2xl font-bold text-foreground">
              Com essas habilidades, você vai usar o computador com confiança e estará preparado para qualquer desafio do mercado.
            </p>
          </div>
          
          {/* CTA */}
          <Button 
            size="lg" 
            className="text-sm md:text-xl font-black px-4 md:px-16 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--primary)/0.4)] bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary border-2 border-primary/30 w-full md:w-auto"
            onClick={() => (window as any).openCheckout?.()}
          >
            ✅ Quero Aprender Tudo Isso Agora
          </Button>
        </div>
      </div>
    </section>
  );
};
