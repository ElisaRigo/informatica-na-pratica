import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Comparison = () => {
  const withCourse = [
    "Domina Word, Excel e PowerPoint",
    "Mais confiança no trabalho",
    "Oportunidades melhores no mercado",
    "Autonomia para criar documentos",
    "Produtividade aumentada",
    "Certificado para currículo"
  ];

  const withoutCourse = [
    "Continua dependendo dos outros",
    "Perde oportunidades de emprego",
    "Insegurança ao usar o computador",
    "Dificuldade em tarefas simples",
    "Menos competitivo no mercado",
    "Estagnação profissional"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          Sua escolha define seu futuro
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Compare onde você estará daqui 30 dias com ou sem o curso:
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Com o curso */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black text-primary">COM O CURSO</h3>
            </div>
            <ul className="space-y-4">
              {withCourse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sem o curso */}
          <div className="bg-muted/30 border-2 border-muted rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/20 rounded-full mb-4">
                <X className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-black text-muted-foreground">SEM O CURSO</h3>
            </div>
            <ul className="space-y-4">
              {withoutCourse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl font-bold mb-6">
            Escolha o caminho do crescimento profissional agora!
          </p>
          <Button 
            size="lg" 
            className="font-extrabold px-6 md:px-10 py-5 md:py-7 rounded-2xl text-sm md:text-lg hover:scale-105 transition-transform w-full md:w-auto"
            onClick={() => (window as any).openCheckout?.()}
          >
            ✨ Sim, quero conquistar minha independência
          </Button>
        </div>
      </div>
    </section>
  );
};
