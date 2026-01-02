import { Button } from "@/components/ui/button";

export const PriceHighlight = () => {
  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="w-full max-w-md text-sm md:text-lg font-black px-4 md:px-12 py-5 md:py-7 rounded-full hover:scale-105 transition-all shadow-[0_8px_30px_hsl(var(--accent)/0.4)] bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent" 
            onClick={() => (window as any).openCheckout?.()}
          >
            💻 Quero começar agora
          </Button>
          
          {/* Preço */}
          <p className="text-lg md:text-2xl font-bold text-foreground">
            💰 De <span className="line-through text-muted-foreground text-base md:text-lg">R$ 497,00</span> por apenas <span className="text-primary text-xl md:text-3xl font-black">R$ 297,00</span>
          </p>
          
          {/* Parcelamento */}
          <p className="text-sm md:text-base text-muted-foreground">
            💳 ou parcele em até 12x no cartão
          </p>
          
          {/* Urgência */}
          <p className="text-sm md:text-base text-accent font-semibold">
            🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
          </p>
        </div>
      </div>
    </section>
  );
};
