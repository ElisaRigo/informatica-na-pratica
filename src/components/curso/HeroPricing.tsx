import { Shield, Clock, Award, Infinity, Headphones, BookOpen, Monitor, Gift } from "lucide-react";
import { useState, useEffect } from "react";

const useCountdown = () => {
  const getTargetTime = () => {
    const stored = localStorage.getItem("promo_end");
    if (stored) {
      const target = parseInt(stored, 10);
      if (target > Date.now()) return target;
    }
    // 2 hours from now
    const target = Date.now() + 2 * 60 * 60 * 1000;
    localStorage.setItem("promo_end", target.toString());
    return target;
  };

  const [target] = useState(getTargetTime);
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, target - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) {
        // Reset for next 2 hours
        const newTarget = Date.now() + 2 * 60 * 60 * 1000;
        localStorage.setItem("promo_end", newTarget.toString());
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

const valueItems = [
  { icon: Monitor, label: "+90 Videoaulas" },
  { icon: BookOpen, label: "5 Módulos Completos" },
  { icon: Award, label: "Certificado Incluso" },
  { icon: Infinity, label: "Acesso Vitalício" },
  { icon: Headphones, label: "Suporte Direto" },
  { icon: Gift, label: "4 Bônus Exclusivos" },
];

export const HeroPricing = () => {
  const { hours, minutes, seconds } = useCountdown();

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="max-w-xl mx-auto mb-4 md:mb-6">
      {/* Título da seção - frase motivacional */}
      <div className="text-center mb-4">
        <p className="text-lg md:text-2xl font-black text-white">
          💻 Chega de perder oportunidades.
        </p>
        <p className="text-base md:text-xl font-bold text-slate-300 mt-1">
          Aprenda informática de uma vez por todas!
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl overflow-hidden">
        {/* Urgency banner */}
        <div className="bg-gradient-to-r from-destructive to-destructive/80 py-2.5 px-4">
          <p className="text-white font-black text-center text-sm md:text-base tracking-wide animate-pulse">
            🔥 ÚLTIMAS VAGAS COM 40% OFF!
          </p>
        </div>

        <div className="p-4 md:p-6">
          {/* Countdown */}
          <div className="mb-4">
            <p className="text-slate-400 text-xs md:text-sm text-center mb-2 font-medium">
              ⏰ Esta oferta expira em:
            </p>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              {[
                { value: pad(hours), label: "hrs" },
                { value: pad(minutes), label: "min" },
                { value: pad(seconds), label: "seg" },
              ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 md:px-4 md:py-2.5 min-w-[52px] md:min-w-[64px]">
                    <span className="text-2xl md:text-3xl font-black text-white tabular-nums">
                      {unit.value}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[10px] md:text-xs mt-1">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value seals - grid compacto */}
          <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-4">
            {valueItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 md:px-3 md:py-2"
              >
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <span className="text-white text-[10px] md:text-xs font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-4">
            <p className="text-base md:text-xl text-slate-400 mb-1">
              De{" "}
              <span className="line-through text-slate-300 font-bold text-lg md:text-2xl">
                R$ 497,00
              </span>{" "}
              por apenas
            </p>
            <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-success to-accent mb-1">
              12x de R$ 30,72
            </p>
            <p className="text-base md:text-xl text-slate-400">
              ou{" "}
              <strong className="text-white font-black text-xl md:text-3xl">
                R$ 297,00
              </strong>{" "}
              à vista
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-success to-accent text-white font-black text-base md:text-xl px-6 py-4 md:py-5 rounded-xl shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">🎯 QUERO COMEÇAR AGORA!</span>
          </button>

          {/* Guarantee */}
          <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-success font-bold text-sm md:text-base">
                Garantia Incondicional de 7 Dias
              </span>
            </div>
            <p className="text-slate-300 text-xs md:text-sm text-center">
              Se você não gostar do curso por qualquer motivo, devolvo{" "}
              <strong className="text-white">100% do seu dinheiro</strong>. Sem perguntas, sem
              burocracia.
            </p>
          </div>

          <p className="text-slate-400 text-[10px] md:text-xs mt-3 text-center">
            🔒 Pagamento 100% seguro • Acesso imediato após a compra
          </p>
        </div>
      </div>
    </div>
  );
};
