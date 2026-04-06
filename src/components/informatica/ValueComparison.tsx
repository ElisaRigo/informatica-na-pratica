import { X, Check, ArrowRight } from "lucide-react";

export const ValueComparison = () => {
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-foreground text-center mb-6">
            Compare e <span className="text-primary">decida</span>
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Presencial */}
            <div className="bg-card border border-line rounded-xl p-4 opacity-60">
              <p className="text-xs font-bold text-destructive mb-3 uppercase tracking-wide">Curso Presencial</p>
              <p className="text-2xl md:text-3xl font-black text-foreground mb-3">R$ 1.500<span className="text-sm font-medium text-muted-foreground">+</span></p>
              <ul className="space-y-2">
                {["Horário fixo", "Deslocamento", "Material extra pago", "Tempo limitado"].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <X className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Este curso */}
            <div className="bg-primary/10 border-2 border-primary/40 rounded-xl p-4 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">
                MELHOR OPÇÃO
              </div>
              <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">Este Curso</p>
              <p className="text-2xl md:text-3xl font-black text-accent mb-3">R$ 297<span className="text-sm font-medium text-muted-foreground">,00</span></p>
              <ul className="space-y-2">
                {["Acesso vitalício", "Estude quando quiser", "Certificado incluso", "Suporte via WhatsApp"].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:scale-[1.02] transition-all"
            >
              Quero Começar Hoje
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] mt-2 text-muted-foreground">
              🔒 Pagamento seguro • Garantia de 7 dias
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
