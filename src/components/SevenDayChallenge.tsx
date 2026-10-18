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
    <section className="challenge-theme relative overflow-hidden bg-background py-10 md:py-14 border-t border-primary/25">
      {/* Brilho ambiente atrás do card */}
      <div
        aria-hidden
        className="challenge-pulse pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[110px]"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Card convite */}
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-primary/50 bg-gradient-to-b from-primary/25 via-background to-background px-5 py-8 md:px-10 md:py-12 shadow-challenge">
            {/* Fita dourada no topo */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary"
            />

            {/* Selo */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 border border-primary/60 bg-primary/20 rounded-full px-4 py-1.5 mb-5 shadow-challenge-sm">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs md:text-sm font-bold uppercase tracking-wide">
                  Risco zero para você
                </span>
              </div>

              {/* Título convite */}
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-3">
                E aí, topa um <span className="text-primary">desafio?</span>
              </h2>
              <p className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Te desafio a testar o curso por{" "}
                <span className="text-primary">7 dias</span>.
              </p>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Eu confio tanto na minha didática que o risco fica todo comigo.
                Você entra, assiste e decide depois.
              </p>
            </div>

            {/* Trilha de 3 passos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex md:flex-col items-start gap-3 md:gap-0 bg-card/80 border border-primary/30 rounded-xl p-4 md:p-5 text-left md:text-center hover:border-primary/70 hover:bg-card transition-colors"
                >
                  <div className="flex md:justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-challenge-sm flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="md:mt-3">
                    <span className="text-primary text-[11px] font-bold uppercase tracking-wide">
                      Passo {i + 1}
                    </span>
                    <h3 className="text-foreground font-bold text-lg md:text-xl leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mt-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promessas */}
            <div className="flex flex-col items-start gap-2 mt-7 md:justify-center md:flex-row md:gap-8">
              {promises.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm md:text-base font-semibold">{p}</span>
                </div>
              ))}
            </div>

            {/* Frase de segurança */}
            <p className="text-center text-muted-foreground text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              Se você achar que não é para você, é só cancelar.{" "}
              <strong className="text-foreground">Devolvo cada centavo.</strong>
            </p>

            {/* CTA */}
            <div className="text-center mt-5">
              <button
                onClick={() => (window as any).openCheckout?.()}
                className="w-full max-w-md inline-flex items-center justify-center bg-success hover:bg-success/90 text-success-foreground font-black text-lg md:text-xl px-8 py-4 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 transition-all hover:scale-[1.02]"
              >
                Quero aceitar o desafio
              </button>
              <p className="text-muted-foreground text-xs md:text-sm mt-3 flex items-center justify-center gap-2">
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
