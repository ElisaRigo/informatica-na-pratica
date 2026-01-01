import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export const PriceHighlight = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background via-panel to-background relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Preço em destaque */}
          <div className="bg-card border-2 border-accent/50 rounded-2xl p-6 md:p-8 shadow-2xl glow-accent">
            {/* Urgency badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-2 bg-destructive/20 border border-destructive/50 text-destructive px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4" />
                <span className="font-bold text-xs">PROMOÇÃO ATIVA</span>
                <Flame className="w-4 h-4" />
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xl md:text-3xl font-black text-foreground">
                💰 De <span className="line-through text-destructive text-lg md:text-xl">R$ 497,00</span> por apenas <span className="text-accent text-3xl md:text-5xl drop-shadow-lg">R$ 297,00</span>
              </p>
              <p className="text-sm md:text-lg text-muted-foreground font-semibold">
                💳 ou parcele em até 12 x R$ 30,22 (no cartão)
              </p>
              <p className="text-base md:text-xl text-success font-bold">
                🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
              </p>
            </div>
            
            {/* CTA */}
            <div className="mt-6">
              <Button 
                size="lg" 
                className="w-full max-w-md text-sm md:text-xl font-black px-4 md:px-16 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all bg-gradient-to-r from-accent via-warning to-accent hover:from-warning hover:via-accent hover:to-warning border-2 border-accent/50 animate-glow-pulse text-accent-foreground" 
                onClick={() => (window as any).openCheckout?.()}
              >
                💻 Quero começar meu curso agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
