import { Button } from "@/components/ui/button";

export const PriceHighlight = () => {
  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          
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
          
          {/* CTA Button */}
          <Button
            size="lg"
            onClick={() => (window as any).openCheckout?.()}
            className="w-full md:w-auto min-w-[320px] md:min-w-[480px] h-14 md:h-18 text-base md:text-xl font-black rounded-full bg-success hover:bg-success/90 text-white shadow-[0_8px_30px_rgba(34,197,94,0.45)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:scale-105 transition-all duration-300 px-6 md:px-8 mt-2"
          >
            🎯 QUERO COMEÇAR MEU CURSO AGORA!
          </Button>
        </div>
      </div>
    </section>
  );
};
