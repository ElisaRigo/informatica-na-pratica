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
    <section className={`py-8 md:py-12 ${
      isLight 
        ? "bg-white" 
        : variant === "minimal" 
          ? "bg-slate-800/50" 
          : "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black mb-6 ${isLight ? "text-slate-900" : "text-white"}`}>
            {headline.includes("!") ? (
              <>
                {headline.replace("!", "")}
                <span className="text-primary">!</span>
              </>
            ) : (
              headline
            )}
          </h3>

          {/* CTA Button - Mesmo padrão do Hero */}
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-success to-accent text-white font-black text-base md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              🎯 {buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
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
