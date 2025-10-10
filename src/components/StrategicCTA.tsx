import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StrategicCTAProps {
  context?: string;
}

export const StrategicCTA = ({ context = "depois de ver tudo isso" }: StrategicCTAProps) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8">
          <p className="text-xl md:text-2xl font-bold mb-3">
            Então {context}...
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            <span className="line-through">De R$ 497</span> por apenas <span className="text-accent font-bold text-2xl">R$ 297</span>
          </p>
          <Button 
            size="lg" 
            className="font-extrabold px-8 md:px-10 py-6 md:py-7 rounded-2xl text-base md:text-lg hover:scale-105 transition-transform group w-full md:w-auto"
            asChild
          >
            <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
              🚀 Garantir minha vaga agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            ✓ Acesso imediato • ✓ Garantia de 7 dias • ✓ Certificado incluso
          </p>
        </div>
      </div>
    </div>
  );
};
