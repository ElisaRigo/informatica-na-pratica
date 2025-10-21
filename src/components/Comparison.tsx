import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Comparison = () => {
  const withCourse = [
    "Confiança total no computador",
    "Independência digital completa",
    "Novas oportunidades de trabalho",
    "Crescimento profissional visível"
  ];

  const withoutCourse = [
    "Insegurança e medo constante",
    "Dificuldade em tarefas simples",
    "Dependência dos outros",
    "Oportunidades perdidas"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          Sua escolha define seu futuro
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Compare onde você estará daqui 30 dias:
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Com o curso - AGORA À ESQUERDA */}
          <div className="bg-gradient-to-br from-success/10 to-accent/10 border-2 border-success/30 rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-success rounded-full mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-success">SUA VIDA TRANSFORMADA</h3>
            </div>
            <ul className="space-y-4">
              {withCourse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-7 h-7 text-success flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sem o curso - AGORA À DIREITA */}
          <div className="bg-muted/20 border-2 border-muted rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-4">
                <X className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-black text-muted-foreground">SITUAÇÃO ATUAL</h3>
            </div>
            <ul className="space-y-4">
              {withoutCourse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-7 h-7 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-success/10 to-accent/10 border-2 border-success/30 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl font-bold mb-6">
            Escolha o caminho da transformação agora!
          </p>
          <Button 
            size="lg" 
            className="font-extrabold px-4 md:px-10 py-5 md:py-7 rounded-2xl text-xs md:text-lg hover:scale-105 transition-transform w-full md:w-auto leading-tight"
            onClick={() => (window as any).openCheckout?.()}
          >
            ✨ Quero Aprender do Jeito Certo
          </Button>
        </div>
      </div>
    </section>
  );
};
