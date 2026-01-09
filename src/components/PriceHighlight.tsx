import { Button } from "@/components/ui/button";

export const PriceHighlight = () => {
  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          
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
