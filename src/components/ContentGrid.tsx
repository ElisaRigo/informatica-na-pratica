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
    description: "Organize seus arquivos como um profissional e ganhe produtividade no dia a dia.",
  },
  {
    icon: wordIcon,
    title: "Word Profissional",
    description: "Crie currículos impecáveis e documentos que impressionam recrutadores.",
  },
  {
    icon: excelIcon,
    title: "Excel na Prática",
    description: "Domine planilhas e fórmulas essenciais que o mercado exige.",
  },
  {
    icon: powerpointIcon,
    title: "PowerPoint",
    description: "Apresente suas ideias com slides profissionais que chamam atenção.",
  },
  {
    icon: internetIcon,
    title: "Internet & E-mail",
    description: "Navegue com segurança e use e-mail profissional com confiança.",
  },
  {
    icon: typingIcon,
    title: "Digitação",
    description: "Ganhe velocidade e precisão no teclado para trabalhar mais rápido.",
  },
];

export const ContentGrid = () => {
  return (
    <section id="conteudo" className="py-12 md:py-20 bg-panel">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Sua transformação começa aqui
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Aprenda as <span className="font-bold text-foreground">6 ferramentas essenciais</span> que vão abrir portas no mercado de trabalho
          </p>
        </div>
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
