import { Button } from "@/components/ui/button";

export const PriceHighlight = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background via-panel/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Preço em destaque */}
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="space-y-3">
              <p className="text-xl md:text-3xl font-black text-foreground">
                💰 De <span className="line-through text-muted-foreground text-lg md:text-xl">R$ 497,00</span> por apenas <span className="text-primary text-2xl md:text-4xl">R$ 297,00</span>
              </p>
              <p className="text-sm md:text-lg text-muted-foreground font-semibold">
                💳 ou parcele em até 12 x R$ 30,22 (no cartão)
              </p>
              <p className="text-base md:text-xl text-accent font-bold">
                🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
              </p>
            </div>
            
            {/* CTA */}
            <div className="mt-6">
              <Button 
                size="lg" 
                className="w-full max-w-md text-sm md:text-xl font-black px-4 md:px-16 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--accent)/0.4)] bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent border-2 border-accent/30" 
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
