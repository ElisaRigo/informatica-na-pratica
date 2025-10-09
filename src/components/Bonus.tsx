import { Gift } from "lucide-react";

const bonuses = [
  {
    title: "1) E-mail Profissional",
    description: "Crie e configure seu e-mail, boas práticas e assinatura.",
  },
  {
    title: "2) Mercado de Trabalho",
    description: "Currículo, postura e como apresentar suas habilidades.",
  },
  {
    title: "3) Atalhos Essenciais",
    description: "Guia rápido com atalhos para ganhar tempo.",
  },
];

export const Bonus = () => {
  return (
    <section id="bonus" className="py-20 bg-panel">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
            <Gift className="w-5 h-5" />
            <span className="font-bold">Bônus Exclusivos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Bônus exclusivos</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Para acelerar seus resultados, você recebe materiais e aulas extras sem custo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="bg-card border border-line rounded-2xl p-6 hover:border-success/50 transition-all hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-3">{bonus.title}</h3>
              <p className="text-muted-foreground">{bonus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
