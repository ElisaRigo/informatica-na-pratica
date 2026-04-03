import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Usar o computador com segurança e organização (Windows)",
  "Escrever documentos profissionais e currículos (Word)",
  "Criar planilhas e fórmulas essenciais (Excel)",
  "Montar apresentações bonitas e objetivas (PowerPoint)",
  "Navegar com confiança, pesquisar e usar e-mail (Internet)",
  "Ganhar velocidade no teclado com prática guiada (Digitação)",
];

export const ValueStack = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-6">
          ✅ Depois do curso, você será capaz de...
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-card border border-line rounded-2xl hover:border-primary/50 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="text-lg font-medium">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/30 rounded-3xl p-8 md:p-10 text-center">
            <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-black mb-3">
              Acesso online completo por <span className="text-primary">2 anos inteiros</span>
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Aprenda no seu ritmo, sem pressa — o acesso é seu por 2 anos inteiros.
            </p>
            <p className="text-base text-muted-foreground mb-6">
              São <span className="font-bold text-foreground">24 meses completos</span> de curso online para você assistir de qualquer lugar, quantas vezes quiser
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
              <div className="bg-card/50 backdrop-blur rounded-xl p-4">
                <div className="font-black text-2xl text-primary mb-1">Ilimitado</div>
                <div className="text-muted-foreground">vezes para assistir</div>
              </div>
              <div className="bg-card/50 backdrop-blur rounded-xl p-4">
                <div className="font-black text-2xl text-primary mb-1">Seu ritmo</div>
                <div className="text-muted-foreground">aprenda quando quiser</div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="font-extrabold px-8 py-6 rounded-2xl text-base hover:scale-105 transition-transform"
              onClick={() => (window as any).openCheckout?.()}
            >
              🎯 Garantir meu acesso agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
