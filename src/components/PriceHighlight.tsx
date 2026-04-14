import { Button } from "@/components/ui/button";

export const PriceHighlight = () => {
  return (
    <section id="price-section" className="py-4 md:py-6 bg-gradient-to-b from-panel via-background to-background">
    
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Título de Conversão */}
          <div className="text-center mb-6">
            <p className="text-sm md:text-base text-primary font-bold uppercase tracking-wide mb-2">
              Oferta por tempo limitado
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground">
              Comece sua <span className="text-primary">transformação</span> hoje!
            </h2>
          </div>
          
          {/* Card de Preço */}
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-lg text-center space-y-4">
            {/* Preço */}
            <div className="space-y-1">
              <p className="text-lg md:text-2xl font-bold text-foreground">
                💰 De <span className="line-through text-muted-foreground text-base md:text-lg">R$ 497,00</span> por apenas
              </p>
              <p className="text-3xl md:text-5xl font-black text-primary">
                R$ 297,00
              </p>
            </div>
            
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
              className="w-full h-14 md:h-16 text-sm md:text-xl font-black rounded-full bg-success hover:bg-success/90 text-white shadow-[0_8px_30px_rgba(34,197,94,0.45)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:scale-105 transition-all duration-300 px-4 md:px-8"
            >
              🎯 QUERO COMEÇAR MEU CURSO AGORA!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
