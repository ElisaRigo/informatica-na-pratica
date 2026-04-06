import { ArrowRight, Shield, Clock } from "lucide-react";

export const FinalCTALight = () => {
  return (
    <section className="py-5 md:py-8 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-5 left-5 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-5 right-5 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-2 leading-tight">
            Você vai <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">agradecer</span>{" "}
            por ter começado hoje
          </h2>

          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto mb-4">
            Milhares de pessoas já transformaram suas vidas com este curso. A única diferença entre elas e você é uma decisão.
          </p>

          <div className="inline-flex items-center gap-3 md:gap-4 bg-slate-800 rounded-lg p-3 mb-4 border border-slate-700 shadow-sm">
            <div>
              <p className="text-slate-500 text-[10px]">Investimento único</p>
              <p className="text-lg md:text-xl font-black text-white">R$ 297<span className="text-xs">,00</span></p>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <p className="text-slate-500 text-[10px]">ou em até</p>
              <p className="text-sm md:text-base font-bold text-accent">12x R$ 30,72</p>
            </div>
          </div>

          <div className="block">
            <button onClick={() => (window as any).openCheckout?.()} className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm md:text-base px-6 md:px-10 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mb-3">
              SIM, QUERO COMEÇAR AGORA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 text-[11px] md:text-xs text-slate-500">
            <div className="flex items-center gap-1"><Shield className="w-3 h-3 text-slate-500" /><span>Garantia de 7 dias</span></div>
            <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" /><span>Acesso imediato</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
