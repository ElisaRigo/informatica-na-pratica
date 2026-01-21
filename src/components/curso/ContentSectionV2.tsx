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
    lessons: "12 aulas",
  },
  {
    icon: wordIcon,
    title: "Word Profissional",
    description: "Crie documentos e currículos impecáveis, que impressionam recrutadores.",
    lessons: "15 aulas",
  },
  {
    icon: excelIcon,
    title: "Excel na Prática",
    description: "Monte planilhas profissionais e domine fórmulas com confiança.",
    lessons: "18 aulas",
  },
  {
    icon: powerpointIcon,
    title: "PowerPoint Impactante",
    description: "Faça apresentações bonitas e eficazes, mesmo sem experiência.",
    lessons: "10 aulas",
  },
  {
    icon: internetIcon,
    title: "Internet e E-mail",
    description: "Navegue, pesquise e se comunique com segurança no dia a dia e no trabalho.",
    lessons: "8 aulas",
  },
  {
    icon: typingIcon,
    title: "Digitação Profissional",
    description: "Ganhe velocidade e produtividade para se destacar no trabalho.",
    lessons: "6 aulas",
  },
];

export const ContentSectionV2 = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📚 Conteúdo Completo
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Tudo que você precisa para{" "}
            <span className="text-primary">dominar</span> o computador
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            +90 videoaulas passo a passo, do básico ao avançado, com explicações simples que qualquer pessoa consegue acompanhar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-transparent hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img
                      src={module.icon}
                      alt={module.title}
                      className="w-10 h-10"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{module.title}</h3>
                    <span className="text-sm text-primary font-medium">{module.lessons}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{module.description}</p>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-accent font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acesso vitalício</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8">
            <div className="text-left">
              <p className="text-lg md:text-xl font-bold mb-1">
                +90 aulas passo a passo
              </p>
              <p className="text-slate-400 text-sm md:text-base">
                Certificado de conclusão incluso
              </p>
            </div>
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="bg-gradient-to-r from-accent to-success text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap"
            >
              Garantir Acesso
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
