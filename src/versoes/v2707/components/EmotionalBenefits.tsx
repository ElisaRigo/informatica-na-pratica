import { CheckCircle2 } from "lucide-react";
import { Button } from "@/versoes/v2707/components/ui/button";

const benefits = [
  {
    icon: "💻",
    text: "Metodologia clara e acessível — aprenda sem termos complicados, no seu ritmo."
  },
  {
    icon: "🧠",
    text: "Aulas práticas e aplicadas — você desenvolve habilidades reais para o mercado."
  },
  {
    icon: "💬",
    text: "Acompanhamento profissional — suporte direto com a professora Elisa."
  },
  {
    icon: "🎓",
    text: "Certificado profissional — valide suas competências com um documento reconhecido."
  },
  {
    icon: "🔒",
    text: "Garantia de satisfação — 7 dias para experimentar sem riscos."
  }
];

export const EmotionalBenefits = () => {
  return (
    <section className="py-12 md:py-20 bg-panel/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12">
            Por que este é o melhor investimento na sua carreira
          </h2>
          <div className="grid gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 md:p-6 bg-card border border-line rounded-xl hover:border-primary/50 transition-all"
              >
                <span className="text-3xl md:text-4xl flex-shrink-0">{benefit.icon}</span>
                <p className="text-base md:text-lg leading-relaxed pt-1">{benefit.text}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 md:mt-12 text-center bg-success/10 border border-success/30 rounded-2xl p-6 md:p-8">
            <p className="text-lg md:text-xl font-bold mb-4">
              ✅ Compromisso com sua satisfação: <span className="text-success">Garantia de 7 dias</span>
            </p>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Experimente o curso por 7 dias. Se não atender suas expectativas, devolvemos 100% do investimento.
            </p>
            <Button 
              size="lg" 
              className="font-extrabold px-10 py-6 rounded-2xl text-base"
            onClick={() => (window as any).openCheckout?.()}
          >
            💼 Iniciar minha qualificação
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
