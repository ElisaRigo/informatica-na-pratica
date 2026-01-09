import { Button } from "@/components/ui/button";
import { Shield, Award, Zap } from "lucide-react";

export const PriceHighlight = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Preço */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">
              De <span className="line-through">R$ 497,00</span> por apenas
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl md:text-5xl font-black text-primary">
                R$ 297
              </span>
              <span className="text-xl text-primary font-bold">,00</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              ou 12x de R$ 29,66
            </p>
          </div>

          {/* Botão CTA */}
          <Button 
            size="lg" 
            className="w-full max-w-md h-14 md:h-16 text-base md:text-lg font-black rounded-xl hover:scale-[1.02] transition-all shadow-[0_8px_30px_rgba(34,197,94,0.4)] bg-success hover:bg-success/90 mb-5" 
            onClick={() => (window as any).openCheckout?.()}
          >
            <Zap className="w-5 h-5 mr-2" />
            QUERO COMEÇAR AGORA!
          </Button>

          {/* Selos Mínimos */}
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-primary" />
              <span>Garantia 7 Dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
