import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StrategicCTAProps {
  context?: string;
}

export const StrategicCTA = ({ context = "depois de ver tudo isso" }: StrategicCTAProps) => {
  return (
    <div className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8">
          <p className="text-xl md:text-2xl font-bold mb-4">
            Então {context}...
          </p>
          <div className="mb-6">
            <p className="text-sm md:text-base text-muted-foreground mb-2">
              De <span className="line-through text-lg md:text-xl font-bold text-destructive/80">R$ 768</span> (valor total com bônus)
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              Curso <span className="line-through text-xl md:text-2xl font-bold text-destructive/70">R$ 497</span>
            </p>
            <p className="text-2xl md:text-4xl font-black mb-1">
              Por apenas <span className="text-accent">R$ 297</span>
            </p>
            <p className="text-base md:text-lg font-bold text-success">
              💰 Economize R$ 471!
            </p>
          </div>
          <Button 
            size="lg" 
            className="font-extrabold px-6 md:px-10 py-6 md:py-7 rounded-2xl text-sm md:text-lg hover:scale-105 transition-transform group w-full md:w-auto flex items-center justify-center"
            onClick={() => (window as any).openCheckout?.()}
          >
            <span className="whitespace-nowrap">💪 Quero essa transformação</span>
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            ✓ Acesso imediato • ✓ Garantia de 7 dias • ✓ Certificado incluso
          </p>
        </div>
      </div>
    </div>
  );
};
