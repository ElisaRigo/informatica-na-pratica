import { ArrowRight } from "lucide-react";

export const FinalCTALight = () => {
  return (
    <section className="py-10 md:py-14 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
            Daqui a alguns meses, você pode continuar no mesmo lugar…
          </p>
          <p className="text-lg md:text-xl font-black text-foreground leading-tight mb-6">
            Ou pode olhar para trás e <span className="text-primary">agradecer por ter começado hoje.</span>
          </p>

          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.02] transition-all"
          >
            QUERO COMEÇAR AGORA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
