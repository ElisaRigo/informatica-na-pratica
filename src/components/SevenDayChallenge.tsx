import { ShieldCheck, Play, MessageCircle, Lock, CheckCircle2, Flame } from "lucide-react";

const steps = [
  {
    icon: Play,
    title: "Comece hoje",
    text: "Assista às primeiras aulas com calma, no seu ritmo.",
  },
  {
    icon: MessageCircle,
    title: "Fale comigo",
    text: "Dúvidas? Me chame no WhatsApp. Eu mesma te respondo.",
  },
  {
    icon: ShieldCheck,
    title: "Decida depois",
    text: "Não gostou? Devolvo 100% do seu dinheiro.",
  },
];

const promises = [
  "7 dias inteiros para experimentar",
  "Acesso imediato a todas as aulas",
  "Devolução de 100%, sem perguntas",
];

export const SevenDayChallenge = () => {
  return (
    <section className="py-10 md:py-14 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Card convite */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/15 via-slate-900 to-slate-900 px-5 py-8 md:px-10 md:py-12 shadow-2xl shadow-primary/20">
            {/* Selo */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 rounded-full px-4 py-1.5 mb-5">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs md:text-sm font-bold uppercase tracking-wide">
                  Risco zero para você
                </span>
              </div>

              {/* Título convite */}
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
                E aí, topa um <span className="text-primary">desafio?</span>
              </h2>
              <p className="text-xl md:text-2xl font-bold text-white mb-4">
                Te desafio a testar o curso por{" "}
                <span className="text-primary">7 dias</span>.
              </p>
              <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                Eu confio tanto na minha didática que o risco fica todo comigo.
                Você entra, assiste e decide depois.
              </p>
            </div>

            {/* Trilha de 3 passos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex md:flex-col items-start gap-3 md:gap-0 bg-slate-800/70 border border-primary/20 rounded-xl p-4 md:p-5 text-left md:text-center hover:border-primary/50 transition-colors"
                >
                  <div className="flex md:justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
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
                </div>
              ))}
            </div>

            {/* Promessas */}
            <div className="flex flex-col items-start gap-2 mt-7 md:justify-center md:flex-row md:gap-8">
              {promises.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white text-sm md:text-base font-semibold">{p}</span>
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
                Quero aceitar o desafio
              </button>
              <p className="text-slate-400 text-xs md:text-sm mt-3 flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                Risco zero · Garantia de 7 dias · Acesso imediato
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
