import { HelpCircle, Heart } from "lucide-react";

export const IdentificationSection = () => {
  return (
    <section className="relative py-10 md:py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-4 py-2 rounded-full mb-5">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs md:text-sm text-primary uppercase tracking-wide">
              Isso é para você?
            </span>
          </div>

          {/* Main question */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Você tem{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                medo
              </span>
              <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-gradient-to-r from-primary/30 to-accent/30 -skew-x-12" />
            </span>
            {" "}do computador?
          </h2>

          {/* Reassurance */}
          <p className="text-lg md:text-2xl text-slate-200 font-medium mb-8 leading-relaxed">
            Calma, <strong className="text-white">você não está sozinho(a)</strong>.
            <br className="hidden md:block" />
            Eu vou te ajudar a aprender — <span className="text-primary font-bold">do seu jeito, no seu tempo</span>.
          </p>

          {/* Identification list */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto mb-8 text-left">
            {[
              "Tenho vergonha de pedir ajuda",
              "Tenho medo de clicar errado",
              "Acho que sou velho(a) demais",
              "Não sei nem por onde começar",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3"
              >
                <Heart className="w-5 h-5 text-primary flex-shrink-0 fill-primary/30" />
                <span className="text-white text-sm md:text-base font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Promise */}
          <div className="inline-block bg-primary/10 border-2 border-primary/40 rounded-2xl px-6 py-4 md:px-8 md:py-5">
            <p className="text-base md:text-xl text-white font-bold">
              Se você se identificou com pelo menos <span className="text-primary">uma</span> dessas frases…
              <br className="hidden md:block" />
              <span className="text-primary">este curso foi feito para você.</span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="inline-flex items-center justify-center bg-success hover:bg-success/90 text-white font-bold text-base md:text-lg px-8 md:px-10 py-4 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-[1.02] transition-all duration-300"
            >
              Sim, quero perder o medo do computador
            </button>
            <p className="text-xs md:text-sm text-slate-400 mt-3">
              🔒 Pagamento seguro • Garantia de 7 dias • Acesso imediato
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
