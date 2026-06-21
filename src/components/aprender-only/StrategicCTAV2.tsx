import { ShieldCheck } from "lucide-react";

interface StrategicCTAV2Props {
  headline?: string;
  buttonText?: string;
  variant?: "default" | "accent" | "minimal" | "light";
}

export const StrategicCTAV2 = ({
  headline = "Eu também quero aprender!",
  buttonText = "Quero Aprender Informática sem Medo",
  variant = "default"
}: StrategicCTAV2Props) => {
  const isLight = variant === "light";
  
  return (
    <section className={`py-8 md:py-12 ${
      isLight
        ? "bg-secondary/30"
        : "bg-gradient-to-b from-background via-secondary/40 to-background"
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-5 text-foreground leading-tight">
            {headline.includes("!") ? (
              <>
                {headline.replace("!", "")}
                <span className="text-primary">!</span>
              </>
            ) : (
              headline
            )}
          </h3>

          <button
            onClick={() => (window as any).openCheckout?.()}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base md:text-xl px-10 md:px-14 py-5 rounded-xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-[1.02] transition-all duration-300 uppercase tracking-tight"
          >
            {buttonText}
          </button>

          <p className="text-xs md:text-sm mt-4 inline-flex items-center justify-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Pagamento seguro • Garantia de 7 dias • Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
};
