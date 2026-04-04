import { ArrowRight, Shield, Clock } from "lucide-react";

export const FinalCTALight = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3 leading-tight">
            Você vai <span className="text-primary">agradecer</span>{" "}
            por ter começado hoje
          </h2>

          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            Milhares de pessoas já transformaram suas vidas com este curso. A única diferença entre elas e você é uma decisão.
          </p>

          <div className="inline-flex items-center gap-4 md:gap-6 bg-white rounded-xl p-4 mb-5 border border-border shadow-sm">
            <div>
              <p className="text-muted-foreground text-xs">Investimento único</p>
              <p className="text-2xl md:text-3xl font-black text-foreground">R$ 297<span className="text-sm">,00</span></p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-muted-foreground text-xs">ou em até</p>
              <p className="text-lg md:text-xl font-bold text-accent">12x R$ 30,72</p>
            </div>
          </div>

          <div className="block">
            <button onClick={() => (window as any).openCheckout?.()} className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-black text-base md:text-lg px-8 md:px-12 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mb-4">
              SIM, QUERO COMEÇAR AGORA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-muted-foreground" /><span>Garantia de 7 dias</span></div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-muted-foreground" /><span>Acesso imediato</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};