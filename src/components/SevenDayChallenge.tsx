import { ShieldCheck, Play, MessageCircle, Lock, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Play,
    title: "Entrar hoje",
    text: "Assista às primeiras aulas com calma, no seu ritmo.",
  },
  {
    icon: MessageCircle,
    title: "Tirar dúvidas",
    text: "Me chame no WhatsApp. Eu mesma te respondo.",
  },
  {
    icon: ShieldCheck,
    title: "Decidir depois",
    text: "Não gostou? Devolvo 100% do seu dinheiro.",
  },
];

export const SevenDayChallenge = () => {
  return (
    <section className="py-8 md:py-12 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Selo de risco zero */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs md:text-sm font-bold uppercase tracking-wide">
                Risco zero para você
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
              Te desafio a testar por <span className="text-primary">7 dias</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto">
              Entre hoje, assista às primeiras aulas e veja com seus próprios olhos que
              você consegue.
            </p>
          </div>

          {/* Trilha de 3 passos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex md:flex-col items-start gap-3 md:gap-0 bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 text-left md:text-center"
              >
                <div className="flex md:justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="md:mt-3">
                  <span className="text-primary text-[11px] font-bold uppercase tracking-wide">
                    Passo {i + 1}
                  </span>
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base mt-1">{step.text}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60 z-10" />
                )}
              </div>
            ))}
          </div>

          {/* Frase de segurança */}
          <p className="text-center text-slate-300 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Se você achar que não é para você, é só me mandar uma mensagem.{" "}
            <strong className="text-white">Devolvo cada centavo.</strong>
          </p>

          {/* CTA */}
          <div className="text-center mt-5">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="w-full max-w-md inline-flex items-center justify-center bg-success hover:bg-success/90 text-white font-black text-lg md:text-xl px-8 py-4 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 transition-all hover:scale-[1.02]"
            >
              Quero testar por 7 dias
            </button>
            <p className="text-slate-400 text-xs md:text-sm mt-3 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              Risco zero · Garantia de 7 dias · Acesso imediato
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
