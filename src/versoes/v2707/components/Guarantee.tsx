import { Button } from "@/versoes/v2707/components/ui/button";
import { ShieldCheck } from "lucide-react";

export const Guarantee = () => {
  return (
    <section id="garantia" className="py-8 md:py-12 bg-panel">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <ShieldCheck className="w-20 h-20 text-success mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Garantia total de 7 dias 🔒
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sua matrícula é 100% segura. Se dentro de 7 dias você perceber que o curso não é para você, é só solicitar o cancelamento que devolvemos todo o valor pago — sem complicação.
          </p>
          <Button 
            size="lg" 
            className="font-extrabold px-4 md:px-8 py-6 rounded-2xl w-full md:w-auto text-sm md:text-base"
            onClick={() => (window as any).openCheckout?.()}
          >
            💪 Quero começar sem risco
          </Button>
        </div>
      </div>
    </section>
  );
};
