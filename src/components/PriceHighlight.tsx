import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, Users, CheckCircle2, Zap } from "lucide-react";

export const PriceHighlight = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Card de Oferta */}
          <div className="bg-card border-2 border-primary/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
            {/* Badge de Desconto */}
            <div className="absolute -top-1 -right-1 md:top-4 md:right-4">
              <div className="bg-accent text-accent-foreground font-black text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg animate-pulse">
                🔥 40% OFF
              </div>
            </div>

            {/* Urgência no Topo */}
            <div className="flex items-center justify-center gap-2 mb-6 bg-accent/10 rounded-full py-2 px-4 w-fit mx-auto">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-xs md:text-sm font-bold text-accent">
                Oferta por tempo limitado!
              </span>
            </div>

            {/* Preço Principal */}
            <div className="text-center mb-6">
              <p className="text-sm md:text-base text-muted-foreground mb-1">
                De <span className="line-through">R$ 497,00</span>
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg md:text-xl text-foreground font-medium">por apenas</span>
                <span className="text-4xl md:text-6xl font-black text-primary">
                  R$ 297
                </span>
                <span className="text-xl md:text-2xl text-primary font-bold">,00</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                💳 ou <span className="font-semibold text-foreground">12x de R$ 29,66</span> no cartão
              </p>
            </div>

            {/* Botão CTA Grande */}
            <div className="mb-6">
              <Button 
                size="lg" 
                className="w-full h-16 md:h-20 text-base md:text-xl font-black rounded-2xl hover:scale-[1.02] transition-all shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.5)] bg-success hover:bg-success/90" 
                onClick={() => (window as any).openCheckout?.()}
              >
                <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                QUERO COMEÇAR MEU CURSO AGORA!
              </Button>
            </div>

            {/* Selos de Confiança */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <span className="text-[10px] md:text-xs font-semibold text-center text-muted-foreground">Compra 100% Segura</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <span className="text-[10px] md:text-xs font-semibold text-center text-muted-foreground">Garantia de 7 Dias</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <span className="text-[10px] md:text-xs font-semibold text-center text-muted-foreground">Acesso por 2 Anos</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <span className="text-[10px] md:text-xs font-semibold text-center text-muted-foreground">+2.500 Alunos</span>
              </div>
            </div>

            {/* Benefícios Rápidos */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                <span>Acesso imediato a todo o conteúdo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                <span>Certificado de conclusão incluso</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                <span>Suporte direto com a professora</span>
              </div>
            </div>

            {/* Mensagem de Urgência Final */}
            <div className="text-center bg-accent/10 rounded-xl p-4">
              <p className="text-sm md:text-base font-bold text-accent">
                ⚡ Últimas vagas com preço promocional!
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Comece hoje e transforme sua vida profissional
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
