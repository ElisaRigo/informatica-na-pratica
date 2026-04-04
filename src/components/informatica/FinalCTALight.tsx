import { ArrowRight, Shield, Clock, Zap } from "lucide-react";

export const FinalCTALight = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive px-4 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
            <Zap className="w-4 h-4" />
            ÚLTIMAS VAGAS COM DESCONTO
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            Você vai <span className="text-primary">agradecer</span>{" "}
            por ter começado hoje
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Milhares de pessoas já transformaram suas vidas com este curso. A única diferença entre elas e você é uma decisão.
          </p>

          <div className="bg-white rounded-2xl p-6 mb-8 border border-border shadow-lg inline-block">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div>
                <p className="text-muted-foreground text-sm">Investimento único</p>
                <p className="text-4xl font-black text-foreground">R$ 297<span className="text-lg">,00</span></p>
              </div>
              <div className="h-12 w-px bg-border hidden md:block" />
              <div>
                <p className="text-muted-foreground text-sm">ou em até</p>
                <p className="text-2xl font-bold text-accent">12x R$ 30,72</p>
              </div>
            </div>
          </div>

          <div className="block">
            <button onClick={() => (window as any).openCheckout?.()} className="group relative inline-flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-white font-black text-xl md:text-2xl px-12 md:px-16 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8">
              <span className="relative flex items-center gap-3">
                SIM, QUERO COMEÇAR AGORA
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-accent" /><span>Garantia de 7 dias</span></div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span>Acesso imediato</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
