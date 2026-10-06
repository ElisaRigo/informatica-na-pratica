import { ArrowRight } from "lucide-react";

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
    <section className={`py-6 md:py-8 ${
      isLight 
        ? "bg-white" 
        : variant === "minimal" 
          ? "bg-slate-800/50" 
          : "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h3 className={`text-xl md:text-2xl lg:text-3xl font-black mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>
            {headline.includes("!") ? (
              <>
                {headline.replace("!", "")}
                <span className="text-primary">!</span>
              </>
            ) : (
              headline
            )}
          </h3>

          {/* CTA Button - Compacto e elegante */}
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-[1.02] transition-all duration-300"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trust text */}
          <p className={`text-xs md:text-sm mt-4 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            🔒 Pagamento seguro • Garantia de 7 dias • Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
};
