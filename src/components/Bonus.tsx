import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

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

        <div className="mt-10 md:mt-12 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-success/20 to-success/5 border-2 border-success/30 rounded-2xl p-6 md:p-8">
            <p className="text-xl md:text-2xl font-black text-success mb-3">
              🎁 Todos esses bônus são SEUS hoje!
            </p>
            <p className="text-muted-foreground mb-6 text-base">
              Valor total dos bônus: <span className="line-through">R$ 297</span> • Grátis para quem garantir vaga agora
            </p>
            <Button 
              size="lg" 
              className="font-extrabold px-10 py-6 rounded-2xl text-base bg-success hover:bg-success/90"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR">
                Quero os bônus + curso completo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
