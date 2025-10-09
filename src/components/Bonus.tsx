import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const bonuses = [
  {
    title: "1) E-mail Profissional",
    description: "Crie e configure seu e-mail, boas práticas e assinatura.",
    value: "R$ 97",
  },
  {
    title: "2) Mercado de Trabalho",
    description: "Currículo, postura e como apresentar suas habilidades.",
    value: "R$ 127",
  },
  {
    title: "3) Atalhos Essenciais",
    description: "Guia rápido com atalhos para ganhar tempo.",
    value: "R$ 47",
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
              className="bg-card border-2 border-success/30 rounded-2xl p-6 hover:border-success transition-all hover:scale-105 relative"
            >
              <div className="absolute -top-3 right-4 bg-success text-white px-4 py-1 rounded-full text-sm font-bold">
                Valor: {bonus.value}
              </div>
              <h3 className="text-xl font-bold mb-3 pt-2">{bonus.title}</h3>
              <p className="text-muted-foreground">{bonus.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-success/20 via-primary/10 to-success/5 border-2 border-success/40 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="mb-6">
              <p className="text-sm md:text-base text-muted-foreground mb-2 uppercase tracking-wide">
                Valor Total dos Bônus
              </p>
              <p className="text-4xl md:text-5xl font-black text-success mb-2">
                R$ 271,00
              </p>
              <p className="text-muted-foreground text-base md:text-lg">
                Mas hoje você <span className="text-success font-bold">NÃO paga NADA</span> por eles!
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur rounded-2xl p-6 mb-6">
              <p className="text-lg md:text-xl font-bold mb-3">
                🎁 Receba TUDO isso de presente ao garantir sua vaga hoje:
              </p>
              <ul className="text-left space-y-2 text-muted-foreground max-w-2xl mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Curso completo de Informática na Prática</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Módulo bônus: E-mail Profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Módulo bônus: Mercado de Trabalho</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>E-book bônus: Atalhos Essenciais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Suporte direto com a prof. Elisa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Certificado de conclusão</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="font-extrabold px-6 md:px-10 py-6 md:py-7 rounded-2xl text-sm md:text-lg bg-success hover:bg-success/90 shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" className="whitespace-normal md:whitespace-nowrap">
                🚀 Quero o curso + bônus
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              🔒 Ambiente seguro • Acesso imediato após confirmação do pagamento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
