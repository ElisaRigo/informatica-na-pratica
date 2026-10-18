import { ShieldCheck, Play, MessageCircle, Lock, Flame } from "lucide-react";

const steps = [
  {
    icon: Play,
    title: "Comece hoje",
    text: "Assista às primeiras aulas no seu ritmo.",
  },
  {
    icon: MessageCircle,
    title: "Fale comigo",
    text: "Dúvidas? Me chame no WhatsApp.",
  },
  {
    icon: ShieldCheck,
    title: "Decida depois",
    text: "Não gostou? Devolvo 100% do dinheiro.",
  },
];

export const SevenDayChallenge = () => {
  return (
    <section className="challenge-theme relative overflow-hidden bg-background py-8 md:py-12 border-t border-primary/25">
      {/* Brilho ambiente atrás do card */}
      <div
        aria-hidden
        className="challenge-pulse pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Card convite */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/50 bg-gradient-to-b from-primary/20 via-background to-background px-4 py-6 md:px-8 md:py-8 shadow-challenge-sm">
            {/* Fita dourada no topo */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
            />

            {/* Selo */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 border border-primary/60 bg-primary/15 rounded-full px-3 py-1 mb-3">
                <Flame className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary text-[11px] md:text-xs font-bold uppercase tracking-wide">
                  Risco zero para você
                </span>
              </div>

              {/* Título convite */}
              <h2 className="text-2xl md:text-4xl font-black text-foreground leading-tight mb-2">
                E aí, topa um <span className="text-primary">desafio?</span>
              </h2>
              <p className="text-base md:text-xl font-bold text-foreground mb-1">
                Te desafio a testar o curso por{" "}
                <span className="text-primary">7 dias</span>.
              </p>
              <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                Eu confio tanto na minha didática que o risco fica todo comigo.
              </p>
            </div>

            {/* Trilha de 3 passos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mt-5">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-3 bg-card/80 border border-primary/30 rounded-lg px-3 py-2.5 text-left hover:border-primary/70 hover:bg-card transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wide">
                      Passo {i + 1}
                    </span>
                    <h3 className="text-foreground font-bold text-sm md:text-base leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm leading-snug">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Frase de segurança */}
            <p className="text-center text-muted-foreground text-sm md:text-base mt-4 max-w-md mx-auto leading-relaxed">
              Se não for para você, é só cancelar.{" "}
              <strong className="text-foreground">Devolvo cada centavo.</strong>
            </p>

            {/* CTA */}
            <div className="text-center mt-4">
              <button
                onClick={() => (window as any).openCheckout?.()}
                className="w-full max-w-sm inline-flex items-center justify-center bg-success hover:bg-success/90 text-success-foreground font-black text-base md:text-lg px-6 py-3 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 transition-all hover:scale-[1.02]"
              >
                Quero aceitar o desafio
              </button>
              <p className="text-muted-foreground text-[11px] md:text-xs mt-2 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 flex-shrink-0" />
                Garantia de 7 dias · Acesso imediato
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
