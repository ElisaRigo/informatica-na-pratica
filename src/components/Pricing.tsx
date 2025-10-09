import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Smartphone } from "lucide-react";

const features = [
  'De R$ 497 por R$ 297',
  'Parcele em até 12x',
  'Acesso imediato + suporte direto com a professora',
  'Garantia total de 7 dias',
];

export const Pricing = () => {
  return (
    <section id="preco" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-card border-2 border-primary/20 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <div className="text-muted-foreground mb-2 font-semibold text-sm md:text-base">
                Condição por tempo limitado
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8">Garanta seu acesso hoje</h3>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-lg leading-tight">
                      {index === 0 ? (
                        <>
                          De <span className="line-through text-muted-foreground">R$ 497</span> por{' '}
                          <strong className="text-accent">R$ 297</strong>
                        </>
                      ) : (
                        feature
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                <div className="flex items-center gap-1.5 md:gap-2 bg-panel border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                  <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-semibold">Cartão</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 bg-panel border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                  <Smartphone className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-semibold">Pix</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 bg-panel border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm font-semibold">🧾 Boleto</span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 text-gradient">
                R$ 297
              </div>
              <div className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
                à vista • ou em até 12x no cartão
              </div>
              
              <Button 
                size="lg" 
                className="w-full font-extrabold text-base md:text-lg px-6 md:px-8 py-5 md:py-7 rounded-xl md:rounded-2xl mb-3 md:mb-4 hover:scale-105 transition-transform"
                asChild
              >
                <a href="#" target="_blank">
                  Garantir meu acesso agora
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="w-full font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-xl md:rounded-2xl border-2"
                asChild
              >
                <a href="https://wa.me/5545988287082" target="_blank" rel="noopener noreferrer">
                  Tirar uma dúvida no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
