import windowsIcon from "@/assets/windows-icon.png";
import wordIcon from "@/assets/word-icon.png";
import excelIcon from "@/assets/excel-icon.png";
import powerpointIcon from "@/assets/powerpoint-icon.png";
import internetIcon from "@/assets/internet-icon.png";
import typingIcon from "@/assets/typing-icon.png";

const modules = [
  {
    icon: windowsIcon,
    title: "Windows & Organização",
    description: "Domine pastas, arquivos, configurações e atalhos úteis do dia a dia.",
  },
  {
    icon: wordIcon,
    title: "Word Profissional",
    description: "Crie documentos e currículos com formatação impecável e exporte em PDF.",
  },
  {
    icon: excelIcon,
    title: "Excel na Prática",
    description: "Planilhas do zero, SOMA, MÉDIA, SE e exercícios comentados.",
  },
  {
    icon: powerpointIcon,
    title: "PowerPoint",
    description: "Slides claros e bonitos com storytelling simples.",
  },
  {
    icon: internetIcon,
    title: "Internet & E-mail",
    description: "Pesquisa eficiente, segurança básica e uso de e-mail.",
  },
  {
    icon: typingIcon,
    title: "Digitação",
    description: "Agilidade e precisão no teclado com prática diária.",
  },
];

export const ContentGrid = () => {
  return (
    <section id="conteudo" className="py-8 md:py-12 bg-panel">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
          O que você vai aprender
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-card border border-line rounded-2xl p-8 text-center hover:border-primary/50 transition-all hover:scale-105"
            >
              <img
                src={module.icon}
                alt={module.title}
                className="w-16 h-16 mx-auto mb-4"
                loading="lazy"
                width="64"
                height="64"
              />
              <h3 className="text-xl font-bold mb-3">{module.title}</h3>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
