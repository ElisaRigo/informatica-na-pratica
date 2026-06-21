import { ArrowRight, Shield, Clock, Zap } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 text-primary px-4 py-2 rounded-full text-sm font-black mb-8 animate-pulse uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Últimas vagas com desconto
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[1.05]">
            Daqui a 30 dias você vai{" "}
            <span className="text-primary">agradecer</span>{" "}
            por ter começado hoje.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Milhares de pessoas já transformaram suas vidas com este curso.
            A única diferença entre elas e você é uma decisão.
          </p>

          <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-primary/30 inline-block">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div>
                <p className="text-muted-foreground text-sm">Investimento único</p>
                <p className="text-4xl font-black text-foreground">
                  R$ 297<span className="text-lg">,00</span>
                </p>
              </div>
              <div className="h-12 w-px bg-primary/30 hidden md:block" />
              <div>
                <p className="text-muted-foreground text-sm">ou em até</p>
                <p className="text-2xl font-black text-primary">12x R$ 30,72</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xl md:text-2xl px-12 md:px-16 py-6 rounded-2xl shadow-2xl shadow-primary/50 hover:shadow-primary/70 hover:scale-105 transition-all duration-300 mb-8 uppercase tracking-tight"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl" />
            <span className="relative flex items-center gap-3">
              SIM, QUERO COMEÇAR AGORA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Garantia de 7 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
