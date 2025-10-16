import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useCheckout";

const benefits = [
  {
    icon: "💻",
    text: "Você vai aprender com segurança e prazer — nada de enrolação ou termos difíceis."
  },
  {
    icon: "🧠",
    text: "Aulas diretas e práticas — você aprende fazendo, não só assistindo."
  },
  {
    icon: "💬",
    text: "Suporte próximo comigo, prof. Elisa — nada de se sentir sozinha, eu te acompanho."
  },
  {
    icon: "🎓",
    text: "Certificado reconhecido — destaque seu currículo com um curso completo e profissional."
  },
  {
    icon: "🔒",
    text: "Garantia total de 7 dias — se não amar, é só cancelar."
  }
];

export const EmotionalBenefits = () => {
  const { openCheckout } = useCheckout();
  
  return (
    <section className="py-12 md:py-20 bg-panel/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12">
            Por que você vai amar este curso
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
          
          <div className="mt-10 md:mt-12 text-center bg-primary/10 border border-primary/30 rounded-2xl p-6 md:p-8">
            <p className="text-lg md:text-xl font-bold mb-4">
              ✅ Sem riscos: <span className="text-primary">Garantia incondicional de 7 dias</span>
            </p>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Experimente o curso por 7 dias. Se não gostar, devolvemos 100% do seu dinheiro. Simples assim!
            </p>
            <Button 
              size="lg" 
              className="font-extrabold px-10 py-6 rounded-2xl text-base"
              onClick={openCheckout}
            >
              Começar sem risco agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
