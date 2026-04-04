import { ArrowRight, Shield, Clock, Zap } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-destructive/20 border border-destructive/40 text-destructive px-4 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
            <Zap className="w-4 h-4" />
            ÚLTIMAS VAGAS COM DESCONTO
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Daqui a 30 dias você vai{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              agradecer
            </span>{" "}
            por ter começado hoje
          </h2>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Milhares de pessoas já transformaram suas vidas com este curso. 
            A única diferença entre elas e você é uma decisão.
          </p>

          {/* Price reminder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 inline-block">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div>
                <p className="text-slate-400 text-sm">Investimento único</p>
                <p className="text-4xl font-black text-white">
                  R$ 297<span className="text-lg">,00</span>
                </p>
              </div>
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <div>
                <p className="text-slate-400 text-sm">ou em até</p>
                <p className="text-2xl font-bold text-accent">12x R$ 30,22</p>
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-success text-white font-black text-xl md:text-2xl px-12 md:px-16 py-6 rounded-full shadow-2xl shadow-accent/40 hover:shadow-accent/60 hover:scale-105 transition-all duration-300 mb-8"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-full" />
            <span className="relative flex items-center gap-3">
              SIM, QUERO COMEÇAR AGORA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Trust elements */}
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
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
